use std::any::Any;

use dyn_clone::DynClone;
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use crate::codegen::input_schema::quantity::Length;

use super::range::Range;

#[typetag::serde(tag = "type")]
pub trait Mesh: std::fmt::Debug + DynClone + Any {
    fn get_ref(&self) -> &dyn Mesh;

    fn as_any(&self) -> &dyn Any {
        self.get_ref() as &dyn Any
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(tag = "type")]
pub enum MeshEnum {
    #[serde(rename = "hyper_cube")]
    HyperCube(HyperCubeMesh),
}

impl MeshEnum {
    pub fn get_ref(&self) -> &dyn Mesh {
        match self {
            MeshEnum::HyperCube(m) => m.get_ref(),
        }
    }
}

dyn_clone::clone_trait_object!(Mesh);

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(default)]
pub struct HyperCubeMesh {
    pub range: Range<Length>,
    /// Number of subdivisions
    /// Set a reasonable number because each subdivision multiplies by 2
    /// the number of cells (50 means 2^50 cells)
    pub subdivisions: usize,
    pub show_info: bool,
}

impl Default for HyperCubeMesh {
    fn default() -> Self {
        HyperCubeMesh {
            range: "0 m .. 1 m".parse().unwrap(),
            subdivisions: 5,
            show_info: false,
        }
    }
}

#[typetag::serde(name = "hyper_cube")]
impl Mesh for HyperCubeMesh {
    fn get_ref(&self) -> &dyn Mesh {
        self as &dyn Mesh
    }
}
