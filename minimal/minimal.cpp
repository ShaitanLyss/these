#include <feel/feel.hpp>

using namespace Feel;
inline po::options_description makeOptions() {
  po::options_description myappOptions("Acoustic wave parameters");
  myappOptions.add_options()("c", po::value<double>()->default_value(343),
                             "celerity of acoustic wave (m/s)");
  // Add the default feel options to your list
  return myappOptions.add(feel_options());
}

int main(int argc, char *argv[]) {
  using namespace Feel;

  Environment env(_argc = argc, _argv = argv, _desc = makeOptions(),
                  _about = about(_name = "acoustic wave 1", _author = "Lyss",
                                 _email = "shaitan.lyssm@gmail.com"));

  const double c = Environment::vm(_name = "c").template as<double>();

  if (Environment::rank() == 0) {
    std::cout << "celerity = " << c << std::endl;
  }

  tic();
  auto mesh = loadMesh(_mesh = new Mesh<Simplex<1>>);
  toc("loadMesh");
}
