---
title: Template Engines
---
Here I'm investigating Rust Template Engines.

[Template engines reference](https://www.arewewebyet.org/topics/templating/)


## 1. Handlebars
Simple, optimized, not as featureful as others. Port of the js library. Most downloads.

## 2. Tera (my pick)
[Documentation](https://keats.github.io/tera/)

Most features. It isn't a port, it's autonomous.
Second in downloads behind handlebars.

Good Documentation

Examples:
- math
- statements (for-loops, if...)
- comparisons
- comments
- filters (to manipulate data from inside the template)

I decided to go with this one because I need a template system as expressive as possible.


## 3. Liquid
Less production ready, ruby port.
