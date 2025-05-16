use super::*;
#[derive(Clone, Debug)]
pub struct Symbol {
    pub name: String,
}

impl Symbol {
    pub fn new(name: &str) -> Symbol {
        Symbol {
            name: (match name {
                "nabla" => "∇",
                "laplacian" => "Δ",
                _ => name,
            })
            .to_string(),
        }
    }

    pub fn new_box(name: &str) -> Box<dyn Expr> {
        Box::new(Symbol::new(name))
    }
}

impl Expr for Symbol {
    fn for_each_arg(&self, f: &mut dyn FnMut(&dyn Arg) -> ()) {
        f(&self.name);
    }

    fn from_args(&self, args: Vec<Box<dyn Arg>>) -> Box<dyn Expr> {
        let name = (&*args[0]) as &dyn Any;

        let name = name.downcast_ref::<String>().unwrap();
        Box::new(Symbol { name: name.clone() })
    }

    fn clone_box(&self) -> Box<dyn Expr> {
        Box::new(self.clone())
    }

    fn str(&self) -> String {
        self.name.clone()
    }
}


impl<E: Expr> std::ops::Add<&E> for &Symbol {
    type Output = Add;

    fn add(self, rhs: &E) -> Self::Output {
        Add::new([self as &dyn Expr, rhs as &dyn Expr])
    }
}


