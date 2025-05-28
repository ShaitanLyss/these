#include <iostream>
#include <deal.II/lac/vector.h>
#include <deal.II/lac/full_matrix.h>
using namespace dealii;
int main(int argc, char *argv[]) {
  Vector<double> u(2);
  Vector<double> v(2);
  Vector<double> w(2);
  double k = 1.0;
  Vector<double> f(2);
  Vector<double> rhs(2);
  FullMatrix<double> A(2, 2);

  A[0][0] = 1;
  A[1][1] = 2;
  double c = 2.0;
  f = 4;

  
  u = 0;
  u = 3;

  u = f;
  u *= 2* c;
  rhs = u; rhs *= (-10./3.) * c;  // rhs = (-10/3)c * u
  std::cout << rhs << std::endl;

  A.vmult(rhs, u);
  std::cout << rhs << std::endl;

  auto res = 2 * k * (u * v);  // rhs = 2k * u.v

  rhs = u; rhs.add(1, v, 1, w);  // rhs = u + v + w
  return 0;
}
