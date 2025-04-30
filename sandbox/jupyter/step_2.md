This tutorial depends on [step-1](step_1.html).

| **Table of contents** | |
| --- | --- |
| 1. [Introduction](#step_2-Intro)    * [Enumerating degrees of freedom](#step_2-Enumeratingdegreesoffreedom) * [Sparsity](#step_2-Sparsity) * [How degrees of freedom are enumerated](#step_2-Howdegreesoffreedomareenumerated)- [The commented program](#step_2-CommProg)      * [Mesh generation](#step_2-Meshgeneration)* [Outputting the location of degrees of freedom](#step_2-Outputtingthelocationofdegreesoffreedom)* [Creation of a DoFHandler](#step_2-CreationofaDoFHandler)* [Renumbering of DoFs](#step_2-RenumberingofDoFs)* [The main function](#step_2-Themainfunction) | 1. [Results](#step_2-Results)    * [Possibilities for extensions](#step_2-Possibilitiesforextensions)- [The plain program](#step_2-PlainProg) |

Introduction
============

Note
:   The material presented here is also discussed in [video lecture 9](https://www.math.colostate.edu/~bangerth/videos.676.9.html). (All video lectures are also available [here](https://www.math.colostate.edu/~bangerth/videos.html).)

The finite element method is based on approximating the solution \(u\) of a differential equation such as \(-\Delta u=f\) by a function \(u\_h\) that is "piecewise" polynomial; that is, we subdivide the domain \(\Omega\) on which the equation is posed into small cells that in the documentation we will generally denote by the symbol \(K\). On each cell \(K\), the approximating function \(u\_h\) we seek is then a polynomial. (Or, strictly speaking, a function that is the image of a polynomial from a "reference cell", but let us not make things more complicated than necessary for now.)

In the previous tutorial program (in [step-1](step_1.html)), we showed how we should think of the subdivision of the domain into cells as a "mesh" represented by the [Triangulation](classTriangulation.html) class, and how this looks like in code. In the current tutorial program, we now show how one represents piecewise polynomial functions through the concept of degrees of freedom defined on this mesh. For this example, we will use the lowest order ( \(Q\_1\)) finite elements, that is the approximating function \(u\_h\) we are looking for will be "bi-linear" on each quadrilateral cell \(K\) of the mesh. (They would be linear if we would work on triangles.)

In practice, we represent the function as a linear combination of shape functions \(\varphi\_j(\mathbf x)\) with multipliers \(U\_j\) that we call the "degrees of freedom". For the bi-linear functions we consider here, each of these shape functions and degrees of freedom is associated with a vertex of the mesh. Later examples will demonstrate higher order elements where degrees of freedom are not necessarily associated with vertices any more, but can be associated with edges, faces, or cells.

The term "degree of freedom" is commonly used in the finite element community to indicate two slightly different, but related things. The first is that we'd like to represent the finite element solution as a linear combination of shape functions, in the form \(u\_h(\mathbf x) = \sum\_{j=0}^{N-1} U\_j \varphi\_j(\mathbf
x)\). Here, \(U\_j\) is a vector of expansion coefficients. Because we don't know their values yet (we will compute them as the solution of a linear or nonlinear system), they are called "unknowns" or "degrees of freedom". The second meaning of the term can be explained as follows: A mathematical description of finite element problems is often to say that we are looking for a finite dimensional function \(u\_h \in V\_h\) that satisfies some set of equations (e.g. \(a(u\_h,\varphi\_h)=(f,\varphi\_h)\) for all test functions \(\varphi\_h\in
V\_h\)). In other words, all we say here is that the solution needs to lie in some space \(V\_h\). However, to actually solve this problem on a computer we need to choose a basis of this space; this is the set of shape functions \(\varphi\_j(\mathbf x)\) we have used above in the expansion of \(u\_h(\mathbf x)\) with coefficients \(U\_j\). There are of course many bases of the space \(V\_h\), but we will specifically choose the one that is described by the finite element functions that are traditionally defined locally on the cells of the mesh.

### Enumerating degrees of freedom

Describing "degrees of freedom" in this context requires us to simply *enumerate* the basis functions of the space \(V\_h\). For \(Q\_1\) elements this means simply enumerating the vertices of the mesh in some way, but for higher order elements, one also has to enumerate the shape functions that are associated with edges, faces, or cell interiors of the mesh. In other words, the enumeration of degrees of freedom is an entirely separate thing from the indices we use for vertices. The class that provides this enumeration of the basis functions of \(V\_h\) is called [DoFHandler](classDoFHandler.html).

Defining degrees of freedom ("DoF"s in short) on a mesh is, in practice, a rather simple task, since the library does all the work for you. Essentially, all you have to do is create a finite element object (from one of the many finite element classes deal.II already has, see for example the [Finite element space descriptions](group__fe.html) documentation) and give it to a [DoFHandler](classDoFHandler.html) object through the [DoFHandler::distribute\_dofs()](classDoFHandler.html#a553ca864aaf70330d9be86bc78f36d1e) function ("distributing DoFs" is the term we use to describe the process of *enumerating* the basis functions as discussed above). The [DoFHandler](classDoFHandler.html) is a class that knows which degrees of freedom live where, i.e., it can answer questions like "how many degrees of freedom are there globally" and "on this cell, give me the global indices of the shape functions that
live here". This is the sort of information you need when determining how big your system matrix should be, and when copying the contributions of a single cell into the global matrix.

The first task of the current program is therefore to take a mesh and a finite element, and enumerate the degrees of freedom. In the current context, this means simply giving each vertex of the mesh a DoF index. Once that has happened, we will output in a picture which vertex ended up with which DoF index. You can find the corresponding pictures in the [results section](#Results) of this tutorial.

It is probably worth pointing out that where each DoF is geometrically located is not a question we typically ask in finite element codes. Most often, we only care about the fact that there *is* an enumeration of all degrees of freedom, but not which DoF is where. (We will also come back to this below where we talk about renumbering degrees of freedom.) At the same time, it is probably instructive to see this once, and so this program shows such a figure.

### Sparsity

The next step would then be to compute a matrix and right hand side corresponding to a particular differential equation using this finite element and mesh. We will keep this step for the [step-3](step_3.html) program and rather talk about one practical aspect of a finite element program, namely that finite element matrices are always very sparse: almost all entries in these matrices are zero.

To be more precise, we say that a matrix is sparse if the number of nonzero entries *per row* in the matrix is bounded by a number that is independent of the overall number of degrees of freedom. For example, the simple 5-point stencil of a finite difference approximation of the Laplace equation leads to a sparse matrix since the number of nonzero entries per row is five, and therefore independent of the total size of the matrix. For more complicated problems – say, the Stokes problem of [step-22](step_22.html) – and in particular in 3d, the number of entries per row may be several hundred. But the important point is that this number is independent of the overall size of the problem: If you refine the mesh, the maximal number of unknowns per row remains the same.

Sparsity is one of the distinguishing features of the finite element method compared to, say, approximating the solution of a partial differential equation using a Taylor expansion and matching coefficients, or using a Fourier basis.

In practical terms, it is the sparsity of matrices that enables us to solve problems with millions or billions of unknowns. To understand this, note that a matrix with \(N\) rows, each with a fixed upper bound for the number of nonzero entries, requires \({\cal O}(N)\) memory locations for storage, and a matrix-vector multiplication also requires only \({\cal O}(N)\) operations. Consequently, if we had a linear solver that requires only a fixed number of matrix-vector multiplications to come up with the solution of a linear system with this matrix, then we would have a solver that can find the values of all \(N\) unknowns with optimal complexity, i.e., with a total of \({\cal O}(N)\) operations. It is clear that this wouldn't be possible if the matrix were not sparse (because then the number of entries in the matrix would have to be \({\cal O}(N^s)\) with some \(s>1\), and doing a fixed number of matrix-vector products would take \({\cal O}(N^s)\) operations), but it also requires very specialized solvers such as multigrid methods to satisfy the requirement that the solution requires only a fixed number of matrix-vector multiplications. We will frequently look at the question of what solver to use in the remaining programs of this tutorial.

The sparsity is generated by the fact that finite element shape functions are defined *locally* on individual cells, rather than globally, and that the local differential operators in the bilinear form only couple shape functions whose support overlaps. (The "support" of a function is the area where it is nonzero. For the finite element method, the support of a shape function is generally the cells adjacent to the vertex, edge, or face it is defined on.) In other words, degrees of freedom \(i\) and \(j\) that are not defined on the same cell do not overlap, and consequently the matrix entry \(A\_{ij}\) will be zero. (In some cases such as the Discontinuous Galerkin method, shape functions may also connect to neighboring cells through face integrals. But finite element methods do not generally couple shape functions beyond the immediate neighbors of a cell on which the function is defined.)

### How degrees of freedom are enumerated

By default, the [DoFHandler](classDoFHandler.html) class enumerates degrees of freedom on a mesh using an algorithm that is difficult to describe and leads to results that do look right if you know what it is doing but otherwise appears rather random; consequently, the sparsity pattern is also not optimized for any particular purpose. To show this, the code below will demonstrate a simple way to output the "sparsity pattern" that corresponds to a [DoFHandler](classDoFHandler.html), i.e., an object that represents all of the potentially nonzero elements of a matrix one may build when discretizing a partial differential equation on a mesh and its [DoFHandler](classDoFHandler.html). This lack of structure in the sparsity pattern will be apparent from the pictures we show below.

For most applications and algorithms, the exact way in which degrees of freedom are numbered does not matter. For example, the Conjugate Gradient method we use to solve linear systems does not care. On the other hand, some algorithms do care: in particular, some preconditioners such as SSOR will work better if they can walk through degrees of freedom in a particular order, and it would be nice if we could just sort them in such a way that SSOR can iterate through them from zero to \(N\) in this order. Other examples include computing incomplete LU or Cholesky factorizations, or if we care about the block structure of matrices (see [step-20](step_20.html) for an example). deal.II therefore has algorithms that can re-enumerate degrees of freedom in particular ways in namespace [DoFRenumbering](namespaceDoFRenumbering.html). Renumbering can be thought of as choosing a different, permuted basis of the finite element space. The sparsity pattern and matrices that result from this renumbering are therefore also simply a permutation of rows and columns compared to the ones we would get without explicit renumbering.

In the program below, we will use the algorithm of Cuthill and McKee to do so. We will show the sparsity pattern for both the original enumeration of degrees of freedom and of the renumbered version below, in the [results section](#Results).

The commented program
=====================

The first few includes are just like in the previous program, so do not require additional comments:

```
   #include <deal.II/grid/tria.h>
   #include <deal.II/grid/grid_generator.h>
   #include <deal.II/grid/grid_out.h>
```

However, the next file is new. We need this include file for the association of degrees of freedom ("DoF"s) to vertices, lines, and cells:

```
   #include <deal.II/dofs/dof_handler.h>
```

The following include contains the description of the bilinear finite element, including the facts that it has one degree of freedom on each vertex of the triangulation, but none on faces and none in the interior of the cells.

(In fact, the file contains the description of Lagrange elements in general, i.e. also the quadratic, cubic, etc versions, and not only for 2d but also 1d and 3d.)

```
   #include <deal.II/fe/fe_q.h>
```

In the following file, several tools for manipulating degrees of freedom can be found, and the one after it is necessary to call one of the functions imported from `dof_tools.h`:

```
   #include <deal.II/dofs/dof_tools.h>
   #include <deal.II/fe/mapping_q1.h>
```

We will use a sparse matrix to visualize the pattern of nonzero entries resulting from the distribution of degrees of freedom on the grid. That class can be found here:

```
   #include <deal.II/lac/sparse_matrix.h>
```

We will also need to use an intermediate sparsity pattern structure, which is found in this file :

```
   #include <deal.II/lac/dynamic_sparsity_pattern.h>
```

We will want to use a special algorithm to renumber degrees of freedom. It is declared here:

```
   #include <deal.II/dofs/dof_renumbering.h>
```

And this is again needed for C++ output:

```
   #include <fstream>
```

Finally, as in [step-1](step_1.html), we import the deal.II namespace into the global scope:

```
   using namespace dealii;
```

### Mesh generation

This is the function that produced the circular grid in the previous [step-1](step_1.html) example program with fewer refinements steps. The sole difference is that it returns the grid it produces via its argument.

At the end of the function, we also output this mesh into a file. We will use this as one piece of information when visualizing the location of degrees of freedom. To output a mesh, we use the [GridOut](classGridOut.html) class that you have already seen in [step-1](step_1.html); the difference is only that we use gnuplot rather than SVG format, because gnuplot is the program we will use to visualize DoF locations.

```
   void make_grid(Triangulation<2> &triangulation)
   {
     const Point<2> center(1, 0);
     const double   inner_radius = 0.5, outer_radius = 1.0;
     GridGenerator::hyper_shell(
       triangulation, center, inner_radius, outer_radius, 5);
   
     for (unsigned int step = 0; step < 3; ++step)
       {
         for (const auto &cell : triangulation.active_cell_iterators())
           for (const auto v : cell->vertex_indices())
             {
               const double distance_from_center =
                 center.distance(cell->vertex(v));
   
               if (std::fabs(distance_from_center - inner_radius) <=
                   1e-6 * inner_radius)
                 {
                   cell->set_refine_flag();
                   break;
                 }
             }
   
         triangulation.execute_coarsening_and_refinement();
       }
   
     std::ofstream mesh_file("mesh.gnuplot");
     GridOut().write_gnuplot(triangulation, mesh_file);
   }
```

### Outputting the location of degrees of freedom

The next function outputs the locations of degrees of freedom for later visualization. Where each DoF is located is something the [DoFHandler](classDoFHandler.html) object knows, so that is one of the arguments to this function. Since we want to do all of this twice (once for the original enumeration and once for the renumbered set of degrees of freedom), the function also takes as a second argument the name of the file into which we want the output to be written.

In order to learn deal.II, it is probably not terribly important to understand exactly what this function does, and you can skip over it. But if you would like to know anyway: We want to call the function [DoFTools::map\_dofs\_to\_support\_points()](namespaceDoFTools.html#a621c66a6f7e56cb56faac0e64014ece8) that returns a list of locations. It does so in the form of a map through which we can query (in a statement such as `dof_location_map[42]`) where the DoF is located (in the example, where the 42nd DoF is). It puts this information into the `dof_location_map` object.

We then use the function [DoFTools::write\_gnuplot\_dof\_support\_point\_info()](namespaceDoFTools.html#a69d19d6d574269cc6e69fa5c5b2d89e2) to write this information into a file in a format that is understandable to the gnuplot program that we will use for visualization in the results section.

```
   void write_dof_locations(const DoFHandler<2> &dof_handler,
                            const std::string   &filename)
   {
     const std::map<types::global_dof_index, Point<2>> dof_location_map =
       DoFTools::map_dofs_to_support_points(MappingQ1<2>(), dof_handler);
   
     std::ofstream dof_location_file(filename);
     DoFTools::write_gnuplot_dof_support_point_info(dof_location_file,
                                                    dof_location_map);
   }
```

### Creation of a [DoFHandler](classDoFHandler.html)

Up to now, we only have a grid, i.e. some geometrical (the position of the vertices) and some topological information (how vertices are connected to lines, and lines to cells, as well as which cells neighbor which other cells). To use numerical algorithms, one needs some logic information in addition to that: we would like to associate degree of freedom numbers to each vertex (or line, or cell, in case we were using higher order elements) to later generate matrices and vectors which describe a finite element field on the triangulation.

This function shows how to do this. The object to consider is the `DoFHandler` class template. Before we do so, however, we first need something that describes how many degrees of freedom are to be associated to each of these objects. Since this is one aspect of the definition of a finite element space, the finite element base class stores this information. In the present context, we therefore create an object of the derived class `FE_Q` that describes Lagrange elements. Its constructor takes one argument that states the polynomial degree of the element, which here is one (indicating a bi-linear element); this then corresponds to one degree of freedom for each vertex, while there are none on lines and inside the quadrilateral. A value of, say, three given to the constructor would instead give us a bi-cubic element with one degree of freedom per vertex, two per line, and four inside the cell. In general, `FE_Q` denotes the family of continuous elements with complete polynomials (i.e. tensor-product polynomials) up to the specified order.

We first need to create an object of this class and then pass it on to the `DoFHandler` object to allocate storage for the degrees of freedom (in deal.II lingo: we *distribute degrees of freedom*).

```
   void distribute_dofs(DoFHandler<2> &dof_handler)
   {
     const FE_Q<2> finite_element(1);
     dof_handler.distribute_dofs(finite_element);
```

Now that we have associated a degree of freedom with a global number to each vertex, Let us output this information using the function above:

```
     write_dof_locations(dof_handler, "dof-locations-1.gnuplot");
```

In practice, we do not often care about where a degree of freedom is geometrically located, and so other than seeing it once via the call above is not practically useful. But where two degrees of freedom are in relation to each other matters in other ways.

Associated with each vertex of the triangulation is a shape function. Assume we want to solve something like Laplace's equation, then the different matrix entries will be the integrals over the gradient of each pair of such shape functions. Obviously, since the shape functions are nonzero only on the cells adjacent to the vertex they are associated with, matrix entries will be nonzero only if the supports of the shape functions associated to that column and row numbers intersect. This is only the case for adjacent shape functions, and therefore only for adjacent vertices. Now, since the vertices are numbered more or less randomly by the above function ([DoFHandler::distribute\_dofs](classDoFHandler.html#a553ca864aaf70330d9be86bc78f36d1e)), the pattern of nonzero entries in the matrix will be somewhat ragged, and we will take a look at it now.

First we have to create a structure which we use to store the places of nonzero elements. This can then later be used by one or more sparse matrix objects that store the values of the entries in the locations stored by this sparsity pattern. The class that stores the locations is the [SparsityPattern](classSparsityPattern.html) class. As it turns out, however, this class has some drawbacks when we try to fill it right away: its data structures are set up in such a way that we need to have an estimate for the maximal number of entries we may wish to have in each row. In two space dimensions, reasonable values for this estimate are available through the [DoFHandler::max\_couplings\_between\_dofs()](classDoFHandler.html#a198c25ff9747d228eb9afa998e716f18) function, but in three dimensions the function almost always severely overestimates the true number, leading to a lot of wasted memory, sometimes too much for the machine used, even if the unused memory can be released immediately after computing the sparsity pattern. In order to avoid this, we use an intermediate object of type [DynamicSparsityPattern](classDynamicSparsityPattern.html) that uses a different internal data structure and that we can later copy into the [SparsityPattern](classSparsityPattern.html) object without much overhead. (Some more information on these data structures can be found in the [Sparsity patterns](group__Sparsity.html) topic.) In order to initialize this intermediate data structure, we have to give it the size of the matrix, which in our case will be square with as many rows and columns as there are degrees of freedom on the grid:

```
     DynamicSparsityPattern dynamic_sparsity_pattern(dof_handler.n_dofs(),
                                                     dof_handler.n_dofs());
```

We then fill this object with the places where nonzero elements will be located given the present numbering of degrees of freedom:

```
     DoFTools::make_sparsity_pattern(dof_handler, dynamic_sparsity_pattern);
```

Now we are ready to create the actual sparsity pattern that we could later use for our matrix. It will just contain the data already assembled in the [DynamicSparsityPattern](classDynamicSparsityPattern.html).

```
     SparsityPattern sparsity_pattern;
     sparsity_pattern.copy_from(dynamic_sparsity_pattern);
```

With this, we can now write the results to a file :

```
     std::ofstream out("sparsity-pattern-1.svg");
     sparsity_pattern.print_svg(out);
```

The result is stored in an `.svg` file, where each nonzero entry in the matrix corresponds with a red square in the image. The output will be shown below.

If you look at it, you will note that the sparsity pattern is symmetric. This should not come as a surprise, since we have not given the `DoFTools::make_sparsity_pattern` any information that would indicate that our bilinear form may couple shape functions in a non-symmetric way. You will also note that it has several distinct region, which stem from the fact that the numbering starts from the coarsest cells and moves on to the finer ones; since they are all distributed symmetrically around the origin, this shows up again in the sparsity pattern.

```
   }
```

### Renumbering of DoFs

In the sparsity pattern produced above, the nonzero entries extended quite far off from the diagonal. For some algorithms, for example for incomplete LU decompositions or Gauss-Seidel preconditioners, this is unfavorable, and we will show a simple way how to improve this situation.

Remember that for an entry \((i,j)\) in the matrix to be nonzero, the supports of the shape functions i and j needed to intersect (otherwise in the integral, the integrand would be zero everywhere since either the one or the other shape function is zero at some point). However, the supports of shape functions intersected only if they were adjacent to each other, so in order to have the nonzero entries clustered around the diagonal (where \(i\) equals \(j\)), we would like to have adjacent shape functions to be numbered with indices (DoF numbers) that differ not too much.

This can be accomplished by a simple front marching algorithm, where one starts at a given vertex and gives it the index zero. Then, its neighbors are numbered successively, making their indices close to the original one. Then, their neighbors, if not yet numbered, are numbered, and so on.

One algorithm that adds a little bit of sophistication along these lines is the one by Cuthill and McKee. We will use it in the following function to renumber the degrees of freedom such that the resulting sparsity pattern is more localized around the diagonal. The only interesting part of the function is the first call to `DoFRenumbering::Cuthill_McKee`, the rest is essentially as before:

```
   void renumber_dofs(DoFHandler<2> &dof_handler)
   {
     DoFRenumbering::Cuthill_McKee(dof_handler);
   
     write_dof_locations(dof_handler, "dof-locations-2.gnuplot");
   
   
     DynamicSparsityPattern dynamic_sparsity_pattern(dof_handler.n_dofs(),
                                                     dof_handler.n_dofs());
     DoFTools::make_sparsity_pattern(dof_handler, dynamic_sparsity_pattern);
   
     SparsityPattern sparsity_pattern;
     sparsity_pattern.copy_from(dynamic_sparsity_pattern);
   
     std::ofstream out("sparsity-pattern-2.svg");
     sparsity_pattern.print_svg(out);
   }
```

Again, the output is shown below. Note that the nonzero entries are clustered far better around the diagonal than before. This effect is even more distinguished for larger matrices (the present one has 1260 rows and columns, but large matrices often have several 100,000s).

It is worth noting that the `DoFRenumbering` class offers a number of other algorithms as well to renumber degrees of freedom. For example, it would of course be ideal if all couplings were in the lower or upper triangular part of a matrix, since then solving the linear system would amount to only forward or backward substitution. This is of course unachievable for symmetric sparsity patterns, but in some special situations involving transport equations, this is possible by enumerating degrees of freedom from the inflow boundary along streamlines to the outflow boundary. Not surprisingly, `DoFRenumbering` also has algorithms for this.

### The main function

Finally, this is the main program. The only thing it does is to allocate and create the triangulation, then create a `DoFHandler` object and associate it to the triangulation, and finally call above two functions on it:

```
   int main()
   {
     Triangulation<2> triangulation;
     make_grid(triangulation);
   
     DoFHandler<2> dof_handler(triangulation);
   
     distribute_dofs(dof_handler);
     renumber_dofs(dof_handler);
   }
```

Results
=======

The program has, after having been run, produced two files of DoF locations and sparsity patterns each (once for the original numbering and once after renumbering), along with one mesh file.

Let us start with the DoF locations. There is no particularly convenient program to visualize this kind of information, but we can resort to [GNUPLOT](http://www.gnuplot.info/) (one of the simpler visualization programs; maybe not the easiest to use since it is command line driven, but also universally available on all Linux and other Unix-like systems). The command that produces the following pictures reads as follows:

```
plot [-0.1:2.1][-1.1:1.1] "mesh.gnuplot" with lines, "dof-locations-1.gnuplot" using 1:2:3 with labels point offset .3,.2 font "4,6"
```

This may be cryptic, but what exactly this does is also not particularly important and you shouldn't spend too much time understanding what it does. Rather, the important part is to look at what we get as output:

|  |  |
| --- | --- |
|  |  |

What these figures show is (i) a numeric label attached to each vertex – the DoF index, and (ii) that the original enumeration on the left differs from the renumbered one on the right. Which of the two is "better" is of course a different question (with the answer depending on what we want to do with these degrees of freedom); the important point is that for the same mesh, one can come up with many different enumerations of the degrees of freedom.

As for the sparsity patterns, we can visualize these by opening the `.svg` files in a web browser. The pictures below represent the matrix, and every red square denotes an entry which might be nonzero. (Whether the entry actually is zero or not depends on the equation under consideration, but the indicated positions in the matrix tell us which shape functions can and which can't couple when discretizing a local, i.e. differential, equation.)

|  |  |
| --- | --- |
|  |  |

The different regions in the left picture, indicated by kinks in the lines and single dots on the left and top, represent the degrees of freedom on the different refinement levels of the triangulation. As can be seen in the right picture, the sparsity pattern is much better clustered around the main diagonal of the matrix after renumbering. Although this might not be apparent, the number of nonzero entries is the same in both pictures, of course.

### Possibilities for extensions

Just as with [step-1](step_1.html), you may want to play with the program a bit to familiarize yourself with deal.II. For example, in the `distribute_dofs` function, we use linear finite elements (that's what the argument "1" to the [FE\_Q](classFE__Q.html) object is). Explore how the sparsity pattern changes if you use higher order elements, for example cubic or quintic ones (by using 3 and 5 as the respective arguments). You might also want to see where DoFs are now located – but for that you likely want to work with a mesh with fewer cells because DoFs are now also located on edges and in the interior of cells.

You could also explore how the sparsity pattern changes by refining the mesh. You will see that not only the size of the matrix changes, but also its bandwidth (the distance from the diagonal of those nonzero elements of the matrix that are farthest away from the diagonal), though the ratio of bandwidth to size typically shrinks, i.e. the matrix clusters more around the diagonal.

Another idea of experiments would be to try other renumbering strategies than Cuthill-McKee from the [DoFRenumbering](namespaceDoFRenumbering.html) namespace and see how they affect the sparsity pattern.

You can also visualize the output using [GNUPLOT](http://www.gnuplot.info/) (which we have already used above) by changing from `print_svg()` to `print_gnuplot()` in `distribute_dofs()` and `renumber_dofs()` (and using the file ending `.gnuplot` instead of `.svg`):

```
examples/step-2> gnuplot
 
        G N U P L O T
        Version 3.7 patchlevel 3
        last modified Thu Dec 12 13:00:00 GMT 2002
        System: Linux 2.6.11.4-21.10-default
 
        Copyright(C) 1986 - 1993, 1998 - 2002
        Thomas Williams, Colin Kelley and many others
 
        Type `help` to access the on-line reference manual
        The gnuplot FAQ is available from
        http://www.gnuplot.info/gnuplot-faq.html
 
        Send comments and requests for help to <info-gnuplot@dartmouth.edu>
        Send bugs, suggestions and mods to <bug-gnuplot@dartmouth.edu>
 
 
Terminal type set to 'x11'
gnuplot> set style data points
gnuplot> plot "sparsity-pattern-1.gnuplot"
```

The plain program
=================

```
/* ------------------------------------------------------------------------
 *
 * SPDX-License-Identifier: LGPL-2.1-or-later
 * Copyright (C) 1999 - 2024 by the deal.II authors
 *
 * This file is part of the deal.II library.
 *
 * Part of the source code is dual licensed under Apache-2.0 WITH
 * LLVM-exception OR LGPL-2.1-or-later. Detailed license information
 * governing the source code and code contributions can be found in
 * LICENSE.md and CONTRIBUTING.md at the top level directory of deal.II.
 *
 * ------------------------------------------------------------------------
 */
 
 
#include <deal.II/grid/tria.h>
#include <deal.II/grid/grid_generator.h>
#include <deal.II/grid/grid_out.h>
 
#include <deal.II/dofs/dof_handler.h>
 
#include <deal.II/fe/fe_q.h>
#include <deal.II/dofs/dof_tools.h>
#include <deal.II/fe/mapping_q1.h>
 
#include <deal.II/lac/sparse_matrix.h>
#include <deal.II/lac/dynamic_sparsity_pattern.h>
 
#include <deal.II/dofs/dof_renumbering.h>
 
#include <fstream>
 
using namespace dealii;
 
 
 
void make_grid(Triangulation<2> &triangulation)
{
 const Point<2> center(1, 0);
 const double   inner_radius = 0.5, outer_radius = 1.0;
 GridGenerator::hyper_shell(
 triangulation, center, inner_radius, outer_radius, 5);
 
 for (unsigned int step = 0; step < 3; ++step)
    {
 for (const auto &cell : triangulation.active_cell_iterators())
        for (const auto v : cell->vertex_indices())
          {
 const double distance_from_center =
 center.distance(cell->vertex(v));
 
 if (std::fabs(distance_from_center - inner_radius) <=
                1e-6 * inner_radius)
              {
                cell->set_refine_flag();
 break;
              }
          }
 
 triangulation.execute_coarsening_and_refinement();
    }
 
  std::ofstream mesh_file("mesh.gnuplot");
 GridOut().write_gnuplot(triangulation, mesh_file);
}
 
 
 
void write_dof_locations(const DoFHandler<2> &dof_handler,
 const std::string   &filename)
{
 const std::map<types::global_dof_index, Point<2>> dof_location_map =
 DoFTools::map_dofs_to_support_points(MappingQ1<2>(), dof_handler);
 
  std::ofstream dof_location_file(filename);
 DoFTools::write_gnuplot_dof_support_point_info(dof_location_file,
                                                 dof_location_map);
}
 
 
 
void distribute_dofs(DoFHandler<2> &dof_handler)
{
 const FE_Q<2> finite_element(1);
  dof_handler.distribute_dofs(finite_element);
 
  write_dof_locations(dof_handler, "dof-locations-1.gnuplot");
 
 DynamicSparsityPattern dynamic_sparsity_pattern(dof_handler.n_dofs(),
                                                  dof_handler.n_dofs());
 
 DoFTools::make_sparsity_pattern(dof_handler, dynamic_sparsity_pattern);
 
 SparsityPattern sparsity_pattern;
  sparsity_pattern.copy_from(dynamic_sparsity_pattern);
 
  std::ofstream out("sparsity-pattern-1.svg");
  sparsity_pattern.print_svg(out);
}
 
 
 
void renumber_dofs(DoFHandler<2> &dof_handler)
{
 DoFRenumbering::Cuthill_McKee(dof_handler);
 
  write_dof_locations(dof_handler, "dof-locations-2.gnuplot");
 
 
 DynamicSparsityPattern dynamic_sparsity_pattern(dof_handler.n_dofs(),
                                                  dof_handler.n_dofs());
 DoFTools::make_sparsity_pattern(dof_handler, dynamic_sparsity_pattern);
 
 SparsityPattern sparsity_pattern;
  sparsity_pattern.copy_from(dynamic_sparsity_pattern);
 
  std::ofstream out("sparsity-pattern-2.svg");
  sparsity_pattern.print_svg(out);
}
 
 
 
 
 
int main()
{
 Triangulation<2> triangulation;
  make_grid(triangulation);
 
 DoFHandler<2> dof_handler(triangulation);
 
  distribute_dofs(dof_handler);
  renumber_dofs(dof_handler);
}
```