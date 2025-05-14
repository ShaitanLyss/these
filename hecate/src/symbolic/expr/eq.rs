use std::fmt;

use super::{Arg, Expr};


#[derive(Clone)]
pub struct Eq {
    lhs: Box<dyn Expr>,
    rhs: Box<dyn Expr>,
}

impl fmt::Debug for Eq {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        // write!(f, "{}\n{}", self.str(), self.srepr())
        write!(f, "{}", self.str())
    }
}

impl Eq {
    pub fn into_new(lhs: &Box<dyn Expr>, rhs: &Box<dyn Expr>) -> Eq {
        Eq {
            lhs: lhs.clone(),
            rhs: rhs.clone(),
        }
    }

    pub fn new(lhs: &dyn Expr, rhs: &dyn Expr) -> Eq {
        Eq {
            lhs: lhs.clone_box(),
            rhs: rhs.clone_box(),
        }
    }
}

impl Expr for Eq {
    fn args(&self) -> Vec<Box<dyn Arg>> {
        vec![self.lhs.clone().into(), self.rhs.clone().into()]
    }

    fn from_args(&self, args: Vec<Box<dyn Arg>>) -> Box<dyn Expr> {
        Box::new(Eq {
            lhs: args[0].clone().into(),
            rhs: args[1].clone().into(),
        })
    }

    fn clone_box(&self) -> Box<dyn Expr> {
        Box::new(self.clone())
    }

    fn str(&self) -> String {
        format!("{} = {}", self.lhs.str(), self.rhs.str())
    }
}
