use std::cmp::Ordering;

use crate::{KnownExpr, Rational, symbolic::Expr};

pub fn compare<A: Expr + ?Sized, B: Expr + ?Sized>(a: &A, b: &B) -> Option<Ordering> {
    if a.get_ref() == b.get_ref() {
        return Some(Ordering::Equal);
    }

    match (a.known_expr(), b.known_expr()) {
        (KnownExpr::Integer(i1), KnownExpr::Integer(i2)) => Some(i1.cmp(&i2)),
        (KnownExpr::Rational(r1), KnownExpr::Rational(r2)) => Some(r1.cmp(&r2)),
        (KnownExpr::Integer(i1), KnownExpr::Rational(r2)) => {
            let r1: Rational = i1.into();
            Some(r1.cmp(&r2))
        }
        (KnownExpr::Rational(r1), KnownExpr::Integer(i2)) => {
            let r2: Rational = i2.into();
            Some(r1.cmp(&r2))
        }
        _ => None,
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::*;

    #[test]
    fn test_compare() {
        let x = symbol!("x");
        assert_eq!(compare(x, x), Some(Ordering::Equal))
    }
    #[test]
    fn test_compare_ints() {
        let int1 = int!(3);
        let int2 = int!(5);
        assert_eq!(compare(int1, int2), Some(Ordering::Less));
        assert_eq!(compare(int2, int1), Some(Ordering::Greater));
        assert_eq!(compare(int1, int1), Some(Ordering::Equal));
    }

    #[test]
    fn test_compare_rationals() {
        let rat1 = rational!(1, 3);
        let rat2 = rational!(2, 3);
        assert_eq!(compare(rat1, rat2), Some(Ordering::Less));
        assert_eq!(compare(rat2, rat1), Some(Ordering::Greater));
        assert_eq!(compare(rat1, rat1), Some(Ordering::Equal));
    }

    #[test]
    fn test_compare_int_and_rational() {
        let int = int!(2);
        let rat = rational!(2, 1);
        assert_eq!(compare(int, rat), Some(Ordering::Equal));
        assert_eq!(compare(rat, int), Some(Ordering::Equal));

        let rat_less = rational!(1, 1);
        assert_eq!(compare(int, rat_less), Some(Ordering::Greater));
        assert_eq!(compare(rat_less, int), Some(Ordering::Less));
    }

    #[test]
    fn test_compare_unknown_expressions() {
        let x = symbol!("x");
        let y = symbol!("y");
        assert_eq!(compare(x, y), None);
        assert_eq!(compare(y, x), None);
    }
}
