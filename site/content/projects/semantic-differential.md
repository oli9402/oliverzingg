---
title: "Visualising semantic differential scales"
summary: "Plotting User Experience Questionnaire results, where people rate a product between pairs of opposite adjectives."
year: 2024
kind: "Visualisation"
tags: ["UX research", "Survey data", "ggplot2"]
order: 7
cover: "/media/projects/semantic-differential/sem_dif2.svg"
format: "html"
---
<section id="user-experience" class="level1">

<p>A common way to test user experience of a product of app is to use semantic difference scales where adjectives of for example opposite meaning are placed compared. The customer must chose to what degree one of the certain adjectives is more suited.</p>
<section id="example" class="level2">
<h2 class="anchored" data-anchor-id="example">Example</h2>
<p><a href="https://www.ueq-online.org" target="_blank" rel="noopener">User Experience Questionnaire</a> is a typical questionnaire used for this purpose.</p>
<blockquote class="blockquote">
<p>Laugwitz, B., Held, T., &amp; Schrepp, M. (2008). Construction and evaluation of a user experience questionnaire. In HCI and Usability for Education and &gt;Work: 4th Symposium of the Workgroup Human-Computer Interaction and Usability Engineering of the Austrian Computer Society, USAB 2008, Graz, Austria, &gt;November 20-21, 2008. Proceedings 4 (pp.&nbsp;63-76). Springer Berlin Heidelberg.</p>
</blockquote>
<div class="quarto-figure quarto-figure-center">
<figure class="figure">
<p><img src="/media/projects/semantic-differential/sem.png" loading="lazy"></p>
<figcaption>Example Questionnaire: UEQ</figcaption>
</figure>
</div>
</section>
<section id="visualization-using-ggplot2" class="level2">
<h2 class="anchored" data-anchor-id="visualization-using-ggplot2">Visualization using ggplot2</h2>
<div class="quarto-figure quarto-figure-center">
<figure class="figure">
<p><img src="/media/projects/semantic-differential/sem_dif2.svg" loading="lazy"></p>
<figcaption>Semantic Difference with 95% Confidence intervalls</figcaption>
</figure>
</div>
<p><a href="https://github.com/oli9402/visualisation/tree/main/semantic_diff" target="_blank" rel="noopener">Code here</a></p>

</section>
</section>

<a onclick="window.scrollTo(0, 0); return false;" role="button" id="quarto-back-to-top"><i class="bi bi-arrow-up"></i> Back to top</a>
