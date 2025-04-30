#include <deal.II/base/function.h>
#include <deal.II/base/quadrature_lib.h>
#include <deal.II/base/types.h>
#include <deal.II/dofs/dof_handler.h>
#include <deal.II/dofs/dof_tools.h>
#include <deal.II/fe/fe.h>
#include <deal.II/fe/fe_q.h>
#include <deal.II/fe/fe_update_flags.h>
#include <deal.II/fe/fe_values.h>
#include <deal.II/grid/grid_generator.h>
#include <deal.II/grid/grid_out.h>
#include <deal.II/grid/tria.h>
#include <deal.II/lac/dynamic_sparsity_pattern.h>
#include <deal.II/lac/sparse_matrix.h>
#include <deal.II/lac/sparsity_pattern.h>
#include <deal.II/numerics/matrix_tools.h>
#include <deal.II/numerics/vector_tools.h>
#include <fstream>
#include <deal.II/lac/vector.h>
#include <deal.II/lac/full_matrix.h>
#include <deal.II/lac/solver_cg.h>
#include <deal.II/lac/precondition.h>
#include <deal.II/numerics/data_out.h>
const int DIM = 2;

using namespace dealii;
void make_mesh(Triangulation<DIM> &mesh) {
  GridGenerator::hyper_cube(mesh, -1);
  mesh.refine_global(5);
  std::ofstream mesh_file("step-3_mesh.svg");
  GridOut().write_svg(mesh, mesh_file);
  std::cout << "Number of active cells: " << mesh.n_active_cells() << std::endl;
}

int main() {
  Triangulation<DIM> mesh;
  make_mesh(mesh);
  DoFHandler<DIM> dof_handler(mesh);
  FE_Q<DIM> fe(1);
  // Setup System
  dof_handler.distribute_dofs(fe);
  std::cout << "Number of degrees of freedom: " << dof_handler.n_dofs() << std::endl;
  DynamicSparsityPattern dsp(dof_handler.n_dofs());
  DoFTools::make_sparsity_pattern(dof_handler, dsp);
  SparsityPattern sparsity_pattern;
  sparsity_pattern.copy_from(dsp);
  SparseMatrix<double> system_matrix;
  system_matrix.reinit(sparsity_pattern);

  Vector<double> solution, system_rhs;
  solution.reinit(dof_handler.n_dofs());
  system_rhs.reinit(dof_handler.n_dofs());

  // Assemble system
  const QGauss<DIM> quadrature_formula(fe.degree + 1);
  FEValues<DIM> fe_values(fe, quadrature_formula,
                          update_values | dealii::update_gradients |
                              dealii::update_JxW_values);

  const unsigned int dofs_per_cell = fe.n_dofs_per_cell();

  FullMatrix<double> cell_matrix(dofs_per_cell, dofs_per_cell);
  Vector<double> cell_rhs(dofs_per_cell);

  std::vector<types::global_dof_index> local_dof_indices(dofs_per_cell);

  for (const auto &cell : dof_handler.active_cell_iterators()) {
    fe_values.reinit(cell);
    cell_matrix = 0;
    cell_rhs = 0;

    for (const unsigned int q_index : fe_values.quadrature_point_indices()) {
      // Specific to Laplace problem
      // Matrix
      for (const unsigned int i : fe_values.dof_indices())
        for (const unsigned int j : fe_values.dof_indices())
          cell_matrix(i, j) += fe_values.shape_grad(i, q_index) *
                               fe_values.shape_grad(j, q_index) *
                               fe_values.JxW(q_index);

      // RHS
      for (const unsigned int i : fe_values.dof_indices())
        cell_rhs(i) += (fe_values.shape_value(i, q_index) * 1. /* f(x_q) */ *
                        fe_values.JxW(q_index));

      cell->get_dof_indices(local_dof_indices);

      for (const unsigned int i : fe_values.dof_indices()) {
        for (const unsigned int j : fe_values.dof_indices()) {
          system_matrix.add(local_dof_indices[i], local_dof_indices[j],
                            cell_matrix(i, j));
        }
      }

      for (const unsigned int i : fe_values.dof_indices()) {
        system_rhs(local_dof_indices[i]) += cell_rhs(i);
      }

      std::map<types::global_dof_index, double> boundary_values;
      VectorTools::interpolate_boundary_values(
          dof_handler, types::boundary_id(0), Functions::ZeroFunction<DIM>(),
          boundary_values);
      MatrixTools::apply_boundary_values(boundary_values, system_matrix,
                                         solution, system_rhs);
    }
  }

  // Solve
  SolverControl solver_control(1000, 1e-6 * system_rhs.l2_norm());
  SolverCG<Vector<double>> solver(solver_control);
  solver.solve(system_matrix, solution, system_rhs, PreconditionIdentity());
  std::cout << solver_control.last_step()
              << " CG iterations needed to obtain convergence." << std::endl;


  // Output results
  DataOut<DIM> data_out;
  data_out.attach_dof_handler(dof_handler);
  data_out.add_data_vector(solution, "solution");
  data_out.build_patches();

  const std::string filename = "/mnt/c/Users/Lyss/Downloads/solution.vtk";
  std::ofstream output(filename);
  data_out.write_vtk(output);
  std::cout << "Ouput written to " << filename << std::endl;
}
