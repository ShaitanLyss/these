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
}

impl BuildingBlock {
    pub fn new() -> Self {
        BuildingBlock {
            includes: IndexSet::new(),
            data: Vec::new(),
            setup: Vec::new(),
            additional_names: HashSet::new(),
            constructor: Vec::new(),
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
}

type BlockGetter<'a, T> = &'a dyn Fn(&str, &T) -> Result<BuildingBlock, BuildingBlockError>;

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
}

#[derive(Clone)]
pub struct BuildingBlockFactory<'a> {
    name: String,
    mesh: HashMap<String, BlockGetter<'a, dyn Mesh>>,
    vector: Option<BlockGetter<'a, VectorConfig<'a>>>,
    matrix: Option<BlockGetter<'a, MatrixConfig<'a>>>,
    dof_handler: Option<BlockGetter<'a, DofHandlerConfig<'a>>>,
    element: Option<BlockGetter<'a, FiniteElement>>,
    sparsity_pattern: Option<BlockGetter<'a, SparsityPatternConfig<'a>>>,
    shape_matrix: Option<
        &'a dyn Fn(
            &str,
            BuildingBlock,
            &ShapeMatrixConfig,
        ) -> Result<BuildingBlock, BuildingBlockError>,
    >,
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
        }
    }

    pub fn set_vector(&mut self, block: BlockGetter<'a, VectorConfig<'a>>) {
        self.vector = Some(block);
    }

    pub fn vector<'b: 'a>(
        &self,
        name: &str,
        config: &VectorConfig<'b>,
    ) -> Result<BuildingBlock, BuildingBlockError> {
        if self.vector.is_none() {
            Err(BuildingBlockError::BlockMissing(
                "vector".to_string(),
                self.name.clone(),
            ))?
        }
        Ok(self.vector.unwrap()(name, config)?)
    }

    pub fn set_dof_handler(&mut self, block: BlockGetter<'a, DofHandlerConfig<'a>>) {
        self.dof_handler = Some(block);
    }
    pub fn dof_handler<'b: 'a>(
        &self,
        name: &str,
        config: &DofHandlerConfig<'b>,
    ) -> Result<BuildingBlock, BuildingBlockError> {
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
    ) -> Result<BuildingBlock, BuildingBlockError> {
        if self.sparsity_pattern.is_none() {
            Err(BuildingBlockError::BlockMissing(
                "sparsity_pattern".to_string(),
                self.name.clone(),
            ))?
        }
        Ok(self.sparsity_pattern.unwrap()(name, config)?)
    }

    pub fn set_sparsity_pattern(&mut self, block: BlockGetter<'a, SparsityPatternConfig<'a>>) {
        self.sparsity_pattern = Some(block);
    }

    pub fn matrix<'b: 'a>(
        &self,
        name: &str,
        config: &MatrixConfig<'b>,
    ) -> Result<BuildingBlock, BuildingBlockError> {
        if self.matrix.is_none() {
            Err(BuildingBlockError::BlockMissing(
                "matrix".to_string(),
                self.name.clone(),
            ))?
        }
        Ok(self.matrix.unwrap()(name, config)?)
    }

    pub fn set_matrix(&mut self, block: BlockGetter<'a, MatrixConfig<'a>>) {
        self.matrix = Some(block);
    }

    pub fn add_mesh(&mut self, r#type: &str, block: BlockGetter<'a, dyn Mesh>) {
        self.mesh.insert(r#type.to_string(), block);
    }

    pub fn mesh(
        &self,
        name: &str,
        config: &'a dyn Mesh,
    ) -> Result<BuildingBlock, BuildingBlockError> {
        let r#type = config.typetag_name();
        Ok(self.mesh.get(r#type).ok_or(
            BuildingBlockError::BlockMissing(r#type.to_string(), self.name.clone()),
        )?(name, config)?)
    }

    pub(crate) fn finite_element(
        &self,
        name: &str,
        element: &'a super::input_schema::FiniteElement,
    ) -> Result<BuildingBlock, BuildingBlockError> {
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
    ) -> Result<BuildingBlock, BuildingBlockError> {
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
        ) -> Result<BuildingBlock, BuildingBlockError>,
    ) {
        self.shape_matrix = Some(block);
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
