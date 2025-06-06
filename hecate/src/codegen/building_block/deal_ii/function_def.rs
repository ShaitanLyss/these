use crate::{
    Symbol,
    codegen::input_schema::{Condition, ConditionedFunction, FunctionDef, range::Range},
};

pub(super) fn function_def_to_deal_ii_code(function_def: &FunctionDef) -> String {
    match function_def {
        FunctionDef::Expr(expr) => format!("return {};", expr.to_cpp()),
        FunctionDef::Conditioned(conditionedFunctions) => {
            let mut res: Vec<String> = Vec::with_capacity(conditionedFunctions.len());

            for i in 0..conditionedFunctions.len() {
                let ConditionedFunction { expr, t, x, y, z } = &conditionedFunctions[i];
                let mut conditions: Vec<String> = Vec::new();
                if let Some(condition) = t {
                    match condition {
                        Condition::Value(value) => {
                            conditions.push(format!("float_equals(get_time(), {})", value.seconds()))
                        }
                        Condition::Range(range) => conditions.push(format!(
                            "get_time() >= {} && get_time() <= {}",
                            range.start.seconds(),
                            range.end.seconds()
                        )),
                    }
                }
                for (condition, accesser) in [(x, "point[0]"), (y, "point[1]"), (z, "point[2]")] {
                    if let Some(condition) = condition {
                        match condition {
                            Condition::Value(value) => {
                                conditions.push(format!("float_equals({accesser}, {})", value.meters()))
                            }
                            Condition::Range(range) => conditions.push(format!(
                                "{accesser} >= {} && {accesser} <= {}",
                                range.start.meters(),
                                range.end.meters()
                            )),
                        }
                    }
                }
                let expr_cpp = expr
                    .subs(&[
                        [Symbol::new_box("t"), Symbol::new_box("get_time()")],
                        [Symbol::new_box("x"), Symbol::new_box("point[0]")],
                        [Symbol::new_box("y"), Symbol::new_box("point[1]")],
                        [Symbol::new_box("z"), Symbol::new_box("point[2]")],
                    ])
                    .to_cpp();
                if conditions.is_empty() {
                    res.push(format!("else {{\n  return {expr_cpp};\n}}"));
                    return res.join("\n");
                }
                let final_condition = conditions.join(" && ");
                if i == 0 {
                    res.push(format!(
                        "if ({final_condition}) {{\n  return {expr_cpp};\n}}"
                    ));
                } else {
                    res.push(format!(
                        "else if ({final_condition}) {{\n  return {expr_cpp};\n}}"
                    ));
                }
            }

            res.push(format!("return 0;\n"));

            res.join("\n")
        }
    }
}

#[cfg(test)]
mod tests {

    use super::*;

    #[test]
    fn test_function_zero() {
        let function_def = FunctionDef::Expr("0".parse().unwrap());

        let res = function_def_to_deal_ii_code(&function_def);
        assert_eq!(res, "return 0;")
    }

    #[test]
    fn test_function_one() {
        let function_def = FunctionDef::Expr("1".parse().unwrap());

        let res = function_def_to_deal_ii_code(&function_def);
        assert_eq!(res, "return 1;")
    }
}
