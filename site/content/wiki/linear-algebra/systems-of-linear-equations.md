---
title: "Systems of linear equations"
order: 1
---

## Overview

```
flowchart TD
    A[Linear Equation System] --> B(Solving for unknown <br/>variables)
    B --> |Echelon Form| C[3 different types of EF<br/> consistent vs. inconsistent?]
    C -->|consistent if| D[Rank Criterion <br/> rkA = rk A,b <br/> for Ax=b]
    D --> K[Rank = #Pivots <br/> Nullity = #FREEparameter]
    A --> E[Inhomogeneous Linear System <br/> Ax=b]
    E --> F[Solution Set: Particular + <br/> Homogenous System]
    A --> G[Matrix Form <br/> Vector Form]
    A --> H[Square System]
    H --> |check with <br/> determinants| HA[invertible,regular <br/> non-singular <br/> if AX=I]
    HA --> |if no inverse|HB[singular <br/> non-invertible]
    HA --> |double-augmented <br/> matirx|HC[calculate with LSE]
    HA --> |Corollary|HE[if A and B invertible <br/> AB invertible]
    HC --> HD[if no pivot]
    HD --> HB
    H --> I[Unique Solution. <br/> Hom.S. only trivial sol]
    I --> J[except if any zero rows]
    A --> L[vectors linear independent?]
    A --> M[Linear transformation <br/> with non-standard basis <br/> and mapping rule L]
    M --> |to find:|MA[Coordinates of <br/>images vector L: v_j]
    MA --> |each image basis <br/>has own LSE|MAA[find linear combination of <br/> basis that form <br/> image of basis. <br/> Coefficients = coordinates]


```

Figure 1: A flow chart displaying for what to use linear system equations and
gaussian elimination for solving the system. Only lecture relevant use cases are mentioned.

## Connection to linear maps

-   Linear systems of equations can be described by matrices
-   Matrices can be interpreted as linear maps

## Three Types of Echelon Form (EF)

1.  Pivot element in every row and column.
    -   Squared form only possible when $r=c$
    -   Last pivot is isolated and can be substituted
    -   **unique solution**
2.  Pivot in every row but not in every column.
    -   more unknown than equations: $r<c$
    -   free parameter (the column without pivot)
    -   infinitive solutions
3.  Rows without pivot.
    -   $0=b$
        -   if $b \not= 0$ no solution since not consistent
        -   if $b = 0$ no information. We can end up with form 1 or 2.

## General Solution

Typically you have some pivots missing (in EF) and some rows with 0 = 0.

$$
\begin{aligned} -x -y + 3z &= 3\\ -y + 4z&=6 \\ 0&=0\end{aligned}
$$

You express the pivots columns with the missing pivot column (here z).

-   First we use substitution to formulate the solution for the pivot columns (x and y):

$$
\begin{aligned} y &= -6+4z \\ x&= 3 -z \\ z&=z\end{aligned}
$$

-   Now lets determine the solution set:

$$
\begin{pmatrix} x\\y\\z \end{pmatrix} =
\begin{pmatrix}3-z \\ -6+4z\\ z\end{pmatrix} =
\begin{pmatrix}3\\-6\\0  \end{pmatrix} +
\begin{pmatrix}-z \\ 4z\\1z\end{pmatrix} =
\begin{pmatrix}3\\-6\\0  \end{pmatrix} + z
\begin{pmatrix}-1\\4\\1 \end{pmatrix}
$$

 The free parameters are used to describe the kernal of a matrix using homogenous solution.

## Applied Problems: Process optimization

Many problem can be formulated as system of linear equations:

> [!NOTE] Example: Chemieproduktion
> -   Chemikalien: A,B,C
> -   Maschinen: $M_1,M_2$
> -   Menge an A,B,C in Tonnen: $x_A,x_B,x_C$
> -   Zeitbudget in Stunden: $M_1 = 65, M_2 = 110$
> -   Verhältnis in Stunden wie lang werden welche Chemikalien in den Maschinen verarbeitet werden

$$
\begin{pmatrix}
&|& A&B&C&| &Zeitbudget/h \\

M_1&|&2&1&1&|&65\\

M_2&|&2&3&4&|&110
\end{pmatrix}
$$

### Form linear system of equations

$$
\begin{align*}
2*x_A + 1*x_B + 1*x_C = 65\\
2*x_A + 3*x_B + 4*x_C = 110

\end{align*}
$$

Looking at the equation we make following observations:

-   we want to find $x_A,x_B,x_C$ that fits the equations as a solution.
-   we add the terms because the individuel maschines can’t process the chemicals in parallel so we have to add the time
-   the coefficients of the unknown show a relationship of time per ton
-   $\frac{time}{tone}*time = time$
-   we have three unknown but only 2 equations: 1 free parameter -> infinitive solutions
-   $x_A,x_B,x_C$ can only be positive since you can’t produce negative tones.

### Solving the system

Solving the linear system will end up with a general solution:

$$
\begin{align*}
x_A = \frac{85}{4} + \frac{1}{4}x_C\\
x_B =\frac{45}{2} - \frac{3}{2}x_C \\
\end{align*}
$$

and since the unknown can’t be negative we have to see for which range of $x_C$ $x_A$ and $x_B$ are not negative:

$$
\begin{align*}
x_B ≥ 0 \\
\frac{45}{2}-\frac{3}{2}x_C ≥0\\
15≥ x_C\\
\\
0≤x_C≤15
\end{align*}
$$

we can chose any tonne of $x_C$ between 0 and 15.

## Determinats

*For 2x2 squared matrices:*

$$
\begin{pmatrix}
a&b \\
c&d
\end{pmatrix}
$$

a*d - b*c

*For 3x3 squared matrices:*

Rule of Sarrus

*Other n x n cases*

bring to upper triangular matrix form by row operations and switching:

-   for each switch sign of det changes!
-   if one column with no pivot element: $det(0)$
-   if upper triangular: determinant is product of main diagonal elements

Back to top
