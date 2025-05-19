use super::*;

#[derive(Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub struct Integer {
    pub value: isize,
}

// impl Par
//
// impl PartialOrd<i32> for &Integer {
//     fn partial_cmp(&self, other: &i32) -> Option<Ordering> {
//         todo!()
//     }
// }
 
impl Expr for Integer {
    fn get_ref<'a>(&'a self) -> &'a dyn Expr {
        self as &dyn Expr
    }

    fn known_expr(&self) -> KnownExpr {
        KnownExpr::Integer(self)
    }

    fn as_f64(&self) -> Option<f64> {
        Some(
            self.value
                .to_f64()
                .expect("hopefully value holds within f64"),
        )
    }
    fn is_one(&self) -> bool {
        self.value == 1
    }

    fn is_neg_one(&self) -> bool {
        self.value == -1
    }

    fn is_negative_number(&self) -> bool {
        self.value < 0
    }

    fn is_number(&self) -> bool {
        true
    }

    fn is_zero(&self) -> bool {
        self.value == 0
    }

    fn for_each_arg(&self, f: &mut dyn FnMut(&dyn Arg) -> ()) {
        f(&self.value);
    }

    fn from_args(&self, args: Vec<Box<dyn Arg>>) -> Box<dyn Expr> {
        let val = (&*args[0]) as &dyn Any;
        Box::new(Integer {
            value: val
                .downcast_ref::<isize>()
                .expect(&format!("{}", &type_name_of_val(args[0].as_any())))
                .clone(),
        })
    }

    fn clone_box(&self) -> Box<dyn Expr> {
        Box::new(self.clone())
    }

    fn str(&self) -> String {
        self.value.to_string()
    }
}

impl ToInteger for Integer {
    fn to_integer(&self) -> Integer {
        self.clone()
    }
}

impl ToInteger for &Integer {
    fn to_integer(&self) -> Integer {
        ( **self).clone()
    }
}

impl Integer {
    pub fn new_box(value: isize) -> Box<dyn Expr> {
        Box::new(Integer { value })
    }

    pub fn new(value: isize) -> Self {
        Integer { value }
    }

    pub fn zero() -> Integer {
        Integer { value: 0 }
    }

    pub fn one_box() -> Box<dyn Expr> {
        Integer::new_box(1)
    }

    pub fn zero_box() -> Box<dyn Expr> {
        Integer::new_box(0)
    }
}

impl std::fmt::Debug for Integer {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{:?}", self.get_ref())
    }
}

impl std::ops::Neg for Integer {
    type Output = Integer;

    fn neg(self) -> Self::Output {
        if self.value == 0 {
            return Integer::new(0);
        }
        Integer::new(-self.value)
    }
}

impl std::ops::Neg for &Integer {
    type Output = Integer;

    fn neg(self) -> Self::Output {
        -*self
    }
}

impl<E: Expr> std::ops::Mul<&E> for &Integer {
    type Output = Box<dyn Expr>;

    fn mul(self, rhs: &E) -> Self::Output {
        (self as &dyn Expr) * rhs.get_ref()
    }
}

impl std::ops::Mul<&Box<dyn Expr>> for &Integer {
    type Output = Box<dyn Expr>;

    fn mul(self, rhs: &Box<dyn Expr>) -> Self::Output {
        (self as &dyn Expr) * rhs.get_ref()
    }
}
