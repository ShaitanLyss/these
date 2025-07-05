#include <iostream>
{% if not mpi -%}
#include <fstream>
{% endif -%}
#include <cmath>
#include <deal.II/lac/affine_constraints.h>
#include <deal.II/numerics/data_out.h>
#include <deal.II/base/conditional_ostream.h>
{{ includes }}
{% if mpi -%}
#include <deal.II/lac/generic_linear_algebra.h>
#include <deal.II/base/mpi.h>
#include <mpi.h>
{%- endif %}

const int dim = {{ dimension }};
using data_type = double;


{%if parameters -%}
// Parameters
{%- endif %}
{% for name, value in parameters -%}
const data_type {{ name | lower }} = {{ value }};
{%- endfor %}

using namespace dealii;
using namespace dealii::numbers;

{%- if mpi %}

// Parellel linear algebra library namespace (PETSc or Trilinos)
namespace LA
{
  #if defined(DEAL_II_WITH_PETSC) && !defined(DEAL_II_PETSC_WITH_COMPLEX) && \
    !(defined(DEAL_II_WITH_TRILINOS) && defined(FORCE_USE_OF_TRILINOS))
    using namespace dealii::LinearAlgebraPETSc;
  #  define USE_PETSC_LA
  #elif defined(DEAL_II_WITH_TRILINOS)
    using namespace dealii::LinearAlgebraTrilinos;
  #else
  #  error DEAL_II_WITH_PETSC or DEAL_II_WITH_TRILINOS required
  #endif
} // namespace LA
{%- endif %}

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
  Sim()
    : {% if mpi -%}
      mpi_rank(Utilities::MPI::this_mpi_process(MPI_COMM_WORLD))
    , n_mpi_processes(Utilities::MPI::n_mpi_processes(MPI_COMM_WORLD))
    , {% endif -%}
    pcout(std::cout, {% if mpi -%} mpi_rank == 0 {%- else -%} true {%- endif %})
    {% for constructor in constructors -%}
    , {{ constructor }}
    {%- endfor %}
  {}

  void run();
  void output_results();

  void setup_system() {
    constraints.clear();
    {{ setup | trim }}
    constraints.close();
  }

  AffineConstraints<data_type> constraints;
  data_type time;
  unsigned long timestep_number = 1;
  {%if mpi -%}
  const unsigned int mpi_rank = 0;
  const unsigned int n_mpi_processes = 1;
  {%- endif %}
  ConditionalOStream pcout;

  {{ data | trim }}

  {{ methods_defs | trim }}
};

{{ methods_impls | trim }}

void Sim::run() {
  {% if mpi -%}
  pcout << "Running with "
#ifdef USE_PETSC_LA
  << "PETSc"
#else
  << "Trilinos"
#endif
  << " on " << Utilities::MPI::n_mpi_processes(MPI_COMM_WORLD)
  << " MPI rank(s)..." << std::endl;

  {% endif -%}
  setup_system();
  data_type time_step = {{ time_step }};
  time = {{ time_start }} + time_step;

  // Prepare time stepping
  {{ main_setup | trim }}

  // Run time stepping
  for (; time <= {{ time_end }}; time += time_step, ++timestep_number) {
    pcout << "Time step " << timestep_number << " at t=" << time << std::endl;

    {{ main | trim }}
  }

}

void Sim::output_results() {
  DataOut<dim> data_out;

  data_out.attach_dof_handler(dof_handler);
  {{output | trim}}
  data_out.build_patches();


  DataOutBase::VtkFlags vtk_flags;
  vtk_flags.compression_level = DataOutBase::CompressionLevel::best_speed;
  data_out.set_flags(vtk_flags);
  {%if mpi -%}
  data_out.write_vtu_with_pvtu_record("./", "solution", timestep_number, MPI_COMM_WORLD, 2, 8);
  {% else %}
  const std::string filename =
      "solution-" + Utilities::int_to_string(timestep_number, 3) + ".vtu";
  std::ofstream output(filename);
  data_out.write_vtu(output);
  {%- endif -%}
}

int main(int argc, char *argv[]) {
  try {
    {% if mpi -%}
    Utilities::MPI::MPI_InitFinalize mpi_initialization(argc, argv, numbers::invalid_unsigned_int);

    {% endif -%}
    Sim sim;
    sim.run();

  } catch (std::exception &exc) {
    std::cerr << std::endl
                << std::endl
                << "----------------------------------------------------"
                << std::endl;
      std::cerr << "Exception on processing: " << std::endl
                << exc.what() << std::endl
                << "Aborting!" << std::endl
                << "----------------------------------------------------"
                << std::endl;

      return 1;

  } catch (...) {
    std::cerr << std::endl
                << std::endl
                << "----------------------------------------------------"
                << std::endl;
      std::cerr << "Unknown exception!" << std::endl
                << "Aborting!" << std::endl
                << "----------------------------------------------------"
                << std::endl;
      return 1;
  }

  return 0;
}
