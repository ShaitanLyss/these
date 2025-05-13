use std::any::Any;

pub mod expr;
pub mod abc;

use expr::Expr;

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
    fn args(&self) -> Vec<Box<dyn Expr>> {
        self.operands.clone()
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
                KnownExpr::Mul(Mul { operands }) if operands.len() > 0 => {
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

#[derive(Clone)]
pub struct Pow {
    base: Box<dyn Expr>,
    exponent: Box<dyn Expr>,
}

impl Expr for Pow {
    fn args(&self) -> Vec<Box<dyn Expr>> {
        vec![self.base.clone(), self.exponent.clone()]
    }

    fn clone_box(&self) -> Box<dyn Expr> {
        Box::new(self.clone())
    }

    fn str(&self) -> String {
        format!("{}^{}", self.base.str(), self.exponent.str())
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

#[derive(Clone)]
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
    fn args(&self) -> Vec<Box<dyn Expr>> {
        vec![]
    }

    fn clone_box(&self) -> Box<dyn Expr> {
        Box::new(self.clone())
    }

    fn str(&self) -> String {
        self.name.clone()
    }

    fn srepr(&self) -> String {
        format!("Symbol({})", self.name)
    }
}


pub enum KnownExpr<'a> {
    Add(&'a Add),
    Mul(&'a Mul),
    Pow(&'a Pow),
    Integer(&'a Integer),
    Symbol,
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
            KnownExpr::Symbol
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
    fn args(&self) -> Vec<Box<dyn Expr>> {
        self.operands.clone()
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
    fn args(&self) -> Vec<Box<dyn Expr>> {
        vec![]
    }

    fn clone_box(&self) -> Box<dyn Expr> {
        Box::new(self.clone())
    }

    fn str(&self) -> String {
        self.value.to_string()
    }

    fn srepr(&self) -> String {
        format!("Integer({})", self.value)
    }
}

impl Integer {
    pub fn new(value: isize) -> Box<dyn Expr> {
        Box::new(Integer { value })
    }
}


#[derive(Clone)]
pub struct Eq {
    lhs: Box<dyn Expr>,
    rhs: Box<dyn Expr>,
}

impl Eq {
    pub fn new(lhs: &Box<dyn Expr>, rhs: &Box<dyn Expr>) -> Box<dyn Expr> {
        Box::new(Eq {
            lhs: lhs.clone(),
            rhs: rhs.clone(),
        })
    }
}


impl Expr for Eq {
    fn args(&self) -> Vec<Box<dyn Expr>> {
        vec![self.lhs.clone(), self.rhs.clone()]
    }

    fn clone_box(&self) -> Box<dyn Expr> {
        Box::new(self.clone())
    }

    fn str(&self) -> String {
        format!("{} = {}", self.lhs.str(), self.rhs.str())
    }
}


#[derive(Clone)]
pub struct Integral {
    f: Box<dyn Expr>
}

impl Integral {
    pub fn new(f: &Box<dyn Expr>) -> Box<dyn Expr> {
        Box::new(Integral {
            f: f.clone()
        })
    }
}

impl Expr for Integral {
    fn args(&self) -> Vec<Box<dyn Expr>> {
        vec![self.f.clone()]
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
    vars: Vec<Box<dyn Expr>>
}

impl Diff {
    pub fn new<'a, It: IntoIterator<Item = &'a Box<dyn Expr>>>(f: &Box<dyn Expr>, vars: It) -> Box<dyn Expr> {
        Box::new(Diff {
            f: f.clone(),
            vars: vars.into_iter().cloned().collect()
        })
    }
}

impl Expr for Diff {
    fn args(&self) -> Vec<Box<dyn Expr>> {
        let mut res = vec![self.f.clone()];
        res.extend(self.vars.iter().cloned());
        res
    }

    fn clone_box(&self) -> Box<dyn Expr> {
        Box::new(self.clone())
    }

    fn str(&self) -> String {
        let exponent = if self.vars.len() > 1 { format!("^{}", self.vars.len()) } else { "".to_string() };
        format!("∂{}{} / ∂{}", exponent, self.f.str(), self.vars.iter().map(|x| x.str()).collect::<String>())
    }
}

