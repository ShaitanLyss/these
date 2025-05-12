---
title: Wave Equation
draft: true
---

```mermaid
flowchart
ts[Time Stepping]
initialU[Initial Values for U]
initialV[Initial Values for V]
rhs[Right Hand Side]
bondaryU[Boundary Values for U]
bondaryV[Boundary Values for V]

```

i need to be able to convert equations to compute code

```yaml
meshes:
    mesh:
        type: hyper_cube
        range: -1 .. 1
        subdivisions: 5

equations:
    equation: d²u / dt² - Laplacien(u) = f

finite_elements:
    fe: Q_1

functions:
    f: 
    g: 
    u0: 
    u1:
    

```
