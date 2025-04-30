cmake_minimum_required(VERSION 3.10.0)
message(STATUS "CMake version: ${CMAKE_VERSION}")

find_package(deal.II 9.6.0 REQUIRED)
deal_ii_initialize_cached_variables()

set(CMAKE_BUILD_TYPE Debug)

project("deal.II experimentation")

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)


file(GLOB experiment_sources "src/*.cpp")

message(STATUS "Creating experiments for found sources.")
foreach(source ${experiment_sources})
  get_filename_component(experiment_name ${source} NAME_WE)
  add_executable(${experiment_name} ${source})
  deal_ii_setup_target(${experiment_name})
endforeach()
