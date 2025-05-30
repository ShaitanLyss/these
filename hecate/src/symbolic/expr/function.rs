use super::*;

#[derive(Clone)]
pub struct Func {
    name: String,
    args: Vec<Symbol>,
}

impl Func {
    pub fn new<'a, T: IntoIterator<Item = &'a str>>(name: &str, args: T) -> Self {
        Func {
            name: name.to_string(),
            args: args
                .into_iter()
                .map(|s| Symbol {
                    name: s.to_string(),
                })
                .collect(),
        }
    }

    pub fn new_move(name: String, args: Vec<Symbol>) -> Func {
        Func { name, args }
    }

    pub fn new_move_box(name: String, args: Vec<Symbol>) -> Box<dyn Expr> {
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
        f(&self.args.iter().map(|s| s.clone_arg()).collect::<Vec<_>>());
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
        let params: Vec<_> = params
            .iter()
            .map(|v| v.as_symbol().expect("Not a symbol"))
            .collect();
        Box::new(Func { name, args: params })
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
}

impl fmt::Debug for Func {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.str())
    }
}
