use indexmap::IndexMap;
use lazy_static::lazy_static;
use regex::{Captures, Regex};
use std::{num::ParseIntError, str::FromStr, sync::LazyLock};

use crate::{expr::*, symbol};

use thiserror::Error;

use crate::{Equation, Expr, Integer};

#[derive(Error, Debug, PartialEq)]
pub enum ParseExprError {
    #[error("bad equation: {0}")]
    BadEquation(#[from] ParseEquationError),
    #[error("parse integer: {0}")]
    BadInt(#[from] ParseIntegerError),
    #[error("parse symbol: {0}")]
    BadSymbol(#[from] ParseSymbolError),
    #[error("bad addition: {0}")]
    BadAdd(#[from] ParseAddError),
    #[error("bad multiplication: {0}")]
    BadMul(#[from] ParseMulError),
    #[error("bracket mismatch: '{0}' and '{1}'")]
    BracketMismatch(char, char),
    #[error("bad function: {0}")]
    BadFunction(#[from] ParseFunctionError),
    #[error("invalid pow: {0}")]
    InvalidPow(#[from] ParsePowError),
    #[error("invalid diffentiation: {0}")]
    InvalidDiff(#[from] ParseDiffError),
    #[error("empty expression")]
    EmptyExpr,
}

#[derive(Error, Debug, PartialEq)]
pub enum ParseEquationError {
    #[error("wrong number of operands: {0}, expected: 2")]
    WrongNumberOfOperands(usize),
    #[error("empty operand")]
    EmptyOperand,
    #[error("invalid lhs: {0}")]
    InvalidLhs(Box<ParseExprError>),
    #[error("invalid rhs: {0}")]
    InvalidRhs(Box<ParseExprError>),
}

#[derive(Debug, Error, PartialEq)]
#[error("failed to parse integer: {0}")]
pub struct ParseIntegerError(String, #[source] ParseIntError);

impl FromStr for Integer {
    type Err = ParseIntegerError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        Ok(Integer {
            value: s.parse().map_err(|e| ParseIntegerError(s.to_string(), e))?,
        })
    }
}

impl FromStr for Box<dyn Expr> {
    type Err = ParseExprError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        parse_expr(s)
    }
}

impl FromStr for Equation {
    type Err = ParseEquationError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let equal_pieces: Vec<_> = s.split('=').map(|s| s.trim()).collect();
        if equal_pieces.len() != 2 {
            Err(ParseEquationError::WrongNumberOfOperands(
                equal_pieces.len(),
            ))?
        }

        if equal_pieces.iter().any(|s| s.is_empty()) {
            Err(ParseEquationError::EmptyOperand)?
        }

        Ok(Equation {
            lhs: equal_pieces[0]
                .parse()
                .map_err(|e| ParseEquationError::InvalidLhs(Box::new(e)))?,
            rhs: equal_pieces[1]
                .parse()
                .map_err(|e| ParseEquationError::InvalidRhs(Box::new(e)))?,
        })
    }
}

#[derive(Error, Debug, PartialEq)]
pub enum ParseSymbolError {}

impl FromStr for Symbol {
    type Err = ParseSymbolError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        Ok(Symbol::new(s))
    }
}

#[derive(Error, Debug, PartialEq)]
pub enum ParseAddError {
    #[error("bad operand: {0}")]
    BadOperand(String, #[source] Box<ParseExprError>),
}

impl FromStr for Add {
    type Err = ParseAddError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        Ok(Add::new_v2(
            split_root(s, &['+', '-'])
                .map(|(prev, piece)| -> Result<Box<dyn Expr>, ParseAddError> {
                    let mut op: Box<dyn Expr> = piece
                        .parse()
                        .map_err(|e| ParseAddError::BadOperand(piece.into(), Box::new(e)))?;
                    if let Some('-') = prev {
                        op = -op;
                    }
                    Ok(op)
                })
                .collect::<Result<_, _>>()?,
        ))
    }
}

#[derive(Error, Debug, PartialEq)]
pub enum ParseMulError {
    #[error("bad operand: {0}")]
    BadOperand(String, #[source] Box<ParseExprError>),
}

impl FromStr for Mul {
    type Err = ParseMulError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let mut ops = Vec::new();
        for (prev, piece) in split_root(s, &['*', '/']) {
            let mut op: Box<dyn Expr> = piece
                .parse()
                .map_err(|e| ParseMulError::BadOperand(piece.into(), Box::new(e)))?;
            if let Some('/') = prev {
                op = op.ipow(-1);
            }

            if let Some(Mul { operands }) = op.as_mul().cloned() {
                for op in operands {
                    ops.push(op);
                }
            } else {
                ops.push(op)
            }
        }
        Ok(Mul { operands: ops })
    }
}

const func_pattern: &str = r"^(\w+)\((.*?)\)$";

lazy_static! {
    static ref func_re: Regex = Regex::new(func_pattern).unwrap();
}

#[derive(Error, Debug, PartialEq)]
pub enum ParseFunctionError {
    #[error("bad args")]
    BadArgs,
    #[error("wrong number of arguments for {0}: {1}, expected: {2}")]
    BadArgCount(String, usize, String),
    #[error("invalid function expression: {0}")]
    InvalidFuncExpr(Box<ParseExprError>),
    #[error("invalid order format: {0}, {1}")]
    InvalidOrderFormat(String, ParseIntError),
    #[error("invalid argument: {0}")]
    InvalidArg(String, #[source] Box<ParseExprError>),
    #[error("invalid differential expression")]
    InvalidDiff(String, #[source] ParseDiffError),
}

static D_DVAR_RE: LazyLock<Regex> = LazyLock::new(|| {
    Regex::new(r"^[d∂]\^?([\d⁰¹²³⁴⁵⁶⁷⁸⁹]*)\s*[\/_]\s*[d∂]\(?(\w+?)\)?\^?([\d⁰¹²³⁴⁵⁶⁷⁸]*)$").unwrap()
});

static DNVAR_RE: LazyLock<Regex> =
    LazyLock::new(|| Regex::new(r"^[d∂]\^?(?:([\d⁰¹²³⁴⁵⁶⁷⁸⁹]+))?([A-Za-z_])$").unwrap());

static SUB_DNVAR: LazyLock<Regex> =
    LazyLock::new(|| Regex::new(r"^[d∂]\^?(?:([\d⁰¹²³⁴⁵⁶⁷⁸⁹]+))?([A-Za-z_])\((.*)\)$").unwrap());

pub fn parse_function(name: &str, args: &str) -> Result<Box<dyn Expr>, ParseFunctionError> {
    let args: Vec<_> = args.split(",").map(|arg| arg.trim()).collect();

    // Handle differential operators (dx(...), dt(...), etc.)
    if let Some(captures) = DNVAR_RE.captures(name) {
        let var = &captures[2];
        let order = captures.get(1).map_or("1", |o| o.as_str());
        let order = order.parse().map_err(|e| {
            ParseFunctionError::InvalidDiff(
                name.to_string(),
                ParseDiffError::InvalidNumOrderFormat(order.to_string(), e),
            )
        })?;

        let mut var_orders: IndexMap<Symbol, usize> = IndexMap::new();
        var_orders.insert(
            Symbol {
                name: var.to_string(),
            },
            order,
        );

        let mut f = args[0].to_string();

        while let Some(captures) = SUB_DNVAR.captures(&f) {
            let var = captures[2].to_string();
            let var_order = captures.get(1).map_or("1", |o| o.as_str());
            let var_order: usize = var_order.parse().map_err(|e| {
                ParseFunctionError::InvalidDiff(
                    name.to_string(),
                    ParseDiffError::InvalidNumOrderFormat(var_order.to_string(), e),
                )
            })?;
            f = captures[3].to_string();
            let order = var_orders.entry(Symbol { name: var }).or_insert(0);
            *order += var_order;
        }

        return Ok(Box::new(Diff::new_v2(
            f.parse()
                .map_err(|e| ParseFunctionError::InvalidFuncExpr(Box::new(e)))?,
            var_orders,
        )));
    }

    if let Some(captures) = D_DVAR_RE.captures(name) {
        let num_order = &captures[1];
        let den_order = &captures[3];
        let var = Symbol::new(&captures[2]);
        let num_order: usize = num_order
            .parse()
            .map_err(|e| ParseFunctionError::InvalidOrderFormat(num_order.to_string(), e))?;
        let den_order: usize = den_order
            .parse()
            .map_err(|e| ParseFunctionError::InvalidOrderFormat(den_order.to_string(), e))?;

        if num_order != den_order {
            Err(ParseFunctionError::InvalidDiff(
                name.to_string(),
                ParseDiffError::OrderMismatch(num_order, den_order),
            ))?
        }

        if args.len() != 1 {
            Err(ParseFunctionError::BadArgCount(
                name.to_string(),
                args.len(),
                "1".to_string(),
            ))?
        }

        let expr = parse_expr(args[0]).map_err(|e| {
            ParseFunctionError::InvalidDiff(
                args[0].to_string(),
                ParseDiffError::BadExpr(Box::new(e)),
            )
        })?;
        return Ok(Box::new(Diff::new_move(expr, vec![var; num_order])));
    }

    Ok(match name {
        "laplacian" => {
            let laplacian = symbol!("laplacian");
            let f = parse_expr(args[0])
                .map_err(|e| ParseFunctionError::InvalidFuncExpr(Box::new(e)))?;

            laplacian * f
        }
        "diff" => {
            let n_args = args.len();
            if n_args < 2 || n_args > 3 {
                Err(ParseFunctionError::BadArgCount(
                    name.to_string(),
                    n_args,
                    "2 or 3".to_string(),
                ))?
            }
            let f = parse_expr(args[0])
                .map_err(|e| ParseFunctionError::InvalidFuncExpr(Box::new(e)))?;
            let order = if n_args == 3 {
                args[2]
                    .parse()
                    .map_err(|e| ParseFunctionError::InvalidOrderFormat(args[2].to_string(), e))?
            } else {
                1
            };
            f.diff(args[1], order)
        }
        _ => {
            let args: Result<Vec<Box<dyn Expr>>, ParseFunctionError> = args
                .into_iter()
                .map(|a| -> Result<Box<dyn Expr>, ParseFunctionError> {
                    Ok(a.parse()
                        .map_err(|e| ParseFunctionError::InvalidArg(a.into(), Box::new(e)))?)
                })
                .collect();

            Func::new_move_box(name.to_string(), args?)
        }
    })
}

#[derive(Error, Debug, PartialEq)]
pub enum ParsePowError {
    #[error("invalid pow format: {0}, expected 'base^exponent'")]
    InvalidFormat(String),
    #[error("invalid expression for base: {0}, {1}")]
    InvalidBase(String, Box<ParseExprError>),
    #[error("invalid expression for exponent: {0}, {1}")]
    InvalidExponent(String, Box<ParseExprError>),
}

impl FromStr for expr::Pow {
    type Err = ParsePowError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let pieces: Vec<_> = s.split("^").collect();
        if pieces.len() != 2 {
            Err(ParsePowError::InvalidFormat(s.to_string()))?
        }
        let mut parsed: Vec<_> = pieces.iter().map(|e| parse_expr(e)).collect();
        let exponent = parsed
            .pop()
            .unwrap()
            .map_err(|err| ParsePowError::InvalidExponent(pieces[1].to_string(), Box::new(err)))?;
        let base = parsed
            .pop()
            .unwrap()
            .map_err(|err| ParsePowError::InvalidBase(pieces[0].to_string(), Box::new(err)))?;
        Ok(Pow::new_move(base, exponent))
    }
}

lazy_static! {
    static ref diff_re: Regex = Regex::new(
        r"^[d∂]\^?([\d⁰¹²³⁴⁵⁶⁷⁸⁹]*)\(?(.+?)\)?\s*[/_]\s*[d∂]\(?(\w+?)\)?\^?([\d⁰¹²³⁴⁵⁶⁷⁸]*)$"
    )
    .unwrap();
}

#[derive(Debug, Error, PartialEq)]
pub enum ParseDiffError {
    #[error("invalid diffentiation format: {0}, expected 'd^n(expr) / d(var)^n'")]
    InvalidFormat(String),
    #[error("invalid differentiated expression")]
    BadExpr(#[from] Box<ParseExprError>),
    #[error("invalid order format on numerator: {0}, {1}")]
    InvalidNumOrderFormat(String, ParseIntError),
    #[error("invalid order format on denominator: {0}, {1}")]
    InvalidDenOrderFormat(String, ParseIntError),
    #[error("order mismatch: numerator: {0}, denominator: {1}")]
    OrderMismatch(usize, usize),
}

impl FromStr for Diff {
    type Err = ParseDiffError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let captures = diff_re
            .captures(s)
            .ok_or_else(|| ParseDiffError::InvalidFormat(s.to_string()))?;
        captures.try_into()
    }
}

impl TryFrom<Captures<'_>> for Diff {
    type Error = ParseDiffError;

    fn try_from(value: Captures<'_>) -> Result<Self, Self::Error> {
        let num_order = &value[1];
        let den_order = &value[4];
        let num_order: usize = if num_order == "" {
            1
        } else {
            value[1]
                .parse()
                .map_err(|e| ParseDiffError::InvalidNumOrderFormat(value[1].to_string(), e))?
        };
        let den_order: usize = if den_order == "" {
            1
        } else {
            value[4]
                .parse()
                .map_err(|e| ParseDiffError::InvalidDenOrderFormat(value[4].to_string(), e))?
        };
        let expr = parse_expr(&value[2]).map_err(|e| ParseDiffError::BadExpr(Box::new(e)))?;
        let var = Symbol::new(&value[3]);

        if num_order != den_order {
            Err(ParseDiffError::OrderMismatch(num_order, den_order))?
        }

        Ok(Diff::new_move(expr, vec![var; num_order]))
    }
}

#[derive(Debug, Error, PartialEq)]
pub enum ParseRationalError {
    #[error("invalid rational format: {0}, expected 'numerator / denominator'")]
    InvalidFormat(String),
    #[error("invalid numerator: {0}")]
    InvalidNumerator(String),
    #[error("invalid denominator: {0}")]
    InvalidDenominator(String),
}

static RATIONAL_RE: LazyLock<Regex> =
    LazyLock::new(|| Regex::new(r"^\s*?([^/\s]+?)\s*?(?:/\s*?([^/\s]*?)\s*?)?$").unwrap());

impl FromStr for Rational {
    type Err = ParseRationalError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let captures = RATIONAL_RE
            .captures(s)
            .ok_or_else(|| ParseRationalError::InvalidFormat(s.to_string()))?;
        let num = &captures[1];

        let num: Rational = (if let Ok(num) = num.parse::<i32>() {
            Ok(num.into())
        } else if let Ok(num) = num.parse::<f64>() {
            Ok(Rational::from_float(num))
        } else {
            Err(ParseRationalError::InvalidNumerator(num.to_string()))
        })?;

        let den = captures.get(2);

        let den = den.map(|den| -> Result<_, _> {
            if let Ok(den) = den.as_str().parse::<i32>() {
                Ok(den.into())
            } else if let Ok(den) = den.as_str().parse::<f64>() {
                Ok(Rational::from_float(den))
            } else {
                Err(ParseRationalError::InvalidDenominator(
                    den.as_str().to_string(),
                ))
            }
        });

        let den: Rational = if let Some(den) = den { den? } else { 1.into() };

        Ok(num / den)
    }
}

/// Checks if brackets are valid.
///
/// Returns true if the opening brackets are matched with the appropriate closing ones.
pub fn are_brackets_valid(s: &str) -> bool {
    let mut stack: Vec<usize> = Vec::new();

    for c in s.chars() {
        if let Some(i) = openers.iter().position(|opener| opener == &c) {
            stack.push(i);
        } else if let Some(i) = closers.iter().position(|closer| closer == &c) {
            if stack.pop() != Some(i) {
                return false;
            }
        }
    }
    stack.is_empty()
}

pub fn parse_expr(s: &str) -> Result<Box<dyn Expr>, ParseExprError> {
    let s = s.trim();
    if s.len() == 0 {
        Err(ParseExprError::EmptyExpr)?
    }
    Ok(if s.split("=").collect::<Vec<_>>().len() >= 2 {
        Box::new(s.parse::<Equation>()?)
    }
    // Functions
    else if let Some(captured_func) = func_re.captures(s)
        && are_brackets_valid(&captured_func[2])
    {
        return Ok(parse_function(&captured_func[1], &captured_func[2])?);
    }
    // Integer
    else if s
        .chars()
        .enumerate()
        .all(|(i, c)| c.is_numeric() || i == 0 && c == '-')
    {
        Box::new(s.parse::<Integer>()?)
    }
    // Rationals
    else if let Ok(r) = s.parse::<Rational>() {
        Box::new(r)
    }
    // Additions, Subtractions
    else if let Some((_, add_piece)) = split_root(s, &['+', '-']).next()
        && add_piece.len() != s.len()
    {
        Box::new(s.parse::<Add>()?)
    }
    // Differentiations
    else if let Some(captured_diff) = diff_re.captures(s) {
        Box::new(TryInto::<Diff>::try_into(captured_diff)?)
    }
    // Multiplications, Divisions
    else if let Some((_, mul_piece)) = split_root(s, &['*', '/']).next()
        && mul_piece.len() != s.len()
    {
        Box::new(s.parse::<Mul>()?)
    }
    // Brackets
    else if s.len() > 0
        && let Some(first) = s.chars().next()
        && let Some(i_opener) = openers
            .iter()
            .enumerate()
            .find_map(|(i, opener)| if opener == &first { Some(i) } else { None })
        && let Some(last) = s.chars().last()
        && let Some(i_closer) = closers
            .iter()
            .enumerate()
            .find_map(|(i, closer)| if closer == &last { Some(i) } else { None })
        && i_opener == i_closer
    {
        // let last = s.chars().last().unwrap();
        // let closer = closers[i_opener];
        //
        // if closer != last {
        //     return Err(ParseExprError::BracketMismatch(openers[i_opener], last));
        // }
        return parse_expr(&s[1..s.len() - 1]);
    }
    // Powers
    else if s.contains("^") {
        Box::new(s.parse::<Pow>()?)
    }
    // Symbols
    else {
        Box::new(s.parse::<Symbol>()?)
    })
}

const openers: [char; 3] = ['(', '[', '{'];
const closers: [char; 3] = [')', ']', '}'];

pub struct RootSplitter<'a, 'b> {
    s: &'a str,
    patterns: &'b [char],
    position: usize,
    prev_splitter: Option<char>,
    depth: i32,
    begin: usize,
}

impl<'a, 'b> Iterator for RootSplitter<'a, 'b> {
    type Item = (Option<char>, &'a str);

    fn next(&mut self) -> Option<Self::Item> {
        for (i, c) in self.s[self.position..].char_indices() {
            let abs_i = self.position + i; // absolute index with respect to the original string

            if openers.contains(&c) {
                self.depth += 1;
            } else if closers.contains(&c) {
                self.depth -= 1;
            } else if self.depth == 0 && self.patterns.contains(&c) {
                let part = &self.s[self.begin..abs_i];
                // Avoid returning empty parts
                if part.trim().is_empty() {
                    continue;
                }
                self.begin = abs_i + 1; // Start after the current pattern
                self.position = abs_i + 1;
                let res = (self.prev_splitter, part.trim());
                self.prev_splitter = Some(c);
                return Some(res);
            }
        }

        // For the last segment (after the last pattern)
        if self.begin < self.s.len() {
            let part = &self.s[self.begin..];
            self.begin = self.s.len(); // Make sure next call returns None
            return Some((self.prev_splitter, part.trim()));
        }

        None // Return None to indicate the end of the iterator
    }
}

pub fn split_root<'a, 'b>(s: &'a str, patterns: &'b [char]) -> RootSplitter<'a, 'b> {
    RootSplitter {
        s,
        prev_splitter: None,
        patterns,
        position: 0,
        depth: 0,
        begin: 0,
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::symbols;

    #[test]
    fn test_root_splitter() {
        assert_eq!(
            split_root("a + (b + c) + 2 - (4)", &['+', '-']).collect::<Vec<_>>(),
            vec![
                (None, "a"),
                (Some('+'), "(b + c)"),
                (Some('+'), "2"),
                (Some('-'), "(4)")
            ]
        )
    }

    #[test]
    fn test_parse_zero() {
        let expr = parse_expr("0").unwrap();
        assert_eq!(expr.srepr(), "Integer(0)")
    }

    #[test]
    fn test_parse_int() {
        let expr = parse_expr("1").unwrap();
        assert_eq!(expr.srepr(), "Integer(1)")
    }

    #[test]
    fn test_parse_neg_int() {
        let expr = parse_expr("-128").unwrap();
        assert_eq!(expr.srepr(), "Integer(-128)")
    }

    #[test]
    fn test_parse_laplacian() {
        let expr = parse_expr("laplacian").unwrap();
        assert_eq!(expr.srepr(), "Symbol(Δ)")
    }

    #[test]
    fn test_parse_x() {
        let expr = parse_expr("x").unwrap();
        assert_eq!(expr.srepr(), "Symbol(x)")
    }

    #[test]
    fn test_parse_invalid_equation() {
        let res = parse_expr("1 ==");
        assert_eq!(
            res,
            Err(ParseExprError::BadEquation(
                ParseEquationError::WrongNumberOfOperands(3)
            ))
        )
    }

    #[test]
    fn test_parse_bad_eq_empty_op() {
        let res = parse_expr("1 =");
        assert_eq!(
            res,
            Err(ParseExprError::BadEquation(
                ParseEquationError::EmptyOperand
            ))
        )
    }

    #[test]
    fn parse_valid_basic_eq() {
        let res = parse_expr("1 = 2").unwrap();
        assert_eq!(res.srepr(), "Eq(Integer(1), Integer(2))")
    }

    #[test]
    fn parse_add() {
        let res = parse_expr("1 + 2").unwrap();
        assert_eq!(res.srepr(), "Add(Integer(1), Integer(2))")
    }

    #[test]
    fn parse_sub() {
        let res = parse_expr("1 - x + 4").unwrap();
        assert_eq!(
            res.srepr(),
            "Add(Integer(1), Mul(Integer(-1), Symbol(x)), Integer(4))"
        )
    }

    #[test]
    fn parse_mul() {
        let res = parse_expr("1 * x * 4").unwrap();
        assert_eq!(res.srepr(), "Mul(Integer(1), Symbol(x), Integer(4))")
    }

    #[test]
    fn parse_div() {
        let res = parse_expr("1 / x").unwrap();
        assert_eq!(res.srepr(), "Mul(Integer(1), Pow(Symbol(x), Integer(-1)))")
    }

    #[test]
    fn parse_deep_add() {
        let res = parse_expr("1 + (1 + 2) * 3 + 4").unwrap();
        assert_eq!(
            res.srepr(),
            "Add(Integer(1), Mul(Add(Integer(1), Integer(2)), Integer(3)), Integer(4))"
        )
    }

    #[test]
    fn parse_wave_eq() {
        let res = parse_expr("diff(u, t, 2) - c^2 * laplacian * u = f").unwrap();
        let [u, c, laplacian, f] = symbols!("u", "c", "laplacian", "f");
        let expected = Equation::new_box(u.diff("t", 2) - c.ipow(2) * laplacian * u, f.clone_box());
        assert_eq!(res, expected)
    }

    #[test]
    fn parse_2d_wave_eq() {
        let res = parse_expr("d2u/dt^2 = c^2 * (d2u/dx2 + d2u/dy2) + source").unwrap();
        let [u, c, source] = symbols!("u", "c", "source");
        let expected = Equation::new_box(
            u.diff("t", 2),
            c * c * (u.diff("x", 2) + u.diff("y", 2)) + source.clone_box(),
        );
        assert_eq!(res, expected)
    }

    #[test]
    fn parse_diff_complex() {
        let res: Box<dyn Expr> = "d^2(2*x*t + t^2 - t)/dt^2".parse().unwrap();
        let [x, t] = symbols!("x", "t");
        let expected = (Integer::new_box(2) * x * t + t * t - t.clone_box()).diff("t", 2);
        assert_eq!(res, expected)
    }

    #[test]
    fn parse_dx_syntax() {
        let res = parse_expr("dx(dx(x))").unwrap();
        let [x] = symbols!("x");
        let expected = x.diff("x", 2);
        assert_eq!(res, expected)
    }

    #[test]
    fn parse_dx_dy_syntax() {
        let res = parse_expr("dx(dy(x))").unwrap();
        let [x, y] = symbols!("x", "y");
        let expected = Diff::new(&x.clone_box(), &[x.clone_box(), y.clone_box()]);
        assert_eq!(res, expected)
    }

    #[test]
    fn parse_d2_dt2_syntax() {
        let res = parse_expr("d2_dt2(u)").unwrap();
        let [u] = symbols!("u");
        let expected = u.diff("t", 2);
        assert_eq!(res, expected)
    }

    #[test]
    fn parse_d2u_dt2_syntax() {
        let res = parse_expr("d2u_dt2").unwrap();
        let [u] = symbols!("u");
        let expected = u.diff("t", 2);
        assert_eq!(res, expected)
    }

    #[test]
    fn parse_gaussian_pulse() {
        let res = parse_expr("exp(-100*((x-5)^2 + (y-5)^2))").unwrap();
        let [x, y] = symbols!("x", "y");

        let expected = Func::new_move_box(
            "exp".into(),
            vec![
                Integer::new_box(-100)
                    * ((x - Integer::new_box(5).get_ref()).ipow(2)
                        + (y - Integer::new_box(5).get_ref()).ipow(2)),
            ],
        );
        assert_eq!(res.get_ref(), expected.get_ref())
    }

    #[test]
    fn parse_brackets_sum() {
        let res = parse_expr("(1 + 2) + (3 + 4)").unwrap();
        assert_eq!(
            res.srepr(),
            "Add(Add(Integer(1), Integer(2)), Add(Integer(3), Integer(4)))"
        )
    }

    #[test]
    fn parse_rational() {
        let res = parse_expr("1/2").unwrap();
        assert_eq!(res, Rational::new_box(1, 2));
    }

    #[test]
    fn parse_float() {
        let res = parse_expr("0.5").unwrap();
        assert_eq!(res, Rational::new_box(1, 2));
    }

    #[test]
    fn parse_d2t_syntax() {
        let res = parse_expr("d2t(u)").unwrap();
        let [u] = symbols!("u");
        let expected = u.diff("t", 2);
        assert_eq!(res, expected)
    }

    #[test]
    fn parse_claud_wave_eq() {
        let res = parse_expr("d2t(u) = c^2 * (d2x(u) + d2y(u))").unwrap();
        let [u, c] = symbols!("u", "c");
        let expected = Equation::new_box(
            u.diff("t", 2),
            c.ipow(2) * (u.diff("x", 2) + u.diff("y", 2)),
        );
        assert_eq!(res, expected)
    }
}
