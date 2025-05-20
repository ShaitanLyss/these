use dyn_clone::DynClone;
use serde::{Deserialize, Serialize};
use uom::si::f64::Length;

use super::range::Range;

#[typetag::serde(tag = "type")]
pub trait Mesh: std::fmt::Debug + DynClone {}

dyn_clone::clone_trait_object!(Mesh);

#[derive(Debug, Clone, Serialize, Deserialize)]
struct HyperCubeMesh {
    range: Range<Length>,
    subdivisions: usize,
}

#[typetag::serde(name = "hyper_cube")]
impl Mesh for HyperCubeMesh {}
