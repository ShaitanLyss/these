#include <Kokkos_Core.hpp>
#include <deal.II/lac/affine_constraints.h>
{{ includes }}

const int dim = 2;
using data_type = double;

using namespace dealii;

class Sim {
public:
  Sim(){{ constructors }} {}

  void setup_system() {
{{ setup }}
    constraints.close();
  }
  

  AffineConstraints<data_type> constraints;
{{ data }}
};

int main(int argc, char *argv[]) {
  Kokkos::initialize(argc, argv); 

  Sim sim;
  sim.setup_system();
  

  Kokkos::finalize();
  return 0;
}
