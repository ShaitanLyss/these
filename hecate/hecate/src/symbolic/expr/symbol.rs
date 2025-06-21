use super::*;
#[derive(Clone, Debug, Hash, PartialEq, Eq)]
pub struct Symbol {
    pub name: String,
}

impl Symbol {
    pub fn new(name: &str) -> Symbol {
        Symbol {
            name: (match name {
                "nabla" => "∇",
                "laplacian" => "Δ",
                "theta" => "θ",
                _ => name,
            })
            .to_string(),
        }
    }

    pub fn new_box(name: &str) -> Box<dyn Expr> {
        Box::new(Symbol::new(name))
    }
}

impl std::fmt::Display for Symbol {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.name)
    }
}

impl Expr for Symbol {
    fn known_expr(&self) -> KnownExpr {
        KnownExpr::Symbol(self)
    }
    fn get_ref<'a>(&'a self) -> &'a dyn Expr {
        self as &dyn Expr
    }
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
    fn to_cpp(&self) -> String {
        match self.name.as_str() {
            "M^n" => "mass_mat".to_string(),
            "A^n" => "laplace_mat".to_string(),
            "k" => "time_step".to_string(),
            _ => self
                .name
                .replace("^n-1", "_prev")
                .replace("^n", "")
                .to_lowercase(),
        }
    }
}

impl<E: Expr> std::ops::Add<&E> for &Symbol {
    type Output = Box<dyn Expr>;

    fn add(self, rhs: &E) -> Self::Output {
        self.get_ref() + rhs.get_ref()
    }
}

impl<E: Expr> std::ops::Mul<&E> for &Symbol {
    type Output = Box<dyn Expr>;

    fn mul(self, rhs: &E) -> Self::Output {
        self.get_ref() * rhs.get_ref()
    }
}

impl<E: Expr> std::ops::Div<&E> for &Symbol {
    type Output = Box<dyn Expr>;

    fn div(self, rhs: &E) -> Self::Output {
        self.get_ref() / rhs.get_ref()
    }
}
