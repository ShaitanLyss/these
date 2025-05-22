use std::{
    collections::{HashMap, HashSet},
    fmt::Display,
};

mod deal_ii;
pub use deal_ii::deal_ii_factory;

use indexmap::IndexSet;
use serde::{Deserialize, Serialize};
use thiserror::Error;

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
        }
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

type BlockRes = Result<BuildingBlock, BuildingBlockError>;
type BlockGetter<'a, T> = &'a dyn Fn(&str, &T) -> BlockRes;
macro_rules! block_getter {
    ($t:ty) => {
        &'a dyn Fn(&str, &$t) -> BlockRes
    }
}

pub struct VectorConfig<'a> {
    pub dof_handler: &'a str,
}

pub struct MatrixConfig<'a> {
    pub sparsity_pattern: &'a str,
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

#[derive(Clone)]
pub enum Block<'a> {
    Matrix(&'a MatrixConfig<'a>),
    Vector(&'a VectorConfig<'a>),
    SolveUnknown(&'a SolveUnknownConfig<'a>),
}

pub struct SolveUnknownConfig<'a> {
    pub rhs: &'a str,
    pub unknown_vec: &'a str,
    pub unknown_mat: &'a str,
}

#[derive(Clone)]
pub struct BuildingBlockFactory<'a> {
    name: String,
    mesh: HashMap<String, BlockGetter<'a, dyn Mesh>>,
    vector: Option<block_getter!(VectorConfig)>,
    matrix: Option<block_getter!(MatrixConfig)>,
    dof_handler: Option<block_getter!(DofHandlerConfig)>,
    element: Option<block_getter!(FiniteElement)>,
    sparsity_pattern: Option<block_getter!(SparsityPatternConfig)>,
    shape_matrix: Option<
        &'a dyn Fn(
            &str,
            BuildingBlock,
            &ShapeMatrixConfig,
        ) -> BlockRes,
    >,
    solve_unknown: Option<block_getter!(SolveUnknownConfig)>,
}

impl<'a> BuildingBlockFactory<'a> {
    pub fn new(name: &str) -> Self {
        BuildingBlockFactory {
            name: name.to_string(),
            mesh: HashMap::new(),
            vector: None,
            matrix: None,
            dof_handler: None,
            element: None,
            sparsity_pattern: None,
            shape_matrix: None,
            solve_unknown: None,
        }
    }

    pub fn set_vector(&mut self, block: block_getter!(VectorConfig)) {
        self.vector = Some(block);
    }

    pub fn vector<'b: 'a>(
        &self,
        name: &str,
        config: &VectorConfig<'b>,
    ) -> BlockRes {
        if self.vector.is_none() {
            Err(BuildingBlockError::BlockMissing(
                "vector".to_string(),
                self.name.clone(),
            ))?
        }
        Ok(self.vector.unwrap()(name, config)?)
    }

    pub fn set_dof_handler(&mut self, block: block_getter!(DofHandlerConfig)) {
        self.dof_handler = Some(block);
    }
    pub fn dof_handler<'b: 'a>(
        &self,
        name: &str,
        config: &DofHandlerConfig<'b>,
    ) -> BlockRes {
        if self.dof_handler.is_none() {
            Err(BuildingBlockError::BlockMissing(
                "dof_handler".to_string(),
                self.name.clone(),
            ))?
        }
        Ok(self.dof_handler.unwrap()(name, config)?)
    }

    pub fn sparsity_pattern<'b: 'a>(
        &self,
        name: &str,
        config: &SparsityPatternConfig<'b>,
    ) -> BlockRes {
        if self.sparsity_pattern.is_none() {
            Err(BuildingBlockError::BlockMissing(
                "sparsity_pattern".to_string(),
                self.name.clone(),
            ))?
        }
        Ok(self.sparsity_pattern.unwrap()(name, config)?)
    }

    pub fn set_sparsity_pattern(&mut self, block: block_getter!(SparsityPatternConfig)) {
        self.sparsity_pattern = Some(block);
    }

    pub fn matrix(
        &self,
        name: &str,
        config: &MatrixConfig<'_>,
    ) -> BlockRes {
        if self.matrix.is_none() {
            Err(BuildingBlockError::BlockMissing(
                "matrix".to_string(),
                self.name.clone(),
            ))?
        }
        Ok(self.matrix.unwrap()(name, config)?)
    }

    pub fn set_matrix(&mut self, block: block_getter!(MatrixConfig)) {
        self.matrix = Some(block);
    }

    pub fn add_mesh(&mut self, r#type: &str, block: BlockGetter<'a, dyn Mesh>) {
        self.mesh.insert(r#type.to_string(), block);
    }

    pub fn mesh(
        &self,
        name: &str,
        config: &'a dyn Mesh,
    ) -> BlockRes {
        let r#type = config.typetag_name();
        Ok(self.mesh.get(r#type).ok_or(
            BuildingBlockError::BlockMissing(r#type.to_string(), self.name.clone()),
        )?(name, config)?)
    }

    pub(crate) fn finite_element(
        &self,
        name: &str,
        element: &'a super::input_schema::FiniteElement,
    ) -> BlockRes {
        if self.element.is_none() {
            Err(BuildingBlockError::BlockMissing(
                "finite element".to_string(),
                self.name.clone(),
            ))?
        }
        Ok(self.element.unwrap()(name, element)?)
    }

    fn set_finite_element(&mut self, block: BlockGetter<'a, FiniteElement>) {
        self.element = Some(block);
    }

    pub fn shape_matrix<'b: 'a>(
        &self,
        name: &str,
        config: &ShapeMatrixConfig<'b>,
    ) -> BlockRes {
        if self.shape_matrix.is_none() {
            Err(BuildingBlockError::BlockMissing(
                "shape_matrix".to_string(),
                self.name.clone(),
            ))?
        }
        let matrix = self.matrix(name, &config.matrix_config)?;
        Ok(self.shape_matrix.unwrap()(name, matrix, config)?)
    }

    pub fn set_shape_matrix(
        &mut self,
        block: &'a dyn Fn(
            &str,
            BuildingBlock,
            &ShapeMatrixConfig,
        ) -> BlockRes,
    ) {
        self.shape_matrix = Some(block);
    }

    pub fn solve_unknown(
        &self,
        name: &str,
        config: &SolveUnknownConfig,
    ) -> BlockRes {
        if self.solve_unknown.is_none() {
            Err(BuildingBlockError::BlockMissing(
                "solve_unknown".to_string(),
                self.name.clone(),
            ))?
        }
        Ok(self.solve_unknown.unwrap()(name, config)?)
    }

    pub fn set_solve_unknown(&mut self, block: block_getter!(SolveUnknownConfig)) {
        self.solve_unknown = Some(block);
    }
}

#[derive(Error, Debug)]
pub enum BuildingBlockError {
    #[error("block {0} missing in factory {1}")]
    BlockMissing(String, String),
    #[error("wrong input supplied to block {0}")]
    WrongInput(String),
    #[error("block {0} already exists")]
    BlockAlreadyExists(String),
    #[error("name {0} already exists")]
    NameAlreadyExists(String),
}
