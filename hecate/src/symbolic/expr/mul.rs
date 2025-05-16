use super::*;

#[derive(Clone)]
pub struct Mul {
    pub operands: Vec<Box<dyn Expr>>,
}

impl Expr for Mul {
    fn for_each_arg(&self, f: &mut dyn FnMut(&dyn Arg) -> ()) {
        self.operands.iter().for_each(|e| f(&**e));
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
            .map(|(i, op)| match KnownExpr::from_expr_box(op) {
                KnownExpr::Integer(Integer { value: -1 }) if i == 0 => "-".to_string(),
                KnownExpr::Add(_) if self.operands.len() > 1 => format!("({})", op.str()),
                _ => op.str(),
            })
            .collect();
        format!("{}", pieces.join(""))
    }

    fn expand(&self) -> Box<dyn Expr> {
        // 2 * (x + y) * (z + g) = 2xz + 2xg + 2yz + 2yg
        // 2
        // (x + y)

        // xy -> xy

        // (x + y) * z -> xz + yz

        let mut res: Vec<Box<dyn Expr>> = Vec::with_capacity(self.operands.len());
        res.push(Integer::new_box(1));

        for op in &self.operands {
            let op = op.expand();

            match KnownExpr::from_expr_box(&op) {
                KnownExpr::Add(Add { operands }) => {
                    res = res
                        .iter()
                        .flat_map(|x| {
                            operands
                                .iter()
                                .flat_map(|expr| match KnownExpr::from_expr_box(expr) {
                                    KnownExpr::Add(Add { operands }) => operands.clone(),
                                    _ => vec![expr.clone_box()],
                                })
                                .map(move |addendum| x * &addendum)
                        })
                        .collect();
                }
                _ => {
                    for new_op in &mut res {
                        *new_op *= &op;
                    }
                }
            }
        }

        if res.len() == 1 {
            res[0].clone_box()
        } else {
            Box::new(Add { operands: res })
        }
    }
}

// trait ArgIterOps {
//     fn map_exprs(&self) ->
// }
//
// impl

impl Mul {
    pub fn new_box(operands: Vec<&Box<dyn Expr>>) -> Box<dyn Expr> {
        Box::new(Mul {
            operands: operands.iter().copied().cloned().collect(),
        })
    }

    pub fn new<'a, Ops: IntoIterator<Item = &'a dyn Expr>>(operands: Ops) -> Self {
        Mul {
            operands: operands.into_iter().map(|e| e.clone_box()).collect(),
        }
    }
}

impl<E: Expr> std::ops::Mul<&E> for Mul {
    type Output = Mul;

    fn mul(self, rhs: &E) -> Self::Output {
        let mut operands = self.operands.clone();
        operands.push(rhs.clone_box());
        Mul { operands }
    }
}

impl<E: Expr> std::ops::Mul<&E> for Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn mul(self, rhs: &E) -> Self::Output {
        &*self * rhs
    }
}

impl std::ops::Mul for &Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn mul(self, rhs: &Box<dyn Expr>) -> Self::Output {
        &**self * &**rhs
    }
}

impl std::ops::Mul for Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn mul(self, rhs: Box<dyn Expr>) -> Self::Output {
        &*self * &*rhs
    }
}

impl std::ops::Mul<&dyn Expr> for Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn mul(self, rhs: &dyn Expr) -> Self::Output {
        &*self * rhs
    }
}

impl std::ops::Mul<&Box<dyn Expr>> for Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn mul(self, rhs: &Box<dyn Expr>) -> Self::Output {
        &*self * &**rhs
    }
}

impl std::ops::Add for Mul {
    type Output = Add;

    fn add(self, rhs: Self) -> Self::Output {
        Add::new([&self as &dyn Expr, &rhs as &dyn Expr])
    }
}

impl std::ops::MulAssign<&dyn Expr> for Box<dyn Expr> {
    fn mul_assign(&mut self, rhs: &dyn Expr) {
        *self = &**self * rhs;
    }
}

impl std::ops::MulAssign<&Box<dyn Expr>> for Box<dyn Expr> {
    fn mul_assign(&mut self, rhs: &Box<dyn Expr>) {
        *self *= &**rhs;
    }
}

impl std::ops::Mul for &dyn Expr {
    type Output = Box<dyn Expr>;

    fn mul(self, rhs: Self) -> Self::Output {
        match (KnownExpr::from_expr(self), KnownExpr::from_expr(rhs)) {
            (KnownExpr::Mul(Mul { operands: ops_a }), KnownExpr::Mul(Mul { operands: ops_b })) => {
                let mut operands: Vec<Box<dyn Expr>> =
                    Vec::with_capacity(ops_a.len() + ops_b.len());
                let mut coeff: Option<isize> = None;

                for op in ops_a.iter().chain(ops_b.iter()) {
                    match KnownExpr::from_expr_box(op) {
                        KnownExpr::Integer(Integer { value }) => {
                            if let Some(prev_coeff) = coeff {
                                coeff = Some(prev_coeff * value)
                            } else {
                                coeff = Some(*value)
                            }
                        }

                        _ => operands.push(op.clone_box()),
                    }
                }

                if let Some(coeff) = coeff
                    && coeff != 1
                {
                    operands.insert(0, Integer::new_box(coeff));
                }

                if operands.len() == 1 {
                    return operands[0].clone_box();
                }

                Box::new(Mul { operands })
            }
            (_, KnownExpr::Mul(Mul { operands })) => {
                let mut new_operands = Vec::with_capacity(operands.len() + 1);
                new_operands.push(self);
                operands
                    .iter()
                    .filter_map(|o| if o.is_one() { None } else { Some(&**o) })
                    .for_each(|o| new_operands.push(o));

                if operands.len() == 0 {
                    panic!("Need to fix");
                    Integer::new_box(0)
                } else if operands.len() == 1 {
                    new_operands[0].clone_box()
                } else {
                    Box::new(Mul::new(new_operands))
                }
            }
            (KnownExpr::Mul(Mul { operands }), _) => {
                let mut operands: Vec<_> = operands
                    .iter()
                    .filter_map(|o| if o.is_one() { None } else { Some(&**o) })
                    .collect();
                operands.push(rhs);

                if operands.len() == 0 {
                    todo!()
                } else if operands.len() == 1 {
                    operands[0].clone_box()
                } else {
                    Box::new(Mul::new(operands))
                }
            }
            _ => Box::new(Mul::new([self, rhs])),
        }
    }
}

#[cfg(test)]
mod tests {

    use super::*;

    #[test]
    fn test_srepr() {
        let a = Symbol::new_box("a");
        let b = Symbol::new_box("b");
        let c = Symbol::new_box("c");
        let d = Symbol::new_box("d");

        let expr = a * b * c * d;
        let expected = "Mul(Symbol(a), Symbol(b), Symbol(c), Symbol(d))";

        assert_eq!(expr.srepr(), expected);
    }

    #[test]
    fn test_srepr_advanced() {
        let c = Symbol::new_box("c");
        let u = Symbol::new_box("u");
        let laplacian = Symbol::new_box("laplacian");

        let expr = -c.ipow(2) * laplacian * u;
        let expected = "Mul(Integer(-1), Pow(Symbol(c), Integer(2)), Symbol(Δ), Symbol(u))";

        assert_eq!(expr.srepr(), expected);
    }

    #[test]
    fn test_srepr_difficult() {
        let c = &Symbol::new_box("c");
        let u = &Symbol::new_box("u");
        let t = &Symbol::new_box("t");
        let laplacian = &Symbol::new_box("laplacian");

        let expr = &(Diff::new(u, vec![t, t]) - c.ipow(2) * laplacian * u);
        let expected = "Add(Diff(Symbol(u), (Symbol(t), Symbol(t))), Mul(Integer(-1), Pow(Symbol(c), Integer(2)), Symbol(Δ), Symbol(u)))";

        assert_eq!(expr.srepr(), expected);
    }
}
