use num::integer::gcd;

use super::*;

#[derive(Clone, Copy)]
pub struct Rational {
    pub num: isize,
    pub denom: isize,
}

impl Expr for Rational {
    fn known_expr(&self) -> KnownExpr {
        KnownExpr::Rational(self)
    }
    fn for_each_arg(&self, f: &mut dyn FnMut(&dyn Arg) -> ()) {
        f(&self.num);
        f(&self.denom);
    }

    fn from_args(&self, args: Vec<Box<dyn Arg>>) -> Box<dyn Expr> {
        Box::new(Rational {
            num: *args[0].as_any().downcast_ref::<isize>().unwrap(),
            denom: *args[1].as_any().downcast_ref::<isize>().unwrap(),
        })
    }

    fn clone_box(&self) -> Box<dyn Expr> {
        Box::new(self.clone())
    }

    fn str(&self) -> String {
        format!("{}/{}", self.num, self.denom)
    }

    fn get_ref<'a>(&'a self) -> &'a dyn Expr {
        self as &dyn Expr
    }

    fn is_one(&self) -> bool {
        self.num == self.denom
    }

    fn is_zero(&self) -> bool {
        self.num == 0
    }

    fn is_neg_one(&self) -> bool {
        self.num == -self.denom
    }
    fn is_number(&self) -> bool {
        true
    }

    fn is_negative_number(&self) -> bool {
        self.num * self.denom < 0
    }

    fn as_f64(&self) -> Option<f64> {
        Some(self.num.to_f64().unwrap() / self.denom.to_f64().unwrap())
    }
    fn simplify(&self) -> Box<dyn Expr> {
        let mut res = self.clone();
        if self.num < 0 && self.denom < 0 {
            res.num *= -1;
            res.denom *= -1;
        }
        let d = gcd(self.num, self.denom);
        res.num /= d;
        res.denom /= d;
        if self.num % self.denom == 0 {
            Integer::new_box(self.num / self.denom)
        } else {
            Box::new(res)
        }
    }
}

impl Rational {
    pub fn new(num: isize, denom: isize) -> Self {
        Rational { num, denom }
    }

    pub fn new_box(num: isize, denom: isize) -> Box<dyn Expr> {
        Box::new(Rational { num, denom })
    }
    pub fn one() -> Self {
        Rational { num: 1, denom: 1 }
    }

    pub fn zero() -> Self {
        Rational { num: 0, denom: 1 }
    }

    pub fn invert(&mut self) {
        std::mem::swap(&mut self.num, &mut self.denom);
    }
}

// pub enum Coeff {
//     Rational(Rational),
//     Integer(Integer),
// }

impl std::fmt::Debug for Rational {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.srepr())
    }
}

pub trait ToInteger {
    fn to_integer(&self) -> Integer;
}

impl ToInteger for i32 {
    fn to_integer(&self) -> Integer {
        Integer::new(*self as isize)
    }
}

impl<N: ToInteger> From<N> for Rational {
    fn from(value: N) -> Self {
        Rational {
            num: value.to_integer().value,
            denom: 1,
        }
    }
}

impl<I: ToPrimitive> std::ops::Mul<I> for Rational {
    type Output = Rational;

    fn mul(self, rhs: I) -> Self::Output {
        Rational {
            num: self.num * rhs.to_isize().unwrap(),
            denom: self.denom,
        }
    }
}

// impl<T> PartialEq<T> for Rational where &T: Into<Rational> {}

impl<T: Copy + Into<Rational>> PartialEq<T> for Rational {
    fn eq(&self, other: &T) -> bool {
        let other: Rational = (*other).into();
        self.num * other.denom == self.denom * other.num
    }
}

impl std::cmp::Eq for Rational {}

// impl From<isize> for Rational {
//     fn from(value: isize) -> Self {
//         Rational {
//             num: value,
//             denom: 1,
//         }
//     }
// }

impl<T: Copy + Into<Rational>> PartialOrd<T> for Rational {
    fn partial_cmp(&self, other: &T) -> Option<std::cmp::Ordering> {
        let a: f64 = self.into();
        let b: Rational = (*other).into();
        let b: f64 = b.into();

        a.partial_cmp(&b)
    }
}

impl Ord for Rational {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        let a: f64 = self.into();
        let b: f64 = other.into();
        a.partial_cmp(&b).unwrap()
    }
}

impl From<&Rational> for f64 {
    fn from(Rational { num, denom }: &Rational) -> Self {
        *num as f64 / *denom as f64
    }
}

impl From<Rational> for f64 {
    fn from(Rational { num, denom }: Rational) -> Self {
        num as f64 / denom as f64
    }
}

impl std::ops::Add for &Rational {
    type Output = Rational;

    fn add(self, rhs: Self) -> Self::Output {
        Rational {
            num: self.num * rhs.denom + rhs.num * self.denom,
            denom: self.denom * rhs.denom,
        }
    }
}

impl std::ops::Add for Rational {
    type Output = Rational;

    fn add(self, rhs: Self) -> Self::Output {
        Rational {
            num: self.num * rhs.denom + rhs.num * self.denom,
            denom: self.denom * rhs.denom,
        }
    }
}

impl std::ops::AddAssign for Rational {
    fn add_assign(&mut self, rhs: Self) {
        let res = *self + rhs;

        self.num = res.num;
        self.denom = res.denom;
    }
}

impl std::ops::Add<&Integer> for &Rational {
    type Output = Box<dyn Expr>;

    fn add(self, rhs: &Integer) -> Self::Output {
        Rational::new_box(self.num + rhs.value * self.denom, self.denom).simplify()
    }
}

impl std::ops::Add<&Rational> for &Integer {
    type Output = Box<dyn Expr>;

    fn add(self, rhs: &Rational) -> Self::Output {
        Rational::new_box(self.value * rhs.denom + rhs.num, rhs.denom).simplify()
    }
}

impl std::ops::Neg for &Rational {
    type Output = Rational;

    fn neg(self) -> Self::Output {
        Rational {
            num: -self.num,
            denom: self.denom,
        }
    }
}

impl<I: ToPrimitive> std::ops::MulAssign<&I> for Rational {
    fn mul_assign(&mut self, rhs: &I) {
        self.num *= rhs.to_isize().unwrap();
    }
}

impl std::ops::Mul<Rational> for Rational {
    type Output = Rational;

    fn mul(self, rhs: Rational) -> Self::Output {
        Rational {
            num: self.num * rhs.num,
            denom: self.denom * rhs.denom,
        }
    }
}

impl std::ops::MulAssign<&Rational> for Rational {
    fn mul_assign(&mut self, rhs: &Rational) {
        self.num *= rhs.num;
        self.denom *= rhs.denom;
    }
}

impl std::ops::DivAssign<&Rational> for Rational {
    fn div_assign(&mut self, rhs: &Rational) {
        self.num *= rhs.denom;
        self.denom *= rhs.num;
    }
}

impl std::ops::DivAssign for Rational {
    fn div_assign(&mut self, rhs: Rational) {
        self.num *= rhs.denom;
        self.denom *= rhs.num;
    }
}

impl From<&str> for Rational {
    fn from(value: &str) -> Self {
        let (num, denom) = value.split_once('/').unwrap();
        Rational {
            num: num.parse().unwrap(),
            denom: denom.parse().unwrap(),
        }
    }
}

#[cfg(test)]
mod tests {

    use super::*;

    #[test]
    fn test_mul_rational_int() {
        let r = Rational::new(3, 4);
        let i = 3;
        let expected = Rational::new(3 * 3, 4);

        assert_eq!(r * i, expected);
    }

    #[test]
    fn test_simplify_basic() {
        let expr = Rational::new(3, 4);
        let expected = Rational::new_box(3, 4);
        assert_eq!(&expr.simplify(), &expected)
    }

    #[test]
    fn test_simpify_to_int() {
        let expr = Rational::new(9, 3);
        let expected = Integer::new_box(3);
        assert_eq!(&expr.simplify(), &expected)
    }

    #[test]
    fn test_add() {
        assert_eq!(
            Rational::new(3, 4) + Rational::new(2, 5),
            Rational::new(23, 20)
        )
    }

    #[test]
    fn test_ord() {
        let [a, b] = [Rational::from("1/2"), Rational::from("1/3")];

        assert!(a > b)
    }

    #[test]
    fn test_add_bis() {
        assert_eq!(
            Rational::new(1, 4) + Rational::new(-1, 2),
            Rational::new(-1, 4)
        )
    }
}
