use super::*;

pub mod pow;
pub use pow::*;

pub mod eq;
pub use eq::*;

use std::{
    any::Any,
    cmp::PartialEq,
    fmt::{self, Display},
};

pub trait Arg: Any {
    fn srepr(&self) -> String;

    fn clone_arg(&self) -> Box<dyn Arg>;

    fn as_expr(&self) -> Option<Box<dyn Expr>> {
        None
    }
}

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

pub trait Expr: Arg + Sync + Send {
    fn args(&self) -> Vec<Box<dyn Arg>>;

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
    fn clone_box(&self) -> Box<dyn Expr>;

    fn as_symbol(&self) -> Option<Symbol> {
        let res = self.clone_box();
        match KnownExpr::from_expr(&res) {
            KnownExpr::Symbol(symbol) => Some(symbol.clone()),
            _ => None,
        }
    }

    fn as_eq(&self) -> Option<Eq> {
        let res = self.clone_box();
        match KnownExpr::from_expr(&res) {
            KnownExpr::Eq(eq) => Some(eq.clone()),
            _ => None,
        }
    }

    fn str(&self) -> String;

    fn pow(&self, exponent: &Box<dyn Expr>) -> Box<dyn Expr> {
        Pow::new(&self.clone_box(), exponent)
    }

    fn ipow(&self, exponent: isize) -> Box<dyn Expr> {
        Pow::new(&self.clone_box(), &Integer::new(exponent))
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
}

pub trait E: Any + Display {
    fn name(&self) -> String {
        std::any::type_name_of_val(self)
            .to_string()
            .split("::")
            .last()
            .unwrap()
            .to_string()
    }
    fn args(&self) -> Vec<&dyn A>;
    fn from_args(&self, args: &Vec<&dyn A>);
    fn clone(&self) -> Box<dyn A>;
}

pub trait A {}
impl A for &dyn E {}

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

// impl Arg for &dyn Expr {
//     fn srepr(&self) -> String {
//         todo!()
//     }
//
//     fn clone_arg(&self) -> Box<dyn Arg> {
//         todo!()
//     }
// }

// impl<T> fmt::Debug for T where T: Expr + Arg {
//     fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
//         write!(f, "{}", self.srepr())
//     }
// }

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

// impl<T> Expr for T
// where
//     T: Num + 'static + std::fmt::Display + Clone + Sync + Send,
// {
//     fn args(&self) -> Vec<Box<dyn Expr>> {
//         vec![]
//     }
//
//     fn clone_box(&self) -> Box<dyn Expr> {
//         Box::new(self.clone())
//     }
//
//     fn str(&self) -> String {
//         format!("{}", self)
//     }
// }

impl Clone for Box<dyn Expr> {
    fn clone(&self) -> Self {
        self.clone_box()
    }
}

// Overload multiply operator
impl std::ops::Mul for &Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn mul(self, rhs: &Box<dyn Expr>) -> Self::Output {
        Mul::new(vec![&self, &rhs])
    }
}

impl std::ops::Mul for Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn mul(self, rhs: Box<dyn Expr>) -> Self::Output {
        Mul::new(vec![&self, &rhs])
    }
}

impl std::ops::Mul<&Box<dyn Expr>> for Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn mul(self, rhs: &Box<dyn Expr>) -> Self::Output {
        Mul::new(vec![&self, rhs])
    }
}

// impl std::

impl std::ops::Add for &Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn add(self, rhs: &Box<dyn Expr>) -> Self::Output {
        Add::new(vec![&self, &rhs])
    }
}

impl std::ops::Add for Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn add(self, rhs: Box<dyn Expr>) -> Self::Output {
        Add::new(vec![&self, &rhs])
    }
}

impl std::ops::Neg for &Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn neg(self) -> Self::Output {
        Mul::new(vec![&Integer::new(-1), &self])
    }
}

impl std::ops::Neg for Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn neg(self) -> Self::Output {
        Mul::new(vec![&Integer::new(-1), &self])
    }
}

impl std::ops::Sub for &Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn sub(self, rhs: &Box<dyn Expr>) -> Self::Output {
        Add::new(vec![&self, &(Integer::new(-1) * rhs)])
    }
}

impl std::ops::Sub<Box<dyn Expr>> for &Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn sub(self, rhs: Box<dyn Expr>) -> Self::Output {
        Add::new(vec![&self, &(Integer::new(-1) * rhs)])
    }
}

impl std::ops::Sub<&Box<dyn Expr>> for Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn sub(self, rhs: &Box<dyn Expr>) -> Self::Output {
        Add::new(vec![&self, &(Integer::new(-1) * rhs)])
    }
}

impl std::ops::Sub for Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn sub(self, rhs: Box<dyn Expr>) -> Self::Output {
        Add::new(vec![&self, &(Integer::new(-1) * &rhs)])
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
