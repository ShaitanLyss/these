use super::*;

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

use std::{
    any::Any,
    cmp::PartialEq,
    fmt::{self},
};

pub trait Arg: Any {
    fn srepr(&self) -> String;

    fn clone_arg(&self) -> Box<dyn Arg>;

    fn as_expr(&self) -> Option<Box<dyn Expr>> {
        None
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

    fn str(&self) -> String;

    fn pow(&self, exponent: &Box<dyn Expr>) -> Box<dyn Expr> {
        Pow::new(&self.clone_box(), exponent)
    }

    fn ipow(&self, exponent: isize) -> Box<dyn Expr> {
        Pow::new(&self.clone_box(), &Integer::new_box(exponent))
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

    fn subs(&self, substitutions: &Vec<[Box<dyn Expr>; 2]>) -> Box<dyn Expr> {
        for [replaced, replacement] in substitutions {
            if self.srepr() == replaced.srepr() {
                return replacement.clone_box();
            }
        }

        self.from_args(
            self.args()
                .iter()
                .map(|arg| {
                    if let Some(expr) = arg.as_expr() {
                        expr.subs(&substitutions).into()
                    } else {
                        arg.clone()
                    }
                })
                .collect(),
        )
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

    fn is_one(&self) -> bool {
        false
    }

    fn is_zero(&self) -> bool {
        false
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn check_has() {
        let x = &Symbol::new("x");
        let y = &Symbol::new("y");
        let expr = Eq::new(x, &(y + x));
        assert!(expr.has(x));
        assert!(expr.has(y));
        assert!(expr.has(&(y + x)));
        // For now expr.has doesn't check for commutativity
        assert!(!expr.has(&(x + y)));
        assert!(!expr.has(&Symbol::new("z")));
    }

    #[test]
    fn test_expand_simple() {
        let x = &Symbol::new("x") as &dyn Expr;
        let y = &Symbol::new("y") as &dyn Expr;
        let z = &Symbol::new("z") as &dyn Expr;

        let expr = (x + y) * z;
        let expected = x * z + y * z;

        assert!(dbg!(expr.expand()).equals(&*expected))
    }
    #[test]
    fn test_expand_with_first_arg_int() {
        let x = &Symbol::new("x");
        let y = &Symbol::new("y");
        let z = &Symbol::new("z");
        let i2 = &Integer::new(2);

        let expr = i2 * &(x + y) * z;
        let expected = i2 * x * z + i2 * y * z;

        assert!(dbg!(expr.expand()).equals(&*expected))
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

        assert!(dbg!(expr.expand()).equals(&*dbg!(expected)))
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

impl std::cmp::Eq for &dyn Expr {}
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

pub trait ExprOperations<T> {
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

impl<T> ExprOperations<T> for T where T: Expr {}
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
        write!(f, "{}", self.srepr())
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

impl std::ops::Div for Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn div(self, rhs: Box<dyn Expr>) -> Self::Output {
        self * rhs.ipow(-1)
    }
}

impl std::ops::Div<&Box<dyn Expr>> for Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn div(self, rhs: &Box<dyn Expr>) -> Self::Output {
        self * rhs.ipow(-1)
    }
}
