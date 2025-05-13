use lazy_static::lazy_static;

use crate::symbolic::Symbol;

use super::expr::Expr;

lazy_static! {
    pub static ref x: Box<dyn Expr> = Symbol::new("x");

    pub static ref y: Box<dyn Expr> = Symbol::new("y");

    pub static ref z: Box<dyn Expr> = Symbol::new("z");

    pub static ref u: Box<dyn Expr> = Symbol::new("u");

    pub static ref t: Box<dyn Expr> = Symbol::new("t");

    pub static ref nabla: Box<dyn Expr> = Symbol::new("nabla");

    pub static ref c: Box<dyn Expr> = Symbol::new("c");

    pub static ref laplacian: Box<dyn Expr> = Symbol::new("laplacian");
}
