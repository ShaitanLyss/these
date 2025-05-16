use crate::symbolic::{Integer, KnownExpr};

use super::{Arg, Expr};

#[derive(Clone)]
pub struct Pow {
    base: Box<dyn Expr>,
    exponent: Box<dyn Expr>,
}

impl Expr for Pow {
    fn for_each_arg(&self, f: &mut dyn FnMut(&dyn Arg) -> ()) {
        f(&*self.base);
        f(&*self.exponent)
        
    }

    fn from_args(&self, args: Vec<Box<dyn Arg>>) -> Box<dyn Expr> {
        Box::new(Pow {
            base: args[0].clone().into(),
            exponent: args[1].clone().into(),
        })
    }

    fn clone_box(&self) -> Box<dyn Expr> {
        Box::new(self.clone())
    }

    fn str(&self) -> String {
        match KnownExpr::from_expr_box(&self.exponent) {
            KnownExpr::Integer(Integer { value: -1 }) => format!(" / {}", self.base.str()),

            _ => format!("{}^{}", self.base.str(), self.exponent.str()),

        }
    }
}

impl Pow {
    pub fn new(base: &Box<dyn Expr>, exponent: &Box<dyn Expr>) -> Box<dyn Expr> {
        Box::new(Pow {
            base: base.clone(),
            exponent: exponent.clone(),
        })
    }
}
