#include <iostream>
#include <fstream>
#include <cmath>
#include <deal.II/lac/affine_constraints.h>
#include <deal.II/numerics/data_out.h>
{{ includes }}{% if mpi %}
#include <mpi.h>
#include <deal.II/base/conditional_ostream.h>
#include <deal.II/base/mpi.h>{% endif %}

const int dim = {{ dimension }};
using data_type = double;


{%if parameters %}// Parameters{% endif %}
{% for name, value in parameters %}const data_type {{ name | lower }} = {{ value }};
{% endfor %}

using namespace dealii;
using namespace dealii::numbers;

static constexpr data_type pi = PI;
static constexpr data_type e = E;


bool float_equals(data_type a, data_type b) {
  const data_type base_epsilon = 1e-8;
  const data_type epsilon = base_epsilon * std::max(1.0, std::max(std::abs(a), std::abs(b)));
  return std::fabs(b - a) < epsilon;
}


{{ global }}


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
  unsigned long timestep_number = 1;

  {{ data | trim }}

  {{ methods_defs | trim }}
};

{{ methods_impls | trim }}

void Sim::run() {
  setup_system();
  data_type time_step = {{ time_step }};
  time = {{ time_start }} + time_step;

  // Prepare time stepping
  {{ main_setup | trim }}

  // Run time stepping
  for (; time <= {{ time_end }}; time += time_step, ++timestep_number) {
    std::cout << "Time step " << timestep_number << " at t=" << time << "\n";

    {{ main | trim }}
  }

}

void Sim::output_results() {
  DataOut<dim> data_out;

  data_out.attach_dof_handler(dof_handler);
  {{output | trim}}
  data_out.build_patches();

  const std::string filename =
      "solution-" + Utilities::int_to_string(timestep_number, 3) + ".vtu";

  DataOutBase::VtkFlags vtk_flags;
  vtk_flags.compression_level = DataOutBase::CompressionLevel::best_speed;
  data_out.set_flags(vtk_flags);
  std::ofstream output(filename);
  data_out.write_vtu(output);
}

int main(int argc, char *argv[]) { {% if mpi %}
  MPI_Init(&argc, &argv);
  {% endif %}
  Sim sim;
  sim.run();
  {% if mpi %}
  MPI_Finalize();
  {% endif %}
  return 0;
}
