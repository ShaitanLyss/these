use lazy_static::lazy_static;

use crate::Symbol;

use super::expr::Expr;

lazy_static! {
    pub static ref x: Box<dyn Expr> = Symbol::new_box("x");
    pub static ref y: Box<dyn Expr> = Symbol::new_box("y");
    pub static ref z: Box<dyn Expr> = Symbol::new_box("z");
    pub static ref u: Box<dyn Expr> = Symbol::new_box("u");
    pub static ref t: Box<dyn Expr> = Symbol::new_box("t");
    pub static ref nabla: Box<dyn Expr> = Symbol::new_box("nabla");
    pub static ref c: Box<dyn Expr> = Symbol::new_box("c");
    pub static ref laplacian: Box<dyn Expr> = Symbol::new_box("laplacian");
}
