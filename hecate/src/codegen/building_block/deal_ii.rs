use itertools::Itertools;
use thiserror::Error;

use crate::ops::{factor_coeff, get_operands_exponents};
use crate::symbolic::*;
use crate::{
    Equation, Expr,
    codegen::input_schema::{FiniteElement, mesh::HyperCubeMesh},
};

use super::{
    BuildingBlock, BuildingBlockError, BuildingBlockFactory, DofHandlerConfig, MatrixConfig,
    ShapeMatrixConfig, SolveUnknownConfig, SparsityPatternConfig, VectorConfig,
};

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

    factory.set_equation_setup(&|name, equation| {
        let mut block = BuildingBlock::new();

        block
            .main
            .push(format!("// Setup equation {}", equation.str()));
        block.main.push(equation_to_deall_ii_setup_code(&equation));

        Ok(block)
    });

    factory
}

fn equation_to_deall_ii_setup_code(equation: &Equation) -> String {
    "".to_string()
}

#[derive(Error, Debug)]
pub enum ExprCodeGenError {
    #[error("too many vectors in expr: {0}")]
    TooManyVectors(Box<dyn Expr>),
    #[error("too many matrixes in expr: {0}")]
    TooManyMatrixes(Box<dyn Expr>),
    #[error("unsupported expr: {0}")]
    UnsupportedExpr(Box<dyn Expr>),
    #[error("can't multiply two vectors")]
    VectorMul,
    #[error("operations resulted in a matrix when a vector was expected")]
    MatResult,
}

type ExprCodeGenRes = Result<String, ExprCodeGenError>;

fn expr_to_coeff_vecs_mats() -> (Box<dyn Expr>,) {
    todo!()
}

fn vec_code_gen(
    target: &str,
    expr: &dyn Expr,
    vectors: &[&dyn Expr],
    matrixes: &[&dyn Expr],
    depth: usize,
) -> ExprCodeGenRes {
    let expr = expr.simplify();
    Ok(match expr.known_expr() {
        KnownExpr::Integer(Integer { value }) => format!("{target} = {value};"),
        KnownExpr::Rational(Rational { num, denom }) => format!("{target} = {num} / {denom};"),
        KnownExpr::Add(add) => {
            let operands = &add.operands;

            if operands.len() == 0 {
                format!("{target} = 0;")
            } else {
                let first_op = &operands[0];
                let mut res = format!("{target} = {first_op};");

                for op in operands.iter().skip(1) {
                    res += &format!(" {target} += {op};");
                }

                format!("{res}  // {target} = {expr}")
            }
        }
        KnownExpr::Mul(mul) => {
            enum Kind<'a> {
                Vec(&'a dyn Expr),
                Mat(&'a dyn Expr),
                Code(String),
            }
            let mut seq: Vec<Kind> = Vec::with_capacity(mul.operands.len());
            let mut coeff = Integer::one_box();

            for op in &mul.operands {
                let op = op.get_ref();
                if vectors.contains(&op) {
                    seq.push(Kind::Vec(op));
                } else if matrixes.contains(&op) {
                    seq.push(Kind::Mat(op));
                } else if op.is_number() {
                    coeff *= op;
                } else {
                    match op.known_expr() {
                        KnownExpr::Add(_) | KnownExpr::Mul(_) | KnownExpr::Pow(_) => {
                            let tmp_vec = if depth == 0 {
                                "tmp".to_string()
                            } else {
                                format!("tmp{depth}")
                            };
                            seq.push(Kind::Code(vec_code_gen(
                                &tmp_vec,
                                op,
                                vectors,
                                matrixes,
                                depth + 1,
                            )?));
                            // seq.push(Kind::Vec(()))
                        }
                        _ => {
                            coeff *= op;
                        }
                    }
                }
            }
            let coeff = coeff.simplify();
            let coeff_cpp = coeff.to_cpp();

            match seq.as_slice() {
                [] => format!("{target} = {};", coeff.to_cpp()),
                [Kind::Vec(a)] => {
                    if coeff.is_one() {
                        format!("{target} = {a};")
                    } else {
                        let coeff_cpp = coeff.to_cpp();
                        format!("{target}.equ({coeff_cpp}, {a});  // {target} = {coeff} * {a}")
                    }
                }
                [Kind::Mat(_)] => Err(ExprCodeGenError::MatResult)?,
                [Kind::Vec(a), Kind::Vec(b)] => {
                    if coeff.is_one() {
                        format!("{target} = {a} * {b};  // {target} = {a}.{b}")
                    } else {
                        let coeff_cpp = coeff.to_cpp();
                        format!(
                            "{target} = {coeff_cpp} * ({a} * {b});  // {target} = {coeff} * {a}.{b}"
                        )
                    }
                }
                [Kind::Mat(m), Kind::Vec(v)] => {
                    if coeff.is_one() {
                        format!("{m}.vmult({target}, {v});  // {target} = {expr}")
                    } else {
                        format!("{m}.vmult({target}, {v}); {target} *= {coeff_cpp};  // {target} = {expr}")
                    }
                }
                [first, rest @ ..] => {
                    // let mut current = first;
                    //
                    // for next in rest {
                    //
                    // }

                    // format!("")
                    todo!()
                }

                _ => unimplemented!(),
            }
            // let mut current = &seq[0];
            // for (a, b) in seq.iter().tuple_windows() {
            //     match (a, b)  {
            //         (Kind::Vec(_), Kind::Vec(_)) => Err(ExprCodeGenError::VectorMul)?,
            //
            //
            //         _ => todo!()
            //
            //
            //     }
            //
            // }
            // todo!()

            // let present_vectors: Vec<_> = seq
            //     .into_iter()
            //     .copied()
            //     .filter(|v| expr.has(*v))
            //     .collect();
            //
            // if present_vectors.len() > 1 {
            //     Err(ExprCodeGenError::TooManyVectors(expr.clone_box()))?
            // }

            // let present_matrixes: Vec<_> = matrixes
            //     .into_iter()
            //     .copied()
            //     .filter(|v| expr.has(*v))
            //     .collect();

            // if present_matrixes.len() > 1 {
            //     Err(ExprCodeGenError::TooManyMatrixes(expr.clone_box()))?
            // }

            // match (present_vectors.len(), present_matrixes.len()) {
            //     (1, 0) => {
            //         let v = present_vectors[0].get_ref();
            //         let expr = expr.expand().factor(&[v]);
            //         let coeff = factor_coeff(expr.get_ref(), v);
            //         let coeff_cpp = coeff.to_cpp();
            //
            //         // if coeff.is_one() {
            //         //     format!("{target} ")
            //         // }
            //
            //         format!("{target} = {v}; rhs *= {coeff_cpp};  // rhs = {coeff} * {v}")
            //     }
            //     (1, 1) => {
            //         let v = present_vectors[0].get_ref();
            //         let m = present_matrixes[0].get_ref();
            //         format!("{m}.vmult({target}, {v});  // rhs = {m}{v}")
            //     }
            //     (n_vecs, n_mats) => {
            //         unimplemented!("unsupported mul | n_vecs: {n_vecs}, n_mats: {n_mats}")
            //     }
            // }
        }

        KnownExpr::Symbol(Symbol { name }) => format!("{target} = {name};"),
        _ => Err(ExprCodeGenError::UnsupportedExpr(expr.clone_box()))?,
    })
}

fn rhs_code_gen(expr: &dyn Expr, vectors: &[&dyn Expr], matrixes: &[&dyn Expr]) -> ExprCodeGenRes {
    vec_code_gen("rhs", expr, vectors, matrixes, 0)
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
        assert_eq!(res, "rhs.equ(c, u);  // rhs = c * u")
    }
    #[test]
    fn test_rhs_coeff_vector_2() {
        let u = symbol!("u");
        let c = symbol!("c");
        let r = Rational::new(2, 3);
        let expr = (r - 4) * c * u;
        let res = rhs_code_gen(expr.get_ref(), &[u], &[]).unwrap();
        assert_eq!(res, "rhs.equ((-10./3.) * c, u);  // rhs = (-10/3)c * u")
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

        assert_eq!(res, "A.vmult(rhs, u);  // rhs = Au")
    }

    #[test]
    fn test_rhs_addition() {
        let [u, v] = symbols!("u", "v");

        let expr = u + v;
        let res = rhs_code_gen(expr.get_ref(), &[u, v], &[]).unwrap();
        assert_eq!(res, "rhs = u; rhs += v;  // rhs = u + v")
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
        assert_eq!(res, "rhs.equ(k, U);  // rhs = k * U")
    }

    #[test]
    #[ignore]
    fn test_rhs_wave_eq_start() {
        // rhs = M.U^n-1 + k.M.V^n-1
        let [m, u_prev, v_prev, k] = symbols!("m", "u_prev", "v_prev", "k");
        let expr = m * u_prev - k * m * v_prev;
        let res = rhs_code_gen(expr.get_ref(), &[v_prev, u_prev], &[m]).unwrap();
        assert_eq!(
            res,
            "// rhs = mu_prev - kmv_prev\nm.vmult(rhs, u_prev);\nm.vmult(tmp, u_prev);\nrhs.add(-k, tmp);"
        )
    }

    #[test]
    fn test_vec_dot_product() {
        let [u, v] = symbols!("u", "v");
        let expr = u * v;
        let res = rhs_code_gen(expr.get_ref(), &[u, v], &[]).unwrap();

        assert_eq!(res, "rhs = u * v;  // rhs = u.v")
    }

    #[test]
    fn test_coeff_vec_dot_product() {
        let [k, u, v] = symbols!("k", "u", "v");
        let expr = k * 2 * u * v;
        let res = rhs_code_gen(expr.get_ref(), &[u, v], &[]).unwrap();
        assert_eq!(res, "rhs = 2 * k * (u * v);  // rhs = 2k * u.v")
    }

    #[test]
    fn test_mul_coeff_mat_vec() {
        let [k, a, u] = symbols!("k", "A", "u");

        let expr = k * a * u;
        let res = rhs_code_gen(expr.get_ref(), &[u], &[a]).unwrap();
        assert_eq!(res, "A.vmult(rhs, u); rhs *= k;  // rhs = kAu")
    }
}
