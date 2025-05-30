#include <Kokkos_Core.hpp>
#include <deal.II/lac/affine_constraints.h>
#include <iostream>
{{ includes }}

const int dim = 2;
using data_type = double;

using namespace dealii;

class Sim {
public:
  Sim() {{ constructors }} {}

  void run();
  void output_results();

  void setup_system() {
    {{ setup | trim }}
    constraints.close();
  }

  AffineConstraints<data_type> constraints;
  data_type time;
  unsigned long timestep_number;

  {{ data | trim }}

  {{ methods_defs | trim }}
};

{{ methods_impls | trim }}

void Sim::run() {
  setup_system();
  data_type time_step = {{ time_step }};
  time = {{ time_start }} + time_step;

  // TODO
  VectorTools::project(dof_handler, constraints, QGauss<dim>(element.degree + 1),
                       InitialValuesU<dim>(), u_prev);
  VectorTools::project(dof_handler, constraints, QGauss<dim>(element.degree + 1),
                       InitialValuesV<dim>(), v_prev);
  Vector<double> tmp(u.size());
  Vector<double> forcing_terms(u.size());
  // End TODO


  for (; time <= {{ time_end }}; time += time_step, ++timestep_number) {
    std::cout << "Time step " << timestep_number << " at t=" << time << "\n";

    {{ main | trim }}

    output_results();
  }

}

void Sim::output_results() {

}

int main(int argc, char *argv[]) {
  Kokkos::initialize(argc, argv);

  Sim sim;
  sim.run();

  Kokkos::finalize();
  return 0;
}
