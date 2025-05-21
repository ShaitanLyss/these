use std::any::Any;

use dyn_clone::DynClone;
use serde::{Deserialize, Serialize};
use uom::si::f64::Length;

use super::range::Range;

#[typetag::serde(tag = "type")]
pub trait Mesh: std::fmt::Debug + DynClone + Any {
    fn get_ref(&self) -> &dyn Mesh;

    fn as_any(&self) -> &dyn Any {
        self.get_ref() as &dyn Any
    }
}

dyn_clone::clone_trait_object!(Mesh);

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct HyperCubeMesh {
    pub range: Range<Length>,
    pub subdivisions: usize,
}

#[typetag::serde(name = "hyper_cube")]
impl Mesh for HyperCubeMesh {
    fn get_ref(&self) -> &dyn Mesh {
        self as &dyn Mesh
    }
}
