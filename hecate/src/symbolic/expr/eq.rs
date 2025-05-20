use std::fmt;

use serde::{Deserialize, Serialize};
use thiserror::Error;

use super::{ops::ParseError, *};

#[derive(Clone)]
pub struct Eq {
    pub lhs: Box<dyn Expr>,
    pub rhs: Box<dyn Expr>,
}

impl Serialize for Eq {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(&self.str())
    }
}

struct ExprDeserializeVisitor;


#[derive(Error, Debug)]
pub enum Error {
    #[error("{0}")]
    Message(String),
    #[error("parsed expression is not an equation")]
    NotAnEquation,
    #[error("{0}")]
    FailedParsing(#[from] ParseError)

}


impl<'de> serde::de::Visitor<'de> for ExprDeserializeVisitor {
    type Value = Eq;

    fn expecting(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
        formatter.write_str("a properly written equation")
    }

    fn visit_str<E>(self, v: &str) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        Eq::from_str(v).map_err(|e| E::custom(e.to_string()))
    }
}

impl<'de> Deserialize<'de> for Eq {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_str(ExprDeserializeVisitor)
    }
}

impl fmt::Debug for Eq {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}\n{}", self.str(), self.srepr())
        // write!(f, "{}", self.str())
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

    pub fn new_box(lhs: Box<dyn Expr>, rhs: Box<dyn Expr>) -> Box<dyn Expr> {
        Box::new(Eq { lhs, rhs })
    }

    pub fn from_str(s: &str) -> Result<Eq, Error> {
        ops::parse_expr(s)?.as_eq().ok_or(Error::NotAnEquation)
    }
}

impl Expr for Eq {
    fn get_ref<'a>(&'a self) -> &'a dyn Expr {
        self as &dyn Expr
    }
    fn for_each_arg(&self, f: &mut dyn FnMut(&dyn Arg) -> ()) {
        f(&*self.lhs);
        f(&*self.rhs);
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

impl std::ops::SubAssign<&dyn Expr> for Eq {
    fn sub_assign(&mut self, rhs: &dyn Expr) {
        self.lhs -= rhs;
        self.rhs -= rhs;
    }
}

impl std::ops::DivAssign<&dyn Expr> for Eq {
    fn div_assign(&mut self, rhs: &dyn Expr) {
        self.lhs /= rhs;
        self.rhs /= rhs;
    }
}

impl std::cmp::PartialEq for Eq {
    fn eq(&self, other: &Self) -> bool {
        &self.lhs == &other.lhs && &self.rhs == &other.rhs
    }
}

impl Eq {
    // - Expand all terms containing solved symbols
    // - Move them to the left
    // - Others to the right
    // - Factorize
    // - Divide by factor of seeked symbol
    pub fn solve<'a, S: IntoIterator<Item = &'a dyn Expr>>(&self, exprs: S) -> Eq {
        let eq = (self.expand()).as_eq().expect("Should remain an eqation");

        let symbols: Vec<_> = exprs.into_iter().collect();

        let move_right: Vec<_> = eq
            .lhs
            .terms()
            .filter(|e| symbols.iter().all(|s| !e.has(s.get_ref())))
            .collect();
        let move_left: Vec<_> = eq
            .rhs
            .terms()
            .filter(|e| symbols.iter().any(|s| e.has(s.get_ref())))
            .collect();

        // x + y = 2x + 2y -> -x = y
        // x + y = 2x + 2y -> -x = y

        let mut res = eq.clone();

        for t in move_right.iter().chain(move_left.iter()) {
            res -= *t;
        }

        let (coeff, _) = (&res.lhs).get_coeff();

        if coeff.is_zero() {
            panic!("Solving failed")
        }

        if !coeff.is_one() {
            res /= coeff.get_ref();
        }

        let mut symbols_coeff = Vec::new();
        if let KnownExpr::Mul(Mul { operands }) = KnownExpr::from_expr_box(&res.lhs) {
            for op in operands {
                if !symbols.iter().any(|s| op.has(s.get_ref())) {
                    symbols_coeff.push(op.clone_box());
                }
            }
        }

        let symbols_coeff = Mul {
            operands: symbols_coeff,
        };
        res /= symbols_coeff.get_ref();

        res
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::symbolic::{Integer, Symbol};

    #[test]
    fn test_solve_solved() {
        let x = &Symbol::new("x");

        let expr = Eq::new(x, &Integer::zero()).solve([x.get_ref()]);
        let expected = "Eq(Symbol(x), Integer(0))";

        assert_eq!(expr.srepr(), expected)
    }

    #[test]
    fn test_solve_basic() {
        let x = &Symbol::new("x");

        let expr = Eq::new(&Integer::zero(), x).solve([x.get_ref()]);
        let expected = "Eq(Symbol(x), Integer(0))";

        assert_eq!(expr.srepr(), expected)
    }

    #[test]
    fn test_solve_normal() {
        let x = &Symbol::new("x");
        let y = &Symbol::new("y");
        let two = &Integer::new(2);

        let expr = Eq::new(y, &*(two * x));
        let expected = Eq::new(x, &*(y / two));

        assert_eq!(expr.solve([x.get_ref()]), expected)
    }

    #[test]
    fn test_solve_non_number_coeff() {
        let x = &Symbol::new("x");
        let y = &Symbol::new("y");
        let z = &Symbol::new("z");

        let expr = Eq::new(y, &*(z * x));
        let expected = Eq::new(x, &*(y / z));

        assert_eq!(expr.solve([x.get_ref()]), expected)
    }
}
