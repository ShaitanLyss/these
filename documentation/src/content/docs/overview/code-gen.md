---
title: Code Generation
---

A distinctive feature of this library, compared to other PDE simulation libraries, is its innovative
use of AI for automating code generation. This approach significantly enhances user-friendliness, with
the end goal of only requiring problem definition from the user.

The first approach that is researched is the following :

1. The user (or an AI from a user-supplied natural language problem description) provides a conceptual graph describing the numerical scheme (problem definition, numerical method(s),
time stepping...)
2. This conceptual graph is systematically transformed into actual source code, which is then compiled into an optimized executable program for HPC (High-Performance Computing).

This approach allows for great flexibility, while retaining performance as the end result is an executable optimized for only one problem. It avoids the traditional costs incurred by abstraction and polyvalence.

It is yet undecided if the resulting executable will support changing the values of parameters, or if a new compilation will occur. The choice will depend on the potential performance gains procured by statically linking parameter values.

<style>
img[src*='mermaid'] {
    margin-left: 5.6rem;
    margin-top: 3rem;
    margin-bottom: 2rem;
}
</style>

[![](https://mermaid.ink/img/pako:eNplUl1LwzAU_SvhPk3ohq3t-vEgSDeGsBVh6oOrD7G964pNUrIEp-v-u0nn_JiXEM6995xzySV7KESJkMC6EW_FhkpF7ic5JyYetijJcHjdPdZbTRtyJ0UlKWM1rzqSZstBKniBrbK9TDOUdWHQstggw4szi9QM-Wdwxsmo0tI4zCmvNK2wIze37mA-X3yZmczyfpQG9MJ7ZG1DFZIZcpRU1YJ3ZDbNVkuhZYHEDn_-KzGu5-wjwYDjEMHalb3qpqec9KbS96c7LLSiLw2CA5WsS0iU1OiA2QOjNoW9leSg7D5ySAwsqXzNIecHo2kpfxKCnWRS6GoDyZo2W5PptjTvmdTU7uu7KpGXKFOhuYLkynN7E0j2sDOp74_8MDTHjcLIjyIH3iEJvFEw9vzQiz3PjYN4HBwc-OjHXo6i0I9_hwNY1krIxfFD9P_i8AnPEKlt?type=png)](https://mermaid.live/edit#pako:eNplUl1LwzAU_SvhPk3ohq3t-vEgSDeGsBVh6oOrD7G964pNUrIEp-v-u0nn_JiXEM6995xzySV7KESJkMC6EW_FhkpF7ic5JyYetijJcHjdPdZbTRtyJ0UlKWM1rzqSZstBKniBrbK9TDOUdWHQstggw4szi9QM-Wdwxsmo0tI4zCmvNK2wIze37mA-X3yZmczyfpQG9MJ7ZG1DFZIZcpRU1YJ3ZDbNVkuhZYHEDn_-KzGu5-wjwYDjEMHalb3qpqec9KbS96c7LLSiLw2CA5WsS0iU1OiA2QOjNoW9leSg7D5ySAwsqXzNIecHo2kpfxKCnWRS6GoDyZo2W5PptjTvmdTU7uu7KpGXKFOhuYLkynN7E0j2sDOp74_8MDTHjcLIjyIH3iEJvFEw9vzQiz3PjYN4HBwc-OjHXo6i0I9_hwNY1krIxfFD9P_i8AnPEKlt)

## Implementation
### Template-based source code generation
### LLM-based source code generation


