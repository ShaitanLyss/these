#include <Kokkos_Core.hpp>
#include <deal.II/base/data_out_base.h>
#include <deal.II/base/function.h>
#include <deal.II/base/quadrature_lib.h>

#include <deal.II/base/types.h>
#include <deal.II/lac/affine_constraints.h>
#include <deal.II/lac/dynamic_sparsity_pattern.h>
#include <deal.II/lac/precondition.h>
#include <deal.II/lac/solver_cg.h>
#include <deal.II/lac/solver_control.h>
#include <deal.II/lac/sparse_matrix.h>
#include <deal.II/lac/sparsity_pattern.h>
#include <deal.II/lac/vector.h>

#include <deal.II/grid/grid_generator.h>
#include <deal.II/grid/tria.h>

#include <deal.II/dofs/dof_handler.h>
#include <deal.II/dofs/dof_tools.h>

#include <deal.II/fe/fe_q.h>

#include <deal.II/numerics/data_out.h>

#include <deal.II/numerics/vector_tools_boundary.h>
#include <deal.II/numerics/vector_tools_project.h>
#include <deal.II/numerics/vector_tools_rhs.h>
#include <fstream>
#include <iostream>

#include <deal.II/numerics/vector_tools.h>

#include <deal.II/numerics/matrix_creator.h>
#include <deal.II/numerics/matrix_tools.h>

#include <deal.II/base/utilities.h>
#include <ostream>

namespace Step23 {
using namespace dealii;

template <int dim> class WaveEquation {
public:
  WaveEquation();
  void run();

private:
  void setup_system();
  void solve_u();
  void solve_v();
  void output_results() const;

  Triangulation<dim> triangulation;
  const FE_Q<dim> fe;
  DoFHandler<dim> dof_handler;

  AffineConstraints<double> constraints;

  SparsityPattern sparsity_pattern;
  SparseMatrix<double> mass_matrix;
  SparseMatrix<double> laplace_matrix;
  SparseMatrix<double> matrix_u;
  SparseMatrix<double> matrix_v;

  Vector<double> solution_u, solution_v;
  Vector<double> old_solution_u, old_solution_v;
  Vector<double> system_rhs;

  double time_step;
  double time;
  unsigned int timestep_number;
  const double theta;
};

template <int dim> class InitialValuesU : public Function<dim> {
public:
  virtual double value(const Point<dim> &,
                       const unsigned int component = 0) const override {
    (void)component;
    Assert(component == 0, ExcIndexRange(component, 0, 1));
    return 0;
  }
};
template <int dim> class InitialValuesV : public Function<dim> {
public:
  virtual double value(const Point<dim> &,
                       const unsigned int component = 0) const override {
    (void)component;
    Assert(component == 0, ExcIndexRange(component, 0, 1));
    return 0;
  }
};
template <int dim> class RightHandSide : public Function<dim> {
public:
  virtual double value(const Point<dim> &,
                       const unsigned int component = 0) const override {
    (void)component;
    Assert(component == 0, ExcIndexRange(component, 0, 1));
    return 0;
  }
};
template <int dim> class BoundaryValuesU : public Function<dim> {
public:
  virtual double value(const Point<dim> &p,
                       const unsigned int component = 0) const override {
    (void)component;
    Assert(component == 0, ExcIndexRange(component, 0, 1));

    if ((this->get_time() <= 0.5) && (p[0] < 0) && (p[1] < 1. / 3) &&
        (p[1] > -1. / 3))
      return std::sin(this->get_time() * 4 * numbers::PI);
    else
      return 0;
  }
};

template <int dim> class BoundaryValuesV : public Function<dim> {
public:
  virtual double value(const Point<dim> &p,
                       const unsigned int component = 0) const override {
    (void)component;
    Assert(component == 0, ExcIndexRange(component, 0, 1));

    if ((this->get_time() <= 0.5) && (p[0] < 0) && (p[1] < 1. / 3) &&
        (p[1] > -1. / 3))
      return (std::cos(this->get_time() * 4 * numbers::PI) * 4 * numbers::PI);
    else
      return 0;
  }
};
template <int dim>
WaveEquation<dim>::WaveEquation()
    : fe(1), dof_handler(triangulation), time_step(1. / 512), time(time_step),
      timestep_number(1), theta(0.5) {}

template <int dim> void WaveEquation<dim>::setup_system() {
  GridGenerator::hyper_cube(triangulation, -1, 1);
  triangulation.refine_global(10);

  std::cout << "Number of active cells: " << triangulation.n_active_cells()
            << "\n";

  dof_handler.distribute_dofs(fe);
  std::cout << "Number of degrees of freedom: " << dof_handler.n_dofs()
            << "\n\n";
  DynamicSparsityPattern dsp(dof_handler.n_dofs(), dof_handler.n_dofs());
  DoFTools::make_sparsity_pattern(dof_handler, dsp);
  sparsity_pattern.copy_from(dsp);

  mass_matrix.reinit(sparsity_pattern);
  laplace_matrix.reinit(sparsity_pattern);
  matrix_u.reinit(sparsity_pattern);
  matrix_v.reinit(sparsity_pattern);

  MatrixCreator::create_mass_matrix(dof_handler, QGauss<2>(fe.degree + 1),
                                    mass_matrix);
  MatrixCreator::create_laplace_matrix(dof_handler, QGauss<2>(fe.degree + 1),
                                       laplace_matrix);

  solution_u.reinit(dof_handler.n_dofs());
  solution_v.reinit(dof_handler.n_dofs());
  old_solution_u.reinit(dof_handler.n_dofs());
  old_solution_v.reinit(dof_handler.n_dofs());
  system_rhs.reinit(dof_handler.n_dofs());

  constraints.close();
}

template <int dim> void WaveEquation<dim>::solve_u() {
  SolverControl solver_control(1000, 1e-8 * system_rhs.l2_norm());
  SolverCG<Vector<double>> cg(solver_control);

  cg.solve(matrix_u, solution_u, system_rhs, PreconditionIdentity());

  std::cout << "    u-equation: " << solver_control.last_step()
            << "  CG iterations." << std::endl;
}
template <int dim> void WaveEquation<dim>::solve_v() {
  SolverControl solver_control(1000, 1e-8 * system_rhs.l2_norm());
  SolverCG<Vector<double>> cg(solver_control);

  cg.solve(matrix_v, solution_v, system_rhs, PreconditionIdentity());

  std::cout << "    v-equation: " << solver_control.last_step()
            << "  CG iterations." << std::endl;
}

template <int dim> void WaveEquation<dim>::output_results() const {
  DataOut<dim> data_out;

  data_out.attach_dof_handler(dof_handler);
  data_out.add_data_vector(solution_u, "u");
  data_out.add_data_vector(solution_v, "v");
  data_out.build_patches();

  const std::string filename =
      "solution-" + Utilities::int_to_string(timestep_number, 3) + ".vtu";

  DataOutBase::VtkFlags vtk_flags;
  vtk_flags.compression_level = DataOutBase::CompressionLevel::best_speed;
  data_out.set_flags(vtk_flags);
  std::ofstream output(filename);
  data_out.write_vtu(output);
}

template <int dim> void WaveEquation<dim>::run() {
  setup_system();
  VectorTools::project(dof_handler, constraints, QGauss<dim>(fe.degree + 1),
                       InitialValuesU<dim>(), old_solution_u);
  VectorTools::project(dof_handler, constraints, QGauss<dim>(fe.degree + 1),
                       InitialValuesV<dim>(), old_solution_v);

  Vector<double> tmp(solution_u.size());
  Vector<double> forcing_terms(solution_u.size());

  for (; time <= 5; time += time_step, ++timestep_number) {
    std::cout << "Time step " << timestep_number << " at t=" << time
              << std::endl;
    mass_matrix.vmult(system_rhs, old_solution_u);

    mass_matrix.vmult(tmp, old_solution_v);
    system_rhs.add(time_step, tmp);

    laplace_matrix.vmult(tmp, old_solution_u);
    system_rhs.add(-time_step * time_step * theta * (1 - theta), tmp);

    RightHandSide<dim> rhs_function;
    rhs_function.set_time(time);

    VectorTools::create_right_hand_side(dof_handler, QGauss<dim>(fe.degree + 1),
                                        rhs_function, tmp);
    forcing_terms = tmp;
    forcing_terms *= theta * time_step;

    rhs_function.set_time(time - time_step);
    VectorTools::create_right_hand_side(dof_handler, QGauss<dim>(fe.degree + 1),
                                        rhs_function, tmp);

    forcing_terms.add((1 - theta) * time_step, tmp);
    system_rhs.add(theta * time_step, forcing_terms);

    {
      BoundaryValuesU<dim> boundary_values_u_function;
      boundary_values_u_function.set_time(time);

      std::map<types::global_dof_index, double> boundary_values;
      VectorTools::interpolate_boundary_values(
          dof_handler, 0, boundary_values_u_function, boundary_values);
      matrix_u.copy_from(mass_matrix);
      matrix_u.add(time_step * time_step * theta * theta, laplace_matrix);
      MatrixTools::apply_boundary_values(boundary_values, matrix_u, solution_u,
                                         system_rhs);
    }
    solve_u();

    laplace_matrix.vmult(system_rhs, solution_u);
    system_rhs *= -theta * time_step;

    mass_matrix.vmult(tmp, old_solution_v);
    system_rhs += tmp;

    laplace_matrix.vmult(tmp, old_solution_u);
    system_rhs.add(-time_step * (1 - theta), tmp);

    system_rhs += forcing_terms;

    {
      BoundaryValuesV<dim> boundary_values_v_function;
      boundary_values_v_function.set_time(time);

      std::map<types::global_dof_index, double> boundary_values;
      VectorTools::interpolate_boundary_values(
          dof_handler, 0, boundary_values_v_function, boundary_values);
      matrix_v.copy_from(mass_matrix);
      MatrixTools::apply_boundary_values(boundary_values, matrix_v, solution_v,
                                         system_rhs);
    }
    solve_v();

    output_results();

    std::cout << "   Total energy: "
              << (mass_matrix.matrix_norm_square(solution_v) +
                  laplace_matrix.matrix_norm_square(solution_u)) /
                     2
              << std::endl;

    old_solution_u = solution_u;
    old_solution_v = solution_v;
  }
}

} // namespace Step23

int main(int argc, char *argv[]) {
  Kokkos::initialize(argc, argv);
  Step23::WaveEquation<2> waveEquation;

  waveEquation.run();
  Kokkos::finalize();
  return 0;
}
