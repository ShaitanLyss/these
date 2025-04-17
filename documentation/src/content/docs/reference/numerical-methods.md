---
title: Numerical Methods for partial differential equations
sidebar:
    label: Numerical Methods
---

Here you can find a list of numerical methods.

## Supported
### FEM
Subdiving a large system into smaller parts called **finite elements**.

Then over each element, a trial polynomial function is fitted into the PDE, with
a residual representing the error.

This process results in :
- a set of algebraic equations for steady-state problems
- a set of ordinary differential equations for transient problems

#### User Input
- variational problem
- solution space (basis of the finite space)


#### Advantages
- sparse matrix

#### Inputs
- [Spacial Discretization](/these/reference/building-blocks/#mesh--spacial-discretization)
- Basis function
- Variational Equation
- Function Space

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
- Spacial Discretization
- 
### Spectral
### DG


## Not supported (yet?)
### FFT
### Finite Differences
### Method of lines
### Gradient discretization
### Meshfree methods
### Domain decomposition methods
### Multigrid
