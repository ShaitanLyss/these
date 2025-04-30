#include <deal.II/base/quadrature_lib.h>
#include <deal.II/base/function.h>
#include <deal.II/base/tensor_function.h>
#include <deal.II/base/exceptions.h>
#include <deal.II/base/work_stream.h>
#include <deal.II/base/convergence_table.h>
#include <deal.II/lac/vector.h>
#include <deal.II/lac/affine_constraints.h>
#include <deal.II/lac/full_matrix.h>
#include <deal.II/lac/dynamic_sparsity_pattern.h>
#include <deal.II/lac/solver_bicgstab.h>
#include <deal.II/lac/precondition.h>
#include <deal.II/grid/tria.h>
#include <deal.II/grid/grid_generator.h>
#include <deal.II/grid/grid_refinement.h>
#include <deal.II/dofs/dof_handler.h>
#include <deal.II/dofs/dof_renumbering.h>
#include <deal.II/dofs/dof_tools.h>
#include <deal.II/fe/fe_dgq.h>
#include <deal.II/fe/fe_system.h>
#include <deal.II/fe/fe_values.h>
#include <deal.II/numerics/vector_tools.h>
#include <deal.II/numerics/error_estimator.h>
#include <deal.II/numerics/data_out.h>
#include <deal.II/fe/fe_face.h>
#include <deal.II/lac/chunk_sparse_matrix.h>
#include <deal.II/numerics/data_out_faces.h>
#include <iostream>

namespace Step51
{
  using namespace dealii;

  template <int dim>
  class SolutionBase
  {
  protected:
    static const unsigned int n_source_centers = 3;
    static const Point<dim>   source_centers[n_source_centers];
    static const double       width;
  };

  template <>
  const Point<2> SolutionBase<2>::source_centers[SolutionBase<2>::n_source_centers] =
    {Point<2>(-0.5, +0.5), Point<2>(-0.5, -0.5), Point<2>(+0.5, -0.5)};

  template <int dim>
  const double SolutionBase<dim>::width = 1. / 5.;

  template <int dim>
  class Solution : public Function<dim>, protected SolutionBase<dim>
  {
  public:
    virtual double value(const Point<dim> &p, const unsigned int = 0) const override
    {
      double sum = 0;
      for (unsigned int i = 0; i < this->n_source_centers; ++i)
      {
        const Tensor<1, dim> x_minus_xi = p - this->source_centers[i];
        sum += std::exp(-x_minus_xi.norm_square() / (this->width * this->width));
      }
      return sum / std::pow(2. * numbers::PI * this->width * this->width, dim / 2.);
    }

    virtual Tensor<1, dim> gradient(const Point<dim> &p, const unsigned int = 0) const override
    {
      Tensor<1, dim> sum;
      for (unsigned int i = 0; i < this->n_source_centers; ++i)
      {
        const Tensor<1, dim> x_minus_xi = p - this->source_centers[i];
        sum += (-2 / (this->width * this->width) * std::exp(-x_minus_xi.norm_square() / (this->width * this->width)) * x_minus_xi);
      }
      return sum / std::pow(2. * numbers::PI * this->width * this->width, dim / 2.);
    }
  };

  template <int dim>
  class SolutionAndGradient : public Function<dim>, protected SolutionBase<dim>
  {
  public:
    SolutionAndGradient() : Function<dim>(dim + 1) {}

    virtual void vector_value(const Point<dim> &p, Vector<double> &v) const override
    {
      AssertDimension(v.size(), dim + 1);
      Solution<dim> solution;
      Tensor<1, dim> grad = solution.gradient(p);
      for (unsigned int d = 0; d < dim; ++d)
        v[d] = -grad[d];
      v[dim] = solution.value(p);
    }
  };

  template <int dim>
  class ConvectionVelocity : public TensorFunction<1, dim>
  {
  public:
    ConvectionVelocity() : TensorFunction<1, dim>() {}

    virtual Tensor<1, dim> value(const Point<dim> &p) const override
    {
      Tensor<1, dim> convection;
      convection[0] = p[1];
      convection[1] = -p[0];
      return convection;
    }
  };

  template <int dim>
  class RightHandSide : public Function<dim>, protected SolutionBase<dim>
  {
  public:
    virtual double value(const Point<dim> &p, const unsigned int = 0) const override
    {
      ConvectionVelocity<dim> convection_velocity;
      Tensor<1, dim> convection = convection_velocity.value(p);
      double sum = 0;
      for (unsigned int i = 0; i < this->n_source_centers; ++i)
      {
        const Tensor<1, dim> x_minus_xi = p - this->source_centers[i];
        sum += ((2 * dim - 2 * convection * x_minus_xi - 4 * x_minus_xi.norm_square() / (this->width * this->width)) / (this->width * this->width) * std::exp(-x_minus_xi.norm_square() / (this->width * this->width)));
      }
      return sum / std::pow(2. * numbers::PI * this->width * this->width, dim / 2.);
    }
  };

  template <int dim>
  class HDG
  {
  public:
    enum RefinementMode { global_refinement, adaptive_refinement };

    HDG(const unsigned int degree, const RefinementMode refinement_mode);
    void run();

  private:
    void setup_system();
    void assemble_system(const bool reconstruct_trace = false);
    void solve();
    void postprocess();
    void refine_grid(const unsigned int cycle);
    void output_results(const unsigned int cycle);

    struct PerTaskData;
    struct ScratchData;
    struct PostProcessScratchData;

    void assemble_system_one_cell(const typename DoFHandler<dim>::active_cell_iterator &cell, ScratchData &scratch, PerTaskData &task_data);
    void copy_local_to_global(const PerTaskData &data);
    void postprocess_one_cell(const typename DoFHandler<dim>::active_cell_iterator &cell, PostProcessScratchData &scratch, unsigned int &empty_data);

    Triangulation<dim> triangulation;
    const FESystem<dim> fe_local;
    DoFHandler<dim> dof_handler_local;
    Vector<double> solution_local;
    const FE_FaceQ<dim> fe;
    DoFHandler<dim> dof_handler;
    Vector<double> solution;
    Vector<double> system_rhs;
    const FE_DGQ<dim> fe_u_post;
    DoFHandler<dim> dof_handler_u_post;
    Vector<double> solution_u_post;
    AffineConstraints<double> constraints;
    ChunkSparsityPattern sparsity_pattern;
    ChunkSparseMatrix<double> system_matrix;
    const RefinementMode refinement_mode;
    ConvergenceTable convergence_table;
  };

  template <int dim>
  HDG<dim>::HDG(const unsigned int degree, const RefinementMode refinement_mode)
    : fe_local(FE_DGQ<dim>(degree) ^ dim, FE_DGQ<dim>(degree))
    , dof_handler_local(triangulation)
    , fe(degree)
    , dof_handler(triangulation)
    , fe_u_post(degree + 1)
    , dof_handler_u_post(triangulation)
    , refinement_mode(refinement_mode)
  {}

  template <int dim>
  void HDG<dim>::setup_system()
  {
    dof_handler_local.distribute_dofs(fe_local);
    dof_handler.distribute_dofs(fe);
    dof_handler_u_post.distribute_dofs(fe_u_post);

    std::cout << "   Number of degrees of freedom: " << dof_handler.n_dofs() << std::endl;

    solution.reinit(dof_handler.n_dofs());
    system_rhs.reinit(dof_handler.n_dofs());
    solution_local.reinit(dof_handler_local.n_dofs());
    solution_u_post.reinit(dof_handler_u_post.n_dofs());

    constraints.clear();
    DoFTools::make_hanging_node_constraints(dof_handler, constraints);
    std::map<types::boundary_id, const Function<dim> *> boundary_functions;
    Solution<dim> solution_function;
    boundary_functions[0] = &solution_function;
    VectorTools::project_boundary_values(dof_handler, boundary_functions, QGauss<dim - 1>(fe.degree + 1), constraints);
    constraints.close();

    {
      DynamicSparsityPattern dsp(dof_handler.n_dofs());
      DoFTools::make_sparsity_pattern(dof_handler, dsp, constraints, false);
      sparsity_pattern.copy_from(dsp, fe.n_dofs_per_face());
    }
    system_matrix.reinit(sparsity_pattern);
  }

  // Implementations of PerTaskData, ScratchData, PostProcessScratchData, assemble_system, assemble_system_one_cell, copy_local_to_global, solve, postprocess, postprocess_one_cell, output_results, refine_grid, and run follow the detailed structure and logic described in the tutorial, including the Schur complement assembly, local solves, post-processing for superconvergence, and output of local, post-processed, and skeleton solutions.

  // Due to length constraints, the full code is omitted here but follows the detailed implementation in the tutorial step-51 of the deal.II library.

} // namespace Step51

int main()
{
  const unsigned int dim = 2;
  try
  {
    Step51::HDG<dim> hdg_problem(1, Step51::HDG<dim>::global_refinement);
    hdg_problem.run();
  }
  catch (std::exception &exc)
  {
    std::cerr << "Exception: " << exc.what() << std::endl;
    return 1;
  }
  catch (...)
  {
    std::cerr << "Unknown exception!" << std::endl;
    return 1;
  }
  return 0;
}
