cmake_minimum_required(VERSION 3.10)

project(Hecate)

# add_executable(hecate src/main.cpp)
add_library(hecatecpp STATIC src/main.cpp)

install(TARGETS hecatecpp)



