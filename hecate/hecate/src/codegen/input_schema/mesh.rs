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
#[serde(rename_all = "snake_case")]
pub enum MeshEnum {
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

    /// # Resolution
    /// The size of each cell.
    pub resolution: Length,
    pub show_info: bool,
}

impl Default for HyperCubeMesh {
    fn default() -> Self {
        HyperCubeMesh {
            range: "0 m .. 1 m".parse().unwrap(),
            resolution: "0.03125 m".parse().expect("valid length"),
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
