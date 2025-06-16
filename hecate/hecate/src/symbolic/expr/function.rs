use std::collections::HashMap;

use itertools::Itertools;

use super::*;

#[derive(Clone)]
pub struct Func {
    name: String,
    args: Vec<Box<dyn Expr>>,
}

impl Func {
    pub fn new<'a, T: IntoIterator<Item = &'a dyn Expr>>(name: &str, args: T) -> Self {
        Func {
            name: name.to_string(),
            args: args.into_iter().map(|expr| expr.clone_box()).collect(),
        }
    }

    pub fn new_move(name: String, args: Vec<Box<dyn Expr>>) -> Func {
        Func { name, args }
    }

    pub fn new_move_box(name: String, args: Vec<Box<dyn Expr>>) -> Box<dyn Expr> {
        Box::new(Func::new_move(name, args))
    }

    pub fn time_discretize(&self) -> [Func; 2] {
        return [
            Func {
                name: format!("{}^n-1", self.name),
                args: self.args.clone(),
            },
            Func {
                name: format!("{}^n", self.name),
                args: self.args.clone(),
            },
        ];
    }

    pub fn to_vector(&self) -> Func {
        let pieces: Vec<_> = self.name.split("^").collect();
        let mut name = pieces[0].to_uppercase();

        for piece in &pieces[1..] {
            name += &format!("^{piece}");
        }

        Func {
            name,
            args: self.args.clone(),
        }
    }
}

impl Expr for Func {
    fn get_ref<'a>(&'a self) -> &'a dyn Expr {
        self as &dyn Expr
    }
    fn for_each_arg(&self, f: &mut dyn FnMut(&dyn Arg) -> ()) {
        f(&self.name);
        f(&self.args);
    }

    fn from_args(&self, args: Vec<Box<dyn Arg>>) -> Box<dyn Expr> {
        let name = args[0]
            .as_any()
            .downcast_ref::<String>()
            .expect("First arg should be string")
            .clone();
        let params = args[1]
            .as_any()
            .downcast_ref::<Vec<Box<dyn Expr>>>()
            .unwrap();

        Box::new(Func {
            name,
            args: params.to_vec(),
        })
    }

    fn clone_box(&self) -> Box<dyn Expr> {
        Box::new(self.clone())
    }

    fn str(&self) -> String {
        format!(
            "{}",
            self.name,
            // self.args.iter().map(|x| x.str()).collect::<String>()
        )
    }

    fn to_cpp(&self) -> String {
        if !self.name.contains("^") && self.name.len() > 1 {
            format!(
                "Kokkos::{}({})",
                self.name,
                self.args
                    .iter()
                    .map(|x| x.to_cpp())
                    .collect_vec()
                    .join(", ")
            )
        } else {
            self.name
                .replace("^n-1", "_prev")
                .replace("^n", "")
                .to_lowercase()
        }
    }
}

lazy_static::lazy_static! {
    static ref cpp_functions_names: HashMap<&'static str, &'static str> = {
        let res = HashMap::from([("sin", "sin"), ("cos", "cos"), ("sqrt", "sqrt")]);

        return res
    };

}

impl fmt::Debug for Func {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.str())
    }
}
