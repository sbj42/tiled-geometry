# Tiled Geometry

![Dependencies](https://img.shields.io/badge/dependencies-none-green.svg)
[![Node.js CI](https://github.com/sbj42/tiled-geometry/workflows/Node.js%20CI/badge.svg)](https://github.com/sbj42/tiled-geometry/actions?query=workflow%3A%22Node.js+CI%22)
[![License](https://img.shields.io/github/license/sbj42/tiled-geometry.svg)](https://github.com/sbj42/tiled-geometry)

#### Utilities for 2-D tiled geometry

This library contains several useful functions and classes for dealing with 2-D tiled geometry.

## Installation

~~~
npm install tiled-geometry
~~~

## API

Constants and utlities for 2-D tiled coordinate spaces:

* `Direction` - constants for eight compass directions
* `Turn` - constants for rotation among eight compass directions
* `CardinalDirection` - constants for four cardinal directions
* `CardinalTurn` - constants for rotation among four cardinal directions
* `CardinalDirectionFlags` - bitmask constants for four cardinal directions
* `Flip` - constants for mirroring the coordinate space
* `CardinalOrientation` - constants combining CardinalDirection and Flip
* `Axis` - constants for the two major axes

Classes for coordinates, shapes, masks, and more:

* `Offset` - a location or relative offset
* `Size` - a two-dimensional extent
* `Rectangle` - a rectangle (with offset and size)
* `Mask` - a rectangular area with boolean values for each cell
* `MaskRectangle` - a mask with an offset
* `RasterMask` - a mask encoded as "raster lines"
* `CardinalPath` - a path on the grid, moving only in the four cardinal directions
* `TransformRectangle` - maps a rectangular area onto a grid with transformations