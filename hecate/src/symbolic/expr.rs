use super::*;
use num_traits::ToPrimitive;

pub mod macros;

pub mod pow;
pub use pow::*;

pub mod eq;
pub use eq::*;

pub mod add;
pub use add::*;

pub mod mul;
pub use mul::*;

pub mod function;
pub use function::*;

pub mod diff;
pub use diff::*;

pub mod integral;
pub use integral::*;

pub mod symbol;
pub use symbol::*;

pub mod integer;
pub use integer::*;

pub mod rational;
pub use rational::*;

pub mod ops;
// pub use ops::*;

use std::{
    any::Any,
    cmp::{Ordering, PartialEq},
    fmt::{self},
    hash::Hash,
    iter,
};

pub trait Arg: Any {
    fn srepr(&self) -> String;

    fn clone_arg(&self) -> Box<dyn Arg>;

    fn as_expr(&self) -> Option<Box<dyn Expr>> {
        None
    }

    fn map_expr(&self, f: &dyn (Fn(&dyn Expr) -> Box<dyn Expr>)) -> Box<dyn Arg> {
        if let Some(expr) = self.as_expr() {
            f(expr.get_ref())
        } else {
            self.clone_arg()
        }
    }
}

pub trait ArgOperations {}

impl<A: Arg> ArgOperations for A {}

pub trait AsAny {
    fn as_any(&self) -> &dyn Any;
}

// impl<T> AsAny for Box<T>
// where
//     T: Any + ?Sized,
// {
//     fn as_any(&self) -> &dyn Any {
//         let any = (&**self) as &dyn Any;
//         any
//     }
// }

// impl<T> AsAny for Box<T> where T: Any + ?Sized {
//     fn as_any(&self) -> &dyn Any {
//         let any = (&**self) as &dyn Any;
//         any
//     }
// }

impl AsAny for Box<dyn Arg> {
    fn as_any(&self) -> &dyn Any {
        let any = (&**self) as &dyn Any;
        any
    }
}

impl AsAny for Box<dyn Expr> {
    fn as_any(&self) -> &dyn Any {
        let any = (&**self) as &dyn Any;
        any
    }
}

impl fmt::Debug for Box<dyn Arg> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.srepr())
    }
}

impl Arg for isize {
    fn srepr(&self) -> String {
        self.to_string()
    }

    fn clone_arg(&self) -> Box<dyn Arg> {
        Box::new(self.clone())
    }
}

impl Arg for String {
    fn srepr(&self) -> String {
        self.clone()
    }

    fn clone_arg(&self) -> Box<dyn Arg> {
        Box::new(self.clone())
    }
}

impl Arg for Box<dyn Expr> {
    fn srepr(&self) -> String {
        (**self).srepr()
    }

    fn clone_arg(&self) -> Box<dyn Arg> {
        self.clone_box().into()
    }

    fn as_expr(&self) -> Option<Box<dyn Expr>> {
        Some(self.clone_box())
    }
}

impl Arg for Vec<Box<dyn Expr>> {
    fn srepr(&self) -> String {
        let args = self
            .iter()
            .map(|arg| arg.srepr())
            .collect::<Vec<String>>()
            .join(", ");
        format!("({})", args)
    }

    fn clone_arg(&self) -> Box<dyn Arg> {
        Box::new(self.clone())
    }
}

impl Clone for Box<dyn Arg> {
    fn clone(&self) -> Self {
        self.clone_arg()
    }
}

impl From<Box<dyn Expr>> for Box<dyn Arg> {
    fn from(value: Box<dyn Expr>) -> Self {
        Box::new(value.clone())
    }
}

impl From<Box<dyn Arg>> for Box<dyn Expr> {
    fn from(value: Box<dyn Arg>) -> Self {
        value.as_expr().expect("This arg is not an expr")
    }
}

impl<T> Arg for T
where
    T: Expr,
{
    fn srepr(&self) -> String {
        let args = self
            .args()
            .iter()
            .map(|arg| arg.srepr())
            .collect::<Vec<String>>()
            .join(", ");
        format!("{}({})", self.name(), args)
    }

    fn clone_arg(&self) -> Box<dyn Arg> {
        self.as_arg()
    }
}

impl FromIterator<Box<dyn Expr>> for Vec<Box<dyn Arg>> {
    fn from_iter<T: IntoIterator<Item = Box<dyn Expr>>>(iter: T) -> Self {
        let mut res = Vec::new();
        for expr in iter {
            res.push(expr.clone_box().into())
        }
        res
    }
}

impl FromIterator<Box<dyn Arg>> for Vec<Box<dyn Expr>> {
    fn from_iter<T: IntoIterator<Item = Box<dyn Arg>>>(iter: T) -> Self {
        let mut res = Vec::new();
        for arg in iter {
            // if (&arg as &dyn Any).is::<Box<dyn Expr>>() {
            res.push(arg.clone().into())
            // } else {
            //
            //     panic!("Not an Expr: {} {}", type_name_of_val(&arg),  arg.srepr())
            // }
        }
        res
    }
}

// impl Clone for &(dyn Arg + 'static) {
//     fn clone(&self) -> Self {
//         todo!()
//     }
// }

pub trait Expr: Arg + Sync + Send {
    fn args(&self) -> Vec<Box<dyn Arg>> {
        let mut res = Vec::new();
        self.for_each_arg(&mut |a| res.push(a.clone_arg()));
        res
    }

    fn for_each_arg(&self, f: &mut dyn FnMut(&dyn Arg) -> ());

    fn args_map_exprs(&self, f: &dyn Fn(&dyn Expr) -> Box<dyn Arg>) -> Vec<Box<dyn Arg>> {
        let mut res = Vec::new();

        self.for_each_arg(&mut |arg| {
            if let Some(expr) = arg.as_expr() {
                res.push(f(&*expr));
            } else {
                res.push(arg.clone_arg());
            }
        });

        res
    }

    fn from_args(&self, args: Vec<Box<dyn Arg>>) -> Box<dyn Expr> {
        panic!(
            "from_args not implemented for {}, supplied args :\n{:#?}",
            self.name(),
            &args
        )
    }

    fn as_arg(&self) -> Box<dyn Arg> {
        self.clone_box().into()
    }
    fn equals(&self, other: &dyn Expr) -> bool {
        self.srepr() == other.srepr()
    }
    fn clone_box(&self) -> Box<dyn Expr>;

    fn as_symbol(&self) -> Option<Symbol> {
        let res = self.clone_box();
        match KnownExpr::from_expr_box(&res) {
            KnownExpr::Symbol(symbol) => Some(symbol.clone()),
            _ => None,
        }
    }

    fn as_eq(&self) -> Option<Eq> {
        let res = self.clone_box();
        match KnownExpr::from_expr_box(&res) {
            KnownExpr::Eq(eq) => Some(eq.clone()),
            _ => None,
        }
    }

    fn as_mul(&self) -> Option<&Mul> {
        None
    }

    fn as_pow(&self) -> Option<&Pow> {
        None
    }

    fn as_f64(&self) -> Option<f64> {
        None
    }

    fn simplify(&self) -> Box<dyn Expr> {
        self.from_args(
            self.args()
                .iter()
                .map(|a| a.map_expr(&|e| e.simplify()))
                .collect(),
        )
    }

    fn as_int(&self) -> Option<Integer> {
        let res = self.clone_box();
        match KnownExpr::from_expr_box(&res) {
            KnownExpr::Integer(i) => Some(i.clone()),
            _ => None,
        }
    }

    fn str(&self) -> String;

    fn pow(&self, exponent: &Box<dyn Expr>) -> Box<dyn Expr> {
        Pow::pow(self.clone_box(), exponent.clone())
    }

    fn ipow(&self, exponent: isize) -> Box<dyn Expr> {
        Pow::pow(self.clone_box(), Integer::new_box(exponent))
    }

    fn sqrt(&self) -> Box<dyn Expr> {
        Pow::pow(self.clone_box(), Rational::new_box(1, 2))
    }

    fn get_exponent(&self) -> (Box<dyn Expr>, Box<dyn Expr>) {
        (self.clone_box(), Integer::one_box())
    }

    fn diff(&self, var: &str, order: usize) -> Box<dyn Expr> {
        Box::new(Diff {
            f: self.clone_box(),
            vars: vec![
                Symbol {
                    name: var.to_string(),
                };
                order
            ],
        })
    }

    fn name(&self) -> String {
        std::any::type_name_of_val(self)
            .to_string()
            .split("::")
            .last()
            .unwrap()
            .to_string()
    }

    fn subs(&self, substitutions: &[[Box<dyn Expr>; 2]]) -> Box<dyn Expr> {
        ops::subs(self, substitutions)
    }

    fn has(&self, expr: &dyn Expr) -> bool {
        if self.equals(expr) {
            true
        } else {
            self.args()
                .iter()
                .filter_map(|a| a.as_expr())
                .any(|e| e.has(expr))
        }
    }

    fn has_box(&self, expr: Box<dyn Expr>) -> bool {
        self.has(&*expr)
    }

    /// Expands an expression.
    /// For example:
    /// (x + y) * z -> xz + yz
    fn expand(&self) -> Box<dyn Expr> {
        self.from_args(
            self.args()
                .iter()
                .map(|a| {
                    if let Some(expr) = a.as_expr() {
                        expr.expand()
                    } else {
                        a.clone()
                    }
                })
                .collect(),
        )
    }

    /// Factorizes an expression
    /// For example:
    /// factor(ax + cx + zy, [x]) -> (a + c)x + zy
    fn factor(&self, factors: &[&dyn Expr]) -> Box<dyn Expr> {
        ops::factor(self, factors)
    }

    fn is_one(&self) -> bool {
        false
    }
    fn is_neg_one(&self) -> bool {
        false
    }

    fn is_number(&self) -> bool {
        false
    }

    fn is_negative_number(&self) -> bool {
        false //Todo better
    }

    fn is_zero(&self) -> bool {
        false
    }

    fn known_expr(&self) -> KnownExpr {
        KnownExpr::Unknown
    }

    fn terms<'a>(&'a self) -> Box<dyn Iterator<Item = &'a dyn Expr> + 'a> {
        Box::new(iter::once(self.get_ref()))
    }

    fn get_ref<'a>(&'a self) -> &'a dyn Expr;

    fn get_coeff(&self) -> (Rational, Box<dyn Expr>) {
        match KnownExpr::from_expr(self.get_ref()) {
            KnownExpr::Integer(i) => i.into(),
            KnownExpr::Pow(pow) => {
                let (pow_coeff, pow_expr) = pow.base().get_coeff();

                if pow_coeff.is_one() {
                    return (Rational::one(), pow_expr.pow(&pow.exponent().clone_box()));
                }
                let coeff_box = (pow_coeff).pow(&(pow.exponent()).clone_box());

                match coeff_box.known_expr() {
                    KnownExpr::Integer(i) => return (i.into(), pow_expr),
                    KnownExpr::Rational(r) => return (*r, pow_expr),
                    KnownExpr::Pow(Pow {
                        base: coeff_base,
                        exponent: _,
                    }) => {
                        return (
                            Rational::one(),
                            Pow::pow(
                                coeff_base.clone_box() * pow_expr,
                                pow.exponent().clone_box(),
                            ),
                        );
                    }
                    // _ if !coeff_box.is_one() => pow_expr = ((coeff_box) * (pow_expr)),

                    // _ if !coeff_box.is_one() => {
                    //     return (Rational::one(), coeff_box * pow_expr
                    //
                    //     )
                    // },
                    // _ => {
                    //     return (Rational::one(), pow_expr)
                    // }
                    _ => panic!("help: {:?}", coeff_box),
                }

                // ((
                //     coeff,
                //     if pow_expr.is_one() {
                //         Integer::new_box(1)
                //     } else {
                //         coeff_box * pow_expr.pow(&pow.exponent)
                //     },
                // ))
            }
            // KnownExpr::Pow(_) => {
            //     todo!("pow no matter the exponent")
            // }
            KnownExpr::Rational(r) => r.into(),
            KnownExpr::Mul(Mul { operands }) => {
                let mut coeff = Rational::one();
                let mut expr = Integer::new_box(1);

                operands
                    .iter()
                    .for_each(|op| match KnownExpr::from_expr_box(op) {
                        KnownExpr::Integer(i) => coeff *= i,
                        KnownExpr::Rational(r) => coeff *= r,
                        KnownExpr::Pow(Pow { base, exponent }) if exponent.is_neg_one() => {
                            let (pow_coeff, pow_expr) = base.get_coeff();
                            coeff /= pow_coeff;
                            expr *= (Pow {
                                base: pow_expr,
                                exponent: Integer::new_box(-1),
                            })
                            .get_ref();
                        }
                        _ => expr *= op,
                    });

                (coeff, expr)
            }
            _ => (Rational::one(), self.clone_box()),
        }
    }

    fn compare(&self, other: &dyn Expr) -> Option<Ordering> {
        ops::compare(self, other)
    }
}

impl std::hash::Hash for Box<dyn Expr> {
    fn hash<H: std::hash::Hasher>(&self, state: &mut H) {
        self.srepr().hash(state);
    }
}

impl From<&Integer> for (Rational, Box<dyn Expr>) {
    fn from(i: &Integer) -> Self {
        (i.into(), Integer::new_box(1))
    }
}

impl From<&Rational> for (Rational, Box<dyn Expr>) {
    fn from(r: &Rational) -> Self {
        (r.clone(), Integer::new_box(1))
    }
}

impl ToPrimitive for Integer {
    fn to_i64(&self) -> Option<i64> {
        Some(self.value.try_into().unwrap())
    }

    fn to_u64(&self) -> Option<u64> {
        Some(self.value.try_into().unwrap())
    }
}

impl ToPrimitive for &Integer {
    fn to_i64(&self) -> Option<i64> {
        (*self).to_i64()
    }

    fn to_u64(&self) -> Option<u64> {
        (*self).to_u64()
    }
}
impl ExprOperations for &dyn Expr {}

#[cfg(test)]
mod tests {
    use std::collections::HashSet;

    use super::*;

    #[test]
    fn check_has() {
        let x = &Symbol::new("x");
        let y = &Symbol::new("y");
        let expr = Eq::new(x, (y + x).get_ref());
        assert!(expr.has(x));
        assert!(expr.has(y));
        assert!(expr.has((y + x).get_ref()));
        // For now expr.has doesn't check for commutativity
        assert!(!expr.has((x + y).get_ref()));
        assert!(!expr.has(&Symbol::new("z")));
    }

    #[test]
    fn test_expand_simple() {
        let x = &Symbol::new("x") as &dyn Expr;
        let y = &Symbol::new("y") as &dyn Expr;
        let z = &Symbol::new("z") as &dyn Expr;

        let expr = (x + y) * z;
        let expected = x * z + y * z;

        assert!((expr.expand()).equals(&*expected))
    }
    #[test]
    fn test_expand_with_first_arg_int() {
        let x = &Symbol::new("x");
        let y = &Symbol::new("y");
        let z = &Symbol::new("z");
        let i2 = &Integer::new(2);

        let expr = i2 * &(x + y) * z;
        let expected = i2 * x * z + i2 * y * z;

        assert!((expr.expand()).equals(&*expected))
    }
    #[test]
    /// 2(x + y)(w + z) -> 2xw + 2xz + 2yw + 2yz
    fn test_expand_complex() {
        let x = &Symbol::new("x");
        let y = &Symbol::new("y");
        let w = &Symbol::new("w");
        let z = &Symbol::new("z");
        let i2 = &Integer::new(2);

        let expr = i2 * &(x + y) * &(w + z);
        let expected = i2 * x * w + i2 * x * z + i2 * y * w + i2 * y * z;

        assert!((expr.expand()).equals(&*(expected)))
    }

    #[test]
    fn test_get_coeff_trivial() {
        assert_eq!(
            Integer::new(1).get_coeff(),
            (Rational::one(), Integer::new_box(1))
        );
    }
    #[test]
    fn test_get_coeff_basic() {
        let expr = Integer::new(1).get_ref() / Integer::new(2).get_ref();
        assert_eq!(expr.get_coeff(), (Rational::new(1, 2), Integer::new_box(1)));
    }
    #[test]
    fn test_get_coeff_basic_2() {
        let num = &Integer::new(5);
        let denom = &Integer::new(7);
        let expr = num.get_ref() / denom.get_ref();

        assert_eq!(expr.get_coeff(), (Rational::new(5, 7), Integer::new_box(1)));
    }

    #[test]
    fn test_get_coeff_normal() {
        let x = &Symbol::new("x");
        let num = &Integer::new(5);
        let denom = &Integer::new(7);
        let expr = x * num / denom;

        assert_eq!(expr.get_coeff(), (Rational::new(5, 7), x.clone_box()));
    }

    #[test]
    fn test_check_hashing_works() {
        let mut set = HashSet::with_capacity(2);
        let x = &Symbol::new_box("x");
        let x_bis = &Symbol::new_box("x");

        set.insert(x);
        set.insert(x_bis);

        assert_eq!(set.len(), 1)
    }

    #[test]
    fn test_check_sqrt() {
        let x = &Integer::new(2).sqrt();

        assert_eq!(x.srepr(), "Pow(Integer(2), Rational(1, 2))")
    }

    #[test]
    fn test_get_sqrt_exponent() {
        let sqrt_2 = &Integer::new(2).sqrt();

        assert_eq!(
            sqrt_2.get_exponent(),
            (Integer::new_box(2), Rational::new_box(1, 2))
        )
    }

    #[test]
    fn test_check_sqrt_simplifies() {
        let x = &Integer::new(2).sqrt();

        let expr = x * x;

        assert_eq!(&expr, &Integer::new_box(2))
    }

    #[test]
    fn test_check_coeff_sqrt_2() {
        let sqrt_2 = &Integer::new(2).sqrt();

        assert_eq!(sqrt_2.get_coeff(), (Rational::one(), sqrt_2.clone_box()))
    }
}

// pub trait E: Any + Display {
//     fn name(&self) -> String {
//         std::any::type_name_of_val(self)
//             .to_string()
//             .split("::")
//             .last()
//             .unwrap()
//             .to_string()
//     }
//     fn args(&self) -> Vec<&dyn A>;
//     fn from_args(&self, args: &Vec<&dyn A>);
//     fn clone(&self) -> Box<dyn A>;
// }
//
// pub trait A {}
// impl A for &dyn E {}

pub struct ExprWrapper<'a, E: Expr> {
    expr: &'a E,
}

impl<'a, E: Expr> std::cmp::PartialEq for ExprWrapper<'a, E> {
    fn eq(&self, other: &Self) -> bool {
        self.expr.srepr() == other.expr.srepr()
    }
}

impl<'a, E: Expr> std::cmp::Eq for ExprWrapper<'a, E> {}

impl<'a, E: Expr> ExprWrapper<'a, E> {
    pub fn new(expr: &'a E) -> Self {
        ExprWrapper { expr }
    }
}
impl std::cmp::PartialEq for &dyn Expr {
    fn eq(&self, other: &Self) -> bool {
        self.srepr() == other.srepr()
    }
}

impl std::cmp::PartialEq<Box<dyn Expr>> for &dyn Expr {
    fn eq(&self, other: &Box<dyn Expr>) -> bool {
        *self == &**other
    }
}

impl std::cmp::PartialEq<&dyn Expr> for Box<dyn Expr> {
    fn eq(&self, other: &&dyn Expr) -> bool {
        self.get_ref() == *other
    }
}

impl std::cmp::PartialEq<&Box<dyn Expr>> for &dyn Expr {
    fn eq(&self, other: &&Box<dyn Expr>) -> bool {
        *self == other.get_ref()
    }
}

impl fmt::Debug for &dyn Expr {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{} [{}])", self.str(), self.srepr())
    }
}

impl std::cmp::Eq for &dyn Expr {}

impl Hash for &dyn Expr {
    fn hash<H: std::hash::Hasher>(&self, state: &mut H) {
        self.srepr().hash(state);
    }
}
// impl<E: Expr> Expr for ExprWrapper<'_, E> {
//     fn args(&self) -> Vec<Box<dyn Arg>> {
//         todo!()
//     }
//
//     fn clone_box(&self) -> Box<dyn Expr> {
//         todo!()
//     }
//
//     fn str(&self) -> String {
//         todo!()
//     }
// }

// impl<, E: Expr> Expr for ExprWrapper<'a, E> {
//     fn args(&self) -> Vec<Box<dyn Arg>> {
//         self.expr.args()
//     }
//
//     fn clone_box(&self) -> Box<dyn Expr> {
//         self.expr.clone_box()
//     }
//
//     fn str(&self) -> String {
//         self.expr.str()
//     }
// }

pub trait ExprOperations {
    fn subs_refs<'a, Iter: IntoIterator<Item = [&'a dyn Expr; 2]>>(
        &self,
        substitutions: Iter,
    ) -> Box<dyn Expr>
    where
        Self: Expr,
    {
        for [replaced, replacement] in substitutions.into_iter() {
            if self.srepr() == replaced.srepr() {
                return replacement.clone_box();
            }
        }
        todo!()
    }

    // fn map_exprs<F>(&self, op: F) -> Vec<Box<dyn Arg>>
    // where
    //     Self: Expr,
    //     F: Fn(&dyn Expr) -> Box<dyn Expr>,
    // {
    //     todo!()
    // }

    //     fn subs<'a, I: IntoIterator<Item = &'a [&'static dyn Expr; 2]>>(&'static self, substitutions: I) -> Box<dyn Expr>
    //     where
    //         Self: Expr + Sized
    //     {
    //         for [replaced, replacement] in substitutions.into_iter() {
    //             // if (self as &dyn Expr) == replaced {}
    //             // if self.clone_box() == (*replaced).clone() {
    //             //     return (*replacement).clone();
    //             // }
    //         }
    //         todo!()
    //
    //         // self.from_args(
    //         //     self.args()
    //         //         .iter()
    //         //         .map(|arg| {
    //         //             if let Some(expr) = arg.as_expr() {
    //         //                 expr.subs(&substitutions).into()
    //         //             } else {
    //         //                 arg.clone()
    //         //             }
    //         //         })
    //         //         .collect(),
    //         // )
    //     }
}

impl<T> ExprOperations for T where T: Expr {}
// impl ExprOperations<&dyn Expr> for &dyn Expr {}

impl fmt::Display for &dyn Expr {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.str())
    }
}

impl PartialEq for Box<dyn Expr> {
    fn eq(&self, other: &Self) -> bool {
        self.srepr() == other.srepr()
    }
}

impl std::cmp::Eq for Box<dyn Expr> {}

impl std::fmt::Debug for Box<dyn Expr> {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{:?}", self.get_ref())
    }
}

impl std::fmt::Display for Box<dyn Expr> {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.str())
    }
}

impl Clone for Box<dyn Expr> {
    fn clone(&self) -> Self {
        self.clone_box()
    }
}

impl std::ops::Neg for &dyn Expr {
    type Output = Box<dyn Expr>;

    fn neg(self) -> Self::Output {
        Integer::new_box(-1) * self
    }
}

impl std::ops::Neg for &Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn neg(self) -> Self::Output {
        -&**self
    }
}

impl std::ops::Neg for Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn neg(self) -> Self::Output {
        -&*self
    }
}
