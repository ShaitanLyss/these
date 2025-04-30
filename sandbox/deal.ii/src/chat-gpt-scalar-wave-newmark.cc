// Scalar wave equation solver using deal.II
// Parallelized with MPI, using PETSc linear algebra
// Uses Newmark-beta method for time integration
// Regular mesh, compile-time dimension (dim), Dirichlet/Neumann BCs

#include <deal.II/base/function.h>
#include <deal.II/base/utilities.h>
#include <deal.II/base/logstream.h>
#include <deal.II/base/timer.h>

#include <deal.II/lac/petsc_parallel_vector.h>
#include <deal.II/lac/petsc_parallel_sparse_matrix.h>
#include <deal.II/lac/petsc_solver.h>
#include <deal.II/lac/petsc_precondition.h>

#include <deal.II/grid/grid_generator.h>
#include <deal.II/grid/grid_tools.h>
#include <deal.II/distributed/tria.h>
#include <deal.II/grid/tria_accessor.h>
#include <deal.II/grid/tria_iterator.h>
#include <deal.II/distributed/tria.h>

#include <deal.II/dofs/dof_handler.h>
#include <deal.II/dofs/dof_tools.h>
#include <deal.II/fe/fe_q.h>
#include <deal.II/fe/fe_values.h>

#include <deal.II/numerics/vector_tools.h>
#include <deal.II/numerics/matrix_tools.h>

#include <fstream>
#include <iostream>

namespace ScalarWave
{
  using namespace dealii;

  template <int dim>
  class WaveEquation
  {
  public:
    WaveEquation();
    void run();

  private:
    void setup_system();
    void assemble_system();
    void solve_time_step();
    void output_results(const unsigned int time_step) const;

    MPI_Comm mpi_communicator;
    parallel::distributed::Triangulation<dim> triangulation;
    FE_Q<dim> fe;
    DoFHandler<dim> dof_handler;

    PETScWrappers::MPI::SparseMatrix mass_matrix, laplace_matrix;
    PETScWrappers::MPI::Vector solution, old_solution, older_solution, system_rhs;

    IndexSet locally_owned_dofs;
    IndexSet locally_relevant_dofs;

    ConditionalOStream pcout;
    TimerOutput computing_timer;

    double time, time_step, final_time;
    unsigned int timestep_number;

    const double beta = 0.25;
    const double gamma = 0.5;
  };

  template <int dim>
  WaveEquation<dim>::WaveEquation()
    : mpi_communicator(MPI_COMM_WORLD),
      triangulation(mpi_communicator),
      fe(1),
      dof_handler(triangulation),
      pcout(std::cout, Utilities::MPI::this_mpi_process(mpi_communicator) == 0),
      computing_timer(mpi_communicator, pcout, TimerOutput::summary, TimerOutput::wall_times)
  {
    time = 0.0;
    time_step = 1e-2;
    final_time = 1.0;
    timestep_number = 0;
  }

  template <int dim>
  void WaveEquation<dim>::setup_system()
  {
    dof_handler.distribute_dofs(fe);
    locally_owned_dofs = dof_handler.locally_owned_dofs();
    DoFTools::extract_locally_relevant_dofs(dof_handler, locally_relevant_dofs);

    mass_matrix.reinit(locally_owned_dofs, mpi_communicator);
    laplace_matrix.reinit(locally_owned_dofs, mpi_communicator);

    solution.reinit(locally_owned_dofs, mpi_communicator);
    old_solution.reinit(locally_owned_dofs, mpi_communicator);
    older_solution.reinit(locally_owned_dofs, mpi_communicator);
    system_rhs.reinit(locally_owned_dofs, mpi_communicator);

    DynamicSparsityPattern dsp(locally_relevant_dofs);
    DoFTools::make_sparsity_pattern(dof_handler, dsp);

    SparsityTools::distribute_sparsity_pattern(dsp, dof_handler.n_locally_owned_dofs_per_processor(), mpi_communicator, locally_relevant_dofs);
    mass_matrix.reinit(locally_owned_dofs, locally_owned_dofs, dsp, mpi_communicator);
    laplace_matrix.reinit(locally_owned_dofs, locally_owned_dofs, dsp, mpi_communicator);

    MatrixTools::create_mass_matrix(dof_handler, QGauss<dim>(fe.degree + 1), mass_matrix);
    MatrixTools::create_laplace_matrix(dof_handler, QGauss<dim>(fe.degree + 1), laplace_matrix);
  }

  template <int dim>
  void WaveEquation<dim>::assemble_system()
  {
    // RHS = M*(2u^n - u^{n-1}) + dt^2 * (f - Ku^n)
    system_rhs = 0;
    mass_matrix.vmult_add(system_rhs, solution);
    mass_matrix.vmult_add(system_rhs, solution); // 2*u^n
    mass_matrix.vmult_add(system_rhs, -1.0, older_solution); // -u^{n-1}

    PETScWrappers::MPI::Vector tmp(locally_owned_dofs, mpi_communicator);
    laplace_matrix.vmult(tmp, solution);
    tmp *= time_step * time_step;
    system_rhs.add(-1.0, tmp);
  }

  template <int dim>
  void WaveEquation<dim>::solve_time_step()
  {
    SolverControl solver_control(1000, 1e-8 * system_rhs.l2_norm());
    PETScWrappers::SolverCG solver(solver_control, mpi_communicator);
    PETScWrappers::PreconditionBoomerAMG preconditioner;
    preconditioner.initialize(mass_matrix);

    solver.solve(mass_matrix, solution, system_rhs, preconditioner);
  }

  template <int dim>
  void WaveEquation<dim>::output_results(const unsigned int time_step) const
  {
    DataOut<dim> data_out;
    data_out.attach_dof_handler(dof_handler);
    data_out.add_data_vector(solution, "U");
    data_out.build_patches();

    const std::string filename = "solution-" + Utilities::int_to_string(time_step, 3) + ".vtu";
    std::ofstream output(filename);
    data_out.write_vtu(output);
  }

  template <int dim>
  void WaveEquation<dim>::run()
  {
    GridGenerator::hyper_cube(triangulation, 0, 1);
    triangulation.refine_global(5);

    setup_system();

    while (time <= final_time)
    {
      pcout << "Time step " << timestep_number << " at t = " << time << std::endl;

      assemble_system();
      solve_time_step();

      if (timestep_number % 10 == 0)
        output_results(timestep_number);

      older_solution = old_solution;
      old_solution = solution;

      time += time_step;
      ++timestep_number;
    }
  }
} // namespace ScalarWave

int main(int argc, char **argv)
{
  try
  {
    using namespace dealii;
    using namespace ScalarWave;

    Utilities::MPI::MPI_InitFinalize mpi_initialization(argc, argv, 1);

    constexpr int dim = 2;
    WaveEquation<dim> wave_equation;
    wave_equation.run();
  }
  catch (std::exception &exc)
  {
    std::cerr << std::endl
              << std::endl
              << "Exception on processing: " << std::endl
              << exc.what() << std::endl
              << "Aborting!" << std::endl;
    return 1;
  }
  catch (...)
  {
    std::cerr << std::endl
              << std::endl
              << "Unknown exception!" << std::endl;
    return 1;
  }
  return 0;
}

