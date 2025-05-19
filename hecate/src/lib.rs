#![allow(non_upper_case_globals)]
#![allow(non_camel_case_types)]
#![allow(non_snake_case)]

pub mod symbolic;
pub use symbolic::*;
pub mod js;

include!(concat!(env!("OUT_DIR"), "/bindings.rs"));

use serde::{Deserialize, Serialize};

use derive_alias::derive_alias;

derive_alias! {
    derive_schema => #[derive(Serialize, Deserialize, PartialEq, PartialOrd)]
}

derive_schema! {
pub enum Mesh {

}
}

derive_schema! {
    pub struct NumericalScheme {

    }
}
