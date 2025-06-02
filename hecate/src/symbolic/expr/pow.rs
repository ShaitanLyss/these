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

    fn as_pow(&self) -> Option<&Pow> {
        Some(self)
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

    fn is_number(&self) -> bool {
        self.base.is_number() && self.exponent.is_number()
    }

    fn str(&self) -> String {
        match (
            self.base.known_expr(),
            KnownExpr::from_expr_box(&self.exponent),
        ) {
            (KnownExpr::Rational(r), _) => format!("({})^{}", r.str(), self.exponent.str()),
            (_, KnownExpr::Integer(Integer { value: -1 })) => format!("1 / {}", self.base.str()),

            _ => format!("{}^{}", self.base.str(), self.exponent.str()),
        }
    }

    fn get_exponent(&self) -> (Box<dyn Expr>, Box<dyn Expr>) {
        (self.base.clone(), self.exponent.clone())
    }

    fn is_one(&self) -> bool {
        self.exponent.is_neg_one() && self.base.is_one() || self.exponent.is_zero()
    }

    fn to_cpp(&self) -> String {
        let exponent = &self.exponent;
        if exponent.is_zero() {
            String::from("1")
        } else if exponent.is_one() {
            self.base.to_cpp()
        } else if exponent.is_neg_one() {
            format!("1 / {}", self.base.to_cpp())
        } else {
            if let KnownExpr::Integer(Integer { value: n }) = exponent.known_expr()
                && *n > 0
            {
                let n = *n as usize;
                let base_cpp = self.base.to_cpp();

                let mut res = String::with_capacity((base_cpp.len() + 3) * (n - 1) + base_cpp.len() );
                res += &base_cpp;
                for _ in 1..n {
                    res += " * ";
                    res += &base_cpp;
                }
                res


            } else {
                format!("pow({}, {})", self.base.to_cpp(), self.exponent.to_cpp())
            }
        }
    }

    fn simplify(&self) -> Box<dyn Expr> {
        let Pow { base, exponent } = self;

        if exponent.is_one() {
            if let Some(pow) = base.as_pow() {
                pow.simplify()
            } else {
                base.simplify()
            }
        } else if exponent.is_zero() {
            Integer::one_box()
        } else if base.is_one() {
            Integer::one_box()
        } else if let Some(pow) = base.as_pow() {
            let base = pow.base.clone_box();
            let exponent = &pow.exponent * exponent;
            Pow::pow(base, exponent)
        } else {
            match (base.known_expr(), exponent.known_expr()) {
                (
                    KnownExpr::Rational(Rational { num, denom }),
                    KnownExpr::Integer(Integer { value }),
                ) if *value > 0 => {
                    Rational::new_box(num.pow(*value as u32), denom.pow(*value as u32))
                }
                (
                    KnownExpr::Integer(Integer { value: n }),
                    KnownExpr::Integer(Integer { value: e }),
                ) if *e > 0 => Integer::new_box(n.pow(*e as u32)),
                _ => self.clone_box(),
            }
        }
    }
}

impl Pow {
    pub fn new(base: &Box<dyn Expr>, exponent: &Box<dyn Expr>) -> Box<dyn Expr> {
        Box::new(Pow {
            base: base.clone(),
            exponent: exponent.clone(),
        })
    }

    pub fn new_move(base: Box<dyn Expr>, exponent: Box<dyn Expr>) -> Pow {
        Pow { base, exponent }
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
        match (base.clone().known_expr(), exponent.known_expr()) {
            (KnownExpr::Rational(r), KnownExpr::Integer(i)) if i.value > 0 => {
                return Rational::new_box(r.num.pow(i.value as u32), r.denom.pow(i.value as u32));
            }
            (KnownExpr::Rational(r), _) => {
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
            (
                KnownExpr::Pow(Pow {
                    base: base_base,
                    exponent: base_exponent,
                }),
                _,
            ) => {
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
            match (base.as_f64(), exponent.as_f64()) {
                (Some(b), Some(e)) => {
                    let res = b.powf(e);

                    if res.fract() == 0. {
                        return Integer::new_box(res.to_isize().unwrap());
                    }
                }
                _ => (),
            }
            Pow::new_box(base.clone(), exponent)
        }
    }
}

impl fmt::Debug for Pow {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{:?}", self.get_ref())
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

    #[test]
    fn test_sqrt_4_simplifies() {
        assert_eq!(
            Integer::new(4).pow(&Rational::new_box(1, 2)).srepr(),
            "Integer(2)"
        )
    }

    #[test]
    fn test_mul_sqrts() {
        assert_eq!(
            (Integer::new_box(2).sqrt() * Integer::new_box(3).sqrt()).srepr(),
            "Pow(Integer(6), Rational(1, 2))"
        )
    }

    #[test]
    fn test_simplify_pow() {
        assert_eq!(
            Pow {
                base: Pow::new_box(Symbol::new_box("x"), Integer::new_box(2)),
                exponent: Integer::new_box(3)
            }
            .simplify()
            .get_ref(),
            Pow {
                base: Symbol::new_box("x"),
                exponent: Integer::new_box(6)
            }
            .get_ref()
        )
    }

    #[test]
    fn test_simplify_rational_pow() {
        assert_eq!(Rational::new(2, 3).ipow(2), Rational::new_box(4, 9))
    }
}
