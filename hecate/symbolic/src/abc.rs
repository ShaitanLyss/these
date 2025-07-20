#![allow(non_upper_case_globals)]
use std::sync::LazyLock;

use crate::{BoxExpr, Symbol};


pub static x: LazyLock<BoxExpr> = LazyLock::new(|| Symbol::new_box("x"));
pub static y: LazyLock<BoxExpr> = LazyLock::new(|| Symbol::new_box("y"));
pub static z: LazyLock<BoxExpr> = LazyLock::new(|| Symbol::new_box("z"));
pub static u: LazyLock<BoxExpr> = LazyLock::new(|| Symbol::new_box("u"));
pub static t: LazyLock<BoxExpr> = LazyLock::new(|| Symbol::new_box("t"));
pub static nabla: LazyLock<BoxExpr> = LazyLock::new(|| Symbol::new_box("nabla"));
pub static c: LazyLock<BoxExpr> = LazyLock::new(|| Symbol::new_box("c"));
pub static laplacian: LazyLock<BoxExpr> = LazyLock::new(|| Symbol::new_box("laplacian"));

