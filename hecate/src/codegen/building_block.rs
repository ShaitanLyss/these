use std::collections::{HashMap, HashSet};

use serde::{Deserialize, Serialize};
use thiserror::Error;

use super::input_schema::mesh::{HyperCubeMesh, Mesh};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BuildingBlock {
    pub includes: HashSet<String>,
    pub data: Vec<String>,
    pub setup: Vec<String>,
}

impl BuildingBlock {
    pub fn new() -> Self {
        BuildingBlock {
            includes: HashSet::new(),
            data: Vec::new(),
            setup: Vec::new(),
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

    fn add_setup(&mut self, setup: &[&str]) {
        for line in setup {
            self.setup.push(line.to_string());
        }
    }
}

type BlockGetter<'a, T> = &'a dyn Fn(&str, &'a T) -> Result<BuildingBlock, BuildingBlockError>;

#[derive(Clone)]
pub struct BuildingBlockFactory<'a> {
    name: String,
    mesh: HashMap<String, BlockGetter<'a, dyn Mesh>>,
    // vector: Option<BuildingBlock>,
    // matrix: Option<BuildingBlock>,
}

impl<'a> BuildingBlockFactory<'a> {
    pub fn new(name: &str) -> Self {
        BuildingBlockFactory {
            name: name.to_string(),
            mesh: HashMap::new(),
            // vector: None,
            // matrix: None,
        }
    }

    pub fn add_mesh(&mut self, r#type: &str, block: BlockGetter<'a, dyn Mesh>) {
        self.mesh.insert(r#type.to_string(), block);
    }

    pub fn get_mesh(&self, name: &str, config: &'a dyn Mesh) -> Result<BuildingBlock, BuildingBlockError> {
        let r#type = config.typetag_name();
        Ok(self.mesh.get(r#type).ok_or(
            BuildingBlockError::BlockMissing(r#type.to_string(), self.name.clone()),
        )?(name, config)?)
    }
}

#[derive(Error, Debug)]
pub enum BuildingBlockError {
    #[error("block {0} missing in factory {1}")]
    BlockMissing(String, String),
    #[error("wrong input supplied to block {0}")]
    WrongInput(String),
}

pub fn deal_ii_factory<'a>() -> BuildingBlockFactory<'a> {
    let mut factory = BuildingBlockFactory::new("deal.II");

    factory.add_mesh("hyper_cube", &|name, mesh| {
        let HyperCubeMesh {
            range,
            subdivisions,
        }: &HyperCubeMesh = mesh.as_any().downcast_ref().ok_or(BuildingBlockError::WrongInput("hyper_cube".to_string()))?;

        let start = range.start.value;
        let end = range.end.value;
        let mut hyper_cube = BuildingBlock::new();

        hyper_cube.add_includes(&["deal.II/grid/grid_generator.h", "deal.II/grid/tria.h"]);
        hyper_cube.data.push(format!("Triangulation<dim> {name}"));
        hyper_cube
            .setup
            .push(format!("GridGenerator::hyper_cube({name}, {start}, {end})"));
        hyper_cube
            .setup
            .push(format!("{name}.refine_global({subdivisions})"));

        Ok(hyper_cube)
    });

    factory
}
