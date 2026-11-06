---
title: "Confidence intervals by simulation"
summary: "Simulating repeated samples of voters to show what a 95% confidence interval does and does not promise."
year: 2023
kind: "Statistics"
tags: ["Simulation", "Inference", "R"]
order: 9
cover: "/media/projects/confidence-intervals/ci.png"
format: "html"
---
<ul>
<li>Full credit goes to: https://www.kaggle.com/code/hamelg/intro-to-r-part-23-confidence-intervals/notebook</li>
<li>My contribution is only adding comments to learn from this code as much as possible</li>
<li>More on confidence intervals can be found here <span class="citation" data-cites="hoekstraRobustMisinterpretationConfidence2014">Hoekstra et al. (<a href="#ref-hoekstraRobustMisinterpretationConfidence2014" role="doc-biblioref">2014</a>)</span></li>
</ul>
<section id="generating-data" class="level2">
<h2 class="anchored" data-anchor-id="generating-data">Generating data</h2>
<p>The following example simulates the process of finding the <strong>mean age value</strong> of a population of voters.</p>
<ul>
<li>First we generate a population with their age values
<ul>
<li>1 Million values a generated from an exponential distribution and 1.5 Million values from a poisson distribution</li>
<li>18 is added to make sure that no age value is below 18 years old.</li>
</ul></li>
<li>For numbers higher than 100 the modulo (%%) is taken and 18 is added to make sure we don’t end up with too large numbers.</li>
</ul>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb1"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb1-1"><span class="fu">set.seed</span>(<span class="dv">12</span>)</span>
<span id="cb1-2"></span>
<span id="cb1-3"><span class="co"># Generate a population</span></span>
<span id="cb1-4">population_ages <span class="ot">&lt;-</span> <span class="fu">c</span>(<span class="fu">rexp</span>(<span class="dv">1000000</span>,<span class="fl">0.015</span>)<span class="sc">+</span><span class="dv">18</span>,   </span>
<span id="cb1-5">                    <span class="fu">rpois</span>(<span class="dv">500000</span>,<span class="dv">20</span>)<span class="sc">+</span><span class="dv">18</span>,</span>
<span id="cb1-6">                    <span class="fu">rpois</span>(<span class="dv">500000</span>,<span class="fl">32.5</span>)<span class="sc">+</span><span class="dv">18</span>,</span>
<span id="cb1-7">                    <span class="fu">rpois</span>(<span class="dv">500000</span>,<span class="dv">45</span>)<span class="sc">+</span><span class="dv">18</span>)</span>
<span id="cb1-8"></span>
<span id="cb1-9">population_ages <span class="ot">&lt;-</span> <span class="fu">ifelse</span>(population_ages<span class="sc">&lt;</span><span class="dv">100</span>, </span>
<span id="cb1-10">                          population_ages, population_ages<span class="sc">%%</span><span class="dv">100</span><span class="sc">+</span><span class="dv">18</span>)</span></code></pre></div></div>
</details>
</div>
<div class="cell">
<div class="cell-output-display">
<div>
<figure class="figure">
<p><img src="/media/projects/confidence-intervals/unnamed-chunk-2-1.png" width="672" loading="lazy"></p>
</figure>
</div>
</div>
</div>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb2"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb2-1">true_mean <span class="ot">&lt;-</span> <span class="fu">mean</span>(population_ages)   <span class="co"># Check the population mean</span></span>
<span id="cb2-2"></span>
<span id="cb2-3">true_mean</span></code></pre></div></div>
</details>
</div>
</section>
<section id="drawing-different-sample-from-the-population-and-calculating-the-mean" class="level2">
<h2 class="anchored" data-anchor-id="drawing-different-sample-from-the-population-and-calculating-the-mean">Drawing different sample from the population and calculating the mean</h2>
<ul>
<li>The central limit theorem states that the distribution of the mean values are normally distributed no matter what the distribution is of the population.</li>
</ul>
<section id="lets-visualize-the-distribution-of-mean-values.-a-skewness-of-0-would-be-a-normal-distribution." class="level3">
<h3 class="anchored" data-anchor-id="lets-visualize-the-distribution-of-mean-values.-a-skewness-of-0-would-be-a-normal-distribution.">Let’s visualize the distribution of mean values. A skewness of 0 would be a normal distribution.</h3>
<div class="cell">
<div class="cell-output-display">
<div>
<figure class="figure">
<p><img src="/media/projects/confidence-intervals/unnamed-chunk-5-1.png" width="672" loading="lazy"></p>
</figure>
</div>
</div>
<div class="cell-output cell-output-stdout">
<pre><code>[1] -0.2609927</code></pre>
</div>
</div>
</section>
</section>
<section id="confidence-intervals-for-the-mean-values" class="level2">
<h2 class="anchored" data-anchor-id="confidence-intervals-for-the-mean-values">Confidence Intervals for the mean values</h2>
<ul>
<li>First the sample size is determined then an empty vector is created that will store the boundaries of all confidence intervals</li>
<li>The for loop is set to 25, meaning we draw a sample of size 1000 25 times.</li>
<li>With qnorm we can get the z value that is used to calculate the boundaries of the confidence intervals</li>
</ul>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb4"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb4-1"><span class="fu">set.seed</span>(<span class="dv">12</span>)</span>
<span id="cb4-2">sample_size <span class="ot">&lt;-</span> <span class="dv">1000</span></span>
<span id="cb4-3"></span>
<span id="cb4-4">intervals <span class="ot">&lt;-</span> <span class="fu">c</span>()  <span class="co"># Create and store 25 intervals</span></span>
<span id="cb4-5"> </span>
<span id="cb4-6"><span class="cf">for</span> (sample <span class="cf">in</span> <span class="dv">1</span><span class="sc">:</span><span class="dv">25</span>){</span>
<span id="cb4-7">sample_ages <span class="ot">&lt;-</span> <span class="fu">sample</span>(population_ages, <span class="at">size=</span>sample_size)  <span class="co"># Take a sample of 1000 ages</span></span>
<span id="cb4-8"></span>
<span id="cb4-9">sample_mean <span class="ot">&lt;-</span> <span class="fu">mean</span>(sample_ages)  <span class="co"># Get the sample mean</span></span>
<span id="cb4-10"></span>
<span id="cb4-11">z_critical <span class="ot">&lt;-</span> <span class="fu">qnorm</span>(<span class="fl">0.975</span>)        <span class="co"># Get the z-critical value*</span></span>
<span id="cb4-12"></span>
<span id="cb4-13">pop_stdev <span class="ot">&lt;-</span> <span class="fu">sd</span>(population_ages)  <span class="co"># Get the population standard deviation</span></span>
<span id="cb4-14"></span>
<span id="cb4-15">margin_of_error <span class="ot">&lt;-</span> z_critical <span class="sc">*</span> (pop_stdev <span class="sc">/</span> <span class="fu">sqrt</span>(sample_size)) <span class="co"># Calculate margin of error</span></span>
<span id="cb4-16"></span>
<span id="cb4-17">confidence_interval  <span class="ot">&lt;-</span> <span class="fu">c</span>(sample_mean <span class="sc">-</span> margin_of_error,  <span class="co"># Calculate the the interval</span></span>
<span id="cb4-18">                          sample_mean <span class="sc">+</span> margin_of_error)  </span>
<span id="cb4-19"></span>
<span id="cb4-20">intervals <span class="ot">&lt;-</span> <span class="fu">c</span>(intervals, confidence_interval)    </span>
<span id="cb4-21">}</span>
<span id="cb4-22"></span>
<span id="cb4-23">interval_df <span class="ot">&lt;-</span> <span class="fu">data.frame</span>(<span class="fu">t</span>(<span class="fu">matrix</span>(intervals,<span class="dv">2</span>,<span class="dv">25</span>)))  <span class="co"># Store intervals as data frame</span></span></code></pre></div></div>
</details>
</div>
</section>
<section id="plotting-the-25-confidence-intervals" class="level2">
<h2 class="anchored" data-anchor-id="plotting-the-25-confidence-intervals">Plotting the 25 confidence intervals</h2>
<p>The red line shows the true mean. We see the first confidence interval not including the true mean. (1/25 = 0.04)</p>
<div class="cell">
<div class="cell-output-display">
<div>
<figure class="figure">
<p><img src="/media/projects/confidence-intervals/unnamed-chunk-7-1.png" width="672" loading="lazy"></p>
</figure>
</div>
</div>
</div>
</section>
<section id="summary" class="level2">
<h2 class="anchored" data-anchor-id="summary">Summary</h2>
<ul>
<li>Simulating confidence interval shows that some will not include the true value.</li>
</ul>

</section>

<a onclick="window.scrollTo(0, 0); return false;" role="button" id="quarto-back-to-top"><i class="bi bi-arrow-up"></i> Back to top</a><div id="quarto-appendix" class="default"><section class="quarto-appendix-contents" role="doc-bibliography" id="quarto-bibliography"><h2 class="anchored quarto-appendix-heading">References</h2><div id="refs" class="references csl-bib-body hanging-indent" data-entry-spacing="0" role="list">
<div id="ref-hoekstraRobustMisinterpretationConfidence2014" class="csl-entry" role="listitem">
Hoekstra, Rink, Richard D. Morey, Jeffrey N. Rouder, and Eric-Jan Wagenmakers. 2014. <span>“Robust Misinterpretation of Confidence Intervals.”</span> <em>Psychonomic Bulletin &amp; Review</em> 21 (5): 1157–64. <a href="https://doi.org/10.3758/s13423-013-0572-3" target="_blank" rel="noopener">https://doi.org/10.3758/s13423-013-0572-3</a>.
</div>
</div></section></div>
