/*
System (U^n, V^n), (U^n-1, V^n-1), (F^n-1, F^n)
> (-(1 / k)M^n + (-1/4)(c^2)kA^n)U^n = (-(1 / k)M^n + (1/4)(c^2)kA^n)U^n-1 - M^nV^n-1 + (-1/4)kF^n-1 + (-1/4)kF^n
> M^nV^n = (-1/2)(c^2)kA^nU^n + (-1/2)(c^2)kA^nU^n-1 + M^nV^n-1 + (1/2)kF^n-1 + (1/2)kF^n
*/

#include <Kokkos_Core.hpp>
#include <deal.II/grid/grid_generator.h>
#include <deal.II/grid/tria.h>

const int dim = 2;

using namespace dealii;

int main(int argc, char *argv[]) {
  Kokkos::initialize(argc, argv); 

  Triangulation<dim> mesh;

  GridGenerator::hyper_cube(mesh, -1, 1);
  mesh.refine_global(5);

  Kokkos::finalize();
  return 0;
}

