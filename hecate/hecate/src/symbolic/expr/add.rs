use indexmap::IndexMap;

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

    pub fn new_box_v2(operands: Vec<Box<dyn Expr>>) -> Box<dyn Expr> {
        if operands.len() == 0 {
            Integer::new_box(0)
        } else if operands.len() == 1 {
            operands[0].clone_box()
        } else {
            Box::new(Add { operands })
        }
    }

    pub fn new<'a, Ops: IntoIterator<Item = &'a dyn Expr>>(operands: Ops) -> Self {
        Add {
            operands: operands.into_iter().map(|e| e.clone_box()).collect(),
        }
    }

    pub fn new_v2(ops: Vec<Box<dyn Expr>>) -> Self {
        Add { operands: ops }
    }
}

impl From<Vec<&Box<dyn Expr>>> for Add {
    fn from(value: Vec<&Box<dyn Expr>>) -> Self {
        Add::new(value.iter().map(|x| &***x).collect::<Vec<_>>())
    }
}

impl Expr for Add {
    fn known_expr(&self) -> KnownExpr {
        KnownExpr::Add(self)
    }
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
                        // KnownExpr::Rational(r) if *r < 0 => {
                        //     let mul = op.str();
                        //     let len = mul.len();
                        //     format!(" - {}", mul[if len > 1 { 2} else {0}..if len > 1 { -1} else {}].to_string())
                        //
                        // }
                        _ => format!(" + {}", op.str()),
                    }
                }

                KnownExpr::Integer(integer) if integer.value < 0 => {
                    format!(" - {}", op.str()[1..].to_string())
                }

                _ if i > 0 => format!(" + {}", op.str()),
                _ => op.str(),
            })
            .collect();
        format!("{}", pieces.join(""))
    }

    // Same as str(&self) but calls to_cpp() on each operand
    fn to_cpp(&self) -> String {
        let pieces: Vec<_> = self
            .operands
            .iter()
            .enumerate()
            .map(|(i, op)| match KnownExpr::from_expr_box(op) {
                KnownExpr::Mul(Mul { operands }) if operands.len() > 0 && i > 0 => {
                    match KnownExpr::from_expr_box(&operands[0]) {
                        KnownExpr::Integer(Integer { value: -1 }) => {
                            let mul = op.to_cpp();
                            format!(" - {}", mul[1..].to_string())
                        }
                        _ => format!(" + {}", op.to_cpp()),
                    }
                }
                _ if i > 0 => format!(" + {}", op.to_cpp()),
                _ => op.to_cpp(),
            })
            .collect();
        format!("{}", pieces.join(""))
    }

    fn simplify(&self) -> Box<dyn Expr> {
        if self.operands.len() == 2 {
            match (self.operands[0].known_expr(), self.operands[1].known_expr()) {
                (KnownExpr::Integer(a), KnownExpr::Integer(b)) => {
                    return Integer::new_box(a.value + b.value);
                }
                (KnownExpr::Rational(r1), KnownExpr::Rational(r2)) => return (r1 + r2).simplify(),
                (KnownExpr::Integer(a), KnownExpr::Rational(r2)) => return a + r2,
                (KnownExpr::Rational(r1), KnownExpr::Integer(b)) => return r1 + b,
                _ => (),
            }
        }
        return self.from_args(
            self.args()
                .iter()
                .map(|a| a.map_expr(&|e| e.simplify()))
                .collect(),
        );
        // For some reason the code below isn't equivalent
        // self.from_args(self.args_map_exprs(&|expr| match expr.known_expr() {
        //     _ => expr.simplify(),
        // }))
    }

    fn expand(&self) -> Box<dyn Expr> {
        let operands: Vec<Box<dyn Expr>> = self
            .operands
            .iter()
            .flat_map(|op| {
                let op = op.expand();

                match KnownExpr::from_expr_box(&op) {
                    KnownExpr::Add(Add { operands }) => operands.clone(),
                    _ => vec![op.clone_box()],
                }
            })
            .collect();

        if operands.len() == 0 {
            Integer::new_box(0)
        } else if operands.len() == 1 {
            operands[0].clone()
        } else {
            Box::new(Add { operands })
        }
    }

    fn get_ref<'a>(&'a self) -> &'a dyn Expr {
        self as &dyn Expr
    }

    fn terms<'a>(&'a self) -> Box<dyn Iterator<Item = &'a dyn Expr> + 'a> {
        Box::new(self.operands.iter().map(|o| &**o))
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
        if self.is_zero() {
            return rhs.clone_box();
        }
        if rhs.is_zero() {
            return self.clone_box();
        }
        if self == &*-rhs {
            return Integer::new_box(0);
        }

        let mut term_coeffs: IndexMap<Box<dyn Expr>, Rational> = IndexMap::new();

        match (KnownExpr::from_expr(self), KnownExpr::from_expr(rhs)) {
            (
                KnownExpr::Integer(Integer { value: a }),
                KnownExpr::Integer(Integer { value: b }),
            ) => return Integer::new_box(a + b),
            (KnownExpr::Rational(r1), KnownExpr::Rational(r2)) => return Box::new(r1 + r2),
            (KnownExpr::Add(Add { operands: ops_a }), KnownExpr::Add(Add { operands: ops_b })) => {
                ops_a
                    .iter()
                    .chain(ops_b.iter())
                    .filter(|x| !x.is_zero())
                    .for_each(|op| {
                        let (coeff, expr) = op.get_coeff();
                        let entry = term_coeffs.entry(expr.clone()).or_insert(Rational::zero());
                        *entry += coeff;
                    });
            }
            (KnownExpr::Add(Add { operands }), _) => {
                operands
                    .iter()
                    .map(|e| e.get_ref())
                    .chain(iter::once(rhs))
                    .filter(|x| !x.is_zero())
                    .for_each(|op| {
                        let (coeff, expr) = op.get_coeff();
                        let entry = term_coeffs.entry(expr.clone()).or_insert(Rational::zero());
                        *entry += coeff;
                    });
            }
            (_, KnownExpr::Add(Add { operands })) => {
                iter::once(self)
                    .chain(operands.iter().map(|e| e.get_ref()))
                    .filter(|x| !x.is_zero())
                    .for_each(|op| {
                        let (coeff, expr) = op.get_coeff();
                        let entry = term_coeffs.entry(expr.clone()).or_insert(Rational::zero());
                        *entry += coeff;
                    });
            }
            _ => {
                iter::once(self)
                    .chain(iter::once(rhs))
                    .filter(|x| !x.is_zero())
                    .for_each(|op| {
                        let (coeff, expr) = op.get_coeff();
                        let entry = term_coeffs.entry(expr.clone()).or_insert(Rational::zero());
                        *entry += coeff;
                    });
            }
        };

        let mut operands: Vec<Box<dyn Expr>> = Vec::with_capacity(term_coeffs.len());

        for (expr, coeff) in term_coeffs {
            if coeff.is_zero() {
                continue;
            }

            if !coeff.is_one() {
                operands.push(coeff.simplify() * expr);
            } else {
                operands.push(expr)
            }
        }

        if operands.len() == 0 {
            Integer::new_box(0)
        } else if operands.len() == 1 {
            operands[0].clone_box()
        } else {
            Box::new(Add { operands })
        }
    }
}
impl std::ops::Add for &Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn add(self, rhs: &Box<dyn Expr>) -> Self::Output {
        &**self + &**rhs
    }
}

impl std::ops::Add<Box<dyn Expr>> for &dyn Expr {
    type Output = Box<dyn Expr>;

    fn add(self, rhs: Box<dyn Expr>) -> Self::Output {
        self + &*rhs
    }
}

impl std::ops::Add for Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn add(self, rhs: Box<dyn Expr>) -> Self::Output {
        &*self + &*rhs
    }
}

impl std::ops::AddAssign for Box<dyn Expr> {
    fn add_assign(&mut self, rhs: Self) {
        *self = self.get_ref() + rhs.get_ref();
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

impl std::ops::SubAssign<&dyn Expr> for Box<dyn Expr> {
    fn sub_assign(&mut self, rhs: &dyn Expr) {
        *self = &**self - rhs;
    }
}

impl std::ops::Add<&dyn Expr> for Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn add(self, rhs: &dyn Expr) -> Self::Output {
        &*self + rhs
    }
}

impl std::ops::Add<isize> for Box<dyn Expr> {
    type Output = Box<dyn Expr>;

    fn add(self, rhs: isize) -> Self::Output {
        &*self + Integer::new_box(rhs)
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
