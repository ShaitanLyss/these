use itertools::Itertools;

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
            .into_iter()
            .map(|arg| {
                if let Some(expr_vec) = arg.as_any().downcast_ref::<Vec<Box<dyn Expr>>>() {
                    let res = expr_vec
                        .into_iter()
                        .map(|e| subs(e.get_ref(), substitutions))
                        .collect_vec();
                    res.clone_arg()
                } else if let Some(expr) = arg.as_expr() {
                    expr.subs(&substitutions).into()
                } else {
                    arg
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

    #[test]
    fn test_subs_symbol_in_function() {
        let x = symbol!("x");

        let expr = Func::new("sin", vec![(x * 2).get_ref()]);

        let s = [[x.clone_box(), Symbol::new_box("point[0]")]];
        let res = subs(&expr, &s);

        assert_eq!(res.to_cpp(), "sin(2 * point[0])",)
    }
}
