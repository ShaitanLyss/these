use crate::StdError;
use crate::codegen::building_block::{ApplyBoundaryConditionConfig, InitialConditionConfig};
use crate::codegen::input_schema::quantity::QuantityTrait;
use crate::ops::ParseExprError;
use derive_more::{Deref, DerefMut, FromStr, IntoIterator};
use indexmap::IndexMap as BaseIndexMap;
use itertools::Itertools;
use lazy_static::lazy_static;
use schemars::JsonSchema;
use serde::de::Visitor;
use std::collections::{HashMap, HashSet};
use std::fmt::Debug;
use std::hash::Hash;
use std::str::FromStr;
pub trait RawRepr {
    fn raw(&self) -> &str;
}

pub mod mesh;
pub mod quantity;
pub mod range;
mod reference;
mod unit;

use quantity::{Length, RANGE_PATTERN, Speed, Time};

use mesh::MeshEnum;
use range::Range;
use serde::{Deserialize, Serialize};
use tera::Tera;
use thiserror::Error;

use crate::{
    Equation, Expr, Func, Symbol, System, codegen::building_block::deal_ii_factory, symbol,
};

#[derive(Deref, DerefMut, Deserialize, Serialize, Clone, Debug, IntoIterator)]
pub struct IndexMap<K, V>(#[into_iterator(owned, ref, ref_mut)] BaseIndexMap<K, V>)
where
    K: Eq + Hash;

impl<K, V> IndexMap<K, V>
where
    K: Eq + Hash,
{
    pub fn new() -> Self {
        IndexMap(BaseIndexMap::new())
    }
    pub fn with_capacity(capacity: usize) -> Self {
        IndexMap(BaseIndexMap::with_capacity(capacity))
    }
}

impl<K, V> JsonSchema for IndexMap<K, V>
where
    K: Eq + Hash + JsonSchema,
    V: JsonSchema,
{
    fn schema_name() -> std::borrow::Cow<'static, str> {
        format!("Map<{}, {}>", K::schema_name(), V::schema_name()).into()
    }

    fn json_schema(generator: &mut schemars::SchemaGenerator) -> schemars::Schema {
        HashMap::<K, V>::json_schema(generator)
    }
}

/// # Quantity
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(tag = "type", content = "value")]
pub enum QuantityEnum {
    #[serde(rename = "speed")]
    Speed(Speed),
}

impl QuantityEnum {
    pub fn si_value(&self) -> f64 {
        match self {
            QuantityEnum::Speed(v) => v.si_value(),
        }
    }
}

use super::building_block::{
    Block, BlockRes, BuildingBlockFactory, EquationSetupConfig, ShapeMatrix, ShapeMatrixConfig,
    SolveUnknownConfig,
};
use super::{
    BuildingBlock,
    building_block::{
        BuildingBlockError, DofHandlerConfig, MatrixConfig, SparsityPatternConfig, VectorConfig,
    },
};

/// # Finite Element
/// The finite element to use for the mesh.
#[derive(Clone, Debug, Serialize, Deserialize, JsonSchema, Default)]
pub enum FiniteElement {
    Q1,
    #[default]
    Q2,
    Q3,
}

/// # Solve
/// The equation(s) to solve and the mesh to use.
#[derive(Clone, Debug, Serialize, Deserialize, JsonSchema)]
pub struct Solve {
    /// # Equations
    /// The equation(s) to solve
    pub equations: Vec<String>,

    ///# Mesh
    /// The mesh to use
    pub mesh: String,

    pub element: FiniteElement,

    /// # Dimension
    /// The dimension of the problem
    /// Possible values: 1, 2, 3
    #[serde(default = "default_dimension")]
    pub dimension: usize,

    /// # Time
    /// The time range to solve.
    #[serde(default = "default_solving_range")]
    pub time: Range<Time>,

    /// # Time Step
    /// The time step to use.
    pub time_step: Time,
}

fn default_dimension() -> usize {
    2
}

fn default_solving_range() -> Range<Time> {
    "0 .. 5s".parse().unwrap()
}

/// # Generation Configuration
/// The configuration for the generation of the code.
#[derive(Clone, Debug, Serialize, Deserialize, JsonSchema, Default)]
pub struct GenConfig {
    /// # MPI
    /// Whether to generate MPI code.
    #[serde(default)]
    pub mpi: bool,

    /// # Matrix Free
    /// Whether to generate matrix free code.
    #[serde(default)]
    pub matrix_free: bool,
}

/// # Hecate Input Schema
/// The input schema for Hecate.
#[derive(Clone, Debug, Serialize, Deserialize, JsonSchema)]
pub struct InputSchema {
    #[serde(rename = "generation")]
    #[serde(default)]
    pub gen_conf: GenConfig,

    /// # Meshes
    /// The available meshes.
    pub meshes: IndexMap<String, MeshEnum>,

    /// # Equations
    /// The available equations.
    pub equations: IndexMap<String, Equation>,

    /// # Parameters
    /// The available parameters.
    pub parameters: IndexMap<String, QuantityEnum>,

    /// # Unknowns
    /// The available unknowns.
    pub unknowns: IndexMap<String, Unknown>,

    /// # Functions
    /// The available functions.
    /// They can either be simple function expression, or a list of function expression with conditions.
    pub functions: IndexMap<String, FunctionDef>,

    pub solve: Solve,
}

impl InputSchema {
    pub fn from_yaml(yaml: &str) -> Result<Self, serde_yaml::Error> {
        serde_yaml::from_str(yaml)
    }
}

#[derive(Clone, Debug, Serialize, JsonSchema)]
#[serde(untagged)]
pub enum Condition<T> {
    Value(T),
    Range(Range<T>),
}

struct ConditionVisitor<T> {
    _marker: std::marker::PhantomData<T>,
}

impl<'de, T> Visitor<'de> for ConditionVisitor<T>
where
    T: FromStr,
    T::Err: StdError + 'static,
{
    type Value = Condition<T>;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("a value or a range")
    }

    fn visit_str<E>(self, v: &str) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        if v.contains("..") {
            Ok(Condition::Range(v.parse().map_err(|e| E::custom(e))?))
        } else {
            Ok(Condition::Value(v.parse().map_err(|e| E::custom(e))?))
        }
    }
}

impl<'de, T> Deserialize<'de> for Condition<T>
where
    T: FromStr,
    T::Err: StdError + 'static,
{
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_str(ConditionVisitor {
            _marker: std::marker::PhantomData,
        })
    }
}

/// # Function Expression
/// A function expression.
/// Available variables are : t, x, y, z.
/// Math functions such as cosinus or exponentials are available.
/// They can be called through their cpp names like log for the logarithm.
#[derive(Clone, Debug, Serialize, Deserialize, JsonSchema, FromStr, DerefMut, Deref)]
pub struct FunctionExpression(Box<dyn Expr>);

#[derive(Clone, Debug, Serialize, Deserialize, JsonSchema)]
pub struct ConditionedFunctionExpression {
    pub expr: FunctionExpression,
    /// # Time Condition
    /// The time condition for which the function expression is valid.
    /// It can be none, a value or a range.
    pub t: Option<Condition<Time>>,

    /// # X Condition
    /// The x condition for which the function expression is valid.
    /// It can be none, a value or a range.
    pub x: Option<Condition<Length>>,

    /// # Y Condition
    /// The y condition for which the function expression is valid.
    /// It can be none, a value or a range.
    pub y: Option<Condition<Length>>,

    /// # Z Condition
    /// The z condition for which the function expression is valid.
    /// It can be none, a value or a range.
    pub z: Option<Condition<Length>>,
}

/// # Function Definition
/// The definition of a function.
/// This can be an expression or a conditioned function.
#[derive(Clone, Debug, Serialize, JsonSchema)]
#[serde(untagged)]
pub enum FunctionDef {
    Expr(FunctionExpression),
    /// # Conditioned Function
    /// A function defined as list of function expression with conditions (time range, space range, etc...).
    /// The function expressions are checked in order. Therefore, in case of an overlap, the first one will be used.
    /// If no function expressions without conditions are specified, a default value of 0 will be assumed.
    Conditioned(Vec<ConditionedFunctionExpression>),
}

impl Serialize for Box<dyn Expr> {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(&self.str())
    }
}
struct ExprVisitor;
impl<'de> Visitor<'de> for ExprVisitor {
    type Value = Box<dyn Expr>;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("a properly written function expression")
    }

    fn visit_str<E>(self, v: &str) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        Ok(v.parse().map_err(|e| E::custom(e))?)
    }
}
impl<'de> Deserialize<'de> for Box<dyn Expr> {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        Ok(deserializer.deserialize_str(ExprVisitor)?)
    }
}

struct FunctionDefVisitor;

impl<'de> Visitor<'de> for FunctionDefVisitor {
    type Value = FunctionDef;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("a function expression or a conditioned function")
    }

    fn visit_str<E>(self, v: &str) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        Ok(FunctionDef::Expr(v.parse().map_err(|e| E::custom(e))?))
    }

    fn visit_u64<E>(self, v: u64) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        Ok(FunctionDef::Expr(FunctionExpression(
            crate::Integer::new_box(v as isize),
        )))
    }

    fn visit_i64<E>(self, v: i64) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        Ok(FunctionDef::Expr(FunctionExpression(
            crate::Integer::new_box(v as isize),
        )))
    }

    fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::SeqAccess<'de>,
    {
        let mut res = Vec::new();

        while let Some(item) = seq.next_element::<ConditionedFunctionExpression>()? {
            res.push(item)
        }

        Ok(FunctionDef::Conditioned(res))
    }
}

impl<'de> Deserialize<'de> for FunctionDef {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        Ok(deserializer.deserialize_any(FunctionDefVisitor)?)
    }
}

#[derive(Clone, Debug, Serialize, Deserialize, JsonSchema)]
#[serde(untagged)]
pub enum UnknownProperty {
    Constant(i64),
    ConstantFloat(f64),
    Function(String),
}
impl UnknownProperty {
    fn to_function_name(&self) -> String {
        match self {
            UnknownProperty::Constant(i) => format!("fn_{}", i.to_string().replace("-", "neg")),
            UnknownProperty::ConstantFloat(f) => {
                format!(
                    "fn_{}",
                    f.to_string().replace("-", "neg").replace(".", "dot")
                )
            }
            UnknownProperty::Function(s) => format!("fn_{s}"),
        }
    }
}

/// # Unknown
/// Represents an unknown to be solved in the PDE.
#[derive(Clone, Debug, Serialize, Deserialize, JsonSchema)]
pub struct Unknown {
    /// # Initial Condition
    /// The initial value of the unknown.
    pub initial: UnknownProperty,

    /// # Boundary Condition
    /// The boundary condition of the unknown.
    pub boundary: Option<UnknownProperty>,

    /// # Derivative Conditions
    /// The derivative's conditions of the unknown.
    pub derivative: Option<Box<Unknown>>,
}

pub struct ConstantFunction {
    pub name: String,
    pub value: String,
}

impl Unknown {
    pub fn visit_symbols<F: Fn(&str)>(&self, f: F) {
        if let UnknownProperty::Function(initial) = &self.initial {
            f(initial);
        }
        if let Some(UnknownProperty::Function(boundary)) = &self.boundary {
            f(boundary)
        }

        if let Some(derivative) = &self.derivative {
            derivative.visit_symbols(f);
        }
    }

    pub fn has_symbol(&self, s: &str) -> bool {
        if let UnknownProperty::Function(initial) = &self.initial
            && initial == s
        {
            true
        } else if let Some(UnknownProperty::Function(boundary)) = &self.boundary
            && boundary == s
        {
            true
        } else if let Some(derivative) = &self.derivative {
            derivative.has_symbol(s)
        } else {
            false
        }
    }

    pub fn visit_props<E: StdError, F: FnMut(&UnknownProperty) -> Result<(), E>>(
        &self,
        mut f: F,
    ) -> Result<(), E> {
        f(&self.initial)?;
        if let Some(boundary) = &self.boundary {
            f(boundary)?;
        }
        if let Some(derivative) = &self.derivative {
            derivative.visit_props(f)?;
        }
        Ok(())
    }

    pub fn visit_constants<E: StdError, F: FnMut(ConstantFunction) -> Result<(), E>>(
        &self,
        mut f: F,
    ) -> Result<(), E> {
        self.visit_props(|p| -> Result<(), E> {
            match p {
                UnknownProperty::Constant(i) => f(ConstantFunction {
                    value: i.to_string(),
                    name: p.to_function_name(),
                }),
                UnknownProperty::ConstantFloat(float) => f(ConstantFunction {
                    value: float.to_string(),
                    name: p.to_function_name(),
                }),
                _ => Ok(()),
            }
        })
    }
}

#[derive(Error, Debug)]
pub enum CodeGenError {
    #[error("failed to construct a block")]
    BlockError(#[from] BuildingBlockError),
    #[error("templating error: {0}")]
    TemplatingError(#[from] tera::Error),
    #[error("missing solver for unknown: {0}")]
    MissingSolver(String),
    #[error("invalid yaml input schema")]
    InvalidYaml(#[from] serde_yaml::Error),
    #[error("schema validation failed")]
    InvalidSchema(#[from] SchemaValidationError),
    #[error("unknown missing from the schema '{0}'")]
    UnknownUnknown(String),
    #[error("missing boundary condition for unknown: {0}")]
    MissingBoundary(String),
    #[error("missing derivative for unknown: {0}")]
    MissingDerivative(String),
    #[error("invalid expression for function expression: {0}")]
    InvalidFunctionExpression(ParseExprError),
}

lazy_static! {
    pub static ref TEMPLATES: Tera = {
        let mut tera = Tera::default();
        match tera.add_raw_template(
            "cpp_source",
            &include_str!("./input_schema/cpp_source_template.cpp")
                .replace("/*", "")
                .replace("*/", ""),
        ) {
            Ok(t) => t,
            Err(e) => {
                println!("Parsing error(s): {e}");
                std::process::exit(1);
            }
        };
        tera
    };
}

#[derive(Error, Debug)]
pub enum SchemaValidationError {
    #[error("mesh {0} not found")]
    MeshNotFound(String),
    #[error("equation(s) {0} not found")]
    EquationNotFound(String),
}

impl InputSchema {
    pub fn validate(&self) -> Result<(), SchemaValidationError> {
        let Solve {
            equations,
            mesh,
            element: _,
            time: _,
            time_step: _,
            dimension: _,
        } = &self.solve;

        self.meshes
            .contains_key(mesh)
            .then_some(())
            .ok_or(SchemaValidationError::MeshNotFound(mesh.to_string()))?;
        let missing_eqs = equations
            .iter()
            .filter_map(|e| (!self.equations.contains_key(e)).then_some(e))
            .collect_vec();

        if missing_eqs.len() > 0 {
            return Err(SchemaValidationError::EquationNotFound(
                missing_eqs.into_iter().join(", "),
            ));
        }

        // TODO validate all needed symbols by the equations are present
        // either as parameter of function

        Ok(())
    }

    pub fn generate_cpp_sources(&self) -> Result<String, CodeGenError> {
        self.validate()?;
        let factory = deal_ii_factory();
        let mut blocks = BuildingBlockCollector::new(&factory);
        blocks.newline();
        blocks.comment("Parameters");
        for (name, value) in &self.parameters {
            blocks.create(name, Block::Parameter(value.si_value()))?;
        }
        blocks.newline();

        let Solve {
            equations,
            mesh,
            element,
            time,
            time_step,
            dimension,
        } = &self.solve;

        let mesh = &self.meshes[mesh];

        let equations = equations
            .iter()
            .map(|e| self.equations[e].simplify_with_dimension(*dimension))
            .collect_vec();
        dbg!(&equations);

        let unknowns = self.unknowns.keys().map(|s| &s[..]).collect_vec();
        let mut knowns = Vec::with_capacity(self.functions.len());
        let mut substitutions = Vec::with_capacity(self.functions.len() + self.unknowns.len());

        // Identify functions used for the current problem
        let mut used_functions: IndexMap<&str, &FunctionDef> =
            IndexMap::with_capacity(self.functions.len());

        for (name, f) in &self.functions {
            if equations.iter().any(|eq| eq.has(&Symbol::new(name)))
                || self.unknowns.iter().any(|(_, u)| u.has_symbol(name))
            {
                used_functions.insert(name, f);
            }
        }

        let mut functions: HashMap<&str, String> = HashMap::with_capacity(used_functions.len());
        for (name, f) in used_functions.into_iter() {
            let function = format!("fn_{name}");
            blocks.create(&function, Block::Function(f))?;
            functions.insert(name, function);
        }

        // TODO: evaluate functions in expression setup code

        for (u, _) in &self.unknowns {
            let symbol = symbol!(u);

            if equations.iter().any(|e| e.get_ref().has(symbol)) {
                substitutions.push([symbol.clone_box(), Box::new(Func::new(u, []))]);
            }
        }

        for (f, _) in &self.functions {
            let symbol = symbol!(f);

            if equations.iter().any(|e| e.get_ref().has(symbol)) {
                knowns.push(&f[..]);
                substitutions.push([symbol.clone_box(), Box::new(Func::new(f, []))]);
            }
        }

        let equations = equations
            .iter()
            .map(|e| e.subs(&substitutions).as_eq().unwrap())
            .collect_vec();

        let system = System::new(unknowns, knowns, equations.iter())
            .to_first_order_in_time()
            .time_discretized()
            .simplified()
            .matrixify()
            .to_crank_nikolson()
            .to_constant_mesh()
            .simplify();

        println!("/*\n{system}\n*/\n");

        let mesh = blocks.insert("mesh", factory.mesh("mesh", mesh.get_ref())?)?;

        let element = blocks.insert("element", factory.finite_element("element", element)?)?;

        let dof_handler = blocks.insert(
            "dof_handler",
            factory.dof_handler("dof_handler", &DofHandlerConfig { mesh, element })?,
        )?;

        let vector_config = VectorConfig { dof_handler };

        let mut vectors: HashMap<&dyn Expr, String> = HashMap::with_capacity(system.num_vectors());

        for vector in system.vectors() {
            let vector_cpp = vector.to_cpp();
            blocks.insert(&vector_cpp, factory.vector(&vector_cpp, &vector_config)?)?;
            vectors.insert(vector, vector_cpp.clone());
        }

        let sparsity_pattern = blocks.insert(
            "sparsity_pattern",
            factory.sparsity_pattern("sparsity_pattern", &SparsityPatternConfig { dof_handler })?,
        )?;

        let mut unknowns_matrices: HashMap<&dyn Expr, String> =
            HashMap::with_capacity(system.unknowns.len());

        let matrix_config = MatrixConfig { sparsity_pattern };
        let rhs = blocks.create("rhs", Block::Vector(&vector_config))?;
        let mut unknown_solvers: HashMap<&dyn Expr, String> = HashMap::new();
        for unknown in &system.unknowns {
            let unknown = unknown.get_ref();
            let unknown_cpp = unknown.to_cpp();
            let mat_name = format!("matrix_{unknown_cpp}");
            let unknown_vec = &vectors[&unknown];

            unknowns_matrices.insert(
                unknown,
                blocks
                    .create(&mat_name, Block::Matrix(&matrix_config))?
                    .to_string(),
            );

            unknown_solvers.insert(
                unknown,
                blocks
                    .create(
                        &format!("solve_{unknown_cpp}"),
                        Block::SolveUnknown(&SolveUnknownConfig {
                            rhs,
                            unknown_vec,
                            unknown_mat: &mat_name,
                        }),
                    )?
                    .to_string(),
            );
        }

        let _laplace_mat = blocks.insert(
            "laplace_mat",
            factory.shape_matrix(
                "laplace_mat",
                &ShapeMatrixConfig {
                    kind: ShapeMatrix::Laplace,
                    dof_handler,
                    element,
                    matrix_config: &matrix_config,
                },
            )?,
        )?;
        let _mass_mat = blocks.insert(
            "mass_mat",
            factory.shape_matrix(
                "mass_mat",
                &ShapeMatrixConfig {
                    kind: ShapeMatrix::Mass,
                    dof_handler,
                    element,
                    matrix_config: &matrix_config,
                },
            )?,
        )?;

        let mut solved_unknowns: HashSet<&dyn Expr> = HashSet::new();
        let vectors: &Vec<_> = &system.vectors().collect();
        let matrixes: &Vec<_> = &system.matrixes().collect();

        /* Create a set to create identic constant functions only once */
        let mut constant_functions: HashSet<String> = HashSet::new();

        // Solve equations
        for (i, equation) in system.eqs_in_solving_order().enumerate() {
            // Iterate through unknowns in the equation to find the unknown to solve for (TODO: for now only one unknown per equation is supported)
            for unknown in system.equation_lhs_unknowns(equation) {
                // Solve unknowns only once
                if solved_unknowns.contains(&unknown) {
                    continue;
                }

                // Setup equation for solving the unknown
                blocks.create(
                    &format!("equation_{i}"),
                    Block::EquationSetup(&EquationSetupConfig {
                        equation,
                        unknown,
                        vectors,
                        matrixes,
                    }),
                )?;

                // Begin boundary condition
                // Retrive initial and boundary conditions for the unknown
                let unknown_cpp = unknown.to_cpp();
                let mat_name = format!("matrix_{unknown_cpp}");
                let unknown_config = if unknown_cpp == "v" {
                    self.unknowns
                        .get("u")
                        .ok_or_else(|| CodeGenError::UnknownUnknown("u".to_string()))?
                        .derivative
                        .as_ref()
                        .ok_or_else(|| CodeGenError::MissingDerivative("u".to_string()))?
                } else {
                    self.unknowns
                        .get(&unknown_cpp)
                        .ok_or_else(|| CodeGenError::UnknownUnknown(unknown_cpp.to_string()))?
                };

                // Setup initial values
                let initial = &unknown_config.initial;
                blocks.create(
                    &format!("initial_condition_{unknown_cpp}"),
                    Block::InitialCondition(&InitialConditionConfig {
                        dof_handler,
                        element,
                        function: &initial.to_function_name(),
                        target: &format!("{unknown_cpp}_prev"),
                    }),
                )?;

                // Create constant functions associated needed by the unknown
                unknown_config.visit_constants(
                    |ConstantFunction { ref name, value }| -> Result<(), CodeGenError> {
                        if constant_functions.contains(name) {
                            return Ok(());
                        }
                        constant_functions.insert(name.to_string());
                        blocks.create(
                            name,
                            Block::Function(&FunctionDef::Expr(
                                value
                                    .parse()
                                    .map_err(|e| CodeGenError::InvalidFunctionExpression(e))?,
                            )),
                        )?;
                        Ok(())
                    },
                )?;

                // Retrive boundary condition function
                let function = &unknown_config
                    .boundary
                    .as_ref()
                    // .or_else(|| )
                    .ok_or_else(|| CodeGenError::MissingBoundary(unknown_cpp.to_string()))?
                    .to_function_name();

                // Apply boundary condition
                blocks.newline();
                blocks.create(
                    &format!("apply_boundary_condition_{unknown_cpp}"),
                    Block::AppyBoundaryCondition(&ApplyBoundaryConditionConfig {
                        dof_handler,
                        function,
                        matrix: &mat_name,
                        solution: &unknown_cpp,
                        rhs,
                    }),
                )?;

                // Solve equation for unknown
                blocks.newline();
                blocks.call(
                    unknown_solvers
                        .get(&unknown)
                        .ok_or_else(|| CodeGenError::MissingSolver(unknown.str()))?,
                    &[],
                )?;
                blocks.newline();
                solved_unknowns.insert(unknown);
                // End boundary condition
            }
        }
        // End Solve Equations

        // Output results
        blocks.call("output_results", &[])?;
        for unknown in &system.unknowns {
            let unknown = unknown.to_cpp();
            blocks.add_vector_output(&unknown)?;
        }

        // Swap new values with previous values to move on to the next step
        blocks.newline();
        blocks.comment("Swap new values with previous values for the next step");
        for unknown in &system.unknowns {
            let unknown = unknown.to_cpp();
            let unknown_prev = format!("{unknown}_prev");
            blocks.call("swap", &[&unknown, &unknown_prev])?;
        }

        // Setup context for filling the template
        let mut context: tera::Context = blocks.collect(dof_handler, sparsity_pattern)?.into();
        context.insert("time_start", &time.start.seconds());
        context.insert("time_end", &time.end.seconds());
        context.insert("time_step", &time_step.seconds());
        context.insert("dimension", &dimension);

        // Fill the template with the context
        Ok(TEMPLATES.render("cpp_source", &context)?)
    }
}

#[derive(Clone)]
struct BuildingBlockCollector<'fa> {
    blocks: IndexMap<String, BuildingBlock>,
    additional_names: HashSet<String>,
    factory: &'fa BuildingBlockFactory<'fa>,
}

impl From<BuildingBlock> for tera::Context {
    fn from(block: BuildingBlock) -> Self {
        let mut context = tera::Context::new();
        let BuildingBlock {
            includes,
            data,
            setup,
            additional_names: _,
            constructor,
            methods_defs,
            methods_impls,
            additional_vectors: _,
            additional_matrixes: _,
            main,
            main_setup,
            global,
            output,
        } = block;
        context.insert(
            "includes",
            &includes
                .into_iter()
                .map(|s| format!("#include <{s}>"))
                .join("\n"),
        );

        macro_rules! insert_lines {
            ($key:expr, $source:ident, $indent:literal) => {
                context.insert(
                    $key,
                    &$source
                        .into_iter()
                        .map(|s| format!("{}{s}", " ".repeat($indent)))
                        .join("\n"),
                );
            };
        }

        context.insert("data", &to_cpp_lines("  ", data));
        context.insert("setup", &to_cpp_lines("    ", setup));
        context.insert(
            "constructors",
            &(if constructor.is_empty() {
                "".to_string()
            } else {
                format!(": {}", &constructor.into_iter().join(", "))
            }),
        );
        context.insert("methods_defs", &to_cpp_lines("  ", methods_defs));
        context.insert("methods_impls", &methods_impls.into_iter().join("\n"));
        insert_lines!("main_setup", main_setup, 2);
        insert_lines!("main", main, 4);
        insert_lines!("output", output, 2);

        context.insert("global", &global.join("\n\n\n"));
        context
    }
}

pub fn to_cpp_lines<Lines: IntoIterator<Item = String>>(prefix: &str, lines: Lines) -> String {
    lines
        .into_iter()
        .map(|s| format!("{prefix}{s};"))
        .join("\n")
}

impl<'fa> BuildingBlockCollector<'fa> {
    fn new(factory: &'fa BuildingBlockFactory<'fa>) -> Self {
        BuildingBlockCollector {
            blocks: IndexMap::new(),
            additional_names: HashSet::new(),
            factory,
        }
    }

    fn insert<'a>(
        &mut self,
        name: &'a str,
        block: BuildingBlock,
    ) -> Result<&'a str, BuildingBlockError> {
        if self.blocks.contains_key(name) {
            dbg!(&block);
            Err(BuildingBlockError::BlockAlreadyExists(name.to_string()))?
        }
        if self.additional_names.contains(name) {
            Err(BuildingBlockError::NameAlreadyExists(name.to_string()))?
        }
        self.additional_names
            .extend(block.additional_names.iter().cloned());
        self.blocks.insert(name.to_string(), block);
        return Ok(name);
    }
    fn collect(mut self, dof_handler: &str, sparsity_pattern: &str) -> BlockRes {
        let mut res = BuildingBlock::new();

        let mut additional_blocks: IndexMap<String, BuildingBlock> = IndexMap::new();

        let tmp_vector_config = VectorConfig { dof_handler };
        let tmp_matrix_config = MatrixConfig { sparsity_pattern };
        for (
            _,
            BuildingBlock {
                additional_vectors,
                additional_matrixes,
                ..
            },
        ) in &self.blocks
        {
            for vector in additional_vectors {
                if additional_blocks.contains_key(vector) {
                    continue;
                }
                let block = self.factory.vector(vector, &tmp_vector_config)?;
                additional_blocks.insert(vector.to_string(), block);
            }
            for matrix in additional_matrixes {
                if additional_blocks.contains_key(matrix) {
                    continue;
                }
                let block = self.factory.matrix(matrix, &tmp_matrix_config)?;
                additional_blocks.insert(matrix.to_string(), block);
            }
        }

        self.blocks.extend(additional_blocks);

        for (
            _,
            BuildingBlock {
                includes,
                data,
                setup,
                additional_names: _,
                constructor,
                methods_defs,
                methods_impls,
                main,
                main_setup,
                additional_vectors: _,
                additional_matrixes: _,
                global,
                output,
            },
        ) in self.blocks
        {
            res.includes.extend(includes);
            res.setup.extend(setup);
            res.data.extend(data);
            res.constructor.extend(constructor);
            res.methods_defs.extend(methods_defs);
            res.methods_impls.extend(methods_impls);
            res.main_setup.extend(main_setup);
            res.main.extend(main);
            res.global.extend(global);
            res.output.extend(output);
        }

        Ok(res)
    }

    fn create<'na>(
        &mut self,
        name: &'na str,
        block: Block<'_>,
    ) -> Result<&'na str, BuildingBlockError> {
        self.insert(
            name,
            match block {
                Block::Matrix(config) => self.factory.matrix(name, config)?,
                Block::Vector(vector_config) => self.factory.vector(name, vector_config)?,
                Block::SolveUnknown(solve_unknown_config) => {
                    self.factory.solve_unknown(name, solve_unknown_config)?
                }
                Block::EquationSetup(equation_setup_config) => {
                    self.factory.equation_setup(name, equation_setup_config)?
                }
                Block::Parameter(value) => self.factory.parameter(name, value)?,
                Block::Function(function) => self.factory.function(name, function)?,
                Block::AppyBoundaryCondition(config) => {
                    self.factory.apply_boundary_condition(name, config)?
                }
                Block::InitialCondition(config) => self.factory.initial_condition(name, config)?,
            },
        )?;
        Ok(name)
    }

    fn call(&mut self, name: &str, args: &[&str]) -> Result<(), BuildingBlockError> {
        let block = self.factory.call(name, args)?;
        let name = format!("call#{}", self.blocks.len());
        self.blocks.insert(name, block);

        Ok(())
    }

    fn newline(&mut self) {
        let name = format!("newline#{}", self.blocks.len());
        self.blocks.insert(name, self.factory.newline());
    }

    fn comment(&mut self, content: &str) {
        let name = format!("comment#{}", self.blocks.len());
        self.blocks.insert(name, self.factory.comment(content));
    }

    fn add_vector_output(&mut self, unknown: &str) -> Result<(), BuildingBlockError> {
        let name = format!("add_vector_output_{unknown}");
        self.insert(&name, self.factory.add_vector_output(&name, unknown)?)?;
        Ok(())
    }
}
