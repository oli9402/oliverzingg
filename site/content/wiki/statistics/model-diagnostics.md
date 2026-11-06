---
title: "Model diagnostics"
order: 3
format: "html"
---
<section id="visual-inspection" class="level1">

<section id="residuals-vs-fitted" class="level2">
<h2 class="anchored" data-anchor-id="residuals-vs-fitted">Residuals vs Fitted</h2>
<ul>
<li>Shows whether residuals have non-linear patterns.</li>
<li>Equal spread of residual around horizontal line without distinct patters indication of non-linear relationship</li>
</ul>
</section>
<section id="q-q-plot" class="level2">
<h2 class="anchored" data-anchor-id="q-q-plot">Q-Q Plot</h2>
<ul>
<li>Shows residuals are normally distributed</li>
</ul>
</section>
<section id="scale-location-plot" class="level2">
<h2 class="anchored" data-anchor-id="scale-location-plot">Scale-Location Plot</h2>
<ul>
<li>Residuals spread eqaully along the ranges of predictors (homoscedasticity)</li>
<li>Horizontal line with equally randomly spread points</li>
</ul>
</section>
<section id="residuals-vs-leverage" class="level2">
<h2 class="anchored" data-anchor-id="residuals-vs-leverage">Residuals vs Leverage</h2>
<ul>
<li>This plot helps us to find influential cases (i.e., subjects) if there are any.</li>
<li>We watch out for outlying values at the upper right corner or at the lower right corner. Those spots are the places where cases can be influential against a regression line. Look for cases outside of the dashed lines. When cases are outside of the dashed lines (meaning they have high “Cook’s distance” scores), the cases are influential to the regression results. The regression results will be altered if we exclude those cases.</li>
</ul>

</section>
</section>

<a onclick="window.scrollTo(0, 0); return false;" role="button" id="quarto-back-to-top"><i class="bi bi-arrow-up"></i> Back to top</a>
