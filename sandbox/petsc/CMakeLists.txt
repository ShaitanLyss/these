cmake_minimum_required(VERSION 3.10)

project(PETSC_Pratice VERSION 0.0.1 LANGUAGES CXX)

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)


find_package(MPI REQUIRED)
find_package(PkgConfig REQUIRED)

pkg_check_modules(PETSC PETSc>=3.23.0 REQUIRED IMPORTED_TARGET)


message(STATUS "PETSC version: ${PETSC_VERSION}")
message(STATUS "PETSC include directories: ${PETSC_INCLUDE_DIRS}")


add_executable(petsc1 main.cpp)

target_include_directories(petsc1 PRIVATE ${PETSC_INCLUDE_DIRS} ${MPI_CXX_INCLUDE_DIRS})
target_link_libraries(petsc1 PRIVATE PkgConfig::PETSC MPI::MPI_CXX)
