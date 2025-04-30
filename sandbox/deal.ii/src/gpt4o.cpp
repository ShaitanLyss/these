#include <deal.II/grid/tria.h>
#include <deal.II/grid/grid_generator.h>
#include <deal.II/dofs/dof_handler.h>
#include <deal.II/fe/fe_q.h>
#include <deal.II/dofs/dof_tools.h>
#include <deal.II/lac/sparsity_pattern.h>
#include <deal.II/lac/dynamic_sparsity_pattern.h>
#include <deal.II/lac/sparse_matrix.h>
#include <deal.II/lac/vector.h>

#include <iostream>

using namespace dealii;

int main()
{
  Triangulation<2> triangulation;
  GridGenerator::hyper_cube(triangulation);
  triangulation.refine_global(4);
  
  FE_Q<2> fe(1);
  DoFHandler<2> dof_handler(triangulation);
  dof_handler.distribute_dofs(fe);
  
  SparsityPattern sparsity_pattern;
  DynamicSparsityPattern dsp(dof_handler.n_dofs(), dof_handler.n_dofs());
  DoFTools::make_sparsity_pattern(dof_handler, dsp);
  sparsity_pattern.copy_from(dsp);
  
  SparseMatrix<double> system_matrix;
  system_matrix.reinit(sparsity_pattern);
  
  Vector<double> solution(dof_handler.n_dofs());
  Vector<double> system_rhs(dof_handler.n_dofs());

  std::cout << "Number of active cells: "
            << triangulation.n_active_cells()
            << std::endl
            << "Total number of cells: "
            << triangulation.n_cells()
            << std::endl
            << "Number of degrees of freedom: "
            << dof_handler.n_dofs()
            << std::endl;
  
  return 0;
}
