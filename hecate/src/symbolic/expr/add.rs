use super::*;

#[derive(Clone)]
pub struct Add {
    pub operands: Vec<Box<dyn Expr>>,
}

impl Add {
    pub fn new_box(operands: Vec<&Box<dyn Expr>>) -> Box<dyn Expr> {
        Box::new(Add {
            operands: operands.iter().copied().cloned().collect(),
        })
    }

    pub fn new<'a, Ops: IntoIterator<Item = &'a dyn Expr>>(operands: Ops) -> Self {
        Add {
            operands: operands.into_iter().map(|e| e.clone_box()).collect(),
        }
    }
}

impl From<Vec<&Box<dyn Expr>>> for Add {
    fn from(value: Vec<&Box<dyn Expr>>) -> Self {
        Add::new(value.iter().map(|x| &***x).collect::<Vec<_>>())
    }
}

impl Expr for Add {
    fn for_each_arg(&self, f: &mut dyn FnMut(&dyn Arg) -> ()) {
        self.operands.iter().for_each(|e| f(&**e));
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
            .map(|(i, op)| match KnownExpr::from_expr_box(op) {
                KnownExpr::Mul(Mul { operands }) if operands.len() > 0 && i > 0 => {
                    match KnownExpr::from_expr_box(&operands[0]) {
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

    fn expand(&self) -> Box<dyn Expr> {
        let operands: Vec<Box<dyn Expr>> = self.operands.iter().flat_map(|op| {
            let op = op.expand();
            
            match KnownExpr::from_expr_box(&op) {
                KnownExpr::Add(Add { operands }) => {
                    operands.clone()
                }
                _ => vec!(op.clone_box())
            }

        }).collect();

        if operands.len() == 0 {
            Integer::new_box(0)
        } else if operands.len() == 1 {
            operands[0].clone()
        } else {
            Box::new(Add {operands})
        }
        
    }
}

impl std::fmt::Debug for Add {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.srepr())
    }
}

impl std::ops::Add for &dyn Expr {
    type Output = Box<dyn Expr>;

    fn add(self, rhs: Self) -> Self::Output {
        match (KnownExpr::from_expr(self), KnownExpr::from_expr(rhs)) {
            (KnownExpr::Add(Add { operands: ops_a }), KnownExpr::Add(Add { operands: ops_b })) => {
                let operands: Vec<_> = ops_a
                    .iter()
                    .chain(ops_b.iter())
                    .filter(|x| !x.is_zero())
                    .collect();

                if operands.len() == 0 {
                    Integer::new_box(0)
                } else if operands.len() == 1 {
                    operands[0].clone_box()
                } else {
                    Box::new(Add::from(operands))
                }
            }
            (KnownExpr::Add(Add { operands }), _) => {
                let mut operands = operands.clone();
                operands.push(rhs.clone_box());

                if operands.len() == 0 {
                    Integer::new_box(0)
                } else if operands.len() == 1 {
                    operands[0].clone_box()
                } else {
                    Box::new(Add { operands })
                }
            }
            (_, KnownExpr::Add(Add { operands })) => {
                let mut operands = operands.clone();
                operands.insert(0, self.clone_box());
                if operands.len() == 0 {
                    Integer::new_box(0)
                } else if operands.len() == 1 {
                    operands[0].clone_box()
                } else {
                    Box::new(Add { operands })
                }
            }
            _ => Box::new(Add::new([self, rhs])),
        }
    }
}
impl std::ops::Add for &Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn add(self, rhs: &Box<dyn Expr>) -> Self::Output {
        &**self + &**rhs
    }
}

impl std::ops::Add for Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn add(self, rhs: Box<dyn Expr>) -> Self::Output {
        &*self + &*rhs
    }
}
impl<'a> From<&'a Add> for &'a dyn Expr {
    fn from(value: &'a Add) -> Self {
        value as &'a dyn Expr
    }
}

impl std::ops::Mul<&dyn Expr> for Add {
    type Output = Mul;

    fn mul(self, rhs: &dyn Expr) -> Self::Output {
        Mul::new([&self as &dyn Expr, rhs])
    }
}

impl std::ops::Sub for &dyn Expr {
    type Output = Box<dyn Expr>;

    fn sub(self, rhs: Self) -> Self::Output {
        self + &*(-rhs)
    }
}
impl std::ops::Sub for &Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn sub(self, rhs: &Box<dyn Expr>) -> Self::Output {
        &**self - &**rhs
    }
}

impl std::ops::Sub<Box<dyn Expr>> for &Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn sub(self, rhs: Box<dyn Expr>) -> Self::Output {
        &**self - &*rhs
    }
}

impl std::ops::Sub<&Box<dyn Expr>> for Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn sub(self, rhs: &Box<dyn Expr>) -> Self::Output {
        &*self - &**rhs
    }
}

impl std::ops::Sub for Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn sub(self, rhs: Box<dyn Expr>) -> Self::Output {
        &*self - &*rhs
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn test_srepr() {
        let a = Symbol::new_box("a");
        let b = Symbol::new_box("b");

        let expr = a - b;
        let expected = "Add(Symbol(a), Mul(Integer(-1), Symbol(b)))";

        assert_eq!(expr.srepr(), expected);
    }

    #[test]
    fn test_srepr_2() {
        let a = Symbol::new_box("a");
        let b = Symbol::new_box("b");
        let c = Symbol::new_box("c");

        let expr = a - b * c;
        let expected = "Add(Symbol(a), Mul(Integer(-1), Symbol(b), Symbol(c)))";

        assert_eq!(expr.srepr(), expected);
    }
}
