use super::*;

#[derive(Clone)]
pub struct Pow {
    pub base: Box<dyn Expr>,
    pub exponent: Box<dyn Expr>,
}

impl Expr for Pow {
    fn known_expr(&self) -> KnownExpr {
        KnownExpr::Pow(self)
    }
    fn get_ref<'a>(&'a self) -> &'a dyn Expr {
        self as &dyn Expr
    }
    fn for_each_arg(&self, f: &mut dyn FnMut(&dyn Arg) -> ()) {
        f(&*self.base);
        f(&*self.exponent)
    }

    fn from_args(&self, args: Vec<Box<dyn Arg>>) -> Box<dyn Expr> {
        Box::new(Pow {
            base: args[0].clone().into(),
            exponent: args[1].clone().into(),
        })
    }

    fn clone_box(&self) -> Box<dyn Expr> {
        Box::new(self.clone())
    }

    fn str(&self) -> String {
        match KnownExpr::from_expr_box(&self.exponent) {
            KnownExpr::Integer(Integer { value: -1 }) => format!(" / {}", self.base.str()),

            _ => format!("{}^{}", self.base.str(), self.exponent.str()),
        }
    }

    fn get_exponent(&self) -> (Box<dyn Expr>, Box<dyn Expr>) {
        (self.base.clone(), self.exponent.clone())
    }

    fn is_one(&self) -> bool {
        self.exponent.is_neg_one() && self.base.is_one() || self.exponent.is_zero()
    }
}

impl Pow {
    pub fn new(base: &Box<dyn Expr>, exponent: &Box<dyn Expr>) -> Box<dyn Expr> {
        Box::new(Pow {
            base: base.clone(),
            exponent: exponent.clone(),
        })
    }

    pub fn new_box(base: Box<dyn Expr>, exponent: Box<dyn Expr>) -> Box<dyn Expr> {
        Box::new(Pow { base, exponent })
    }
    pub fn base(&self) -> &dyn Expr {
        &*self.base
    }

    pub fn exponent(&self) -> &dyn Expr {
        &*self.exponent
    }

    pub fn pow(mut base: Box<dyn Expr>, mut exponent: Box<dyn Expr>) -> Box<dyn Expr> {
        match KnownExpr::from_expr(base.clone_box().get_ref()) {
            KnownExpr::Rational(r) => {
                let mut r = r.clone();
                if exponent.is_negative_number() {
                    r.invert();
                    exponent = match dbg!(&exponent).known_expr() {
                        KnownExpr::Integer(i) => Box::new(-i),
                        KnownExpr::Rational(r) => Box::new(-r),
                        _ => panic!("{:?}", exponent.clone_box()),
                    };
                }
                base = r.simplify().clone_box();
            }
            KnownExpr::Pow(Pow {
                base: base_base,
                exponent: base_exponent,
            }) => {
                base = base_base.clone_box();
                exponent = base_exponent.get_ref() * exponent.get_ref();
            }
            _ => (),
        }
        if exponent.is_one() {
            base.clone()
        } else if exponent.is_zero() {
            Integer::one_box()
        } else {
            Pow::new_box(base.clone(), exponent)
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn test_pow_simplify() {
        let expr = Symbol::new("x").ipow(2).ipow(3);

        assert_eq!(expr.srepr(), "Pow(Symbol(x), Integer(6))")
    }

    #[test]
    fn test_sqrt_2() {
        assert_eq!(
            Integer::new(2).sqrt().srepr(),
            "Pow(Integer(2), Rational(1, 2))"
        )
    }
}
