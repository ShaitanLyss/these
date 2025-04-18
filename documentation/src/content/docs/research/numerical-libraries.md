---
title: Numerical Libraries
---

## PETSC
- shared and distributed computation
- MPI
- can use Kokkos
- not focused on any specific numeric method

## Deal. II
- great documentation
- focused on finite elements
- building blocks
- MPI

## MFEM
- active development
- focused on finite elements
- MPI (depends on hypre and METIS)
- building blocks

## Feel++
[Overall workflow](https://docs.feelpp.org/user/latest/how-feelpp-works.html)
[Minimal example](https://docs.feelpp.org/user/latest/cpp/laplacian.html)
[API kinda](https://docs.feelpp.org/dev/latest/reference/index.html)
- bad documentation
- MPI
- multiple Galerkin methods
    - finite element
    - spectral
    - discontinuous Galerkin
    - reduced basis

## Kokkos
- shared memory parallelism
- hardware abstraction
