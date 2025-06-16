use std::collections::HashSet;

use itertools::Itertools;
use regex::{Captures, Regex};

use crate::codegen::building_block::{ApplyBoundaryConditionConfig, InitialConditionConfig};
use crate::symbolic::*;
use crate::{
    Equation, Expr,
    codegen::input_schema::{FiniteElement, mesh::HyperCubeMesh},
};
mod function_def;
use function_def::function_def_to_deal_ii_code;

use super::{
    BuildingBlock, BuildingBlockError, BuildingBlockFactory, DofHandlerConfig, EquationSetupConfig,
    ExprCodeGenError, MatrixConfig, ShapeMatrixConfig, SolveUnknownConfig, SparsityPatternConfig,
    VectorConfig,
};

macro_rules! lines {
    ($s:expr) => {
        format!($s)
            .trim()
            .split("\n")
            .map(|s| s.to_string())
            .collect_vec()
    };
}

pub fn deal_ii_factory<'a>() -> BuildingBlockFactory<'a> {
    let mut factory = BuildingBlockFactory::new("deal.II");

    factory.add_mesh("hyper_cube", &|name, mesh| {
        let HyperCubeMesh {
            range,
            subdivisions,
            show_info,
        }: &HyperCubeMesh = mesh
            .as_any()
            .downcast_ref()
            .ok_or(BuildingBlockError::WrongInput("hyper_cube".to_string()))?;

        let start = range.start.value;
        let end = range.end.value;
        let mut hyper_cube = BuildingBlock::new();

        hyper_cube.add_includes(&["deal.II/grid/grid_generator.h", "deal.II/grid/tria.h"]);
        hyper_cube.data.push(format!("Triangulation<dim> {name}"));
        hyper_cube
            .setup
            .push(format!("GridGenerator::hyper_cube({name}, {start}, {end})"));
        hyper_cube
            .setup
            .push(format!("{name}.refine_global({subdivisions})"));

        if *show_info {
            hyper_cube.setup.push(format!(
                r#"std::cout << "Number of active cells: " << {name}.n_active_cells() << "\n""#
            ));
        }

        Ok(hyper_cube)
    });

    factory.set_vector(&|name, config| {
        let VectorConfig { dof_handler } = config;
        let mut vector = BuildingBlock::new();
        vector.add_includes(&["deal.II/lac/vector.h"]);
        vector.add_data(&format!("Vector<data_type> {name}"));

        vector
            .setup
            .push(format!("{name}.reinit({dof_handler}.n_dofs())"));

        Ok(vector)
    });

    factory.set_dof_handler(&|name, DofHandlerConfig { mesh, element }| {
        let mut dof_handler = BuildingBlock::new();
        dof_handler.add_includes(&["deal.II/dofs/dof_handler.h"]);
        dof_handler.constructor.push(format!("{name}({mesh})"));
        dof_handler.push_data(format!("DoFHandler<dim> {name}"));

        dof_handler
            .setup
            .push(format!("{name}.distribute_dofs({element})"));
        dof_handler.setup.push(format!(
            r#"std::cout << "Number of degrees of freedom: " << {name}.n_dofs() << "\n\n""#
        ));

        Ok(dof_handler)
    });

    factory.set_finite_element(&|name, element| {
        let mut block = BuildingBlock::new();
        block.add_includes(&["deal.II/fe/fe_q.h"]);
        block.constructor.push(format!(
            "{name}({})",
            match element {
                FiniteElement::Q1 => 1,
                FiniteElement::Q2 => 2,
                FiniteElement::Q3 => 3,
            }
        ));
        block.data.push(format!("const FE_Q<dim> {name}"));
        Ok(block)
    });

    factory.set_sparsity_pattern(&|name, SparsityPatternConfig { dof_handler }| {
        let mut block = BuildingBlock::new();
        let dsp = format!("{dof_handler}_dsp");

        block.add_includes(&[
            "deal.II/lac/dynamic_sparsity_pattern.h",
            "deal.II/lac/sparsity_pattern.h",
            "deal.II/dofs/dof_tools.h",
        ]);

        block.push_data(format!("SparsityPattern {name}"));
        block.push_setup([
            format!("DynamicSparsityPattern {dsp}({dof_handler}.n_dofs(), {dof_handler}.n_dofs())"),
            format!("DoFTools::make_sparsity_pattern({dof_handler}, {dsp})"),
            format!("{name}.copy_from({dsp})"),
        ]);
        block.additional_names.insert(dsp);

        Ok(block)
    });

    factory.set_matrix(&|name, MatrixConfig { sparsity_pattern }| {
        let mut block = BuildingBlock::new();
        block.add_includes(&["deal.II/lac/sparse_matrix.h"]);

        block.push_data(format!("SparseMatrix<data_type> {name}"));
        block.push_setup([format!("{name}.reinit({sparsity_pattern})")]);

        Ok(block)
    });

    factory.set_shape_matrix(&|name, mut matrix, ShapeMatrixConfig { dof_handler, element, matrix_config:_, kind }| {

        matrix.add_includes(&[
            "deal.II/numerics/matrix_creator.h",
            "deal.II/base/quadrature_lib.h",

        ]);
        matrix.push_setup([
                    format!("MatrixCreator::create_{kind}_matrix({dof_handler}, QGauss<2>({element}.degree + 1), {name})")
        ]);
        Ok(matrix)
    });

    factory.set_solve_unknown(&|name,
                                SolveUnknownConfig {
                                    rhs,
                                    unknown_vec,
                                    unknown_mat,
                                }| {
        let mut block = BuildingBlock::new();

        block.add_includes(&[
            "deal.II/lac/solver_cg.h",
            "deal.II/lac/precondition.h",
            "deal.II/lac/solver_control.h",
        ]);

        block.methods_defs.push(format!("void {name}()"));

        block.methods_impls.push(format!(
            r#"
void Sim::{name}() {{
  SolverControl solver_control(1000, 1e-8 * {rhs}.l2_norm());
  SolverCG<Vector<data_type>> cg(solver_control);

  cg.solve({unknown_mat}, {unknown_vec}, {rhs}, PreconditionIdentity());

  std::cout << "    {name}: " << solver_control.last_step()
            << "  CG iterations." << std::endl;
}}
            "#
        ));

        Ok(block)
    });

    factory.set_equation_setup(&|_name,
                                 EquationSetupConfig {
                                     equation,
                                     unknown,
                                     vectors,
                                     matrixes,
                                 }| {
        let mut block = BuildingBlock::new();

        block
            .main
            .push(format!("// # Setup equation {}", equation.str()));

        let equation_code =
            equation_to_deall_ii_setup_code(&equation, *unknown, vectors, matrixes)?;
        let mut tmp_vecs: HashSet<String> = HashSet::new();
        let mut tmp_mats: HashSet<String> = HashSet::new();

        let tmp_re = Regex::new(r"\b[mv]tmp\d*\b").unwrap();

        for capture in tmp_re.captures_iter(&equation_code) {
            let tmp = &capture[0];

            match tmp.chars().next().expect("tmp is not empty") {
                'm' => {
                    tmp_mats.insert(tmp.to_string());
                }
                'v' => {
                    tmp_vecs.insert(tmp.to_string());
                }
                _ => unreachable!(),
            }
        }

        for vec in tmp_vecs {
            block.additional_vectors.insert(vec);
        }

        for mat in tmp_mats {
            block.additional_matrixes.insert(mat);
        }

        block
            .main
            .extend(equation_code.split('\n').map(|s| s.to_string()));

        Ok(block)
    });

    factory.set_parameter(&|name, value| {
        let mut block = BuildingBlock::new();

        block
            .main
            .push(format!("const data_type {name} = {value};"));

        Ok(block)
    });

    factory.set_function(&|name, function_def| {
        let fn_name = name.split("_").last().expect("name is not empty");
        let class_name = format!("Fn_{fn_name}");
        let mut block = BuildingBlock::new();

        block.add_includes(&["deal.II/base/function.h"]);

        let function_code = function_def_to_deal_ii_code(function_def)
            .trim()
            .split("\n")
            .map(|line| format!("    {line}"))
            .collect_vec()
            .join("\n");

        block.data.push(format!("{class_name} {name}"));

        block.add_global(
            format!(
                r"
class {class_name} : public Function<dim> {{
public:
  virtual double value(const Point<dim> &point,
                       const unsigned int component = 0) const override {{
{function_code}
  }}
}};
"
            )
            .trim(),
        );

        Ok(block)
    });

    factory.set_apply_boundary_condition(&|_name,
                                           ApplyBoundaryConditionConfig {
                                               function,
                                               dof_handler,
                                               matrix,
                                               solution,
                                               rhs,
                                           }| {
        let mut block = BuildingBlock::new();

        block.add_includes(&[
            "deal.II/numerics/vector_tools_boundary.h",
            "deal.II/numerics/matrix_tools.h",
        ]);

        block.main.extend(lines!(
            r"
// Apply boundary condition to the equation for solving {solution}
{{
  {function}.set_time(time);

  std::map<types::global_dof_index, double> boundary_values;
  VectorTools::interpolate_boundary_values(
      {dof_handler}, 0, {function}, boundary_values);
  MatrixTools::apply_boundary_values(boundary_values, {matrix}, {solution},
                                     {rhs});
}}
               "
        ));

        Ok(block)
    });

    factory.set_initial_condition(&|_name,
                                    InitialConditionConfig {
                                        dof_handler,
                                        function,
                                        element,
                                        target,
                                    }| {
        let mut block = BuildingBlock::new();

        block.add_includes(&["deal.II/numerics/vector_tools_project.h"]);

        let unknown = target.split("_").next().unwrap();

        block.main_setup.extend(lines!(
            r"// Apply Intial Condition for {unknown} 
VectorTools::project({dof_handler}, constraints, QGauss<dim>({element}.degree + 1),
                     {function}, {target});"
        ));

        Ok(block)
    });

    factory.set_add_vector_output(&|_name, vector| {
        let mut block = BuildingBlock::new();

        block.output.push(format!(
            r#"data_out.add_data_vector({vector}, "{vector}");"#
        ));

        Ok(block)
    });

    factory
}

fn equation_to_deall_ii_setup_code(
    equation: &Equation,
    unknown: &dyn Expr,
    vectors: &[&dyn Expr],
    matrixes: &[&dyn Expr],
) -> Result<String, ExprCodeGenError> {
    let lhs = equation.lhs.expand().factor(&[unknown]);
    let lhs = lhs.as_mul();
    if lhs.is_none() {
        panic!("lhs of equation must be a multiplication after factorization by the unknown");
    }
    let lhs = lhs.unwrap();
    if lhs.operands.len() != 2 {
        panic!("lhs of factorized equation must be a multiplication with two operands");
    }
    let system = mat_code_gen(
        &format!("matrix_{}", unknown.to_cpp()),
        lhs.operands[0].get_ref(),
        vectors,
        matrixes,
    )?;

    let rhs = equation.rhs.get_ref();
    let rhs = rhs_code_gen(rhs, vectors, matrixes)?;

    Ok(format!(
        "// ## Compute system for {unknown}\n{system}\n\n\n// ## Compute rhs for {unknown}\n{rhs}"
    ))
}

type ExprCodeGenRes = Result<StringWKind, ExprCodeGenError>;

#[derive(Debug, PartialEq, Clone, Copy)]
enum ResKind {
    Vector,
    Matrix,
    Scalar,
}

use ResKind::*;

#[derive(Debug, PartialEq)]
struct StringWKind(String, ResKind);

impl StringWKind {
    fn new(kind: ResKind) -> Self {
        StringWKind(String::new(), kind)
    }
}

impl From<(ResKind, String)> for StringWKind {
    fn from(value: (ResKind, String)) -> Self {
        StringWKind(value.1, value.0)
    }
}

impl From<(ResKind, &str)> for StringWKind {
    fn from(value: (ResKind, &str)) -> Self {
        StringWKind(value.1.to_string(), value.0)
    }
}

impl std::ops::AddAssign<&StringWKind> for StringWKind {
    fn add_assign(&mut self, rhs: &Self) {
        self.0 += &rhs.0;
        match (self.1, rhs.1) {
            (Scalar, other) | (other, Scalar) => {
                self.1 = other;
            }
            (a, b) if a == b => (),
            _ => {
                panic!(
                    "incompatible kinds for additions {:?} and {:?}",
                    self.1, rhs.1
                );
            }
        }
    }
}

impl std::cmp::PartialEq<(ResKind, &str)> for StringWKind {
    fn eq(&self, other: &(ResKind, &str)) -> bool {
        self.1 == other.0 && self.0 == other.1
    }
}

impl std::ops::AddAssign<&str> for StringWKind {
    fn add_assign(&mut self, rhs: &str) {
        self.0 += rhs;
    }
}

impl std::ops::AddAssign<&String> for StringWKind {
    fn add_assign(&mut self, rhs: &String) {
        self.0 += rhs;
    }
}

impl std::ops::MulAssign<&StringWKind> for StringWKind {
    fn mul_assign(&mut self, rhs: &StringWKind) {
        self.0 += &rhs.0;
        match (self.1, rhs.1) {
            (Scalar, other) | (other, Scalar) => {
                self.1 = other;
            }
            (Matrix, Vector) => {
                self.1 = Vector;
            }
            (Matrix, Matrix) => {
                self.1 = Matrix;
            }
            _ => {
                panic!(
                    "incompatible kinds for multiplications {:?} and {:?}",
                    self.1, rhs.1
                );
            }
        }
    }
}

fn expr_code_gen(
    target: &str,
    expr: &dyn Expr,
    vectors: &[&dyn Expr],
    matrixes: &[&dyn Expr],
    depth: usize,
) -> ExprCodeGenRes {
    let expr = expr.simplify();

    if vectors.contains(&expr.get_ref()) {
        let vector_cpp = expr.to_cpp();
        return Ok((Vector, format!("{target} = {vector_cpp};")).into());
    } else if matrixes.contains(&expr.get_ref()) {
        let matrix_cpp = expr.to_cpp();
        return Ok((Matrix, format!("{target}.copy_from({matrix_cpp});")).into());
    }
    Ok(match expr.known_expr() {
        KnownExpr::Symbol(symbol) => (Scalar, format!("{target} = {};", symbol.to_cpp())).into(),
        KnownExpr::Integer(Integer { value }) => (Scalar, format!("{target} = {value};")).into(),
        KnownExpr::Rational(Rational { num, denom }) => {
            (Scalar, format!("{target} = {num} / {denom};")).into()
        }
        KnownExpr::Add(add) => {
            let operands = &add.operands;

            if operands.len() == 0 {
                (Scalar, format!("{target} = 0;")).into()
            } else {
                let first_op = &operands[0];
                // let mut res = format!("{target} = {first_op};");
                let mut res = StringWKind::new(Scalar);
                if operands.len() >= 2 {
                    if depth > 0 {
                        res += "\n";
                    }
                    res += &format!("// {target} = {expr}\n")
                }
                res += &expr_code_gen(target, first_op.get_ref(), vectors, matrixes, depth)?;
                res += "\n";

                for op in operands.iter().skip(1) {
                    res += &format!("\n// {target} += {op}\n");

                    let is_vector = |op: &dyn Expr| -> bool { vectors.contains(&op.get_ref()) };

                    let is_scalar = |op: &dyn Expr| -> bool {
                        vectors.iter().all(|v| !op.get_ref().has(*v))
                            && matrixes.iter().all(|m| !op.get_ref().has(*m))
                    };
                    if is_vector(op.get_ref()) || is_scalar(op.get_ref()) {
                        let op_cpp = op.to_cpp();
                        res += &format!("{target} += {op_cpp};");
                        continue;
                    }

                    let mut tmp_target = if depth == 0 {
                        "$x$".to_string()
                    } else {
                        format!("$x{depth}$")
                    };
                    let StringWKind(mut tmp, tmp_kind) =
                        expr_code_gen(&tmp_target, op.get_ref(), vectors, matrixes, depth + 1)?;

                    match tmp_kind {
                        Vector => {
                            let new_target = if depth == 0 {
                                "vtmp".to_string()
                            } else {
                                format!("vtmp{depth}")
                            };
                            tmp = tmp.replace(&tmp_target, &new_target);
                            tmp_target = new_target;
                        }

                        Matrix => {
                            let new_target = if depth == 0 {
                                "mtmp".to_string()
                            } else {
                                format!("mtmp{depth}")
                            };
                            tmp = tmp.replace(&tmp_target, &new_target);
                            tmp_target = new_target;
                        }

                        Scalar => {
                            todo!(
                                "Scalar sub res (could happen if we support dot product for instance)"
                            )
                        }
                    }

                    let scalar_mul_pattern = format!(r"^//.*\n(.*?;)\s*{tmp_target} \*= (.+?);$");
                    let scalar_mul_re = Regex::new(&scalar_mul_pattern).unwrap();

                    let scalar_vec_mul_pattern =
                        format!(r"^(?s)(.*){tmp_target}\.equ\((.*?), (\w+)\);$");
                    let scalar_vec_mul_re = Regex::new(&scalar_vec_mul_pattern).unwrap();

                    let useless_temporary_value_pattern = format!(
                        r"(?s)^(.*){tmp_target}(?: = |\.copy_from\()(\w*?)\)?;\n(.*?, {tmp_target}\);)$"
                    );
                    let useless_temporary_value_re =
                        Regex::new(&useless_temporary_value_pattern).unwrap();

                    let mut partial_res = String::new();

                    if let Some(captures) = scalar_mul_re.captures(&tmp) {
                        // partial_res += "\n";
                        partial_res += &captures[1];
                        partial_res += "\n";
                        let coeff = &captures[2];
                        if coeff == "-1" {
                            partial_res += &format!("{target} -= {tmp_target};");
                        } else {
                            partial_res += &format!("{target}.add({coeff}, {tmp_target});");
                        }
                    } else if let Some(captures) = scalar_vec_mul_re.captures(&tmp) {
                        partial_res += &captures[1];
                        let coeff = &captures[2];
                        let source = &captures[3];
                        if coeff == "-1" {
                            partial_res += &format!("{target} -= {source};");
                        } else {
                            partial_res += &format!("{target}.add({coeff}, {source});");
                        }
                    } else {
                        partial_res += &tmp;
                        partial_res += "\n";
                        partial_res += &format!("{target} += {tmp_target};");
                    }

                    // Remove introduced temporary if redondant
                    if let Some(captures) =
                        useless_temporary_value_re.captures(&partial_res.clone())
                    {
                        partial_res = captures[1].to_string();
                        partial_res += &captures[3].replace(&tmp_target, &captures[2]);
                    }

                    res += &StringWKind(partial_res, tmp_kind);
                    res += "\n";
                }

                if operands.len() < 2 {
                    let StringWKind(res_str, res_kind) = res;
                    (res_kind, format!("{res_str}  // {target} = {expr}")).into()
                } else {
                    res += "\n";

                    // When two simple coeff additions are found, simplify to one double coeff addition
                    let sequence_of_two_adds_pattern = format!(
                        r"// {target} \+= (.*?)\s*{target}\.add\((.*?), (\w+)\);\s*// {target} \+= (.*?)\s*{target}\.add\((.*?), (\w+)\);"
                    );
                    let sequence_of_two_adds_re =
                        Regex::new(&sequence_of_two_adds_pattern).unwrap();
                    res.0 = sequence_of_two_adds_re
                        .replace_all(&res.0, |captures: &Captures| {
                            format!(
                                "// {target} += {} + {}\n{target}.add({}, {}, {}, {});",
                                &captures[1],
                                &captures[4],
                                &captures[2],
                                &captures[3],
                                &captures[5],
                                &captures[6]
                            )
                        })
                        .to_string();
                    res
                }
            }
        }
        KnownExpr::Mul(mul) => {
            #[derive(Debug)]
            enum Kind {
                Vec(Box<dyn Expr>),
                Mat(Box<dyn Expr>),
                Code(String, StringWKind),
            }

            let mut seq: Vec<Kind> = Vec::with_capacity(mul.operands.len());
            let mut coeff = Integer::one_box();

            for op in &mul.operands {
                let op = op.get_ref();
                if vectors.contains(&op) {
                    seq.push(Kind::Vec(op.clone_box()));
                } else if matrixes.contains(&op) {
                    seq.push(Kind::Mat(op.clone_box()));
                } else if vectors.iter().all(|v| !op.has(*v))
                    && matrixes.iter().all(|m| !op.has(*m))
                {
                    coeff *= op;
                } else {
                    match op.known_expr() {
                        _ => {
                            let tmp_vec = if depth == 0 {
                                "$x$".to_string()
                            } else {
                                format!("$x{depth}$")
                            };

                            let mut sub_code_gen =
                                expr_code_gen(&tmp_vec, op, vectors, matrixes, depth + 1)?;

                            let new_tmp = match sub_code_gen.1 {
                                Vector => {
                                    if depth == 0 {
                                        "vtmp".to_string()
                                    } else {
                                        format!("vtmp{depth}")
                                    }
                                }
                                Matrix => {
                                    if depth == 0 {
                                        "mtmp".to_string()
                                    } else {
                                        format!("mtmp{depth}")
                                    }
                                }
                                _ => unimplemented!(),
                            };

                            sub_code_gen.0 = sub_code_gen.0.replace(&tmp_vec, &new_tmp);
                            // tmp_vec = new_tmp;
                            // let sub_code_gen_kind = sub_code_gen.1;
                            seq.push(Kind::Code(new_tmp, sub_code_gen));
                            // seq.push(match sub_code_gen_kind {
                            //     Scalar => unimplemented!(),
                            //     Vector => Kind::Vec(Symbol::new_box(&tmp_vec)),
                            //     Matrix => Kind::Mat(Symbol::new_box(&tmp_vec)),
                            // });
                        } // _ => {
                          //     Err(ExprCodeGenError::UnsupportedMulOperand(op.clone_box()))?
                          // }
                    }
                }
            }
            let coeff = coeff.simplify();
            let coeff_cpp = coeff.to_cpp();

            match seq.as_slice() {
                [] => (Scalar, format!("{target} = {};", coeff.to_cpp())).into(),
                [Kind::Vec(v)] => {
                    let v_cpp = v.to_cpp();
                    (
                        Vector,
                        if coeff.is_one() {
                            format!("{target} = {v_cpp};")
                        } else {
                            let coeff_cpp = coeff.to_cpp();
                            format!(
                                "{}{target}.equ({coeff_cpp}, {v_cpp});",
                                if depth == 0 {
                                    format!("// {target} = {coeff} * {v}\n")
                                } else {
                                    String::new()
                                }
                            )
                        },
                    )
                        .into()
                }
                [Kind::Mat(m)] => {
                    let m_cpp = m.to_cpp();
                    (Matrix, if coeff.is_one() {
                        format!("{target} = {m_cpp};")
                    } else {
                        let coeff_cpp = coeff.to_cpp();
                        format!(
                            "// {target} = {coeff} * {m}\n{target}.copy_from({m_cpp}); {target} *= {coeff_cpp};"
                        )
                    }).into()
                }
                [Kind::Vec(a), Kind::Vec(b)] => {
                    let a_cpp = a.to_cpp();
                    let b_cpp = b.to_cpp();
                    (Vector, if coeff.is_one() {
                        format!("// {target} = {a}.{b}\n{target} = {a_cpp} * {b_cpp};  ")
                    } else {
                        let coeff_cpp = coeff.to_cpp();
                        format!(
                            "// {target} = {coeff} * {a}.{b}\n{target} = {coeff_cpp} * ({a_cpp} * {b_cpp});"
                        )
                    }).into()
                }
                [Kind::Mat(m), Kind::Vec(v)] => {
                    let m_cpp = m.to_cpp();
                    let v_cpp = v.to_cpp();
                    (Vector, if coeff.is_one() {
                        format!("// {target} = {expr}\n{m_cpp}.vmult({target}, {v_cpp});")
                    } else {
                        format!(
                            "// {target} = {expr}\n{m_cpp}.vmult({target}, {v_cpp}); {target} *= {coeff_cpp};"
                        )
                    }).into()
                }
                _ => {
                    let mut res = StringWKind::new(Scalar);
                    let mut source = target.to_string();

                    for kind in &seq {
                        match (res.1, kind) {
                            (Vector, Kind::Vec(_)) => Err(ExprCodeGenError::VectorMul)?,
                            (_, Kind::Code(src, code)) => {
                                res *= code;
                                source = src.to_string();
                            }
                            (Matrix, Kind::Mat(m)) => {
                                let m_cpp = m.to_cpp();
                                res *= &StringWKind(
                                    format!("{source}.mmult({target}, {m_cpp});"),
                                    Matrix,
                                );
                            }
                            (Matrix, Kind::Vec(v)) => {
                                let v_cpp = v.to_cpp();
                                res += &format!("// {target} = {source} * {v}\n");
                                res *= &StringWKind(
                                    format!("{source}.vmult({target}, {v_cpp});"),
                                    Vector,
                                );
                            }
                            _ => todo!("mul many: {:?} {kind:?}", res.1),
                        }
                    }

                    res
                }
            }
        }

        KnownExpr::Pow(Pow { base, exponent }) => {
            let base_cpp = base.to_cpp();
            if exponent.is_neg_one() {
                (Scalar, format!("{target} = 1 / {base_cpp};")).into()
            } else {
                todo!("code gen of pows with exponents other than -1")
            }
        }
        _ => Err(ExprCodeGenError::UnsupportedExpr(expr.clone_box()))?,
    })
}

fn rhs_code_gen(
    expr: &dyn Expr,
    vectors: &[&dyn Expr],
    matrixes: &[&dyn Expr],
) -> Result<String, ExprCodeGenError> {
    vec_code_gen("rhs", expr, vectors, matrixes)
}

fn vec_code_gen(
    target: &str,
    expr: &dyn Expr,
    vectors: &[&dyn Expr],
    matrixes: &[&dyn Expr],
) -> Result<String, ExprCodeGenError> {
    let StringWKind(res, res_kind) = expr_code_gen(target, expr, vectors, matrixes, 0)?;
    match res_kind {
        Vector | Scalar => Ok(res.trim().to_string()),
        _ => Err(ExprCodeGenError::MatResult),
    }
}

fn mat_code_gen(
    target: &str,
    expr: &dyn Expr,
    vectors: &[&dyn Expr],
    matrixes: &[&dyn Expr],
) -> Result<String, ExprCodeGenError> {
    let StringWKind(res, res_kind) = expr_code_gen(target, expr, vectors, matrixes, 0)?;
    match res_kind {
        Matrix | Scalar => Ok(res.trim().to_string()),
        _ => Err(ExprCodeGenError::VecResult),
    }
}

#[cfg(test)]
mod tests {
    use crate::{symbol, symbols};

    use super::*;

    #[test]
    fn test_rhs_zero() {
        let expr = Integer::zero();
        let res = rhs_code_gen(expr.get_ref(), &[], &[]).unwrap();
        assert_eq!(res, "rhs = 0;")
    }

    #[test]
    fn test_rhs_vector() {
        let u = symbol!("u");
        let res = rhs_code_gen(u, &[u], &[]).unwrap();

        assert_eq!(res, "rhs = u;")
    }

    #[test]
    fn test_rhs_coeff_vector() {
        let u = symbol!("u");
        let c = symbol!("c");
        let expr = c * u;
        let res = rhs_code_gen(expr.get_ref(), &[u], &[]).unwrap();
        assert_eq!(res, "// rhs = c * u\nrhs.equ(c, u);")
    }
    #[test]
    fn test_rhs_coeff_vector_2() {
        let u = symbol!("u");
        let c = symbol!("c");
        let r = Rational::new(2, 3);
        let expr = (r - 4) * c * u;
        let res = rhs_code_gen(expr.get_ref(), &[u], &[]).unwrap();
        assert_eq!(res, "// rhs = (-10/3)c * u\nrhs.equ((-10./3.) * c, u);")
    }

    #[test]
    fn test_rhs_coeff_vector_simplify() {
        let u = symbol!("u");

        let expr = u * 3 - u * 2;
        let res = rhs_code_gen(expr.get_ref(), &[u], &[]).unwrap();
        assert_eq!(res, "rhs = u;")
    }

    #[test]
    fn test_rhs_mul_mat_vec() {
        let [a, u] = symbols!("A", "u");

        let expr = a * u;
        let res = rhs_code_gen(expr.get_ref(), &[u], &[a]).unwrap();

        assert_eq!(res, "// rhs = Au\na.vmult(rhs, u);")
    }

    #[test]
    #[ignore]
    fn test_rhs_addition() {
        let [u, v] = symbols!("u", "v");

        let expr = u + v;
        let res = rhs_code_gen(expr.get_ref(), &[u, v], &[]).unwrap();
        assert_eq!(
            res,
            r"
// rhs = u + v
rhs = u;
rhs += v;"
                .trim()
        )
    }
    #[test]
    #[ignore]
    fn test_rhs_addition_3_vec() {
        let [u, v, w] = symbols!("u", "v", "w");

        let expr = u + v + w;
        let res = rhs_code_gen(expr.get_ref(), &[u, v, w], &[]).unwrap();
        assert_eq!(res, "rhs = u; rhs.add(1, v, 1, w);  // rhs = u + v + w")
    }

    #[test]
    fn test_coeff_vec() {
        let [k, u] = symbols!("k", "U");

        let expr = k * u;
        let res = rhs_code_gen(expr.get_ref(), &[u], &[]).unwrap();
        assert_eq!(res, "// rhs = k * U\nrhs.equ(time_step, u);")
    }

    #[test]
    fn test_rhs_wave_eq_start() {
        // rhs = M.U^n-1 + k.M.V^n-1
        let [m, u_prev, v_prev, k] = symbols!("m", "u_prev", "v_prev", "k");
        let expr = m * u_prev - k * m * v_prev;
        let res = rhs_code_gen(expr.get_ref(), &[v_prev, u_prev], &[m]).unwrap();

        let expected = r"
// rhs = mu_prev - kmv_prev
// rhs = mu_prev
m.vmult(rhs, u_prev);

// rhs += -kmv_prev
m.vmult(vtmp, v_prev);
rhs.add(-time_step, vtmp);"
            .trim();

        println!("{res}\n\n{expected}");

        assert_eq!(res, expected)
    }

    #[test]
    fn test_vec_dot_product() {
        let [u, v] = symbols!("u", "v");
        let expr = u * v;
        let res = rhs_code_gen(expr.get_ref(), &[u, v], &[]).unwrap();

        assert_eq!(res, "// rhs = u.v\nrhs = u * v;")
    }

    #[test]
    fn test_coeff_vec_dot_product() {
        let [k, u, v] = symbols!("k", "u", "v");
        let expr = k * 2 * u * v;
        let res = rhs_code_gen(expr.get_ref(), &[u, v], &[]).unwrap();
        assert_eq!(res, "// rhs = 2k * u.v\nrhs = 2 * time_step * (u * v);")
    }

    #[test]
    fn test_mul_coeff_mat_vec() {
        let [k, a, u] = symbols!("k", "A", "u");

        let expr = k * a * u;
        let res = rhs_code_gen(expr.get_ref(), &[u], &[a]).unwrap();
        assert_eq!(res, "// rhs = kAu\na.vmult(rhs, u); rhs *= time_step;")
    }

    #[test]
    fn test_wave_eq_rhs_full() {
        // (-(1 / k)M^n + (1/4)(c^2)kA^n)U^n-1 - M^nV^n-1 + (-1/4)kF^n-1 + (-1/4)kF^n
        let [k, mass_mat, c, laplace_mat, u_prev, v_prev, f, f_prev] = symbols!(
            "k",
            "mass_mat",
            "c",
            "laplace_mat",
            "u_prev",
            "v_prev",
            "f",
            "f_prev"
        );

        let expr = (-(Integer::one_box() / k) * mass_mat
            + Rational::new_box(1, 4) * c.ipow(2) * laplace_mat)
            * u_prev
            - mass_mat * v_prev
            + Rational::new_box(-1, 4) * k * f_prev
            + Rational::new_box(-1, 4) * k * f;
        println!("\n{expr}\n");
        let res = rhs_code_gen(
            expr.get_ref(),
            &[u_prev, v_prev, f, f_prev],
            &[mass_mat, laplace_mat],
        )
        .unwrap();

        let expected = r"
// rhs = (-(1 / k)mass_mat + (1/4)(c^2)laplace_mat)u_prev - mass_mat.v_prev + (-1/4)kf_prev + (-1/4)kf

// mtmp = -(1 / k)mass_mat + (1/4)(c^2)laplace_mat
// mtmp = -(1 / k) * mass_mat
mtmp.copy_from(mass_mat); mtmp *= -(1 / time_step);

// mtmp += (1/4)(c^2)laplace_mat
mtmp.add((1./4.) * (c * c), laplace_mat);

// rhs = mtmp * u_prev
mtmp.vmult(rhs, u_prev);

// rhs += -mass_mat.v_prev
mass_mat.vmult(vtmp, v_prev);
rhs -= vtmp;

// rhs += (-1/4)kf_prev + (-1/4)kf
rhs.add((-1./4.) * time_step, f_prev, (-1./4.) * time_step, f);
".trim();

        println!("\n# Res:\n{}\n# End Res", res);
        println!("\n# Expected:\n{}\n# End Expected", expected);

        assert_eq!(res, expected)
    }

    #[test]
    fn test_wave_eq_system() {
        // -(1 / k)M^n + (-1/4)(c^2)kA^n

        let [k, mass_mat, c, laplace_mat] = symbols!("k", "mass_mat", "c", "laplace_mat");

        let expr = -(Integer::one_box() / k) * mass_mat
            + Rational::new_box(-1, 4) * c.ipow(2) * laplace_mat;
        let res = mat_code_gen("system", expr.get_ref(), &[], &[mass_mat, laplace_mat]).unwrap();
        let expected = r"
// system = -(1 / k)mass_mat + (-1/4)(c^2)laplace_mat
// system = -(1 / k) * mass_mat
system.copy_from(mass_mat); system *= -(1 / time_step);

// system += (-1/4)(c^2)laplace_mat
system.add((-1./4.) * (c * c), laplace_mat);
"
        .trim();
        assert_eq!(res, expected)
    }
    #[test]
    fn test_symbol() {
        // let eq = Equation::new(&Symbol::new("u"), &Integer::new(1));
        let expr = &Symbol::new("k");
        let res = rhs_code_gen(expr, &[], &[]).unwrap();
        assert_eq!(res, "rhs = time_step;")
    }

    #[test]
    fn test_add_scalar() {
        let [k, u] = symbols!("k", "u");

        let expr = u + Rational::new_box(-1, 2) * k;
        let res = rhs_code_gen(expr.get_ref(), &[u], &[]).unwrap();

        println!("\n{res}\n\n");

        let expected = r"
// rhs = u + (-1/2)k
rhs = u;

// rhs += (-1/2)k
rhs += (-1./2.) * time_step;
"
        .trim();
        assert_eq!(res, expected)
    }
}
