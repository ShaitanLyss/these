| **Table of contents** | |
| --- | --- |
| 1. [Introduction](#step_1-Intro)    * [About the tutorial](#step_1-Aboutthetutorial) * [Video lectures on tutorial programs](#step_1-Videolecturesontutorialprograms) * [What this program does](#step_1-Whatthisprogramdoes) * [About scientific computing in general](#step_1-Aboutscientificcomputingingeneral)- [The commented program](#step_1-CommProg)      * [Include files](#step_1-Includefiles)* [Creating the first mesh](#step_1-Creatingthefirstmesh)* [Creating the second mesh](#step_1-Creatingthesecondmesh)* [The main function](#step_1-Themainfunction) | 1. [Results](#step_1-Results)    * [Possibilities for extensions](#step_1-Possibilitiesforextensions)       + [Use triangles](#step_1-Usetriangles) + [Different adaptive refinement strategies](#step_1-Differentadaptiverefinementstrategies) + [Different geometries](#step_1-Differentgeometries) + [Comments about programming and debugging](#step_1-Commentsaboutprogramminganddebugging) + [More about graphical output](#step_1-Moreaboutgraphicaloutput)- [The plain program](#step_1-PlainProg) |

Introduction
============

### About the tutorial

Since this is the first tutorial program, let us comment first on how this tutorial and the rest of the deal.II documentation is supposed to work. The documentation for deal.II comes essentially at three different levels:

* The tutorial: This is a collection of programs that shows how deal.II is used in practice. It doesn't typically discuss individual functions at the level of individual arguments, but rather wants to give the big picture of how things work together. In other words, it discusses "concepts": what are the building blocks of deal.II and how are they used together in finite element programs.
* The manual: This is the documentation of every single class and every single (member) function in deal.II. You get there if, for example, you click on the "Main page" or "Classes" tab at the top of this page. This is the place where you would look up what the second argument of [Triangulation::create\_triangulation()](classTriangulation.html#a5b6edd805a4d8b91d016080bf43233c1) means, to give just one example. You need this level of documentation for when you know what you want to do, but forgot how exactly the function was named, what its arguments are, or what it returns. Note that you also get into the manual whenever you read through the tutorial and click on any of the class or function names, i.e. the tutorial contains a great many links into the manual for whenever you need a more detailed description of a function or class. On the other hand, the manual is not a good place to learn deal.II since it gives you a microscopic view of things without telling you how a function might fit into the bigger picture.
* Topics: These are groups of classes and functions that work together or have related functionality. If you click on the "Topics" tab at the top of this page, you end up on a page that lists a number of such groups. Each topic discusses the underlying principles of these classes; for example, the [Sparsity patterns](group__Sparsity.html) topic talks about all sorts of different issues related to storing sparsity patterns of matrices. This is documentation at an intermediate level: they give you an overview of what's there in a particular area. For example when you wonder what finite element classes exist, you would take a look at the [Finite element space descriptions](group__fe.html) topic. The topics are, of course, also cross-linked to the manual (and, at times, to the tutorial); if you click on a class name, say on [Triangulation](classTriangulation.html), you will also at the very top right under the class name get a link to the topics this class is a member of if you want to learn more about its context.

Let's come back to the tutorial, since you are looking at the first program (or "step") of it. Each tutorial program is subdivided into the following sections:

1. **Introduction:** This is a discussion of what the program does, including the mathematical model, and what programming techniques are new compared to previous tutorial programs.
2. **The commented program:** An extensively documented listing of the source code. Here, we often document individual lines, or blocks of code, and discuss what they do, how they do it, and why. The comments frequently reference the introduction, i.e. you have to understand *what* the program wants to achieve (a goal discussed in the introduction) before you can understand *how* it intends to get there.
3. **Results:** The output of the program, with comments and interpretation. This section also frequently has a subsection that gives suggestions on how to extend the program in various direction; in the earlier programs, this is intended to give you directions for little experiments designed to make you familiar with deal.II, while in later programs it is more about how to use more advanced numerical techniques.
4. **The plain program:** The source code stripped of all comments. This is useful if you want to see the "big
   picture" of the code, since the commented version of the program has so much text in between that it is often difficult to see the entire code of a single function on the screen at once.

The tutorials are not only meant to be static documentation, but you should play with them. To this end, go to the `examples/step-1` directory (or whatever the number of the tutorial is that you're interested in) and type

```
cmake .
make
make run

```

The first command sets up the files that describe which include files this tutorial program depends on, how to compile it and how to run it. This command should find the installed deal.II libraries as well as those that were generated when you compiled and installed everything as described in the [README](../../readme.html) file. If this command should fail to find the deal.II library, then you need to provide the path to the installation using the command

```
cmake -DDEAL_II_DIR=/path/to/installed/deal.II .

```

instead.

The second of the commands above compiles the sources into an executable, while the last one executes it (strictly speaking, `make run` will also compile the code if the executable doesn't exist yet, so you could have skipped the second command if you wanted). This is all that's needed to run the code and produce the output that is discussed in the "Results" section of the tutorial programs. This sequence needs to be repeated in all of the tutorial directories you want to play with.

When learning the library, you need to play with it and see what happens. To this end, open the `examples/step-1/step-1.cc` source file with your favorite editor and modify it in some way, save it and run it as above. A few suggestions for possibly modifications are given at the end of the results section of this program, where we also provide a few links to other useful pieces of information.

### Video lectures on tutorial programs

This and several of the other tutorial programs are also discussed and demonstrated in [Wolfgang Bangerth's video lectures](http://www.math.colostate.edu/~bangerth/videos.html) on deal.II and computational science. In particular, you can see the steps he executes to run this and other programs, and you will get a much better idea of the tools that can be used to work with deal.II. In particular, lectures 2 and 4 give an overview of deal.II and of the building blocks of any finite element code. (See also [video lecture 2](https://www.math.colostate.edu/~bangerth/videos.676.2.html), [video lecture 4](https://www.math.colostate.edu/~bangerth/videos.676.4.html).)

If you are not yet familiar with using Linux and running things on the command line, you may be interested in watching lectures 2.9 and 2.91. (See also [video lecture 2.9](https://www.math.colostate.edu/~bangerth/videos.676.2.9.html), [video lecture 2.91](https://www.math.colostate.edu/~bangerth/videos.676.2.91.html).) These give overviews over the command line and on what happens when compiling programs, respectively.

Note that deal.II is actively developed, and in the course of this development we occasionally rename or deprecate functions or classes that are still referenced in these video lectures. For example, the [step-1](step_1.html) code shown in video lecture 5 uses a class HyperShellBoundary which was replaced with [SphericalManifold](classSphericalManifold.html) class later on. Additionally, as of deal.II version 9.0, [GridGenerator::hyper\_shell()](namespaceGridGenerator.html#a36a5f3b1be1d673f50d01a51a6aba6c3) now automatically attaches a [SphericalManifold](classSphericalManifold.html) to the [Triangulation](classTriangulation.html). Otherwise the rest of the lecture material is relevant.

### What this program does

Let's come back to [step-1](step_1.html), the current program. The goal of this program is to introduce you to the [Triangulation](classTriangulation.html) class that is at the core of every finite element program. The name "triangulation" in this context is mostly historical: To finite element practitioners, the terms "triangulation", "mesh", and "grid" are all synonymous and describe a subdivision of a domain on which a differential equation is posed into cells of some kind. If the domain is two-dimensional, these cells may indeed be triangles, but they could also be quadrilaterals (four-sided objects such as squares and rectangles, and their deformations). In one space dimension, the cells are line segments. In three space dimensions, they can be tetrahedra, hexahedra (deformed cubes), pyramids (a four-sided base with three triangles connecting to a point at the top), and "wedges" (two triangles at the bottom and top, connected by three quadrilaterals; wedges are often also called "(triangular) prisms", for example in [this wikipedia article about types of meshes](https://en.wikipedia.org/wiki/Types_of_mesh)). Collections of any such cells are "triangulations" in common usage of the word even though they may not actually have triangles in them. All of them are also "grids" in common usage of the word even though the usual meaning of the word "grid" would be something where the vertices are in neat rows parallel to the coordinate axes (which would then be a "structured grid" in the finite element context). In other words, whenever you read any of the three terms in the tutorials or the library's documentation, consider them equivalent.

What this program shows, then, is how to create a [Triangulation](classTriangulation.html) object, and to operate on it. The underlying concept of a [Triangulation](classTriangulation.html) is that it is a *container*, i.e., a class that stores a collection of cells\*. As is common in modern programming languages, the key operation on containers is that one can *iterate* over its elements, and that's exactly what we will do below.

Specifically, in the program we create two grids, one which is a regularly refined square (not very exciting, but a common starting grid for many problems), and one that is a more geometric attempt: a ring-shaped domain that is refined towards the inner edge. The process of refining the mesh in this way will illustrate how we iterate (i.e., loop) over the elements of the triangulation (i.e., the cells of the mesh). You will see many more such loops throughout the remainder of the tutorial. (Since there are so many loops over cells in finite element programs, the [Iterators on mesh-like containers](group__Iterators.html) topic talks about them in more detail.)

The program is otherwise small enough that it doesn't need a whole lot of introduction.

Note
:   The material presented here is also discussed in [video lecture 5](https://www.math.colostate.edu/~bangerth/videos.676.5.html), [video lecture 6](https://www.math.colostate.edu/~bangerth/videos.676.6.html). (All video lectures are also available [here](https://www.math.colostate.edu/~bangerth/videos.html).)

### About scientific computing in general

If you are reading through this tutorial program, chances are that you are interested in continuing to use deal.II for your own projects. Thus, you are about to embark on an exercise in programming using a large-scale scientific computing library. Unless you are already an experienced user of large-scale programming methods, this may be new territory for you — with all the new rules that go along with it such as the fact that you will have to deal with code written by others, that you may have to think about documenting your own code because you may not remember what exactly it is doing a year down the road (or because others will be using it as well), or coming up with ways to test that your program is doing the right thing. None of this is something that we typically train mathematicians, engineers, or scientists to do but that is important when you start writing software of more than a few hundred lines. Remember: Producing software is not the same as just writing code.

To make your life easier on this journey let us point to some resources that are worthwhile browsing through before you start any large-scale programming:

* The [deal.II FAQ](https://github.com/dealii/dealii/wiki/Frequently-Asked-Questions) has a good number of answers to questions about particular aspects of deal.II, but also to more general questions such as "How
  do I debug scientific computing codes?" or "Can I train myself to write code
  that has fewer bugs?".
* You will benefit from becoming a better programmer. An excellent resource to this end is the book [Code Complete](https://www.oreilly.com/library/view/code-complete-2nd/0735619670/) by Steve McConnell [[151]](citelist.html#CITEREF_CodeComplete) . It's already a few years old, with the last edition published in 2004, but it has lost none of its appeal as a guide to good programming practices, and some of the principal developers use it as a group reading project with every generation of their research group members. Another good programming book is [Refactoring: Improving the Design of Existing Code](https://martinfowler.com/books/refactoring.html) by Martin Fowler that is a great introduction and resource for how to continuously transform existing code to make it fit for future extension [[88]](citelist.html#CITEREF_Refactoring) .
* The [Software Carpentry project](http://software-carpentry.org/) that provides introductions to many topics that are important to dealing with software, such as version control, make files, testing, etc. It is specifically written for scientists and engineers, not for computer scientists, and has a focus on short, practical lessons.
* The [Better Scientific Software project](https://bssw.io/) has a lot of resources (and interesting blog posts) that cover many aspects of writing scientific software.
* The [IDEAS project](https://ideas-productivity.org/) also has resources on software development, in particular for parallel computing. In the "Events" section on that site are recorded tutorials and webinars that cover many interesting topics.
* An article a few of us wrote, called [I'm stuck! How to efficiently debug computational solid mechanics models so you can enjoy the beauty of simulations](https://doi.org/10.1016/j.euromechsol.2022.104845) [[65]](citelist.html#CITEREF_Comellas_2023) . This article discusses in great detail what you do if a code doesn't work. It is also available on [arXiv](https://arxiv.org/abs/2209.04198).
* An article on [Best Practices for Scientific Computing](http://arxiv.org/abs/1210.0530) that gives an introduction to many of the ways by which you can make sure you are an efficient programmer writing programs that work.

As a general recommendation: If you expect to spend more than a few days writing software in the future, do yourself the favor of learning tools that can make your life more productive, in particular debuggers and integrated development environments. (See also [video lecture 7](https://www.math.colostate.edu/~bangerth/videos.676.7.html), [video lecture 8](https://www.math.colostate.edu/~bangerth/videos.676.8.html), [video lecture 8.01](https://www.math.colostate.edu/~bangerth/videos.676.8.01.html), [video lecture 25](https://www.math.colostate.edu/~bangerth/videos.676.25.html).) You will find that you will get the time spent learning these tools back severalfold soon by being more productive! Several of the video lectures referenced above show how to use tools such as integrated development environments or debuggers.

The commented program
=====================

### Include files

The most fundamental class in the library is the [Triangulation](classTriangulation.html) class, which is declared here:

```
Â  #include <deal.II/grid/tria.h>

```

Here are some functions to generate standard grids:

```
Â  #include <deal.II/grid/grid_generator.h>

```

Output of grids in various graphics formats:

```
Â  #include <deal.II/grid/grid_out.h>
Â  

```

This is needed for C++ output:

```
Â  #include <iostream>
Â  #include <fstream>

```

And this for the declarations of the `std::sqrt` and `std::fabs` functions:

```
Â  #include <cmath>
Â  

```

The final step in importing deal.II is this: All deal.II functions and classes are in a namespace `dealii`, to make sure they don't clash with symbols from other libraries you may want to use in conjunction with deal.II. One could use these functions and classes by prefixing every use of these names by `::`, but that would quickly become cumbersome and annoying. Rather, we simply import the entire deal.II namespace for general use:

```
Â  using namespace dealii;
Â  


```

### Creating the first mesh

In the following, first function, we simply use the unit square as domain and produce a globally refined grid from it.

```
Â  void first_grid()
Â  {

```

The first thing to do is to define an object for a triangulation of a two-dimensional domain:

```
Â    Triangulation<2> triangulation;



```

Here and in many following cases, the string "<2>" after a class name indicates that this is an object that shall work in two space dimensions. Likewise, there are versions of the triangulation class that are working in one ("<1>") and three ("<3>") space dimensions. The way this works is through some template magic that we will investigate in some more detail in later example programs; there, we will also see how to write programs in an essentially dimension independent way.

Next, we want to fill the triangulation with a single cell for a square domain. The triangulation is the refined four times, to yield \(4^4=256\) cells in total:

```
Â    GridGenerator::hyper_cube(triangulation);
Â    triangulation.refine_global(4);
Â  



```

Now we want to write a graphical representation of the mesh to an output file. The [GridOut](classGridOut.html) class of deal.II can do that in a number of different output formats; here, we choose scalable vector graphics (SVG) format that you can visualize using the web browser of your choice:

```
Â    std::ofstream out("grid-1.svg");
Â    GridOut       grid_out;
Â    grid_out.write_svg(triangulation, out);
Â    std::cout << "Grid written to grid-1.svg" << std::endl;
Â  }
Â  
Â  
Â  



```

### Creating the second mesh

The grid in the following, second function is slightly more complicated in that we use a ring domain and refine the result once globally.

```
Â  void second_grid()
Â  {

```

We start again by defining an object for a triangulation of a two-dimensional domain:

```
Â    Triangulation<2> triangulation;
Â  

```

We then fill it with a ring domain. The center of the ring shall be the point (1,0), and inner and outer radius shall be 0.5 and 1. The number of circumferential cells could be adjusted automatically by this function, but we choose to set it explicitly to 10 as the last argument:

```
Â    const Point<2> center(1, 0);
Â    const double   inner_radius = 0.5, outer_radius = 1.0;
Â    GridGenerator::hyper_shell(
Â      triangulation, center, inner_radius, outer_radius, 10);




```

By default, the triangulation assumes that all boundaries are straight lines, and all cells are bi-linear quads or tri-linear hexes, and that they are defined by the cells of the coarse grid (which we just created). Unless we do something special, when new points need to be introduced the domain is assumed to be delineated by the straight lines of the coarse mesh, and new points will simply be in the middle of the surrounding ones. Here, however, we know that the domain is curved, and we would like to have the [Triangulation](classTriangulation.html) place new points according to the underlying geometry. Fortunately, some good soul implemented an object which describes a spherical domain, of which the ring is a section; it only needs the center of the ring and automatically figures out how to instruct the [Triangulation](classTriangulation.html) where to place the new points. The way this works in deal.II is that you tag parts of the triangulation you want to be curved with a number that is usually referred to as "manifold indicator" and then tell the triangulation to use a particular "manifold object" for all places with this manifold indicator. How exactly this works is not important at this point (you can read up on it in [step-53](step_53.html) and [Manifold description for triangulations](group__manifold.html)). The functions in [GridGenerator](namespaceGridGenerator.html) handle this for us in most circumstances: they attach the correct manifold to a domain so that when the triangulation is refined new cells are placed in the correct places. In the present case [GridGenerator::hyper\_shell](namespaceGridGenerator.html#a36a5f3b1be1d673f50d01a51a6aba6c3) attaches a [SphericalManifold](classSphericalManifold.html) to all cells: this causes cells to be refined with calculations in spherical coordinates (so new cells have edges that are either radial or lie along concentric circles around the origin).

By default (i.e., for a [Triangulation](classTriangulation.html) created by hand or without a call to a [GridGenerator](namespaceGridGenerator.html) function like [GridGenerator::hyper\_shell](namespaceGridGenerator.html#a36a5f3b1be1d673f50d01a51a6aba6c3) or [GridGenerator::hyper\_ball](namespaceGridGenerator.html#a533c4778cbc9bcbed365dcab42ca4418)), all cells and faces of the [Triangulation](classTriangulation.html) have their manifold\_id set to [numbers::flat\_manifold\_id](namespacenumbers.html#a9c39a5de95e4d11173378431dc2131fe), which is the default if you want a manifold that produces straight edges, but you can change this number for individual cells and faces. In that case, the curved manifold thus associated with number zero will not apply to those parts with a non-zero manifold indicator, but other manifold description objects can be associated with those non-zero indicators. If no manifold description is associated with a particular manifold indicator, a manifold that produces straight edges is implied. ([Manifold](classManifold.html) indicators are a slightly complicated topic; if you're confused about what exactly is happening here, you may want to look at the [glossary entry on this topic](DEALGlossary.html#GlossManifoldIndicator).) Since the default chosen by [GridGenerator::hyper\_shell](namespaceGridGenerator.html#a36a5f3b1be1d673f50d01a51a6aba6c3) is reasonable we leave things alone.

In order to demonstrate how to write a loop over all cells, we will refine the grid in five steps towards the inner circle of the domain:

```
Â    for (unsigned int step = 0; step < 5; ++step)
Â      {

```

Next, we need to loop over the active cells of the triangulation. You can think of a triangulation as a collection of cells. If it were an array, you would just get a pointer that you increment from one element to the next using the operator `++`. The cells of a triangulation aren't stored as a simple array, but the concept of an *iterator* generalizes how pointers work to arbitrary collections of objects (see [wikipedia](http://en.wikipedia.org/wiki/Iterator#C.2B.2B) for more information). Typically, any container type in C++ will return an iterator pointing to the start of the collection with a method called `begin`, and an iterator point to 1 past the end of the collection with a method called `end`. We can increment an iterator `it` with the operator `++it`, dereference it to get the underlying data with `*it`, and check to see if we're done by comparing `it != collection.end()`.

The second important piece is that we only need the active cells. Active cells are those that are not further refined, and the only ones that can be marked for further refinement. deal.II provides iterator categories that allow us to iterate over *all* cells (including the parent cells of active ones) or only over the active cells. Because we want the latter, we need to call the method [Triangulation::active\_cell\_iterators()](group__CPP11.html#ga9bd9f259f5b6c617c9ed88aa8b140ee8).

Putting all of this together, we can loop over all the active cells of a triangulation with

```
for (auto it = triangulation.active_cell_iterators().begin();
     it != triangulation.active_cell_iterators().end();
     ++it)
  {
 auto cell = *it;
 // Then a miracle occurs...
  }


```

In the initializer of this loop, we've used the `auto` keyword for the type of the iterator `it`. The `auto` keyword means that the type of the object being declared will be inferred from the context. This keyword is useful when the actual type names are long or possibly even redundant. If you're unsure of what the type is and want to look up what operations the result supports, you can go to the documentation for the method [Triangulation::active\_cell\_iterators()](group__CPP11.html#ga9bd9f259f5b6c617c9ed88aa8b140ee8). In this case, the type of `it` is `Triangulation::active_cell_iterator`.

While the `auto` keyword can save us from having to type out long names of data types, we still have to type a lot of redundant declarations about the start and end iterator and how to increment it. Instead of doing that, we'll use [range- based for loops](http://en.cppreference.com/w/cpp/language/range-for), which wrap up all of the syntax shown above into a much shorter form:

```
Â        for (const auto &cell : triangulation.active_cell_iterators())
Â          {

```

Note
:   See [Iterators on mesh-like containers](group__Iterators.html) for more information about the iterator classes used in deal.II, and [deal.II and Modern C++ standards](group__CPP11.html) for more information about range-based for loops and the `auto` keyword.

Next, we loop over all vertices of the cells. For that purpose we query an iterator over the vertex indices (in 2d, this is an array that contains the elements `{0,1,2,3}`, but since `cell->vertex_indices()` knows the dimension the cell lives in, the array so returned is correct in all dimensions and this enables this code to be correct whether we run it in 2d or 3d, i.e., it enables "dimension-independent programming" – a big part of what we will discuss in [step-4](step_4.html)).

```
Â            for (const auto v : cell->vertex_indices())
Â              {


```

If this cell is at the inner boundary, then at least one of its vertices must sit on the inner ring and therefore have a radial distance from the center of exactly 0.5, up to floating point accuracy. So we compute this distance, and if we find a vertex with this property, we flag this cell for later refinement. We can then also break the loop over all vertices and move on to the next cell.

Because the distance from the center is computed as a floating point number, we have to expect that whatever we compute is only accurate to within [round-off](https://en.wikipedia.org/wiki/Round-off_error). As a consequence, we can never expect to compare the distance with the inner radius by equality: A statement such as `if (distance_from_center == inner_radius)` will fail unless we get exceptionally lucky. Rather, we need to do this comparison with a certain tolerance, and the usual way to do this is to write it as `if (std::abs(distance_from_center - inner_radius) <= tolerance)` where `tolerance` is some small number larger than round-off. The question is how to choose it: We could just pick, say, `1e-10`, but this is only appropriate if the objects we compare are of size one. If we had created a mesh with cells of size `1e+10`, then `1e-10` would be far lower than round-off and, as before, the comparison will only succeed if we get exceptionally lucky. Rather, it is almost always useful to make the tolerance *relative* to a typical "scale" of the objects being compared. Here, the "scale" would be the inner radius, or maybe the diameter of cells. We choose the former and set the tolerance equal to \(10^{-6}\) times the inner radius of the annulus.

```
Â                const double distance_from_center =
Â                  center.distance(cell->vertex(v));
Â  
Â                if (std::fabs(distance_from_center - inner_radius) <=
Â                    1e-6 * inner_radius)
Â                  {
Â                    cell->set_refine_flag();
Â                    break;
Â                  }
Â              }
Â          }
Â  


```

Now that we have marked all the cells that we want refined, we let the triangulation actually do this refinement. The function that does so owes its long name to the fact that one can also mark cells for coarsening, and the function does coarsening and refinement all at once:

```
Â        triangulation.execute_coarsening_and_refinement();
Â      }
Â  
Â  


```

Finally, after these five iterations of refinement, we want to again write the resulting mesh to a file, again in SVG format. This works just as above:

```
Â    std::ofstream out("grid-2.svg");
Â    GridOut       grid_out;
Â    grid_out.write_svg(triangulation, out);
Â  
Â    std::cout << "Grid written to grid-2.svg" << std::endl;
Â  }
Â  
Â  
Â  

```

### The main function

Finally, the main function. There isn't much to do here, only to call the two subfunctions, which produce the two grids.

```
Â  int main()
Â  {
Â    first_grid();
Â    second_grid();
Â  }

```

Results
=======

Running the program produces graphics of two grids (grid-1.svg and grid-2.svg). You can open these with most every web browser – in the simplest case, just open the current directory in your file system explorer and click on the file. If you like working on the command line, you call your web browser with the file: `firefox grid-1.svg`, `google-chrome grid-1.svg`, or whatever the name of your browser is. If you do this, the two meshes should look like this:

|  |  |
| --- | --- |
|  |  |

The left one, well, is not very exciting. The right one is — at least — unconventional. The pictures color-code the "refinement level" of each cell: How many times did a coarse mesh cell have to be subdivided to obtain the given cell. In the left image, this is boring since the mesh was refined globally a number of times, i.e., *every* cell was refined the same number of times.

(While the second mesh is entirely artificial and made-up, and certainly not very practical in applications, to everyone's surprise it has found its way into the literature: see [[157]](citelist.html#CITEREF_Mu05). Apparently it is good for some things at least.)

### Possibilities for extensions

#### Use triangles

For the first 20 or so years of its existence, deal.II only supported hypercube elements (i.e., quadrilaterals in 2d, and hexahedra in 3d). It now also supports triangles in 2d; and tetrahedra, pyramids, and wedges in 3d. A consequence of this history is that nearly all of the tutorial programs you will see exclusively use quadrilaterals and hexahedra, and you may be forgiven that that is all that's supported. But you can try out other types of cells yourself here already. For example, here are two ideas:

* You could create a triangular triangulation meshing a triangular domain. To do this, you would replace the call to `GridGenerator::hyper_cube(triangulation);` in the `first_grid()` function by `GridGenerator::reference_cell(triangulation,
  ReferenceCells::Triangle);`. This will give you the following output in `grid-1.svg`: ![](images/steps/developer/step-1.grid-1-triangle.png)
* You can start with a quadrilateral mesh and convert it to a triangular mesh. For example, in the `first_grid()` function, replace the code

  ```
  Triangulation<2> triangulation;
  GridGenerator::hyper_cube(triangulation);

  ```

  by the following, which first creates a temporary mesh `triangulation_quad` consisting of quadrilaterals, and then converts it into the `triangulation` object that then only consists of triangles:

  ```
  Triangulation<2> triangulation_quad;
  GridGenerator::hyper_cube(triangulation_quad);
  Triangulation<2> triangulation;
  GridGenerator::convert_hypercube_to_simplex_mesh (triangulation_quad,
   triangulation);


  ```

  This produces the following mesh: ![](images/steps/developer/step-1.grid-1-triangle-2.png)

  You can do the same in the `second_grid()` function by replacing

  ```
  Triangulation<2> triangulation;
   
  const Point<2> center(1, 0);
  const double   inner_radius = 0.5, outer_radius = 1.0;
  GridGenerator::hyper_shell(
   triangulation, center, inner_radius, outer_radius, 10);

  ```

  by the following (that includes some magic at the bottom we're perhaps not quite ready to explain in detail yet, but that is mentioned in the documentation of [GridGenerator::convert\_hypercube\_to\_simplex\_mesh()](namespaceGridGenerator.html#ac7515d2b17c025dddc0e37286fb8d216)):

  ```
  Triangulation<2> triangulation_quad;
   
  const Point<2> center(1, 0);
  const double   inner_radius = 0.5, outer_radius = 1.0;
  GridGenerator::hyper_shell(
    triangulation_quad, center, inner_radius, outer_radius, 10);
   
  Triangulation<2> triangulation;
  GridGenerator::convert_hypercube_to_simplex_mesh (triangulation_quad,
   triangulation);
  for (const auto i : triangulation_quad.get_manifold_ids())
    if (i != numbers::flat_manifold_id)
   triangulation.set_manifold(i, triangulation_quad.get_manifold(i));


  ```

  This results in this picture: This produces the following mesh: ![](images/steps/developer/step-1.grid-2-triangle.png)

#### Different adaptive refinement strategies

This program obviously does not have a whole lot of functionality, but in particular the `second_grid` function has a bunch of places where you can play with it. For example, you could modify the criterion by which we decide which cells to refine. An example would be to change the condition to this:

```
for (auto &cell: triangulation.active_cell_iterators())
  if (cell->center()[1] > 0)
    cell->set_refine_flag ();

```

This would refine all cells for which the \(y\)-coordinate of the cell's center is greater than zero (the `TriaAccessor::center` function that we call by dereferencing the `cell` iterator returns a [Point<2>](classPoint.html) object; subscripting `[0]` would give the \(x\)-coordinate, subscripting `[1]` the \(y\)-coordinate). By looking at the functions that [TriaAccessor](classTriaAccessor.html) provides, you can also use more complicated criteria for refinement.

In general, what you can do with operations of the form `cell->something()` is a bit difficult to find in the documentation because `cell` is not a pointer but an iterator. The functions you can call on a cell can be found in the documentation of the classes `TriaAccessor` (which has functions that can also be called on faces of cells or, more generally, all sorts of geometric objects that appear in a triangulation), and `CellAccessor` (which adds a few functions that are specific to *cells*).

A more thorough description of the whole iterator concept can be found in the [Iterators on mesh-like containers](group__Iterators.html) documentation topic.

#### Different geometries

Another possibility would be to generate meshes of entirely different geometries altogether. While for complex geometries there is no way around using meshes obtained from mesh generators, there is a good number of geometries for which deal.II can create meshes using the functions in the [GridGenerator](namespaceGridGenerator.html) namespace. Many of these geometries (such as the one used in this example program) contain cells with curved faces: put another way, we expect the new vertices placed on the boundary to lie along a circle. deal.II handles complex geometries with the [Manifold](classManifold.html) class (and classes inheriting from it); in particular, the functions in [GridGenerator](namespaceGridGenerator.html) corresponding to non-Cartesian grids (such as [GridGenerator::hyper\_shell](namespaceGridGenerator.html#a36a5f3b1be1d673f50d01a51a6aba6c3) or [GridGenerator::truncated\_cone](namespaceGridGenerator.html#ae63c93351f77276c20de07c91d3c1e48)) attach a [Manifold](classManifold.html) object to the part of the triangulation that should be curved ([SphericalManifold](classSphericalManifold.html) and [CylindricalManifold](classCylindricalManifold.html), respectively) and use another manifold on the parts that should be flat ([FlatManifold](classFlatManifold.html)). See the documentation of [Manifold](classManifold.html) or the [manifold topic](group__manifold.html) for descriptions of the design philosophy and interfaces of these classes. Take a look at what they provide and see how they could be used in a program like this.

We also discuss a variety of other ways to create and manipulate meshes (and describe the process of attaching [Manifolds](namespaceManifolds.html)) in [step-49](step_49.html).

#### Comments about programming and debugging

We close with a comment about modifying or writing programs with deal.II in general. When you start working with tutorial programs or your own applications, you will find that mistakes happen: your program will contain code that either aborts the program right away or bugs that simply lead to wrong results. In either case, you will find it extremely helpful to know how to work with a debugger: you may get by for a while by just putting debug output into your program, compiling it, and running it, but ultimately finding bugs with a debugger is much faster, much more convenient, and more reliable because you don't have to recompile the program all the time and because you can inspect the values of variables and how they change.

Rather than postponing learning how to use a debugger till you really can't see any other way to find a bug, here's the one piece of advice we will provide in this program: learn how to use a debugger as soon as possible. It will be time well invested. (See also [video lecture 25](https://www.math.colostate.edu/~bangerth/videos.676.25.html).) The deal.II Frequently Asked Questions (FAQ) page linked to from the top-level [deal.II webpage](http://www.dealii.org/) also provides a good number of hints on debugging deal.II programs.

#### More about graphical output

It is often useful to include meshes into your theses or publications. For this, it may not be very useful to color-code the cells by refinement level, and to print the cell number onto each cell. But it doesn't have to be that way – the [GridOut](classGridOut.html) class allows setting flags for each possible output format (see the classes in the [GridOutFlags](namespaceGridOutFlags.html) namespace) that control how exactly a mesh is plotted. You can of course also choose other output file formats such as VTK or VTU; this is particularly useful for 3d meshes where a 2d format such as SVG is not particular useful because it fixes a particular viewpoint onto the 3d object. As a consequence, you might want to explore other options in the [GridOut](classGridOut.html) class.

The plain program
=================

```
/* ------------------------------------------------------------------------
 *
 * SPDX-License-Identifier: LGPL-2.1-or-later
 * Copyright (C) 1999 - 2023 by the deal.II authors
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
 
#include <iostream>
#include <fstream>
#include <cmath>
 
using namespace dealii;
 
 
void first_grid()
{
 Triangulation<2> triangulation;
 
 GridGenerator::hyper_cube(triangulation);
 triangulation.refine_global(4);
 
  std::ofstream out("grid-1.svg");
 GridOut       grid_out;
  grid_out.write_svg(triangulation, out);
  std::cout << "Grid written to grid-1.svg" << std::endl;
}
 
 
 
 
void second_grid()
{
 Triangulation<2> triangulation;
 
 const Point<2> center(1, 0);
 const double   inner_radius = 0.5, outer_radius = 1.0;
 GridGenerator::hyper_shell(
 triangulation, center, inner_radius, outer_radius, 10);
 for (unsigned int step = 0; step < 5; ++step)
    {
 for (const auto &cell : triangulation.active_cell_iterators())
        {
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
        }
 
 triangulation.execute_coarsening_and_refinement();
    }
 
 
  std::ofstream out("grid-2.svg");
 GridOut       grid_out;
  grid_out.write_svg(triangulation, out);
 
  std::cout << "Grid written to grid-2.svg" << std::endl;
}
 
 
 
 
int main()
{
  first_grid();
  second_grid();
}




```