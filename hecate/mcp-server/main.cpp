#include <Kokkos_Core.hpp>
#include <iostream>
#include <fstream>
#include <deal.II/lac/affine_constraints.h>
#include <deal.II/numerics/data_out.h>
#include <deal.II/base/function.h>
#include <deal.II/grid/grid_generator.h>
#include <deal.II/grid/tria.h>
#include <deal.II/fe/fe_q.h>
#include <deal.II/dofs/dof_handler.h>
#include <deal.II/lac/vector.h>
#include <deal.II/lac/dynamic_sparsity_pattern.h>
#include <deal.II/lac/sparsity_pattern.h>
#include <deal.II/dofs/dof_tools.h>
#include <deal.II/lac/sparse_matrix.h>
#include <deal.II/lac/solver_cg.h>
#include <deal.II/lac/precondition.h>
#include <deal.II/lac/solver_control.h>
#include <deal.II/numerics/matrix_creator.h>
#include <deal.II/base/quadrature_lib.h>
#include <deal.II/numerics/vector_tools_project.h>
#include <deal.II/numerics/vector_tools_boundary.h>
#include <deal.II/numerics/matrix_tools.h>

const int dim = 2;
using data_type = double;

using namespace dealii;
using namespace Kokkos::numbers;


bool float_equals(data_type a, data_type b) {
  const data_type base_epsilon = 1e-8;
  const data_type epsilon = base_epsilon * Kokkos::max(1.0, Kokkos::max(Kokkos::abs(a), Kokkos::abs(b)));
  return Kokkos::fabs(b - a) < epsilon;
}


class Fn_f : public Function<dim> {
public:
  virtual double value(const Point<dim> &point,
                       const unsigned int component = 0) const override {
    return 0;
  }
};


class Fn_u0 : public Function<dim> {
public:
  virtual double value(const Point<dim> &point,
                       const unsigned int component = 0) const override {
    return 0;
  }
};


class Fn_v0 : public Function<dim> {
public:
  virtual double value(const Point<dim> &point,
                       const unsigned int component = 0) const override {
    return 0;
  }
};


class Fn_g : public Function<dim> {
public:
  virtual double value(const Point<dim> &point,
                       const unsigned int component = 0) const override {
    if (get_time() >= 0 && get_time() <= 0.5 && float_equals(point[0], -1) && point[1] >= -0.33 && point[1] <= 0.33) {
      return Kokkos::sin(4 * pi * get_time());
    }
    else {
      return 0;
    }
  }
};


class Fn_h : public Function<dim> {
public:
  virtual double value(const Point<dim> &point,
                       const unsigned int component = 0) const override {
    if (get_time() >= 0 && get_time() <= 0.5 && float_equals(point[0], -1) && point[1] >= -0.33 && point[1] <= 0.33) {
      return Kokkos::cos(4 * pi * get_time()) * 4 * pi;
    }
    else {
      return 0;
    }
  }
};


class Sim {
public:
  Sim() : element(1), dof_handler(mesh) {}

  void run();
  void output_results();

  void setup_system() {
    GridGenerator::hyper_cube(mesh, -1, 1);
    mesh.refine_global(7);
    std::cout << "Number of active cells: " << mesh.n_active_cells() << "\n";
    dof_handler.distribute_dofs(element);
    std::cout << "Number of degrees of freedom: " << dof_handler.n_dofs() << "\n\n";
    u.reinit(dof_handler.n_dofs());
    v.reinit(dof_handler.n_dofs());
    u_prev.reinit(dof_handler.n_dofs());
    v_prev.reinit(dof_handler.n_dofs());
    f_prev.reinit(dof_handler.n_dofs());
    f.reinit(dof_handler.n_dofs());
    DynamicSparsityPattern dof_handler_dsp(dof_handler.n_dofs(), dof_handler.n_dofs());
    DoFTools::make_sparsity_pattern(dof_handler, dof_handler_dsp);
    sparsity_pattern.copy_from(dof_handler_dsp);
    rhs.reinit(dof_handler.n_dofs());
    matrix_u.reinit(sparsity_pattern);
    matrix_v.reinit(sparsity_pattern);
    laplace_mat.reinit(sparsity_pattern);
    MatrixCreator::create_laplace_matrix(dof_handler, QGauss<2>(element.degree + 1), laplace_mat);
    mass_mat.reinit(sparsity_pattern);
    MatrixCreator::create_mass_matrix(dof_handler, QGauss<2>(element.degree + 1), mass_mat);
    vtmp.reinit(dof_handler.n_dofs());
    mtmp.reinit(sparsity_pattern);
    constraints.close();
  }

  AffineConstraints<data_type> constraints;
  data_type time;
  unsigned long timestep_number = 1;

  Fn_f fn_f;
  Fn_u0 fn_u0;
  Fn_v0 fn_v0;
  Fn_g fn_g;
  Fn_h fn_h;
  Triangulation<dim> mesh;
  const FE_Q<dim> element;
  DoFHandler<dim> dof_handler;
  Vector<data_type> u;
  Vector<data_type> v;
  Vector<data_type> u_prev;
  Vector<data_type> v_prev;
  Vector<data_type> f_prev;
  Vector<data_type> f;
  SparsityPattern sparsity_pattern;
  Vector<data_type> rhs;
  SparseMatrix<data_type> matrix_u;
  SparseMatrix<data_type> matrix_v;
  SparseMatrix<data_type> laplace_mat;
  SparseMatrix<data_type> mass_mat;
  Vector<data_type> vtmp;
  SparseMatrix<data_type> mtmp;

  void solve_u();
  void solve_v();
};

void Sim::solve_u() {
  SolverControl solver_control(1000, 1e-8 * rhs.l2_norm());
  SolverCG<Vector<data_type>> cg(solver_control);

  cg.solve(matrix_u, u, rhs, PreconditionIdentity());

  std::cout << "    solve_u: " << solver_control.last_step()
            << "  CG iterations." << std::endl;
}
            

void Sim::solve_v() {
  SolverControl solver_control(1000, 1e-8 * rhs.l2_norm());
  SolverCG<Vector<data_type>> cg(solver_control);

  cg.solve(matrix_v, v, rhs, PreconditionIdentity());

  std::cout << "    solve_v: " << solver_control.last_step()
            << "  CG iterations." << std::endl;
}

void Sim::run() {
  setup_system();
  data_type time_step = 0.015625;
  time = 0 + time_step;

  // Prepare time stepping
  // Apply Intial Condition for u 
  VectorTools::project(dof_handler, constraints, QGauss<dim>(element.degree + 1),
                       fn_u0, u_prev);
  // Apply Intial Condition for v 
  VectorTools::project(dof_handler, constraints, QGauss<dim>(element.degree + 1),
                       fn_v0, v_prev);

  // Run time stepping
  for (; time <= 5; time += time_step, ++timestep_number) {
    std::cout << "Time step " << timestep_number << " at t=" << time << "\n";

    // Parameters
    const data_type c = 1;
    

    // /*
System (U^n, V^n), (U^n-1, V^n-1), (F^n-1, F^n)
> (-(1 / k)M^n + (-1/4)(c^2)kA^n)(U^n) = (-(1 / k)M^n + (1/4)(c^2)kA^n)(U^n-1) - M^n.(V^n-1) + (-1/4)k(F^n-1) + (-1/4)k(F^n)
> M^n.(V^n) = (-1/2)(c^2)kA^n.(U^n) + (-1/2)(c^2)kA^n.(U^n-1) + M^n.(V^n-1) + (1/2)k(F^n-1) + (1/2)k(F^n)
*/

    // # Setup equation (-(1 / k)M^n + (-1/4)(c^2)kA^n)(U^n) = (-(1 / k)M^n + (1/4)(c^2)kA^n)(U^n-1) - M^n.(V^n-1) + (-1/4)k(F^n-1) + (-1/4)k(F^n)
    // ## Compute system for U^n
    // matrix_u = -(1 / k)M^n + (-1/4)(c^2)kA^n
    // matrix_u = -(1 / k) * M^n
    matrix_u.copy_from(mass_mat); matrix_u *= -(1 / time_step);
    
    // matrix_u += (-1/4)(c^2)kA^n
    matrix_u.add((-1./4.) * (c * c) * time_step, laplace_mat);
    
    
    // ## Compute rhs for U^n
    // rhs = (-(1 / k)M^n + (1/4)(c^2)kA^n)(U^n-1) - M^n.(V^n-1) + (-1/4)k(F^n-1) + (-1/4)k(F^n)
    
    // mtmp = -(1 / k)M^n + (1/4)(c^2)kA^n
    // mtmp = -(1 / k) * M^n
    mtmp.copy_from(mass_mat); mtmp *= -(1 / time_step);
    
    // mtmp += (1/4)(c^2)kA^n
    mtmp.add((1./4.) * (c * c) * time_step, laplace_mat);
    
    // rhs = mtmp * U^n-1
    mtmp.vmult(rhs, u_prev);
    
    // rhs += -M^n.(V^n-1)
    mass_mat.vmult(vtmp, v_prev);
    rhs -= vtmp;
    
    // rhs += (-1/4)k(F^n-1) + (-1/4)k(F^n)
    rhs.add((-1./4.) * time_step, f_prev, (-1./4.) * time_step, f);
    

    // Apply boundary condition to the equation for solving u
    {
      fn_g.set_time(time);
    
      std::map<types::global_dof_index, double> boundary_values;
      VectorTools::interpolate_boundary_values(
          dof_handler, 0, fn_g, boundary_values);
      MatrixTools::apply_boundary_values(boundary_values, matrix_u, u,
                                         rhs);
    }
    

    solve_u();
    

    // # Setup equation M^n.(V^n) = (-1/2)(c^2)kA^n.(U^n) + (-1/2)(c^2)kA^n.(U^n-1) + M^n.(V^n-1) + (1/2)k(F^n-1) + (1/2)k(F^n)
    // ## Compute system for V^n
    matrix_v.copy_from(mass_mat);
    
    
    // ## Compute rhs for V^n
    // rhs = (-1/2)(c^2)kA^n.(U^n) + (-1/2)(c^2)kA^n.(U^n-1) + M^n.(V^n-1) + (1/2)k(F^n-1) + (1/2)k(F^n)
    // rhs = (-1/2)(c^2)kA^n.(U^n)
    laplace_mat.vmult(rhs, u); rhs *= (-1./2.) * (c * c) * time_step;
    
    // rhs += (-1/2)(c^2)kA^n.(U^n-1)
    laplace_mat.vmult(vtmp, u_prev);
    rhs.add((-1./2.) * (c * c) * time_step, vtmp);
    
    // rhs += M^n.(V^n-1)
    // vtmp = M^n.(V^n-1)
    mass_mat.vmult(vtmp, v_prev);
    rhs += vtmp;
    
    // rhs += (1/2)k(F^n-1) + (1/2)k(F^n)
    rhs.add((1./2.) * time_step, f_prev, (1./2.) * time_step, f);
    

    // Apply boundary condition to the equation for solving v
    {
      fn_h.set_time(time);
    
      std::map<types::global_dof_index, double> boundary_values;
      VectorTools::interpolate_boundary_values(
          dof_handler, 0, fn_h, boundary_values);
      MatrixTools::apply_boundary_values(boundary_values, matrix_v, v,
                                         rhs);
    }
    

    solve_v();
    

    output_results();
    

    // Swap new values with previous values for the next step
    swap(u, u_prev);
    swap(v, v_prev);
  }

}

void Sim::output_results() {
  DataOut<dim> data_out;

  data_out.attach_dof_handler(dof_handler);
  data_out.add_data_vector(u, "u");
  data_out.add_data_vector(v, "v");
  data_out.build_patches();

  const std::string filename =
      "solution-" + Utilities::int_to_string(timestep_number, 3) + ".vtu";

  DataOutBase::VtkFlags vtk_flags;
  vtk_flags.compression_level = DataOutBase::CompressionLevel::best_speed;
  data_out.set_flags(vtk_flags);
  std::ofstream output(filename);
  data_out.write_vtu(output);
}

int main(int argc, char *argv[]) { 
  Kokkos::initialize(argc, argv);

  Sim sim;
  sim.run();

  Kokkos::finalize();

  return 0;
}
