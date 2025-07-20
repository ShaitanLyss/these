#![allow(non_upper_case_globals)]
#![allow(non_camel_case_types)]
#![allow(non_snake_case)]

pub use codegen::input_schema::CodeGenError;
pub use codegen::input_schema::IndexMap;
pub use codegen::input_schema::SchemaValidationError;
#[cfg(target_family = "wasm")]
use codegen::input_schema::InputSchema;
use schemars::schema_for;
pub mod codegen;
#[cfg(all(feature = "js", not(target_arch = "wasm32")))]
pub mod js;
pub use codegen::BuildingBlock;
pub use std::error::Error as StdError;
#[cfg(target_family = "wasm")]
use wasm_bindgen::prelude::*;

pub use crate::codegen::input_schema::InputSchema;

#[cfg(all(feature = "cpp", not(target_family = "wasm")))]
include!(concat!(env!("OUT_DIR"), "/bindings.rs"));

// use derive_alias::derive_alias;
//
// derive_alias! {
//     derive_schema => #[derive(Serialize, Deserialize, PartialEq, PartialOrd)]
// }

#[cfg(all(target_family = "wasm", feature = "cpp"))]
unsafe extern "C" {
    fn __wasm_call_ctors();
}

#[cfg(target_family = "wasm")]
#[wasm_bindgen(start)]
pub fn start() {
    #[cfg(target_family = "wasm")]
    unsafe {
        __wasm_call_ctors();
    }
}

pub fn format_err<E: StdError + Sync + Send + 'static>(err: E) -> String {
    let err = anyhow::Error::from(err);
    format!("Error: {err:?}")
}

pub fn input_schema_json_schema() -> String {
    schema_for!(InputSchema).to_value().to_string()
}

#[cfg(target_family = "wasm")]
#[wasm_bindgen]
pub fn code_gen_from_yaml(schema_yaml: &str) -> Result<String, String> {
    let schema = InputSchema::from_yaml(schema_yaml).map_err(format_err)?;
    schema.generate_cpp_sources().map_err(format_err)
}

#[cfg(target_arch = "wasm32")]
pub mod wasm_api {
    use wasm_bindgen::prelude::*;

    #[wasm_bindgen]
    pub fn sum(a: i32, b: i32) -> i32 {
        a + b
    }
}

// derive_schema! {
// pub enum Mesh {
//
// }
// }
//
// derive_schema! {
//     pub struct NumericalScheme {
//
//     }
// }
