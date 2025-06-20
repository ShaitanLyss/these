use indexmap::IndexMap;
use itertools::Itertools;

use super::*;
#[derive(Clone)]
pub struct Diff {
    pub f: Box<dyn Expr>,
    pub vars: IndexMap<Symbol, usize>,
}

pub trait IntoVarOrder {
    fn into_var_order(self) -> (Symbol, usize);
}

impl Diff {
    pub fn new<'a, It: IntoIterator<Item = &'a Box<dyn Expr>>>(
        f: &Box<dyn Expr>,
        vars: It,
    ) -> Box<dyn Expr> {
        Box::new(Diff::new_move(
            f.clone(),
            vars.into_iter().map(|v| v.as_symbol().unwrap()),
        ))
    }

    pub fn new_v2(f: Box<dyn Expr>, vars: IndexMap<Symbol, usize>) -> Diff {
        Diff { f, vars }
    }

    pub fn idiff(f: Box<dyn Expr>, var: Symbol, order: usize) -> Self {
        let mut vars = IndexMap::new();
        vars.insert(var, order);
        Self { f, vars }
    }

    pub fn new_move<I, T>(f: Box<dyn Expr>, vars: I) -> Diff
    where
        I: IntoIterator<Item = T>,
        T: IntoVarOrder,
    {
        let mut vars_orders = IndexMap::new();
        for var in vars {
            let (var, order) = var.into_var_order();
            let entry = vars_orders.entry(var).or_insert(0);
            *entry += order;
        }
        Diff {
            f,
            vars: vars_orders,
        }
    }
}

impl IntoVarOrder for (Symbol, usize) {
    fn into_var_order(self) -> (Symbol, usize) {
        self
    }
}

impl IntoVarOrder for Symbol {
    fn into_var_order(self) -> (Symbol, usize) {
        (self, 1)
    }
}

impl IntoVarOrder for &str {
    fn into_var_order(self) -> (Symbol, usize) {
        (Symbol::new(self), 1)
    }
}
impl IntoVarOrder for char {
    fn into_var_order(self) -> (Symbol, usize) {
        (Symbol::new(&self.to_string()), 1)
    }
}

impl<T: ToString> IntoVarOrder for &(T, usize) {
    fn into_var_order(self) -> (Symbol, usize) {
        (Symbol::new(&self.0.to_string()), self.1)
    }
}

impl Expr for Diff {
    fn get_ref<'a>(&'a self) -> &'a dyn Expr {
        self as &dyn Expr
    }
    fn for_each_arg(&self, f: &mut dyn FnMut(&dyn Arg) -> ()) {
        f(&*self.f);
        f(&self
            .vars
            .iter()
            .map(|(var, order)| (var.clone(), *order))
            .collect::<Vec<(Symbol, usize)>>());
    }

    fn known_expr(&self) -> KnownExpr {
        KnownExpr::Diff(self)
    }

    fn from_args(&self, args: Vec<Box<dyn Arg>>) -> Box<dyn Expr> {
        let vars = &*args[1];
        let vars = vars as &dyn Any;
        let vars = vars.downcast_ref::<Vec<(Symbol, usize)>>().unwrap();
        Box::new(Diff::new_v2(
            args[0].clone().into(),
            IndexMap::from_iter(vars.clone()),
        ))
    }

    fn clone_box(&self) -> Box<dyn Expr> {
        Box::new(self.clone())
    }

    fn str(&self) -> String {
        let order = self.vars.values().sum::<usize>();
        let exponent = if order > 1 {
            format!("^{}", order)
        } else {
            "".to_string()
        };
        let mut f = self.f.str();
        if f.len() > 1 {
            f = format!("({})", f);
        }

        let denom = self
            .vars
            .iter()
            .map(|(var, order)| {
                if *order == 1 {
                    var.str()
                } else {
                    format!("{}^{}", var.str(), order)
                }
            })
            .join(".");

        format!("∂{}{f} / ∂{denom}", exponent,)
    }
}

#[cfg(test)]
mod tests {
    use crate::symbols;

    use super::*;

    #[test]
    fn test_str() {
        let [u] = symbols!("u");
        let t = Symbol::new("t");
        let expr = Diff::new_move(u.ipow(2), vec![t; 2]);
        assert_eq!(expr.str(), "∂^2(u^2) / ∂t^2")
    }

    #[test]
    fn test_str_first_order() {
        let [u] = symbols!("u");
        let t = Symbol::new("t");
        let expr = Diff::new_move(u.ipow(2), vec![t; 1]);
        assert_eq!(expr.str(), "∂(u^2) / ∂t")
    }

    #[test]
    fn test_str_symbol_first_order() {
        let [u] = symbols!("u");
        let t = Symbol::new("t");
        let expr = Diff::new_move(u.clone_box(), vec![t; 1]);
        assert_eq!(expr.str(), "∂u / ∂t")
    }

    #[test]
    fn test_args() {
        let [u] = symbols!("u");
        let t = Symbol::new("t");
        let expr = Diff::new_move(u.ipow(2), vec![t; 2]);

        let args = expr.args();
        assert_eq!(expr.from_args(args).srepr(), expr.srepr());
    }
}
