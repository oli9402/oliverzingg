---
title: "Eigenvalues and eigenvectors"
order: 4
---

Some vectors remain on their span after transformation. Because of linear transformation any vector on that same span remains on that span. These vectors are the eigenvalues with corresponding eigenvalues (scalar).

Since linear transformation of an eigenvector $\overline v$ just scales it, it follows:

$$
A \overline v = \lambda \overline v
= (\lambda I) \overline v
= (A-\lambda I)\overline v = \overline 0
$$

 This expression is always true for $\overline v = 0$ but this is not allowed. So the only way a multiplication of a matrix with a non-zero vector to be zero is with $det(A-\lambda I)=0$. Transformation associated with that matrix squishes space into a lower dimension? (chapter 5/6)

> [!NOTE]
> Find a value of lambda so that the determinant is zero

*Exmaple*

$$
\begin{pmatrix}
3-\lambda & 1 \\
0 & 2-\lambda
\end{pmatrix}
= (3-\lambda)(2-\lambda) = 0
$$

 After finding eigenvalue, we need eigenvectors associated with eigenvalue ($\lambda = 2 \space or \space \lambda = 3$)

-   Change matrix A and solve linear system for 0 (homogeneous)

### Rotation don’t have Eigenvalues

$$
\begin{pmatrix}
0& -1 \\
1 & 0
\end{pmatrix}
$$

### Shear

Fixes $î$ and moves $\hat j$ one over

$$
\begin{pmatrix}
1& 1 \\
0 & 1
\end{pmatrix}
$$

 Only eigenvector are all vectors on $î$ with eigenvalue 1.

### Scaled matrices

$$
\begin{pmatrix}
2& 0 \\
0 & 2
\end{pmatrix}
$$

 All vectors are eigenvectors with eigenvalue 2.

### Diagonal matrix

All basis are eigenvectors with the values being their eigenvalues (here: 2 and 2)

### Rectabgular matrices

Cant have eigenvalues because not diagonizable

#### Is vector an eigenvector of matrix B?

check with: $Matrix*vector = scaled \space vector$

$$
\begin{pmatrix}
    1& 1 \\
    1 & 1
\end{pmatrix} *
\begin{pmatrix}
    1 \\
    1
\end{pmatrix}=
\begin{pmatrix}
    2 \\
    2
\end{pmatrix}=2*
\begin{pmatrix}
    1 \\
    1
\end{pmatrix} =2v
$$

 So $v$ is an eigenvector with eigenvalue of 2, since transformation only scales v.

The associated eigenspace is the solution set of the linear system $B-2I_2=0$.

$$
B-2I_2=
\begin{pmatrix}
    1& 1 \\
    1 & 1
\end{pmatrix} -2*
\begin{pmatrix}
    1& 0 \\
    0 & 1
\end{pmatrix}=
\begin{pmatrix}
    -1& 1 \\
    1 & -1
\end{pmatrix}
$$

 We solve the linear system and the resulting solution set is the eigenspace of the eigenvalue 2.

**But how to find all eigenvalues?**

The following must be true $det(A-\lambda I_n)= 0$

> [!NOTE]
> At most n eigenvalues

Solve: $det(A-\lambda I_n)= (1-\lambda)^2 = \lambda^2-2\lambda = \lambda(\lambda-2)=0$

The two eigenvalues are 2 and 0, now solve both linear systems with eigenvalues

**Eigenvalues Upper triangular matrices?**

$$
\begin{pmatrix}
    2-\lambda& 2&0 \\
    0 & \frac{3}{4}-\lambda & 5 \\
    0&0&-3-\lambda
\end{pmatrix} = (2-\lambda)(\frac{3}{4}-\lambda)(-3-\lambda)
$$

 Eigenvalues: $2,\frac{3}{4},-3$, this works for all upper matrices. Eigenvalues are its diagonal entries.

**quadratic formular**

$$
x_{1,2} = \frac{-b \pm \sqrt(b^2-4ac)}{2a}
$$

## Diagonalizable

Diagonal matrices have nice properties so it’s convenient to describe a linear mapping by a diagonal matrix.

$$
\begin{pmatrix}
a & 0 \\
0 & d
\end{pmatrix}
$$

Desribes the scaling by factor a in $x_1$ direction and by factor d in $x_2$\-direction. If a or d is negative then this reflects a reflection.

> [!NOTE]
> We want to find new basis (not zero-vector) for which the new linear mapping matrix D is diagonal. Thus reflecting a simple scalar multiple of the new basis. These new basis are call *eigenvectors* and the scalars (can be zero) are called *eigenvalues* of the original matrix L.
>
> **Only for (n x n) matrices: domain and codomain coincide**

Linear Mapping that use rotations don’t have eigenvectors

## Eigenspace

Eigenspace L is a subspace of $R^n$ associated to the eigenvalue. Since an eigenvalue has infinite eigenvectors associated with the same eigenvalue.

## Determination of Eigenvalues and Eigenvectors

$$
\begin{pmatrix}
1 & 1 \\
1 & 1
\end{pmatrix}
$$

> [!NOTE]
> The eigenvalues of a square matrix A are the zeros of the characteristic polynomial $p_A(\lambda)$. (n x n)-matrix has at most n eigenvalues

## Eigendecompostion

Sometimes it is very useful to write a matrix 𝐴 as a product of other matrices, say

$A=PDP^{-1}$

such a matrix is called a matrix **dececomposition** of matrix A. This holds for a linear map described by A and D w.r.t different bases. Goal is to find basis for which matrix D is a **diagonal matrix**. The matrix $P$ is called **transformation matrix**. The *process* of obtaining $P$ and $D$ is called **diagonalization**.

-   $D$ is composed of eigenvalues of $A$
-   $P$ is composed of eigenvectors of $A$ and are not unique

Back to top
