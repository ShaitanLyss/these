---
title: Building Blocks
---

Here you can find the list of the available building blocks, with a description and their dependencies.

They allow to implement the following methods FEM, FVM, DG and Spectral, as well as setup coupling.

## Functions
### Function
### Function Space

## Spacial Discretization
### Mesh
Unstructured space discretization.

### Grid
Structured space discretization.


## Numerical Method
These methods produce an approximation of a solution to a problem, by the means
of numerical computation.

### FEM
Finite Elements Method.

#### Inputs
- [Spacial Discretization](/these/reference/building-blocks/#mesh--spacial-discretization)
- Basis function
- Variational Equation
- [Function Space](#function-space)

#### Outputs
- Function

#### Dependencies
- Sparse Symetric Matrix System Resolution
- Integration

For steady-state problems
- linear solver

For transient problems
- ordinary differential equation solver (Euler, Runge-Kutta)

### FVM

### Coupling
This allows the combination of different numerical methods, which can be useful
for selecting the most appropriate method over a region or for multi-physics
simulation.



## Computation
### Sparse Symetric Matrix
### Integration


## Solvers

### Preconditioned Krylov 

### Multigrid solver

