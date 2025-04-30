---
title: Simple Poisson problem
---

The Poisson equation is a partial differential equation that models the
distribution of charge in a region. It is a second-order partial differential equation that can be written in the form :

> $$\Delta \phi = \rho$$


```mermaid
---
title: Conceptual Numerial Scheme
--- 
flowchart
start([Start])
assembly[Assemble system]
system@{shape: lean-r, label: "System"}
solution@{shape: lean-r, label: "Solution"}
solve[Solve]
vtk[Output VTK]



start ==> assembly ==> solve ==> vtk
assembly --> system --> solve
solve --> solution --> vtk

```
