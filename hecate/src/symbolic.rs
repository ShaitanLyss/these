use std::{
    any::{Any, type_name_of_val},
    fmt,
};

pub mod abc;
pub mod expr;
pub mod system;
pub use expr::*;
pub use system::System;

#[derive(Clone)]
pub struct Add {
    operands: Vec<Box<dyn Expr>>,
}

impl Add {
    pub fn new(operands: Vec<&Box<dyn Expr>>) -> Box<dyn Expr> {
        Box::new(Add {
            operands: operands.iter().copied().cloned().collect(),
        })
    }
}

impl Expr for Add {
    fn args(&self) -> Vec<Box<dyn Arg>> {
        self.operands.iter().cloned().collect()
    }

    fn from_args(&self, args: Vec<Box<dyn Arg>>) -> Box<dyn Expr> {
        let args: Vec<Box<dyn Expr>> = args.iter().cloned().collect();
        Box::new(Add { operands: args })
    }

    fn clone_box(&self) -> Box<dyn Expr> {
        Box::new(self.clone())
    }

    fn str(&self) -> String {
        let pieces: Vec<_> = self
            .operands
            .iter()
            .enumerate()
            .map(|(i, op)| match KnownExpr::from_expr(op) {
                KnownExpr::Mul(Mul { operands }) if operands.len() > 0 && i > 0 => {
                    match KnownExpr::from_expr(&operands[0]) {
                        KnownExpr::Integer(Integer { value: -1 }) => {
                            let mul = op.str();
                            format!(" - {}", mul[1..].to_string())
                        }
                        _ => format!(" + {}", op.str()),
                    }
                }

                _ if i > 0 => format!(" + {}", op.str()),
                _ => op.str(),
            })
            .collect();
        format!("{}", pieces.join(""))
    }
}


#[derive(Clone, Debug)]
pub struct Symbol {
    name: String,
}

impl Symbol {
    pub fn new(name: &str) -> Box<dyn Expr> {
        Box::new(Symbol {
            name: (match name {
                "nabla" => "∇",
                "laplacian" => "Δ",
                _ => name,
            })
            .to_string(),
        })
    }
}

impl Expr for Symbol {
    fn args(&self) -> Vec<Box<dyn Arg>> {
        vec![Box::new(self.name.clone())]
    }

    fn from_args(&self, args: Vec<Box<dyn Arg>>) -> Box<dyn Expr> {
        let name = (&*args[0]) as &dyn Any;

        let name = name.downcast_ref::<String>().unwrap();
        Box::new(Symbol { name: name.clone() })
    }

    fn clone_box(&self) -> Box<dyn Expr> {
        Box::new(self.clone())
    }

    fn str(&self) -> String {
        self.name.clone()
    }
}

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
    pub fn from_expr(expr: &Box<dyn Expr>) -> KnownExpr {
        let expr = (&**expr) as &dyn Any;
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
pub struct Mul {
    operands: Vec<Box<dyn Expr>>,
}

impl Expr for Mul {
    fn args(&self) -> Vec<Box<dyn Arg>> {
        self.operands.iter().cloned().collect()
    }

    fn from_args(&self, args: Vec<Box<dyn Arg>>) -> Box<dyn Expr> {
        let args: Vec<Box<dyn Expr>> = args.iter().cloned().collect();
        Box::new(Mul { operands: args })
    }

    fn clone_box(&self) -> Box<dyn Expr> {
        Box::new(self.clone())
    }

    fn str(&self) -> String {
        let pieces: Vec<_> = self
            .operands
            .iter()
            .enumerate()
            .map(|(i, op)| match KnownExpr::from_expr(op) {
                KnownExpr::Integer(Integer { value: -1 }) if i == 0 => "-".to_string(),
                KnownExpr::Add(_) if self.operands.len() > 1 => format!("({})", op.str()),
                _ => op.str(),
            })
            .collect();
        format!("{}", pieces.join(""))
    }
}

impl Mul {
    pub fn new(operands: Vec<&Box<dyn Expr>>) -> Box<dyn Expr> {
        Box::new(Mul {
            operands: operands.iter().copied().cloned().collect(),
        })
    }
}

#[derive(Clone)]
pub struct Integer {
    value: isize,
}

impl Expr for Integer {
    fn args(&self) -> Vec<Box<dyn Arg>> {
        vec![Box::new(self.value.clone())]
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
    pub fn new(value: isize) -> Box<dyn Expr> {
        Box::new(Integer { value })
    }
}


#[derive(Clone)]
pub struct Integral {
    f: Box<dyn Expr>,
}

impl Integral {
    pub fn new(f: &Box<dyn Expr>) -> Box<dyn Expr> {
        Box::new(Integral { f: f.clone() })
    }
}

impl Expr for Integral {
    fn args(&self) -> Vec<Box<dyn Arg>> {
        vec![self.f.clone().into()]
    }

    fn clone_box(&self) -> Box<dyn Expr> {
        Box::new(self.clone())
    }

    fn str(&self) -> String {
        format!("∫{}", self.f.str())
    }
}

#[derive(Clone)]
pub struct Diff {
    f: Box<dyn Expr>,
    vars: Vec<Symbol>,
}

impl Diff {
    pub fn new<'a, It: IntoIterator<Item = &'a Box<dyn Expr>>>(
        f: &Box<dyn Expr>,
        vars: It,
    ) -> Box<dyn Expr> {
        Box::new(Diff {
            f: f.clone(),
            vars: vars
                .into_iter()
                .map(|v| v.as_expr().unwrap().as_symbol().unwrap())
                .collect(),
        })
    }
}

impl Expr for Diff {
    fn args(&self) -> Vec<Box<dyn Arg>> {
        vec![
            self.f.clone().into(),
            Box::new(self.vars.iter().map(|v| v.clone_box()).collect::<Vec<_>>()),
        ]
    }

    fn from_args(&self, args: Vec<Box<dyn Arg>>) -> Box<dyn Expr> {
        let vars = (&*args[1]) as &dyn Any;
        let vars = vars.downcast_ref::<Vec<Box<dyn Expr>>>().unwrap();
        let vars = vars
            .iter()
            .map(|v| v.as_symbol().expect("Not a symbol"))
            .collect();
        Box::new(Diff {
            f: args[0].clone().into(),
            vars,
        })
    }

    fn clone_box(&self) -> Box<dyn Expr> {
        Box::new(self.clone())
    }

    fn str(&self) -> String {
        let exponent = if self.vars.len() > 1 {
            format!("^{}", self.vars.len())
        } else {
            "".to_string()
        };
        format!(
            "∂{}{} / ∂{}",
            exponent,
            self.f.str(),
            self.vars.iter().map(|x| x.str()).collect::<String>()
        )
    }
}

#[derive(Clone)]
pub struct Func {
    name: String,
    args: Vec<Symbol>,
}

impl Func {
    pub fn new<'a, T: IntoIterator<Item = &'a str>>(name: &str, args: T) -> Self {
        Func {
            name: name.to_string(),
            args: args
                .into_iter()
                .map(|s| Symbol {
                    name: s.to_string(),
                })
                .collect(),
        }
    }

    pub fn time_discretize(&self) -> [Func; 2] {
        return [
            Func {
                name: format!("{}^n-1", self.name),
                args: self.args.clone(),
            },
            Func {
                name: format!("{}^n", self.name),
                args: self.args.clone(),
            },
        ];
    }
}

impl Expr for Func {
    fn args(&self) -> Vec<Box<dyn Arg>> {
        vec![
            Box::new(self.name.clone()),
            Box::new(self.args.iter().map(|v| v.clone_box()).collect::<Vec<_>>()),
        ]
    }

    fn from_args(&self, args: Vec<Box<dyn Arg>>) -> Box<dyn Expr> {
        let name = args[0]
            .as_any()
            .downcast_ref::<String>()
            .expect("First arg should be string")
            .clone();
        let params = args[1]
            .as_any()
            .downcast_ref::<Vec<Box<dyn Expr>>>()
            .unwrap();
        let params: Vec<_> = params
            .iter()
            .map(|v| v.as_symbol().expect("Not a symbol"))
            .collect();
        Box::new(Func { name, args: params })
    }

    fn clone_box(&self) -> Box<dyn Expr> {
        Box::new(self.clone())
    }

    fn str(&self) -> String {
        format!(
            "{}",
            self.name,
            // self.args.iter().map(|x| x.str()).collect::<String>()
        )
    }
}

impl fmt::Debug for Func {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.str())
    }
}
