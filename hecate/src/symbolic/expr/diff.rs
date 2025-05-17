use super::*;
#[derive(Clone)]
pub struct Diff {
    pub f: Box<dyn Expr>,
    pub vars: Vec<Symbol>,
}

impl Diff {
    pub fn new<'a, It: IntoIterator<Item = &'a Box<dyn Expr>>>(
        f: &Box<dyn Expr>,
        vars: It,
    ) -> Box<dyn Expr> {
        Box::new(Diff {
            f: f.clone(),
            vars: vars
                .into_iter()
                .map(|v| v.as_expr().unwrap().as_symbol().unwrap())
                .collect(),
        })
    }
}

impl Expr for Diff {
    fn get_ref<'a>(&'a self) -> &'a dyn Expr {
        self as &dyn Expr
    }
    fn for_each_arg(&self, f: &mut dyn FnMut(&dyn Arg) -> ()) {
        f(&*self.f);
        f(&self.vars.iter().map(|v| v.clone_arg()).collect::<Vec<_>>());
    }

    fn from_args(&self, args: Vec<Box<dyn Arg>>) -> Box<dyn Expr> {
        let vars = (&*args[1]) as &dyn Any;
        let vars = vars.downcast_ref::<Vec<Box<dyn Expr>>>().unwrap();
        let vars = vars
            .iter()
            .map(|v| v.as_symbol().expect("Not a symbol"))
            .collect();
        Box::new(Diff {
            f: args[0].clone().into(),
            vars,
        })
    }

    fn clone_box(&self) -> Box<dyn Expr> {
        Box::new(self.clone())
    }

    fn str(&self) -> String {
        let exponent = if self.vars.len() > 1 {
            format!("^{}", self.vars.len())
        } else {
            "".to_string()
        };
        format!(
            "∂{}{} / ∂{}",
            exponent,
            self.f.str(),
            self.vars.iter().map(|x| x.str()).collect::<String>()
        )
    }
}
