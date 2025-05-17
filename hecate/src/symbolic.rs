use std::{
    any::{Any, type_name_of_val},
    fmt,
};

pub mod abc;
pub mod expr;
pub mod system;
pub use expr::*;
pub use system::System;

pub enum KnownExpr<'a> {
    Add(&'a Add),
    Mul(&'a Mul),
    Pow(&'a Pow),
    Integer(&'a Integer),
    Symbol(&'a Symbol),
    Integral(&'a Integral),
    Rational(&'a Rational),
    Eq(&'a Eq),
    Unknown,
}

impl<'a> KnownExpr<'a> {
    pub fn from_expr_box(expr: &Box<dyn Expr>) -> KnownExpr {
        KnownExpr::from_expr(&**expr)
    }

    pub fn from_expr(expr: &dyn Expr) -> KnownExpr {
        let expr = (&*expr) as &dyn Any;
        if expr.is::<Add>() {
            KnownExpr::Add(expr.downcast_ref::<Add>().unwrap())
        } else if expr.is::<Mul>() {
            KnownExpr::Mul(expr.downcast_ref::<Mul>().unwrap())
        } else if expr.is::<Pow>() {
            KnownExpr::Pow(expr.downcast_ref::<Pow>().unwrap())
        } else if expr.is::<Integer>() {
            KnownExpr::Integer(expr.downcast_ref::<Integer>().unwrap())
        } else if expr.is::<Symbol>() {
            KnownExpr::Symbol(expr.downcast_ref::<Symbol>().unwrap())
        } else if let Some(integral) = expr.downcast_ref::<Integral>() {
            KnownExpr::Integral(integral)
        } else if let Some(eq) = expr.downcast_ref::<Eq>() {
            KnownExpr::Eq(eq)
        } else if let Some(rational) = expr.downcast_ref::<Rational>() {
            KnownExpr::Rational(rational)
        } else {
            KnownExpr::Unknown
        }
    }
}
