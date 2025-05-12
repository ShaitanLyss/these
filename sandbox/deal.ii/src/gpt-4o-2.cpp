#include <deal.II/dofs/dof_handler.h>
#include <deal.II/dofs/dof_tools.h>
#include <deal.II/fe/fe_q.h>
#include <deal.II/grid/grid_generator.h>
#include <deal.II/grid/tria.h>
#include <deal.II/lac/dynamic_sparsity_pattern.h>
#include <deal.II/lac/precondition.h>
#include <deal.II/lac/solver_cg.h>
#include <deal.II/lac/solver_control.h>
#include <deal.II/lac/sparse_matrix.h>
#include <deal.II/lac/sparsity_pattern.h>
#include <deal.II/lac/vector.h>
#include <deal.II/numerics/data_out.h>
#include <deal.II/numerics/matrix_tools.h>
#include <deal.II/numerics/vector_tools.h>

#include <fstream>
#include <iostream>

using namespace dealii;

class WaveEquationSolver {
public:
  WaveEquationSolver();
  void run();

private:
  void setup_system();
  void assemble_system();
  void solve_time_step();
  void output_results(const unsigned int timestep) const;

  Triangulation<2> triangulation;
  FE_Q<2> fe;
  DoFHandler<2> dof_handler;

  SparsityPattern sparsity_pattern;
  SparseMatrix<double> mass_matrix;
  SparseMatrix<double> laplace_matrix;

  Vector<double> solution, old_solution, previous_solution;
  Vector<double> system_rhs;

  const double c = 1.0; // Speed of sound
  const double time_step = 0.01;
  const double total_time = 0.5;
  const unsigned int n_steps = (unsigned int) (total_time / time_step);
};

WaveEquationSolver::WaveEquationSolver() : fe(1), dof_handler(triangulation) {}

void WaveEquationSolver::setup_system() {
  GridGenerator::hyper_cube(triangulation, -1, 1);
  triangulation.refine_global(6);

  dof_handler.distribute_dofs(fe);

  DynamicSparsityPattern dsp(dof_handler.n_dofs());
  DoFTools::make_sparsity_pattern(dof_handler, dsp);
  sparsity_pattern.copy_from(dsp);

  mass_matrix.reinit(sparsity_pattern);
  laplace_matrix.reinit(sparsity_pattern);

  MatrixCreator::create_mass_matrix(dof_handler, QGauss<2>(fe.degree + 1),
                                    mass_matrix);
  MatrixCreator::create_laplace_matrix(dof_handler, QGauss<2>(fe.degree + 1),
                                       laplace_matrix);

  solution.reinit(dof_handler.n_dofs());
  old_solution.reinit(dof_handler.n_dofs());
  previous_solution.reinit(dof_handler.n_dofs());
  system_rhs.reinit(dof_handler.n_dofs());
}

void WaveEquationSolver::solve_time_step() {
  SparseMatrix<double> A(sparsity_pattern);
  A.copy_from(mass_matrix);
  A.add(0.5 * time_step * time_step * c * c, laplace_matrix);

  Vector<double> tmp(dof_handler.n_dofs());
  laplace_matrix.vmult(tmp, old_solution);
  // system_rhs.equ(2.0, old_solution, -1.0 - 0.5 * time_step * time_step * c *
  // c, tmp);
  system_rhs = 0;
  system_rhs.add(2.0, old_solution);
  system_rhs.add(-1.0 - 0.5 * time_step * time_step * c * c, tmp);

  SolverControl solver_control(1000, 1e-12);
  SolverCG<> solver(solver_control);
  PreconditionJacobi<> preconditioner;
  preconditioner.initialize(A, 1.0);

  solver.solve(A, solution, system_rhs, preconditioner);

  // Shift solutions for the next time step
  previous_solution = old_solution;
  old_solution = solution;
}

void WaveEquationSolver::output_results(const unsigned int timestep) const {
  DataOut<2> data_out;
  data_out.attach_dof_handler(dof_handler);
  data_out.add_data_vector(solution, "Solution");
  data_out.build_patches();

  std::ofstream output("solution-" + std::to_string(timestep) + ".vtk");
  data_out.write_vtk(output);
}

void WaveEquationSolver::run() {
  setup_system();

  for (unsigned int step = 0; step < n_steps; ++step) {
    solve_time_step();
    output_results(step);
  }
}

int main() {
  try {
    deallog.depth_console(0);
    WaveEquationSolver wave_equation_solver;
    wave_equation_solver.run();
  } catch (std::exception &exc) {
    std::cerr << "Exception: " << exc.what() << std::endl;
    return 1;
  } catch (...) {
    std::cerr << "Unknown exception!" << std::endl;
    return 1;
  }

  return 0;
}
