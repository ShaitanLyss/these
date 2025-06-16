use super::*;
use indexmap::IndexMap;

#[derive(Clone)]
pub struct Mul {
    pub operands: Vec<Box<dyn Expr>>,
}

impl Expr for Mul {
    fn known_expr(&self) -> KnownExpr {
        KnownExpr::Mul(self)
    }
    fn get_ref<'a>(&'a self) -> &'a dyn Expr {
        self as &dyn Expr
    }

    fn as_mul(&self) -> Option<&Mul> {
        Some(self)
    }
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
                KnownExpr::Pow(pow) if self.operands.len() > 1 => format!("({})", pow.str()),
                KnownExpr::Rational(r) if self.operands.len() > 1 => format!("({})", r.str()),
                KnownExpr::Symbol(Symbol { name })
                    if i < self.operands.len() - 1 && name.len() > 1 =>
                {
                    format!("{name}.")
                }
                _ => op.str(),
            })
            .collect();
        format!("{}", pieces.join(""))
    }

    fn is_number(&self) -> bool {
        self.operands.iter().all(|op| op.is_number())
    }

    fn to_cpp(&self) -> String {
        let mut ops = self.operands.iter().peekable();
        let mut res = String::new();
        // If expression starts with -1, transform it into -
        if let Some(first_op) = ops.peek()
            && first_op.is_neg_one()
        {
            ops.next();
            res += "-";
        }
        ops.map(|op| match op.known_expr() {
            KnownExpr::Add(_) if self.operands.len() > 1 => format!("({})", op.to_cpp()),
            KnownExpr::Pow(pow) if self.operands.len() > 1 => format!("({})", pow.to_cpp()),
            KnownExpr::Rational(r) if self.operands.len() > 1 => format!("({})", r.to_cpp()),
            _ => op.to_cpp(),
        })
        .enumerate()
        .for_each(|(i, op)| {
            if i > 0 {
                res += " * ";
            }
            res += &op
        });
        res
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

    pub fn new_move(operands: Vec<Box<dyn Expr>>) -> Self {
        Mul { operands }
    }
}

impl<E: Expr> std::ops::Mul<&E> for Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn mul(self, rhs: &E) -> Self::Output {
        &*self * rhs.get_ref()
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

impl std::ops::Mul<&dyn Expr> for &Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn mul(self, rhs: &dyn Expr) -> Self::Output {
        &**self * rhs
    }
}

impl std::ops::Mul<isize> for Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn mul(self, rhs: isize) -> Self::Output {
        Integer::new_box(rhs) * &*self
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

impl std::ops::MulAssign for Box<dyn Expr> {
    fn mul_assign(&mut self, rhs: Box<dyn Expr>) {
        *self *= &*rhs;
    }
}

impl std::ops::Mul for &dyn Expr {
    type Output = Box<dyn Expr>;

    fn mul(self, rhs: Self) -> Self::Output {
        if self.is_zero() || rhs.is_zero() {
            return Integer::new_box(0);
        }
        if self.is_one() {
            return rhs.clone_box();
        }
        if rhs.is_one() {
            return self.clone_box();
        }

        match (self.known_expr(), rhs.known_expr()) {
            (KnownExpr::Rational(a), KnownExpr::Rational(b)) => return Box::new(*a * *b),
            (KnownExpr::Integer(a), KnownExpr::Integer(b)) => {
                return Integer::new_box(a.value * b.value);
            }
            (KnownExpr::Integer(a), KnownExpr::Rational(b)) => return Box::new(*b * a),
            (KnownExpr::Rational(a), KnownExpr::Integer(b)) => return Box::new(*a * b),
            (KnownExpr::Pow(a), KnownExpr::Pow(b))
                if a.base().is_number()
                    && b.base().is_number()
                    && b.exponent().is_number()
                    && a.exponent() == b.exponent() =>
            {
                return (a.base() * b.base()).pow(&a.exponent().clone_box());
            }
            _ => (),
        }

        let (coeff_a, lhs) = self.get_coeff();
        let (coeff_b, rhs) = rhs.get_coeff();

        let coeff = (coeff_a) * coeff_b;
        let mut new_operands: Vec<&Box<dyn Expr>> = Vec::new();

        match (
            KnownExpr::from_expr_box(&lhs),
            KnownExpr::from_expr_box(&rhs),
        ) {
            (KnownExpr::Mul(Mul { operands: a }), KnownExpr::Mul(Mul { operands: b })) => {
                a.iter()
                    .chain(b.iter())
                    .for_each(|op| new_operands.push(&*op));
            }
            (_, KnownExpr::Mul(Mul { operands })) => {
                if !lhs.is_one() {
                    new_operands.push(&lhs);
                }
                operands.iter().for_each(|op| new_operands.push(&*op));
            }
            (KnownExpr::Mul(Mul { operands }), _) => {
                operands.iter().for_each(|op| new_operands.push(&*op));
                if !rhs.is_one() {
                    new_operands.push(&rhs);
                }
            }

            _ => {
                if !lhs.is_one() {
                    new_operands.push(&lhs);
                }
                if !rhs.is_one() {
                    new_operands.push(&rhs);
                }
            }
        }
        let coeff = coeff.simplify();
        if !coeff.is_one() {
            new_operands.insert(0, &coeff);
        }

        let mut operands_exponents: IndexMap<Box<dyn Expr>, Box<dyn Expr>> = IndexMap::new();

        for op in new_operands
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
        let mut new_operands = Vec::with_capacity(operands_exponents.len());

        for (expr, exponent) in operands_exponents {
            if exponent.is_zero() {
                continue;
            }

            if exponent.is_one() {
                new_operands.push(expr);
            } else {
                new_operands.push(Box::new(Pow {
                    base: expr,
                    exponent,
                }));
            }
        }

        if new_operands.len() == 0 {
            return Integer::one_box();
        }

        if new_operands.len() == 1 {
            return new_operands[0].clone_box();
        }

        Box::new(Mul {
            operands: new_operands,
        })
    }
}

impl std::ops::Mul<Box<dyn Expr>> for &dyn Expr {
    type Output = Box<dyn Expr>;

    fn mul(self, rhs: Box<dyn Expr>) -> Self::Output {
        self * &*rhs
    }
}

impl std::ops::Div for &dyn Expr {
    type Output = Box<dyn Expr>;

    fn div(self, rhs: Self) -> Self::Output {
        self * rhs.ipow(-1)
    }
}
impl std::ops::Div<&dyn Expr> for Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn div(self, rhs: &dyn Expr) -> Self::Output {
        &*self / rhs
    }
}

impl<E: Expr> std::ops::Div<&E> for Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn div(self, rhs: &E) -> Self::Output {
        &*self / rhs.get_ref()
    }
}

impl std::ops::Div for Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn div(self, rhs: Box<dyn Expr>) -> Self::Output {
        &*self / &*rhs
    }
}

impl std::ops::Div<&Box<dyn Expr>> for Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn div(self, rhs: &Box<dyn Expr>) -> Self::Output {
        &*self / &**rhs
    }
}

impl std::ops::DivAssign<&dyn Expr> for Box<dyn Expr> {
    fn div_assign(&mut self, rhs: &dyn Expr) {
        *self = &**self / rhs
    }
}

#[cfg(test)]
mod tests {
    use crate::{symbol, symbols};

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

    #[test]
    fn test_div() {
        let a = Symbol::new_box("a");
        let b = Symbol::new_box("b");
        let c = Symbol::new_box("c");
        let expr = (a - b) / c;
        assert_eq!(
            expr.srepr(),
            "Mul(Add(Symbol(a), Mul(Integer(-1), Symbol(b))), Pow(Symbol(c), Integer(-1)))"
        );
    }

    #[test]
    fn test_div_of_product_simplifies() {
        let [a, b, c] = symbols!("a", "b", "c");

        assert_eq!(&(a * b / (a * c)), &(b / c));
    }

    #[test]
    #[ignore]
    fn test_simplify_frac_mul() {
        let expr = Mul::new_move(vec![Rational::new_box(1, 2), Rational::new_box(1, 2)]);

        assert_eq!(expr.simplify().srepr(), "")
    }

    #[test]
    fn test_weird_issue() {
        let a = symbol!("a");
        let expr = (a - Integer::new(1).get_ref()) * a;
        let expr = expr.subs(&[[a.clone_box(), Rational::new_box(1, 2)]]);

        assert_eq!(&expr.expand().simplify(), &Rational::new_box(-1, 4))
    }
}
