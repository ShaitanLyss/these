use indexmap::IndexMap;
use itertools::Itertools;
use lazy_static::lazy_static;
use std::collections::{HashMap, HashSet};
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
use tera::Tera;
use thiserror::Error;

use crate::{
    Equation, Expr, Func, Symbol, System, codegen::building_block::deal_ii_factory, symbol,
};

#[typetag::serde(tag = "type")]
pub trait QuantityTrait: DynClone + Debug {}

dyn_clone::clone_trait_object!(QuantityTrait);

use uom::si::f64 as si;

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

#[derive(Error, Debug)]
pub enum CodeGenError {
    #[error("failed to construct a block")]
    BlockError(#[from] BuildingBlockError),
    #[error("templating error: {0}")]
    TemplatingError(#[from] tera::Error),
}

lazy_static! {
    pub static ref TEMPLATES: Tera = {
        let mut tera = Tera::default();
        match tera.add_raw_template(
            "cpp_source",
            include_str!("./input_schema/cpp_source_template.cpp"),
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
        let mut blocks = BuildingBlockCollector::new();

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

        // let laplace_mat = blocks.insert(
        //     "laplace_mat",
        //     factory.matrix("laplace_mat", &MatrixConfig { sparsity_pattern })?,
        // )?;
        // let mass_mat = blocks.insert(
        //     "mass_mat",
        //     factory.matrix("mass_mat", &MatrixConfig { sparsity_pattern })?,
        // )?;

        let context: tera::Context = (blocks.collect()).into();

        Ok(TEMPLATES.render("cpp_source", &context)?)
    }
}

#[derive(Debug, Clone)]
struct BuildingBlockCollector {
    blocks: IndexMap<String, BuildingBlock>,
    additional_names: HashSet<String>,
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
        context
    }
}

pub fn to_cpp_lines<Lines: IntoIterator<Item = String>>(prefix: &str, lines: Lines) -> String {
    lines
        .into_iter()
        .map(|s| format!("{prefix}{s};"))
        .join("\n")
}

impl BuildingBlockCollector {
    fn new() -> Self {
        BuildingBlockCollector {
            blocks: IndexMap::new(),
            additional_names: HashSet::new(),
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

        for (_, BuildingBlock { includes, data, setup, additional_names: _, constructor }) in self.blocks {
            res.includes.extend(includes);
            res.setup.extend(setup);
            res.data.extend(data);
            res.constructor.extend(constructor);
        }

        res
    }
}
