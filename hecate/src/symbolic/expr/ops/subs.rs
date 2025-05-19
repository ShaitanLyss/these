use crate::*;

use super::factor_coeff_no_div;

impl std::ops::Div<&Box<dyn Expr>> for &dyn Expr {
    type Output = Box<dyn Expr>;

    fn div(self, rhs: &Box<dyn Expr>) -> Self::Output {
        self / rhs.get_ref()
    }
}

pub fn subs<'a, E: Expr + ?Sized>(expr: &E, substitutions: &[[Box<dyn Expr>; 2]]) -> Box<dyn Expr> {
    for [replaced, replacement] in substitutions {
        if expr.get_ref() == replaced {
            return replacement.clone_box();
        }

        match (replaced.known_expr(), expr.known_expr()) {
            (KnownExpr::Mul(_), KnownExpr::Mul(_))
                if factor_coeff_no_div(expr.get_ref(), replaced.get_ref()).is_some() =>
            {
                return expr.get_ref() / replaced * replacement;
            }
            (KnownExpr::Add(_), KnownExpr::Add(_)) => {
                todo!("Implement subs for addition replacement")
            }

            _ => {}
        }
    }

    expr.from_args(
        expr.args()
            .iter()
            .map(|arg| {
                if let Some(expr) = arg.as_expr() {
                    expr.subs(&substitutions).into()
                } else {
                    arg.clone()
                }
            })
            .collect(),
    )
}
pub fn subs_box(expr: &Box<dyn Expr>, substitutions: &[[Box<dyn Expr>; 2]]) -> Box<dyn Expr> {
    subs(&**expr, substitutions)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_subs() {
        let [x, y] = symbols!("x", "y");
        let s = [[x.clone_box(), y.clone_box()]];

        assert_eq!(subs(x, &s), y);
    }

    #[test]
    fn test_subs_product() {
        let [x, y, z] = symbols!("x", "y", "z");

        let s = [[x * y, z.clone_box()]];

        assert_eq!(subs_box(&(x * y * 2), &s), z * 2);
    }
}
