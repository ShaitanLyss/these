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
        } else {
            KnownExpr::Unknown
        }
    }
}

#[derive(Clone)]
pub struct Integer {
    value: isize,
}

impl Expr for Integer {
    fn is_one(&self) -> bool {
        self.value == 1
    }
    
    fn is_zero(&self) -> bool {
        self.value == 0
    }

    fn for_each_arg(&self, f: &mut dyn FnMut(&dyn Arg) -> ()) {
        f(&self.value);
    }

    fn from_args(&self, args: Vec<Box<dyn Arg>>) -> Box<dyn Expr> {
        let val = (&*args[0]) as &dyn Any;
        Box::new(Integer {
            value: val
                .downcast_ref::<isize>()
                .expect(&format!("{}", &type_name_of_val(args[0].as_any())))
                .clone(),
        })
    }

    fn clone_box(&self) -> Box<dyn Expr> {
        Box::new(self.clone())
    }

    fn str(&self) -> String {
        self.value.to_string()
    }
}

impl Integer {
    pub fn new_box(value: isize) -> Box<dyn Expr> {
        Box::new(Integer { value })
    }

    pub fn new(value: isize) -> Self {
        Integer { value }
    }
}

impl<E: Expr> std::ops::Mul<&E> for &Integer {
    type Output = Box<dyn Expr>;

    fn mul(self, rhs: &E) -> Self::Output {
        (self as &dyn Expr) * rhs
    }
}
