#include <Kokkos_Core.hpp>
{{ includes }}

const int dim = 2;

using namespace dealii;

int main(int argc, char *argv[]) {
  Kokkos::initialize(argc, argv); 

{{ data }}

{{ setup }}

  Kokkos::finalize();
  return 0;
}
