use lazy_static::lazy_static;
use regex::Regex;
use std::{num::ParseIntError, str::FromStr};

use crate::expr::*;

use thiserror::Error;

use crate::{Equation, Expr, Integer};

#[derive(Error, Debug, PartialEq)]
pub enum ParseExprError {
    #[error("bad equation: {0}")]
    Equation(#[from] ParseEquationError),
    #[error("parse integer: {0}")]
    Integer(#[from] ParseIntError),
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

impl FromStr for Integer {
    type Err = ParseIntError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        Ok(Integer { value: s.parse()? })
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
    BadOperand(#[from] Box<ParseExprError>),
}

impl FromStr for Add {
    type Err = ParseAddError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        Ok(Add::new_v2(
            split_root(s, &['+', '-'])
                .map(|(prev, piece)| -> Result<Box<dyn Expr>, Box<ParseExprError>> {
                    let mut op: Box<dyn Expr> = piece.parse().map_err(|e| Box::new(e))?;
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
    BadOperand(#[from] Box<ParseExprError>),
}

impl FromStr for Mul {
    type Err = ParseMulError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        Ok(Mul::new_move(
            split_root(s, &['*', '/'])
                .map(|(prev, piece)| -> Result<Box<dyn Expr>, Box<ParseExprError>> {
                    let mut op: Box<dyn Expr> = piece.parse().map_err(|e| Box::new(e))?;
                    if let Some('/') = prev {
                        op = op.ipow(-1);
                    }
                    Ok(op)
                })
                .collect::<Result<_, _>>()?,
        ))
    }
}

const func_pattern: &str = r"^(\w+)\(([^\)]*)\)$";

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
    #[error("invalid argument")]
    InvalidArg(#[from] Box<ParseExprError>),
}

pub fn parse_function(name: &str, args: &str) -> Result<Box<dyn Expr>, ParseFunctionError> {
    let args: Vec<_> = args.split(",").map(|arg| arg.trim()).collect();

    Ok(match name {
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
                    Ok(a.parse().map_err(|e| ParseFunctionError::InvalidArg(Box::new(e)))?)
                })
                .collect();

            Func::new_move_box(
                name.to_string(),
                args?,
            )
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

pub fn parse_expr(s: &str) -> Result<Box<dyn Expr>, ParseExprError> {
    let s = s.trim();
    Ok(if s.split("=").collect::<Vec<_>>().len() >= 2 {
        Box::new(s.parse::<Equation>()?)
    } else if let Some(captured_func) = func_re.captures(s) {
        return Ok(parse_function(&captured_func[1], &captured_func[2])?);
    } else if s
        .chars()
        .enumerate()
        .all(|(i, c)| c.is_numeric() || i == 0 && c == '-')
    {
        Box::new(s.parse::<Integer>()?)
    } else if let Some((_, add_piece)) = split_root(s, &['+', '-']).next()
        && add_piece.len() != s.len()
    {
        Box::new(s.parse::<Add>()?)
    } else if let Some((_, mul_piece)) = split_root(s, &['*', '/']).next()
        && mul_piece.len() != s.len()
    {
        Box::new(s.parse::<Mul>()?)
    } else if s.len() > 0
        && let Some(first) = s.chars().next()
        && let Some(i_opener) = openers
            .iter()
            .enumerate()
            .find_map(|(i, opener)| if opener == &first { Some(i) } else { None })
    {
        let last = s.chars().last().unwrap();
        let closer = closers[i_opener];

        if closer != last {
            return Err(ParseExprError::BracketMismatch(openers[i_opener], last));
        }
        return parse_expr(&s[1..s.len() - 1]);
    } else if s.contains("^") {
        Box::new(s.parse::<Pow>()?)
    } else {
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
            Err(ParseExprError::Equation(
                ParseEquationError::WrongNumberOfOperands(3)
            ))
        )
    }

    #[test]
    fn test_parse_bad_eq_empty_op() {
        let res = parse_expr("1 =");
        assert_eq!(
            res,
            Err(ParseExprError::Equation(ParseEquationError::EmptyOperand))
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
}
