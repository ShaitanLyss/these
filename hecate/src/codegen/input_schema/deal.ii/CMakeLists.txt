cmake_minimum_required(VERSION 3.10.0)
message(STATUS "CMake version: ${CMAKE_VERSION}")

find_package(deal.II 9.6.0 REQUIRED)
deal_ii_initialize_cached_variables()

set(CMAKE_BUILD_TYPE Debug)

project("deal.II experimentation")

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)



# get_filename_component(name ${source} NAME_WE)
set(name "run_sim")
set(source "main.cpp")
add_executable(${name} ${source})
deal_ii_setup_target(${name})
