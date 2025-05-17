use super::*;
#[derive(Clone)]
pub struct Integral {
    f: Box<dyn Expr>,
}

impl Integral {
    pub fn new(f: &Box<dyn Expr>) -> Box<dyn Expr> {
        Box::new(Integral { f: f.clone() })
    }
}

impl Expr for Integral {
    fn get_ref<'a>(&'a self) -> &'a dyn Expr {
        self as &dyn Expr
    }
    fn for_each_arg(&self, f: &mut dyn FnMut(&dyn Arg) -> ()) {
        f(&*self.f);
    }

    fn clone_box(&self) -> Box<dyn Expr> {
        Box::new(self.clone())
    }

    fn str(&self) -> String {
        format!("∫{}", self.f.str())
    }
}
