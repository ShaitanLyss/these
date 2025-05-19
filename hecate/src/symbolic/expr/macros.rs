#[macro_export]
macro_rules! symbols {
    ($($name:expr),*) => {
        [$(&Symbol::new($name) as &dyn Expr),*]
    };
}

#[macro_export]
macro_rules! int {
    ($x:expr) => {
        &Integer::new($x) as &dyn Expr
    };
}

#[macro_export]
macro_rules! rational {
    ($num:expr, $denom:expr) => {
        &Rational::new($num, $denom) as &dyn Expr
    };
}

#[macro_export]
/// rationals!("1/2", "1/3") = [&Rational::new(1, 2) as &dyn Expr, &Rational::new(1, 3) as &dyn Expr]
macro_rules! rationals {
    ($($frac:expr),*) => {
        [$(&Rational::from($frac) as &dyn Expr),*]
    };
}
