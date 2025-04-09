#include <feel/feel.hpp>
#include <feel/feelcore/parameter.hpp>

using namespace Feel;

inline po::options_description makeOptions() {
  po::options_description myappOptions("My app options");
  myappOptions.add_options()("c", po::value<float>()->default_value(343),
                             "vitesse de propagation dans le milieu (m/s)");
  // Add the default feel options to your list
  return myappOptions.add(feel_options());
}

int main(int argc, char *argv[]) {
  using namespace Feel;

  Environment env(_argc = argc, _argv = argv, _desc = makeOptions(),
                  _about = about(_name = "feelpp-1", _author = "Selene",
                                 _email = "shaitan.lyssm@gmail.com"));

  float c = Environment::vm(_name = "c").template as<float>();

  if (Environment::rank() == 0)
    std::cout << "c: " << c;

  std::cout << "proc " << Environment::rank() << " of "
            << Environment::numberOfProcessors() << std::endl;
}
