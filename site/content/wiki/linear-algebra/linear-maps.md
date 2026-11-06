---
title: "Linear maps"
order: 3
---

## Overview

```

flowchart TD
    A(Linear Maps <br/> linear transformation) --> D[Domain,Codomain]

    A --> B[Mapping Rule: L]
    B --> BA[Linear mapping?]
    BA --> |check with|BAA[Linearity rules]
    BA --> |quick check|BAB[Zero vector <br/>L0=0]

    B --> BB[Matrix w.r.t. <br/> Standard Basis]
    B --> BC[Matrix w.r.t. <br/>Non-Standard Basis]
    BC --> |how to <br/>calculate map S <br/> w.r.t. basis:|BCA[Image of Basis <br/> using L]
    BCA --> |use decomposition <br/> or LSE|BCB[to find coordinates. <br/> coefficients = coordinate. <br/> linear combination]
    BCB --> |use coordinates <br/> vectors for|BCBA[Map S w.r.t <br/> new basis and insight <br/>about linear transformation]

    B --> BD[Invertible Mapping]
    BD --> |only possible <br/> if same dimension|BDA[inverse map of L: L^-1 <br/> = is unique and linear]
    BDA --> |every reflection <br/>is invertibale|BDAA[L = L <br/> self-inverse]
    BDA --> |if 2 x 2 matrix|BDAB[Use formular below]

    A --> C[Affine Linear Maps]
    C --> |Linear + shift|CA[Linear map + <br/>displacement vector w <br/> every linear map is <br/>affine map with w = 0 ]
    CA --> |Image of zero vector|CB[displacement vector]
    CA --> |used for example|CC[rotation around point other than origin]


```

Figure 1: A flow chart of concepts in linear maps

### Python for calculating Coordinates

Press on triangle to show Code.

```python
import numpy as np
import scipy.linalg as la

A = np.array([
  [-3,2,2],
  [-3,1,3],
  [-1,2,0]
  ])

#-----------Example first vector-------#
v_1 = np.array([
  [2],
  [1],
  [2]
])

#---------Calculate Image of basis v_1---#
r_1 = A@v_1

#--------After repeating for all basis--#
S = np.hstack([v_1, v_2, v_3])
#' This gives us the coefficient matrix that is used as
#' LSE to calculate coordinates

#-------Solve each system----- #

#LSE of image of v_1
a_1 = la.solve(S, r_1)

#--------Final Matrix------#
B = np.hstack([a_1, a_2, a_3])
```

### Mapping

What matrix size do we need if we want to map $\mathbb{R}^2\rightarrow \mathbb{R}^3$?

-   we would need a (3 x 2) matrix

### Inverse of 2 x 2 Matrix

$A^{-1} = \frac{1}{ad-bc}*\begin{pmatrix}d & -b \\ -c & a\end{pmatrix}$

The denominator is the determinant of A.

### Excerise 4.4

Back to top
