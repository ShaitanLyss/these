cmake_minimum_required(VERSION 3.10.0)
message(STATUS "CMake version: ${CMAKE_VERSION}")

find_package(deal.II 9.6.0 REQUIRED
  HINTS ${DEAL_II_DIR} ../ ../../ $ENV{DEAL_II_DIR}
)
deal_ii_initialize_cached_variables()

set(CMAKE_BUILD_TYPE Release)

project("Hecate Generated Simulation with factory: deal.ii")

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)



# get_filename_component(name ${source} NAME_WE)
set(name "run_sim")
set(source "main.cpp")
add_executable(${name} ${source})
deal_ii_setup_target(${name})
