---
title: "Model diagnostics"
order: 3
---

## Residuals vs Fitted

-   Shows whether residuals have non-linear patterns.
-   Equal spread of residual around horizontal line without distinct patters indication of non-linear relationship

## Q-Q Plot

-   Shows residuals are normally distributed

## Scale-Location Plot

-   Residuals spread eqaully along the ranges of predictors (homoscedasticity)
-   Horizontal line with equally randomly spread points

## Residuals vs Leverage

-   This plot helps us to find influential cases (i.e., subjects) if there are any.
-   We watch out for outlying values at the upper right corner or at the lower right corner. Those spots are the places where cases can be influential against a regression line. Look for cases outside of the dashed lines. When cases are outside of the dashed lines (meaning they have high “Cook’s distance” scores), the cases are influential to the regression results. The regression results will be altered if we exclude those cases.

Back to top
