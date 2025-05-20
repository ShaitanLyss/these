use std::collections::HashMap;
use std::fmt::Debug;
pub trait RawRepr {
    fn raw(&self) -> &str;
}

pub mod mesh;
mod quantity;
mod range;
mod reference;
mod unit;

use dyn_clone::DynClone;
use quantity::{RANGE_PATTERN, Time};

use mesh::Mesh;
use range::Range;
use serde::{Deserialize, Serialize};

use crate::{Equation, Expr, Func, Symbol, System, expr, symbol};

#[typetag::serde(tag = "type")]
pub trait QuantityTrait: DynClone + Debug {}

dyn_clone::clone_trait_object!(QuantityTrait);

use uom::si::f64 as si;

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
    // pub finite_elements: HashMap<String, String>,
    pub parameters: HashMap<String, Box<dyn QuantityTrait>>,
    pub unknowns: HashMap<String, Unknown>,
    pub functions: HashMap<String, String>,
    pub solve: Solve,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Unknown {
    pub initial: String,
    pub boundary: String,
    pub derivative: Option<Box<Unknown>>,
}

impl InputSchema {
    pub fn generate_cpp_sources(&self) -> String {
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

        println!("{system}");

        String::new()
    }
}
