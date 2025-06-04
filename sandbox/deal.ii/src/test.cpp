#include <deal.II/base/template_constraints.h>
#include <deal.II/lac/full_matrix.h>
#include <deal.II/lac/petsc_full_matrix.h>
#include <deal.II/lac/petsc_sparse_matrix.h>
#include <deal.II/lac/petsc_vector.h>
#include <deal.II/lac/vector.h>
#include <iostream>
using namespace dealii;
int main(int argc, char *argv[]) {
  PETScWrappers::MPI::Vector u;
  PETScWrappers::MPI::Vector v;
  PETScWrappers::MPI::Vector w;
  double k = 1.0;
  PETScWrappers::MPI::Vector f;
  PETScWrappers::MPI::Vector rhs;
  PETScWrappers::SparseMatrix A;

  // A[0][0] = 1;
  // A[1][1] = 2;
  double c = 2.0;
  f = 4;

  u = 0;
  u = 3;

  u = f;
  u *= 2 * c;
  rhs = u;
  rhs *= (-10. / 3.) * c; // rhs = (-10/3)c * u
  std::cout << rhs << std::endl;

  A.vmult(rhs, u);
  std::cout << rhs << std::endl;

  auto res = 2 * k * (u * v); // rhs = 2k * u.v

  rhs = u;
  rhs.add(1, v, 1, w); // rhs = u + v + w
  PETScWrappers::MPI::SparseMatrix mass_mat;
  PETScWrappers::MPI::SparseMatrix laplace_mat;
  PETScWrappers::MPI::SparseMatrix system;
  PETScWrappers::MPI::SparseMatrix mtmp;
  PETScWrappers::MPI::SparseMatrix mtmp1;
  PETScWrappers::MPI::Vector u_prev;
  PETScWrappers::MPI::Vector v_prev;
  PETScWrappers::MPI::Vector f_prev;
  PETScWrappers::MPI::Vector vtmp;

  // rhs = (-(1 / k)mass_mat + (1/4)(c^2)laplace_mat)u_prev - mass_mat.v_prev +
  // (-1/4)kf_prev + (-1/4)kf

  // mtmp = -(1 / k)mass_mat + (1/4)(c^2)laplace_mat
  // mtmp = -(1 / k) * mass_mat
  mtmp.copy_from(mass_mat);
  mtmp *= -(1 / k);

  // mtmp += (1/4)(c^2)laplace_mat
  mtmp.add((1. / 4.) * (c * c), laplace_mat);

  // rhs = mtmp * u_prev
  mtmp.vmult(rhs, u_prev);

  // rhs += -mass_mat.v_prev
  mass_mat.vmult(vtmp, v_prev);
  rhs -= vtmp;

  // rhs += (-1/4)kf_prev + (-1/4)kf
  rhs.add((-1. / 4.) * k, f_prev, (-1. / 4.) * k, f);

  // system = -(1 / k)mass_mat + (-1/4)(c^2)laplace_mat
  // system = -(1 / k) * mass_mat
  system.copy_from(mass_mat);
  system *= -(1 / k);

  // system += (-1/4)(c^2)laplace_mat
  system.add((-1. / 4.) * (c * c), laplace_mat);

  return 0;
}
