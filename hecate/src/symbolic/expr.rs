use super::*;
use num_traits::Num;
use std::any::Any;

pub trait Expr: Any + Sync + Send {
    fn args(&self) -> Vec<Box<dyn Expr>>;

    fn clone_box(&self) -> Box<dyn Expr>;

    fn str(&self) -> String;

    fn pow(&self, exponent: &Box<dyn Expr>) -> Box<dyn Expr> {
        Pow::new(&self.clone_box(), exponent)
    }

    fn ipow(&self, exponent: isize) -> Box<dyn Expr> {
        Pow::new(&self.clone_box(), &Integer::new(exponent))
    }

    fn name(&self) -> String {
        std::any::type_name_of_val(self)
            .to_string()
            .split("::")
            .last()
            .unwrap()
            .to_string()
    }

    fn srepr(&self) -> String {
        let args = self
            .args()
            .iter()
            .map(|arg| arg.srepr())
            .collect::<Vec<String>>()
            .join(", ");
        format!("{}({})", self.name(), args)
    }
}


impl std::cmp::PartialEq for Box<dyn Expr> {
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

impl<T> Expr for T
where
    T: Num + 'static + std::fmt::Display + Clone + Sync + Send,
{
    fn args(&self) -> Vec<Box<dyn Expr>> {
        vec![]
    }

    fn clone_box(&self) -> Box<dyn Expr> {
        Box::new(self.clone())
    }

    fn str(&self) -> String {
        format!("{}", self)
    }
}

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

impl std::ops::Sub for Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn sub(self, rhs: Box<dyn Expr>) -> Self::Output {
        Add::new(vec![&self, &(Integer::new(-1) * &rhs)])
    }
}
