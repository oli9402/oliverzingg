---
title: "Visualising Likert scales"
summary: "Diverging bar plots that make positive and negative opinions in survey data readable at a glance."
year: 2024
kind: "Visualisation"
tags: ["Survey data", "ggplot2"]
order: 4
cover: "/media/projects/likert-scales/likert001.png"
format: "html"
---
<section id="diverging-bar-plot" class="level1">

<div class="quarto-figure quarto-figure-center">
<figure class="figure">
<p><img src="/media/projects/likert-scales/likert001.png" loading="lazy"></p>
<figcaption>Diverging Bar plot</figcaption>
</figure>
</div>
<p>Of course the magic happens in ggplot2.</p>
<p>Likert scales are a very typical way of gathering the opinion of a sample of customers or population. One way of visualizing the results of such survey in a fast way are: <strong>diverging bar plots</strong></p>
<section id="when-to-use" class="level2">
<h3 class="anchored" data-anchor-id="when-to-use">When to use?</h3>
<p>This kind of plot is useful if the main interest is the difference in size between positive and negative response. But if the main interest is to compare all opinions with each other then diverging bar plots may be the wrong choice since stacked bars with different starting points are difficult to compare visually.</p>
</section>
<section id="code" class="level2">
<h3 class="anchored" data-anchor-id="code">Code</h3>
<p>See <a href="https://github.com/oli9402/visualisation/blob/main/likert_plots/likert_vis.qmd" target="_blank" rel="noopener">github</a></p>
</section>
</section>
<section id="second-version" class="level1">
<h2>Second version</h2>
<p><img src="https://github.com/oli9402/visualisation/blob/main/likert_plots/output_images/likert_quote.svg"></p>
<div class="quarto-figure quarto-figure-center">
<figure class="figure">
<p><img src="https://github.com/oli9402/visualisation/blob/main/likert_plots/output_images/likert_quote.svg" class="img-fluid figure-img"></p>
<figcaption>Image Caption</figcaption>
</figure>
</div>

</section>

<a onclick="window.scrollTo(0, 0); return false;" role="button" id="quarto-back-to-top"><i class="bi bi-arrow-up"></i> Back to top</a>
