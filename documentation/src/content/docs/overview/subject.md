---
title: PHD Subject
sidebar:
    order: 1
---

#### A Modular, HPC-Oriented Library for Numerical PDE Resolution: From Building Blocks to AI-Driven Scheme Generation

## Abstract

This research aims to develop a comprehensive and modular library for the numerical resolution of Partial Differential Equations (PDEs). The library will comprise high-performance computing (HPC)-oriented building blocks for standard numerical methods such as finite elements, finite volumes, discontinuous Galerkin, and spectral elements. These building blocks will be optimized for modern architectures using MPI, OpenMP, and GPU acceleration, relying on abstraction layers for adaptability to emerging technologies. The project includes the development of a graphical programming tool to chain these building blocks into full numerical schemes, enabling seamless integration and reusability. Leveraging this API, a generative AI model will be trained to translate a mathematical representation of PDEs into efficient HPC-ready code, achieving the vision of "from paper to HPC." This work bridges the gap between mathematical formulation and high-performance implementation, significantly accelerating the deployment of computational solutions for complex systems.

## Objectives

### 1. Develop a Fundamental Library of Numerical Methods

- Design reusable, modular components for numerical schemes, including interpolation, integration, assembly, solvers, and error estimators.
- Evaluate and develop optimized implementations for finite elements (e.g., PETSc, FEniCS), finite volumes, discontinuous Galerkin (e.g., Deal.II), and spectral elements.
- Implement cross-platform compatibility for CPUs and GPUs using MPI, OpenMP, CUDA, and HIP.

### 2. Introduce an Abstraction Layer for Portability

- Utilize frameworks such as Kokkos, RAJA, or SYCL to create architecture-independent code.
- Facilitate maintainability and adaptability to future HPC hardware.

### 3. Develop a Graphical Programming Interface (GPI)

- Build a user-friendly graphical interface to chain building blocks into complete schemes for PDE systems.
- Incorporate drag-and-drop functionality with flowchart-style visualization.
- Enable export to Python and C++ code for direct execution.

### 4. Leverage Generative AI for PDE Scheme Generation

- Train a generative AI model (e.g., GPT-based architecture or Diffusion Models) using symbolic PDE formulations as input and library blocks as output.
- Develop a preprocessor to parse mathematical equations (e.g., using SymPy or Mathematica) into numerical representations suitable for the library.

### 5. Demonstrate Scalability and Performance

- Validate the library on benchmark PDEs, such as Navier-Stokes, heat equation, Maxwell's equations, and wave propagation equations.
- Compare performance against state-of-the-art solvers like OpenFOAM, Nek5000, and Firedrake.

## Methodology

### 1. Numerical Method Evaluation and Development

- Design and implement building blocks for discretization (e.g., basis function definitions, integration rules) and solvers (e.g., preconditioned Krylov methods, multigrid solvers).
- Collaborate with open-source projects like PETSc, MFEM, or Trilinos for performance benchmarking and integration.
- Emphasize error estimation and adaptivity.

### 2. High-Performance Computing Implementation

- Use MPI for distributed memory parallelism and OpenMP for shared memory.
- Integrate GPU support using CUDA/HIP and abstraction frameworks such as Kokkos or SYCL to ensure portability.
- Optimize data structures for cache efficiency, ensuring scalability.

### 3. Graphical Programming Tool Development

- Build an intuitive interface using Qt or PyQt with a backend capable of generating high-performance code.
- Integrate support for user-defined extensions via scripting (Python bindings).

### 4. AI Model Training for PDE Scheme Generation

- Collect a dataset of equations paired with numerical discretizations.
- Train transformer models like GPT or neural operators (e.g., Fourier Neural Operator) to map equations to numerical schemes.
- Embed physics-informed constraints to improve prediction accuracy.

### 5. Validation and Demonstration

- Solve benchmark problems from fluid dynamics, electromagnetics, and wave propagation.
- Evaluate accuracy, scalability, and performance on supercomputing platforms such as NVIDIA DGX systems and AMD EPYC clusters.

## Key Technologies and Tools

### Libraries and Frameworks

- **Numerical**: PETSc, FEniCS, Deal.II, MFEM, Trilinos, Firedrake.
- **HPC Abstraction**: Kokkos, RAJA, SYCL.
- **AI and ML**: PyTorch, TensorFlow, SymPy.

### HPC Architectures

- MPI for distributed systems.
- OpenMP and GPU acceleration with CUDA/HIP.
- Adaptation to emerging exascale architectures.

### Graphical Tools and APIs

- **Frontend**: PyQt, Qt.
- **Code generation**: Clang/LLVM.

### Programming Languages

- **Core**: C++ for performance-critical components.
- **Scripting**: Python for API bindings.

## Expected Contributions

- A high-performance, modular library for numerical methods in PDE resolution.
- A graphical programming interface for visual design and chaining of numerical schemes.
- A generative AI-based tool that translates PDEs to HPC-ready implementations.
- Benchmark results and scalability analyses demonstrating the library's applicability to real-world problems.

## Preliminary Work and Timeline

### Year 1

- Literature review, library architecture design, initial numerical building blocks, implementation of HPC optimizations.

### Year 2

- Integration of abstraction layers, initial GPI development, training of generative AI models.

### Year 3

- Full validation on benchmarks, documentation, publication of results, and final thesis writing.

## Bibliographical References

1. Bangerth, W., et al. (2007). "Deal.II—A General Purpose Object Oriented Finite Element Library." ACM Transactions on Mathematical Software.
2. Balay, S., et al. (1997). "Efficient Management of Parallelism in Object-Oriented Numerical Software Libraries." Modern Software Tools in Scientific Computing.
3. Karniadakis, G., et al. (2013). *Spectral Methods in Fluid Dynamics*. Springer.
4. Karypis, G., & Kumar, V. (1998). "METIS: A Software Package for Partitioning Unstructured Graphs." University of Minnesota.

## Closing Words
This project will significantly advance computational science and proxy app development by providing an automated, scalable, and modular solution for PDE resolution. The resulting library and AI-driven approach have the potential to transform how scientists and engineers approach numerical simulation tasks.
