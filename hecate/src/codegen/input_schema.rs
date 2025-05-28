use crate::StdError;
use indexmap::IndexMap;
use itertools::Itertools;
use lazy_static::lazy_static;
use serde::de::Visitor;
use std::collections::{HashMap, HashSet};
use std::fmt::Debug;
use std::str::FromStr;
pub trait RawRepr {
    fn raw(&self) -> &str;
}

pub mod mesh;
mod quantity;
mod range;
mod reference;
mod unit;

use dyn_clone::DynClone;
use quantity::{Length, RANGE_PATTERN, Time};

use mesh::Mesh;
use range::Range;
use serde::{Deserialize, Serialize};
use tera::Tera;
use thiserror::Error;

use crate::{
    Equation, Expr, Func, Symbol, System, codegen::building_block::deal_ii_factory, symbol,
};

#[typetag::serde(tag = "type")]
pub trait QuantityTrait: DynClone + Debug {}

dyn_clone::clone_trait_object!(QuantityTrait);

use uom::si::f64 as si;

use super::building_block::{
    Block, BuildingBlockFactory, ShapeMatrix, ShapeMatrixConfig, SolveUnknownConfig,
};
use super::{
    BuildingBlock,
    building_block::{
        BuildingBlockError, DofHandlerConfig, MatrixConfig, SparsityPatternConfig, VectorConfig,
    },
};

#[typetag::serde(name = "speed")]
impl QuantityTrait for si::Velocity {}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub enum FiniteElement {
    Q1,
    Q2,
    Q3,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Solve {
    pub equations: Vec<String>,
    pub mesh: String,
    pub element: FiniteElement,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct InputSchema {
    pub meshes: HashMap<String, Box<dyn Mesh>>,
    pub equations: HashMap<String, Equation>,
    pub time: Range<Time>,
    pub time_step: Time,
    pub parameters: HashMap<String, Box<dyn QuantityTrait>>,
    pub unknowns: HashMap<String, Unknown>,
    pub functions: HashMap<String, FunctionDef>,
    pub solve: Solve,
}

#[derive(Clone, Debug, Serialize)]
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

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ConditionedFunction {
    expr: Box<dyn Expr>,
    t: Option<Condition<Time>>,
    x: Option<Condition<Length>>,
    y: Option<Condition<Length>>,
    z: Option<Condition<Length>>,
}

#[derive(Clone, Debug, Serialize)]
pub enum FunctionDef {
    Expr(Box<dyn Expr>),
    Conditioned(Vec<ConditionedFunction>),
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
        Ok(FunctionDef::Expr(crate::Integer::new_box(v as isize)))
    }

    fn visit_i64<E>(self, v: i64) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        Ok(FunctionDef::Expr(crate::Integer::new_box(v as isize)))
    }

    fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
    where
        A: serde::de::SeqAccess<'de>,
    {
        let mut res = Vec::new();

        while let Some(item) = seq.next_element::<ConditionedFunction>()? {
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

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Unknown {
    pub initial: String,
    pub boundary: Option<String>,
    pub derivative: Option<Box<Unknown>>,
}

#[derive(Error, Debug)]
pub enum CodeGenError {
    #[error("failed to construct a block")]
    BlockError(#[from] BuildingBlockError),
    #[error("templating error: {0}")]
    TemplatingError(#[from] tera::Error),
    #[error("missing solver for unknown: {0}")]
    MissingSolver(String),
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

impl InputSchema {
    pub fn generate_cpp_sources(&self) -> Result<String, CodeGenError> {
        let Solve {
            equations,
            mesh,
            element,
        } = &self.solve;

        let mesh = self.meshes.get(mesh).unwrap();

        let equations = equations
            .iter()
            .map(|e| self.equations.get(e).unwrap())
            .collect::<Vec<_>>();

        let unknowns = self.unknowns.keys().map(|s| &s[..]).collect::<Vec<_>>();
        let mut knowns = Vec::with_capacity(self.functions.len());
        let mut substitutions = Vec::with_capacity(self.functions.len() + self.unknowns.len());

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

        let equations: Vec<_> = equations
            .iter()
            .map(|e| e.subs(&substitutions).as_eq().unwrap())
            .collect();

        let system = System::new(unknowns, knowns, equations.iter())
            .to_first_order_in_time()
            .time_discretized()
            .simplified()
            .matrixify()
            .to_crank_nikolson()
            .to_constant_mesh()
            .simplify();

        // println!("/*\n{system}\n*/\n");

        let factory = deal_ii_factory();
        let mut blocks = BuildingBlockCollector::new(&factory);

        let mesh = blocks.insert("mesh", factory.mesh("mesh", mesh.get_ref())?)?;

        let element = blocks.insert("element", factory.finite_element("element", element)?)?;

        let dof_handler = blocks.insert(
            "dof_handler",
            factory.dof_handler("dof_handler", &DofHandlerConfig { mesh, element })?,
        )?;

        let vector_config = VectorConfig { dof_handler };

        let mut vectors: HashMap<String, String> = HashMap::with_capacity(system.num_vectors());

        for vector_symbol in system.vectors() {
            let vector = &vector_symbol
                .to_lowercase()
                .replace("^n-1", "_prev")
                .replace("^n", "");
            vectors.insert(vector_symbol.to_string(), vector.to_string());
            blocks.insert(vector, factory.vector(vector, &vector_config)?)?;
        }

        let sparsity_pattern = blocks.insert(
            "sparsity_pattern",
            factory.sparsity_pattern("sparsity_pattern", &SparsityPatternConfig { dof_handler })?,
        )?;

        let mut unknowns_matrices: HashMap<String, String> =
            HashMap::with_capacity(system.unknowns.len());

        let matrix_config = MatrixConfig { sparsity_pattern };
        let rhs = blocks.create("rhs", Block::Vector(&vector_config))?;
        let mut unknown_solvers: HashMap<String, String> = HashMap::new();
        for unknown in &system.unknowns {
            let unknown = unknown.str();
            let name = unknown.to_lowercase().replace("^n", "");
            let mat_name = format!("matrix_{}", &name);
            let unknown_vec = &vectors[&unknown];

            unknowns_matrices.insert(
                unknown.clone(),
                blocks
                    .create(&mat_name, Block::Matrix(&matrix_config))?
                    .to_string(),
            );

            unknown_solvers.insert(
                unknown,
                blocks
                    .create(
                        &format!("solve_{name}"),
                        Block::SolveUnknown(&SolveUnknownConfig {
                            rhs,
                            unknown_vec,
                            unknown_mat: &mat_name,
                        }),
                    )?
                    .to_string(),
            );
        }

        let laplace_mat = blocks.insert(
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
        let mass_mat = blocks.insert(
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

        let mut solved_unknowns: HashSet<String> = HashSet::new();
        for (i, equation) in system.eqs_in_solving_order().enumerate() {
            blocks.create(&format!("equation_{i}"), Block::EquationSetup(equation))?;
            for unknown in system.equation_lhs_unknowns(equation) {
                if solved_unknowns.contains(&unknown) {
                    continue;
                }
                blocks.call(
                    unknown_solvers
                        .get(&unknown)
                        .ok_or_else(|| CodeGenError::MissingSolver(unknown.clone()))?,
                    &[],
                )?;
                solved_unknowns.insert(unknown);
            }
        }

        let mut context: tera::Context = blocks.collect().into();
        context.insert("time_start", &self.time.start.seconds());
        context.insert("time_end", &self.time.end.seconds());
        context.insert("time_step", &self.time_step.seconds());

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
            main,
        } = block;
        context.insert(
            "includes",
            &includes
                .into_iter()
                .map(|s| format!("#include <{s}>"))
                .join("\n"),
        );
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
        context.insert(
            "main",
            &main.into_iter().map(|s| format!("    {s}")).join("\n"),
        );
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
    fn collect(self) -> BuildingBlock {
        let mut res = BuildingBlock::new();

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
            },
        ) in self.blocks
        {
            res.includes.extend(includes);
            res.setup.extend(setup);
            res.data.extend(data);
            res.constructor.extend(constructor);
            res.methods_defs.extend(methods_defs);
            res.methods_impls.extend(methods_impls);
            res.main.extend(main);
        }

        res
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
                Block::EquationSetup(equation) => self.factory.equation_setup(name, equation)?,
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
}
