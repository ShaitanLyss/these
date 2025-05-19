use std::{
    cmp::{self, Ordering},
    collections::HashMap,
    hash::Hash,
};

use indexmap::IndexMap;
use num_traits::NumCast;

use crate::{ops::compare, symbolic::expr::*};

pub fn factor<'a, E: Expr + ?Sized, F: Expr + ?Sized>(expr: &E, factors: &[&'a F]) -> Box<dyn Expr>
where
    &'a F: Hash + cmp::Eq,
{
    if let Some(eq) = expr.as_eq() {
        return Eq::new_box(
            factor(eq.lhs.get_ref(), factors),
            factor(eq.rhs.get_ref(), factors),
        );
    }
    let expr = expr.expand();
    let mut factor_coeffs: HashMap<&F, Box<dyn Expr>> = HashMap::new();
    let mut others: Vec<Box<dyn Expr>> = Vec::new();

    let operands = match expr.known_expr() {
        KnownExpr::Add(Add { operands }) => operands.iter().collect(),
        _ => vec![&expr],
    };

    // Attempt factorizing by every factor and keeping the first valid factor
    // If none are found, add to others
    'ops: for op in operands {
        for factor in factors {
            if let Some(coeff) = factor_coeff_no_div(op.get_ref(), factor.get_ref()) {
                let entry = factor_coeffs.entry(factor).or_insert(Integer::zero_box());
                *entry += coeff;
                continue 'ops;
            }
        }
        others.push(op.clone_box());
    }

    let mut res_operands: Vec<Box<dyn Expr>> =
        Vec::with_capacity(factor_coeffs.len() + others.len());

    for fact in factors {
        if let Some(coeff) = factor_coeffs.get(fact) {
            if !coeff.is_zero() {
                res_operands.push(factor(coeff.get_ref(), factors) * fact.get_ref());
            }
        }
    }
    res_operands.extend(others);

    Add::new_box_v2(res_operands)
}

pub fn factor_coeff<E: Expr + ?Sized, F: Expr + ?Sized>(expr: &E, factor: &F) -> Box<dyn Expr> {
    expr.get_ref() / factor.get_ref()
}

pub fn get_operands_exponents<E: Expr + ?Sized>(
    expr: &E,
) -> IndexMap<Box<dyn Expr>, Box<dyn Expr>> {
    let mut operands_exponents: IndexMap<Box<dyn Expr>, Box<dyn Expr>> = IndexMap::new();

    match expr.known_expr() {
        KnownExpr::Pow(pow) => match pow.base.known_expr() {
            KnownExpr::Mul(mul) => {
                for (op, expo) in get_operands_exponents(mul) {
                    let entry = operands_exponents.entry(op).or_insert(Integer::zero_box());
                    *entry += expo * pow.exponent.clone_box();
                }
            }
            _ => {
                let entry = operands_exponents
                    .entry(pow.base.clone_box())
                    .or_insert(pow.exponent.clone_box());
                *entry += Integer::one_box();
            }
        },
        KnownExpr::Mul(mul) => {
            for op in mul
                .operands
                .iter()
                // Split up factors fo multiplication and powers
                .flat_map(|op| match op.known_expr() {
                    KnownExpr::Mul(Mul { operands }) => operands.clone(),
                    KnownExpr::Pow(Pow { base, exponent })
                        if matches!(base.known_expr(), KnownExpr::Mul(Mul { .. })) =>
                    {
                        let mul = base.as_mul().unwrap();
                        mul.operands.iter().map(|op| op.pow(exponent)).collect()
                    }
                    _ => vec![op.clone_box()],
                })
            {
                let (expr, exponent) = op.get_exponent();
                let entry = operands_exponents
                    .entry(expr)
                    .or_insert(Integer::zero_box());
                *entry += exponent;
            }
        }
        _ => {
            operands_exponents.insert(expr.clone_box(), Integer::one_box());
        }
    };

    operands_exponents
}

pub fn factor_coeff_no_div<E: Expr + ?Sized, F: Expr + ?Sized>(
    expr: &E,
    factor: &F,
) -> Option<Box<dyn Expr>> {
    if expr.get_ref() == factor.get_ref() {
        return Some(Integer::one_box());
    }
    let expr_op_expos = get_operands_exponents(expr);
    let factor_op_expos = get_operands_exponents(factor);

    for (op, factor_expo) in &factor_op_expos {
        if let Some(expr_expo) = expr_op_expos.get(op) {
            if expr_expo.has(factor_expo.get_ref()) {
                continue;
            }
            if let Some(order) = compare(factor_expo.get_ref(), expr_expo.get_ref()) {
                if order == Ordering::Greater {
                    return None;
                }
            } else {
                return None;
            }
        } else {
            return None;
        }
    }
    Some(expr.get_ref() / factor.get_ref())
}

impl<N: NumCast> std::ops::Mul<N> for &dyn Expr {
    type Output = Box<dyn Expr>;

    fn mul(self, rhs: N) -> Self::Output {
        let rhs = rhs.to_isize().unwrap();

        Integer::new(rhs).get_ref() * self
    }
}

#[macro_export]
macro_rules! symbol {
    ($name:expr) => {
        &Symbol::new($name) as &dyn Expr
    };
}

#[macro_export]
macro_rules! function {
    ($name:expr) => {
        &Func::new($name, []) as &dyn Expr
    };
}

#[cfg(test)]
mod tests {
    use crate::symbols;

    use super::*;
    #[test]
    fn test_factor_trivial() {
        assert_eq!(
            Symbol::new("x")
                .factor(&[Symbol::new("x").get_ref()])
                .srepr(),
            "Symbol(x)"
        )
    }

    #[test]
    fn test_factor_coeff_simple() {
        let x = &Symbol::new("x") as &dyn Expr;

        assert_eq!(factor_coeff(&*(x * 2), x).srepr(), "Integer(2)");
    }

    #[test]
    /// factor(a, x) -> a / x
    /// a = (a / x)x
    fn test_factor_missing() {
        let x = symbol!("x");
        let a = symbol!("a");

        assert_eq!(
            factor_coeff(a, x).srepr(),
            "Mul(Symbol(a), Pow(Symbol(x), Integer(-1)))"
        );
    }

    #[test]
    fn test_factor_coeff_laplacian_u() {
        let u = function!("u");
        let laplacian = symbol!("laplacian");
        let c = symbol!("c");
        let expr = c * 2 * laplacian * u;

        let coeff = factor_coeff(&*expr, &*(laplacian * u));

        assert_eq!(&coeff, &(c * 2));
    }

    #[test]
    fn test_factor_coeff_no_div_trivial() {
        let x = symbol!("x");

        assert_eq!(factor_coeff_no_div(x, x), Some(Integer::one_box()));
    }

    #[test]
    fn test_factor_coeff_no_div_missing() {
        let [x, y] = symbols!("x", "y");

        assert_eq!(factor_coeff_no_div(y, x), None);
    }

    #[test]
    fn test_factor_coeff_no_div_laplacian_u() {
        let u = function!("u");
        let laplacian = symbol!("laplacian");
        let c = symbol!("c");
        let expr = c * 2 * laplacian * u;

        let coeff = factor_coeff_no_div(&*expr, &*(laplacian * u));

        assert_eq!(&coeff, &(Some(c * 2)));
    }

    #[test]
    fn test_factor_coeff_no_div_not_enough() {
        let c = symbol!("c");

        assert_eq!(factor_coeff_no_div(c, c.ipow(2).get_ref()), None);
    }

    #[test]
    fn test_factor_coeff_no_div_enough() {
        let c = symbol!("c");

        assert_eq!(
            &factor_coeff_no_div(c.ipow(3).get_ref(), c.ipow(2).get_ref()),
            &Some(c.clone_box())
        );
    }

    #[test]
    fn test_factor_basic() {
        let x = symbol!("x");

        let res = factor(x, &[x]);

        assert_eq!(res.srepr(), "Symbol(x)");
    }

    #[test]
    fn test_factor_simple() {
        let x = symbol!("x");

        let res = factor(&*(x + x * 2), &[x]);

        assert_eq!(&res, &(x * 3));
    }

    #[test]
    fn test_factor_multiple_options() {
        let [u, v, w] = symbols!("u", "v", "w");
        let res = factor(&*(v * 3 + w + u * v * 2 + u * 4), &[u, v]);

        assert_eq!(&res, &((v * 2 + 4) * u + v * 3 + w));
    }
}
