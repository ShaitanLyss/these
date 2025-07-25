use std::{
    collections::{HashMap, HashSet},
    fmt::Display,
};

mod deal_ii;
pub use deal_ii::deal_ii_factory;

use indexmap::IndexSet;
use serde::{Deserialize, Serialize};
use thiserror::Error;

use crate::codegen::input_schema::{FunctionDef, GenConfig};
use symrs::{Equation, Expr};

use super::input_schema::{FiniteElement, mesh::Mesh};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BuildingBlock {
    pub includes: IndexSet<String>,
    pub data: Vec<String>,
    pub setup: Vec<String>,
    pub additional_names: HashSet<String>,
    pub constructor: Vec<String>,
    pub methods_defs: Vec<String>,
    pub methods_impls: Vec<String>,
    pub main: Vec<String>,
    pub main_setup: Vec<String>,
    pub additional_vectors: HashSet<String>,
    pub additional_matrixes: HashSet<String>,
    pub global: Vec<String>,
    pub output: Vec<String>,
}

impl BuildingBlock {
    pub fn new() -> Self {
        BuildingBlock {
            includes: IndexSet::new(),
            data: Vec::new(),
            setup: Vec::new(),
            additional_names: HashSet::new(),
            constructor: Vec::new(),
            methods_defs: Vec::new(),
            methods_impls: Vec::new(),
            main: Vec::new(),
            main_setup: Vec::new(),
            additional_vectors: HashSet::new(),
            additional_matrixes: HashSet::new(),
            global: Vec::new(),
            output: Vec::new(),
        }
    }

    fn add_global<T: ToString>(&mut self, global: T) {
        self.global.push(global.to_string())
    }

    fn add_includes(&mut self, includes: &[&str]) {
        for include in includes {
            self.includes.insert(include.to_string());
        }
    }

    fn add_data(&mut self, data: &str) {
        self.data.push(data.to_string());
    }

    pub fn add_setup(&mut self, setup: &[&str]) {
        for line in setup {
            self.setup.push(line.to_string());
        }
    }

    pub fn push_setup<I>(&mut self, setup: I)
    where
        I: IntoIterator<Item = String>,
    {
        for line in setup {
            self.setup.push(line);
        }
    }

    fn push_data(&mut self, data: String) {
        self.data.push(data);
    }

    pub fn push_method_impl<I>(&mut self, method_impl: I)
    where
        I: IntoIterator<Item = String>,
    {
        for line in method_impl {
            self.methods_impls.push(line);
        }
    }
}

pub type BlockRes = Result<BuildingBlock, BuildingBlockError>;
type BlockGetter<'a, T> = &'a dyn Fn(&str, &T, &GenConfig) -> BlockRes;
macro_rules! block_getter {
    ($t:ty) => {
        &'a dyn Fn(&str, &$t, &GenConfig) -> BlockRes
    }
}
macro_rules! block_getter_no_context {
    ($t:ty) => {
        &'a dyn Fn(&str, &$t) -> BlockRes
    };
}

macro_rules! block_accessers {
    ($name:ident, $setter:ident, $config:ty) => {
        pub fn $setter(&mut self, block: block_getter!($config)) {
            self.$name = Some(block);
        }

        pub fn $name(&self, name: &str, config: &$config, gen_config: &GenConfig) -> BlockRes {
            if self.$name.is_none() {
                Err(BuildingBlockError::BlockMissing(
                    stringify!($name).to_string(),
                    self.name.clone(),
                ))?
            }
            Ok(self.$name.unwrap()(name, config, gen_config)?)
        }
    };
}

pub struct VectorConfig<'a> {
    pub dof_handler: &'a str,
    pub is_unknown: bool,
}

pub struct MatrixConfig<'a> {
    pub sparsity_pattern: &'a str,
    // pub is_unknown: bool
    pub dof_handler: &'a str,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ShapeMatrix {
    Laplace,
    Mass,
}

impl Display for ShapeMatrix {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let s = format!("{self:?}");
        write!(f, "{}", s.to_lowercase())
    }
}

pub struct ShapeMatrixConfig<'a> {
    pub dof_handler: &'a str,
    pub element: &'a str,
    pub matrix_config: &'a MatrixConfig<'a>,
    pub kind: ShapeMatrix,
}

pub struct DofHandlerConfig<'a> {
    pub mesh: &'a str,
    pub element: &'a str,
}

pub struct SparsityPatternConfig<'a> {
    pub dof_handler: &'a str,
}

pub struct InitialConditionConfig<'a> {
    pub dof_handler: &'a str,
    pub function: &'a str,
    pub element: &'a str,
    pub target: &'a str,
}

#[derive(Clone)]
pub enum Block<'a> {
    Matrix(&'a MatrixConfig<'a>),
    Vector(&'a VectorConfig<'a>),
    SolveUnknown(&'a SolveUnknownConfig<'a>),
    EquationSetup(&'a EquationSetupConfig<'a>),
    Parameter(f64),
    Function(&'a FunctionDef),
    AppyBoundaryCondition(&'a ApplyBoundaryConditionConfig<'a>),
    InitialCondition(&'a InitialConditionConfig<'a>),
}

pub struct SolveUnknownConfig<'a> {
    pub dof_handler: &'a str,
    pub rhs: &'a str,
    pub unknown_vec: &'a str,
    pub unknown_mat: &'a str,
}

pub struct EquationSetupConfig<'a> {
    pub equation: &'a Equation,
    pub unknown: &'a dyn Expr,
    pub vectors: &'a [&'a dyn Expr],
    pub matrixes: &'a [&'a dyn Expr],
}

pub struct VectorFromFnConfig<'a> {
    pub function: &'a str,
    pub dof_handler: &'a str,
    pub element: &'a str,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum TargetIteration {
    Next,
    Current,
    Previous,
}

pub struct ApplyBoundaryConditionConfig<'a> {
    pub function: &'a str,
    pub dof_handler: &'a str,
    pub matrix: &'a str,
    pub solution: &'a str,
    pub rhs: &'a str,
}

#[derive(Clone)]
pub struct BuildingBlockFactory<'a> {
    name: String,
    mesh: HashMap<String, BlockGetter<'a, dyn Mesh>>,
    vector: Option<block_getter!(VectorConfig)>,
    matrix: Option<block_getter!(MatrixConfig)>,
    dof_handler: Option<block_getter!(DofHandlerConfig)>,
    finite_element: Option<block_getter!(FiniteElement)>,
    sparsity_pattern: Option<block_getter!(SparsityPatternConfig)>,
    shape_matrix: Option<&'a dyn Fn(&str, BuildingBlock, &ShapeMatrixConfig) -> BlockRes>,
    solve_unknown: Option<block_getter!(SolveUnknownConfig)>,
    equation_setup: Option<block_getter!(EquationSetupConfig)>,
    call: Option<block_getter_no_context!([&str])>,
    parameter: Option<block_getter!(f64)>,
    function: Option<block_getter!(FunctionDef)>,
    vector_from_function: Option<block_getter!(VectorFromFnConfig)>,
    apply_boundary_condition: Option<block_getter!(ApplyBoundaryConditionConfig)>,
    initial_condition: Option<block_getter!(InitialConditionConfig)>,
    add_vector_output: Option<block_getter!(str)>,
}

impl<'a> BuildingBlockFactory<'a> {
    pub fn new(name: &str) -> Self {
        BuildingBlockFactory {
            name: name.to_string(),
            mesh: HashMap::new(),
            vector: None,
            matrix: None,
            dof_handler: None,
            finite_element: None,
            sparsity_pattern: None,
            shape_matrix: None,
            solve_unknown: None,
            equation_setup: None,
            call: Some(&|name, args| {
                let mut block = BuildingBlock::new();
                block.main.push(format!("{}({});", name, args.join(", ")));

                Ok(block)
            }),
            parameter: None,
            function: None,
            vector_from_function: None,
            apply_boundary_condition: None,
            initial_condition: None,
            add_vector_output: None,
        }
    }

    block_accessers!(vector, set_vector, VectorConfig);
    block_accessers!(dof_handler, set_dof_handler, DofHandlerConfig);
    block_accessers!(
        sparsity_pattern,
        set_sparsity_pattern,
        SparsityPatternConfig
    );
    block_accessers!(
        vector_from_function,
        set_vector_from_function,
        VectorFromFnConfig
    );
    block_accessers!(
        apply_boundary_condition,
        set_apply_boundary_condition,
        ApplyBoundaryConditionConfig
    );
    block_accessers!(
        initial_condition,
        set_initial_condition,
        InitialConditionConfig
    );
    block_accessers!(add_vector_output, set_add_vector_output, str);

    block_accessers!(matrix, set_matrix, MatrixConfig);

    pub fn add_mesh(&mut self, r#type: &str, block: BlockGetter<'a, dyn Mesh>) {
        self.mesh.insert(r#type.to_string(), block);
    }

    pub fn mesh(&self, name: &str, config: &'a dyn Mesh, gen_config: &GenConfig) -> BlockRes {
        let r#type = config.typetag_name();
        Ok(self.mesh.get(r#type).ok_or(
            BuildingBlockError::BlockMissing(r#type.to_string(), self.name.clone()),
        )?(name, config, gen_config)?)
    }

    block_accessers!(finite_element, set_finite_element, FiniteElement);

    pub fn shape_matrix<'b: 'a>(
        &self,
        name: &str,
        config: &ShapeMatrixConfig<'b>,
        gen_config: &GenConfig,
    ) -> BlockRes {
        if self.shape_matrix.is_none() {
            Err(BuildingBlockError::BlockMissing(
                "shape_matrix".to_string(),
                self.name.clone(),
            ))?
        }
        let matrix = self.matrix(name, &config.matrix_config, gen_config)?;
        Ok(self.shape_matrix.unwrap()(name, matrix, config)?)
    }

    pub fn set_shape_matrix(
        &mut self,
        block: &'a dyn Fn(&str, BuildingBlock, &ShapeMatrixConfig) -> BlockRes,
    ) {
        self.shape_matrix = Some(block);
    }

    block_accessers!(solve_unknown, set_solve_unknown, SolveUnknownConfig);
    block_accessers!(equation_setup, set_equation_setup, EquationSetupConfig);

    pub fn call(&self, name: &str, args: &[&str]) -> BlockRes {
        if self.call.is_none() {
            Err(BuildingBlockError::BlockMissing(
                "call".to_string(),
                self.name.clone(),
            ))?
        }
        Ok(self.call.unwrap()(name, args)?)
    }

    pub fn set_call(&mut self, block: block_getter_no_context!([&str])) {
        self.call = Some(block);
    }

    pub(crate) fn newline(&self) -> BuildingBlock {
        let mut block = BuildingBlock::new();
        block.main.push("\n".to_string());
        block
    }

    block_accessers!(parameter, set_parameter, f64);

    pub(crate) fn comment(&self, content: &str) -> BuildingBlock {
        let mut block = BuildingBlock::new();
        block.main.push(format!("// {}", content));
        block
    }

    block_accessers!(function, set_function, FunctionDef);
}

#[derive(Error, Debug)]
pub enum BuildingBlockError {
    #[error("block '{0}' missing in factory '{1}'")]
    BlockMissing(String, String),
    #[error("wrong input supplied to block {0}")]
    WrongInput(String),
    #[error("block {0} already exists")]
    BlockAlreadyExists(String),
    #[error("name {0} already exists")]
    NameAlreadyExists(String),
    #[error("failed to generate expression code")]
    ExprCodeGen(#[from] ExprCodeGenError),
}

#[derive(Error, Debug)]
pub enum ExprCodeGenError {
    #[error("too many vectors in expr: {0}")]
    TooManyVectors(Box<dyn Expr>),
    #[error("too many matrixes in expr: {0}")]
    TooManyMatrixes(Box<dyn Expr>),
    #[error("unsupported expr: {0}")]
    UnsupportedExpr(Box<dyn Expr>),
    #[error("unsupported operand in multiplication: {0}")]
    UnsupportedMulOperand(Box<dyn Expr>),
    #[error("can't multiply two vectors")]
    VectorMul,
    #[error("operations resulted in a matrix when a vector was expected")]
    MatResult,
    #[error("operations resulted in a vector when a matrix was expected")]
    VecResult,
    #[error("unsupported equation : {reason}\nequation: {equation}")]
    UnsupportedEquation { reason: String, equation: Equation },
}
