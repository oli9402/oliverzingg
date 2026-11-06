---
title: "Basis and dimension"
order: 2
---

## Overview

```

flowchart TD
    A(Basis, Span <br/> Dimensions) --> B[Matrix column span]
    B-->|echelon form: <br/>columns with pivots|C[ linearly independent. <br/>Original columns basis<br/>span the column space]

```

Figure 1: A flow chart of concepts in Basis and Span

<iframe data-external="1" src="https://www.youtube.com/embed/k7RM-ot2NWY" title="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>

## Span

The **span** of two vectors $\overline v$ and $\overline w$ is the set of all linear combinations with $a*\overline v + b * \overline w$ with $a,b \in R$. So two operations are used: *vector scaling* and *vector addition*.

> [!CAUTION] Given two vectors: When can’t you reach all vectors in a plane?
> If the vectors are colinear/parallel or consists of points

## Basis

> [!NOTE]
> The set of all linear independent vectors that span a vector space. There are an infinite amount of different basis for a vector space but the number is fixed to the dimension.

## When are vectors linear independent?

### Example

$s_1*v_1 + ...+ s_3*v_3 = 0$

$$
\begin{pmatrix}

-2 & 1 & 4 & |& 0 \\
6 & 1 & -12 &|& 0 \\
1 & 1 & -2 &| & 0

\end{pmatrix}
$$

If we only have trivial solution to $s_1*v_1 + ...+ s_3*v_3 = 0$ than the vectors are linearly independent. So we solve with gaussian elimination and get the following echelon form:

$$
\begin{pmatrix}
-2 & 1 & 4 & |& 0 \\
0 & 4 & 0 & | & 0 \\
0 & 0 & 0 & | & 0
\end{pmatrix}
$$

-   we se that we have a free parameter t in the $s_3$ because there is no pivot.
-   $s_3 = t$
-   $s_2 = 0$
-   $s_1 = 2t$

Back to top
