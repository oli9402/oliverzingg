---
title: "Simpson's paradox and mixed-effects models"
summary: "How a trend can flip once you account for hierarchical structure, shown with the palmerpenguins data and random effects."
year: 2023
kind: "Statistics"
tags: ["Mixed-effects models", "Random effects", "R"]
order: 3
cover: "/media/projects/simpsons-paradox/unnamed-chunk-3-1.png"
format: "html"
---
<section id="simpsons-paradox" class="level2">
<p>Simpson’s paradox is a statistical phenomenon that appears when data has a hierarchical structure. The data can be analysed at different levels of that structure, and the level you choose can change the result, and with it the answer to the research question. Simpson’s paradox is often used to show the advantages of linear mixed-effects models over simple linear regression.</p>
</section>
<section id="hierarchische-datenstruktur" class="level2">
<h2 class="anchored" data-anchor-id="hierarchische-datenstruktur">Hierarchical data structures</h2>
<section id="im-querschnitt" class="level3">
<h3 class="anchored" data-anchor-id="im-querschnitt">Cross-sectional</h3>
<p>Examples:</p>
<ul>
<li>Students nested in schools (two levels)</li>
<li>Students nested in schools nested in cantons (three levels)</li>
<li>Employees nested in companies (two levels)</li>
</ul>
</section>
<section id="im-längschnitt" class="level3">
<h3 class="anchored" data-anchor-id="im-längschnitt">Longitudinal</h3>
<p>Examples:</p>
<ul>
<li>Exam grades nested in students (two levels)</li>
<li>Customer satisfaction nested in people nested in age groups (three levels)</li>
</ul>
</section>
</section>
<section id="beispiel-pinguine" class="level2">
<h2 class="anchored" data-anchor-id="beispiel-pinguine">Example: penguins</h2>
<p>Data (<span class="citation" data-cites="pingu">Gorman (<a href="#ref-pingu" role="doc-biblioref">2014</a>)</span>):</p>
<ul>
<li>palmerpenguins
<ul>
<li>344 penguins</li>
<li>3 species (Adélie, chinstrap and gentoo)</li>
</ul></li>
</ul>
<p>Dr Allison Horst, Alison Hill and Kristen Gorman turned the data into the R package <em>palmerpenguins</em>. This project is based on the <a href="https://slides.silviacanelon.com/tour-of-the-tidyverse" target="_blank" rel="noopener">tutorial</a> by Silvia Canelon.</p>
<p><strong>First, install the R packages</strong></p>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb1"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb1-1"><span class="fu">install.packages</span>(<span class="st">"palmerpenguins"</span>) <span class="co">#Data</span></span>
<span id="cb1-2"><span class="fu">install.packages</span>(<span class="st">"tibble"</span>) <span class="co">#Data handling</span></span>
<span id="cb1-3"><span class="fu">install.packges</span>(<span class="st">"ggplot2"</span>) <span class="co">#Plotting</span></span>
<span id="cb1-4"><span class="fu">install.packages</span>(<span class="st">"dplyr"</span>)</span></code></pre></div></div>
</details>
</div>
<p><strong>Load the packages</strong></p>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb2"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb2-1"><span class="fu">library</span>(palmerpenguins)</span>
<span id="cb2-2"><span class="fu">library</span>(tibble)</span>
<span id="cb2-3"><span class="fu">library</span>(ggplot2)</span>
<span id="cb2-4"><span class="fu">library</span>(dplyr)</span>
<span id="cb2-5">penguins <span class="ot">&lt;-</span> palmerpenguins<span class="sc">::</span>penguins</span>
<span id="cb2-6"><span class="fu">head</span>(penguins)</span></code></pre></div></div>
</details>
<div class="cell-output cell-output-stdout">
<pre><code># A tibble: 6 × 8
  species island    bill_length_mm bill_depth_mm flipper_length_mm body_mass_g
  &lt;fct&gt;   &lt;fct&gt;              &lt;dbl&gt;         &lt;dbl&gt;             &lt;int&gt;       &lt;int&gt;
1 Adelie  Torgersen           39.1          18.7               181        3750
2 Adelie  Torgersen           39.5          17.4               186        3800
3 Adelie  Torgersen           40.3          18                 195        3250
4 Adelie  Torgersen           NA            NA                  NA          NA
5 Adelie  Torgersen           36.7          19.3               193        3450
6 Adelie  Torgersen           39.3          20.6               190        3650
# ℹ 2 more variables: sex &lt;fct&gt;, year &lt;int&gt;</code></pre>
</div>
</div>
<section id="daten-explorieren" class="level3">
<h3 class="anchored" data-anchor-id="daten-explorieren">Explore the data</h3>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb4"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb4-1"><span class="fu">ggplot</span>(<span class="at">data =</span> penguins,</span>
<span id="cb4-2">       <span class="fu">aes</span>(<span class="at">x =</span> sex, <span class="at">y =</span> body_mass_g))<span class="sc">+</span></span>
<span id="cb4-3">  <span class="fu">geom_boxplot</span>(<span class="fu">aes</span>(<span class="at">fill =</span> species))</span></code></pre></div></div>
</details>
<div class="cell-output-display">
<div>
<figure class="figure">
<p><img src="/media/projects/simpsons-paradox/unnamed-chunk-3-1.png" width="672" loading="lazy"></p>
</figure>
</div>
</div>
</div>
<p>The box plots suggest a sex difference in body mass for gentoo penguins, which may not be the case for Adélie and chinstrap.</p>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb5"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb5-1">penguins <span class="sc">%&gt;%</span></span>
<span id="cb5-2">  <span class="fu">select</span>(species, sex, body_mass_g) <span class="sc">%&gt;%</span></span>
<span id="cb5-3">  <span class="fu">arrange</span>(<span class="fu">desc</span>(body_mass_g))</span></code></pre></div></div>
</details>
<div class="cell-output cell-output-stdout">
<pre><code># A tibble: 344 × 3
   species sex   body_mass_g
   &lt;fct&gt;   &lt;fct&gt;       &lt;int&gt;
 1 Gentoo  male         6300
 2 Gentoo  male         6050
 3 Gentoo  male         6000
 4 Gentoo  male         6000
 5 Gentoo  male         5950
 6 Gentoo  male         5950
 7 Gentoo  male         5850
 8 Gentoo  male         5850
 9 Gentoo  male         5850
10 Gentoo  male         5800
# ℹ 334 more rows</code></pre>
</div>
</div>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb7"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb7-1">penguins <span class="sc">%&gt;%</span></span>
<span id="cb7-2">  <span class="fu">select</span>(species, sex, body_mass_g) <span class="sc">%&gt;%</span></span>
<span id="cb7-3">  <span class="fu">group_by</span>(species,sex) <span class="sc">%&gt;%</span></span>
<span id="cb7-4">  <span class="fu">summarize</span>(<span class="at">mean =</span> <span class="fu">mean</span>(body_mass_g))</span></code></pre></div></div>
</details>
<div class="cell-output cell-output-stderr">
<pre><code>`summarise()` has grouped output by 'species'. You can override using the
`.groups` argument.</code></pre>
</div>
<div class="cell-output cell-output-stdout">
<pre><code># A tibble: 8 × 3
# Groups:   species [3]
  species   sex     mean
  &lt;fct&gt;     &lt;fct&gt;  &lt;dbl&gt;
1 Adelie    female 3369.
2 Adelie    male   4043.
3 Adelie    &lt;NA&gt;     NA 
4 Chinstrap female 3527.
5 Chinstrap male   3939.
6 Gentoo    female 4680.
7 Gentoo    male   5485.
8 Gentoo    &lt;NA&gt;     NA </code></pre>
</div>
</div>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb10"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb10-1">penguins <span class="sc">%&gt;%</span></span>
<span id="cb10-2">  <span class="fu">group_by</span>(species) <span class="sc">%&gt;%</span></span>
<span id="cb10-3">  <span class="fu">mutate</span>(<span class="at">n_species =</span> <span class="fu">n</span>()) <span class="sc">%&gt;%</span></span>
<span id="cb10-4">  <span class="fu">ungroup</span>() <span class="sc">%&gt;%</span></span>
<span id="cb10-5">  <span class="fu">group_by</span>(species,sex,n_species) <span class="sc">%&gt;%</span></span>
<span id="cb10-6">  <span class="fu">summarize</span>(<span class="at">n=</span><span class="fu">n</span>())</span></code></pre></div></div>
</details>
<div class="cell-output cell-output-stderr">
<pre><code>`summarise()` has grouped output by 'species', 'sex'. You can override using
the `.groups` argument.</code></pre>
</div>
<div class="cell-output cell-output-stdout">
<pre><code># A tibble: 8 × 4
# Groups:   species, sex [8]
  species   sex    n_species     n
  &lt;fct&gt;     &lt;fct&gt;      &lt;int&gt; &lt;int&gt;
1 Adelie    female       152    73
2 Adelie    male         152    73
3 Adelie    &lt;NA&gt;         152     6
4 Chinstrap female        68    34
5 Chinstrap male          68    34
6 Gentoo    female       124    58
7 Gentoo    male         124    61
8 Gentoo    &lt;NA&gt;         124     5</code></pre>
</div>
</div>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb13"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb13-1">penguins <span class="sc">%&gt;%</span></span>
<span id="cb13-2">  <span class="fu">count</span>(species, sex) <span class="sc">%&gt;%</span></span>
<span id="cb13-3">  <span class="fu">add_count</span>(species, <span class="at">wt =</span> n,</span>
<span id="cb13-4">            <span class="at">name =</span> <span class="st">"n_species"</span>)</span></code></pre></div></div>
</details>
<div class="cell-output cell-output-stdout">
<pre><code># A tibble: 8 × 4
  species   sex        n n_species
  &lt;fct&gt;     &lt;fct&gt;  &lt;int&gt;     &lt;int&gt;
1 Adelie    female    73       152
2 Adelie    male      73       152
3 Adelie    &lt;NA&gt;       6       152
4 Chinstrap female    34        68
5 Chinstrap male      34        68
6 Gentoo    female    58       124
7 Gentoo    male      61       124
8 Gentoo    &lt;NA&gt;       5       124</code></pre>
</div>
</div>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb15"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb15-1">penguins <span class="sc">%&gt;%</span></span>
<span id="cb15-2">  <span class="fu">count</span>(species, sex) <span class="sc">%&gt;%</span></span>
<span id="cb15-3">  <span class="fu">add_count</span>(species, <span class="at">wt =</span> n,</span>
<span id="cb15-4">            <span class="at">name =</span> <span class="st">"n_species"</span>) <span class="sc">%&gt;%</span></span>
<span id="cb15-5">  <span class="fu">mutate</span>(<span class="at">prop =</span> n<span class="sc">/</span>n_species<span class="sc">*</span><span class="dv">100</span>)</span></code></pre></div></div>
</details>
<div class="cell-output cell-output-stdout">
<pre><code># A tibble: 8 × 5
  species   sex        n n_species  prop
  &lt;fct&gt;     &lt;fct&gt;  &lt;int&gt;     &lt;int&gt; &lt;dbl&gt;
1 Adelie    female    73       152 48.0 
2 Adelie    male      73       152 48.0 
3 Adelie    &lt;NA&gt;       6       152  3.95
4 Chinstrap female    34        68 50   
5 Chinstrap male      34        68 50   
6 Gentoo    female    58       124 46.8 
7 Gentoo    male      61       124 49.2 
8 Gentoo    &lt;NA&gt;       5       124  4.03</code></pre>
</div>
</div>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb17"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb17-1">penguins <span class="sc">%&gt;%</span></span>
<span id="cb17-2">  <span class="fu">count</span>(species, sex) <span class="sc">%&gt;%</span></span>
<span id="cb17-3">  <span class="fu">add_count</span>(species, <span class="at">wt =</span> n,</span>
<span id="cb17-4">            <span class="at">name =</span> <span class="st">"n_species"</span>) <span class="sc">%&gt;%</span></span>
<span id="cb17-5">  <span class="fu">mutate</span>(<span class="at">prop =</span> n<span class="sc">/</span>n_species<span class="sc">*</span><span class="dv">100</span>) <span class="sc">%&gt;%</span></span>
<span id="cb17-6">  <span class="fu">filter</span>(species <span class="sc">==</span> <span class="st">"Chinstrap"</span>)</span></code></pre></div></div>
</details>
<div class="cell-output cell-output-stdout">
<pre><code># A tibble: 2 × 5
  species   sex        n n_species  prop
  &lt;fct&gt;     &lt;fct&gt;  &lt;int&gt;     &lt;int&gt; &lt;dbl&gt;
1 Chinstrap female    34        68    50
2 Chinstrap male      34        68    50</code></pre>
</div>
</div>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb19"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb19-1">penguins_new <span class="ot">&lt;-</span></span>
<span id="cb19-2">  penguins <span class="sc">%&gt;%</span></span>
<span id="cb19-3">  <span class="fu">mutate</span>(<span class="at">year_factor =</span> <span class="fu">factor</span>(year, <span class="at">levels =</span> <span class="fu">unique</span>(year)))</span>
<span id="cb19-4">penguins_new</span></code></pre></div></div>
</details>
<div class="cell-output cell-output-stdout">
<pre><code># A tibble: 344 × 9
   species island    bill_length_mm bill_depth_mm flipper_length_mm body_mass_g
   &lt;fct&gt;   &lt;fct&gt;              &lt;dbl&gt;         &lt;dbl&gt;             &lt;int&gt;       &lt;int&gt;
 1 Adelie  Torgersen           39.1          18.7               181        3750
 2 Adelie  Torgersen           39.5          17.4               186        3800
 3 Adelie  Torgersen           40.3          18                 195        3250
 4 Adelie  Torgersen           NA            NA                  NA          NA
 5 Adelie  Torgersen           36.7          19.3               193        3450
 6 Adelie  Torgersen           39.3          20.6               190        3650
 7 Adelie  Torgersen           38.9          17.8               181        3625
 8 Adelie  Torgersen           39.2          19.6               195        4675
 9 Adelie  Torgersen           34.1          18.1               193        3475
10 Adelie  Torgersen           42            20.2               190        4250
# ℹ 334 more rows
# ℹ 3 more variables: sex &lt;fct&gt;, year &lt;int&gt;, year_factor &lt;fct&gt;</code></pre>
</div>
</div>
</section>
<section id="visualize-simpsons-paradox" class="level3">
<h3 class="anchored" data-anchor-id="visualize-simpsons-paradox">Visualize Simpson’s Paradox</h3>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb21"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb21-1"><span class="fu">ggplot</span>(<span class="at">data =</span> penguins,</span>
<span id="cb21-2">       <span class="at">mapping =</span> <span class="fu">aes</span>(<span class="at">x =</span> bill_length_mm, <span class="at">y =</span> bill_depth_mm))<span class="sc">+</span></span>
<span id="cb21-3">  <span class="fu">geom_point</span>() <span class="sc">+</span></span>
<span id="cb21-4">  <span class="fu">geom_smooth</span>(<span class="at">method=</span><span class="st">'lm'</span>, <span class="at">formula =</span> y <span class="sc">~</span>x)</span></code></pre></div></div>
</details>
<div class="cell-output-display">
<div>
<figure class="figure">
<p><img src="/media/projects/simpsons-paradox/unnamed-chunk-11-1.png" width="672" loading="lazy"></p>
</figure>
</div>
</div>
</div>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb22"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb22-1">plot_simps <span class="ot">&lt;-</span> penguins <span class="sc">%&gt;%</span></span>
<span id="cb22-2">  <span class="fu">ggplot</span>(<span class="at">mapping =</span> <span class="fu">aes</span>(<span class="at">x =</span> bill_length_mm, <span class="at">y =</span> bill_depth_mm, <span class="at">group =</span> species, <span class="at">col =</span> species)) <span class="sc">+</span> </span>
<span id="cb22-3">  <span class="fu">geom_point</span>() <span class="sc">+</span></span>
<span id="cb22-4">  <span class="fu">geom_smooth</span>(<span class="at">method =</span> <span class="st">'lm'</span>, <span class="at">formula =</span> y <span class="sc">~</span>x)</span>
<span id="cb22-5">plot_simps</span></code></pre></div></div>
</details>
<div class="cell-output-display">
<div>
<figure class="figure">
<p><img src="/media/projects/simpsons-paradox/unnamed-chunk-12-1.png" width="672" loading="lazy"></p>
</figure>
</div>
</div>
</div>
</section>
</section>
<section id="interpretation" class="level2">
<h2 class="anchored" data-anchor-id="interpretation">Interpretation</h2>
<p>The last two plots show that if we ignore the penguins’ species, we draw the wrong conclusion about the relationship between bill length and bill depth.</p>
<p>More on mixed-effects models and Simpson’s paradox <span class="citation" data-cites="hoxMultilevelAnalysisTechniques2017">(see <a href="#ref-hoxMultilevelAnalysisTechniques2017" role="doc-biblioref">Hox, Moerbeek, and Van de Schoot 2017</a>)</span></p>
</section>
<section id="lets-make-a-nice-plot" class="level2">
<h2 class="anchored" data-anchor-id="lets-make-a-nice-plot">Let’s make a nice plot</h2>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb23"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb23-1"><span class="fu">library</span>(thematic)</span>
<span id="cb23-2"><span class="fu">library</span>(ggtext)</span>
<span id="cb23-3">colors <span class="ot">&lt;-</span> thematic<span class="sc">::</span><span class="fu">okabe_ito</span>(<span class="dv">3</span>)</span>
<span id="cb23-4">title_text <span class="ot">&lt;-</span> glue<span class="sc">::</span><span class="fu">glue</span>(</span>
<span id="cb23-5">  <span class="st">'Bill Depth per Bill Length in mm for &lt;span style = "color:{colors[1]}"&gt;**Adelie**&lt;/span&gt;, &lt;span style = "color:{colors[2]}"&gt;**Chinstrap**&lt;/span&gt;, &lt;span style = "color:{colors[3]}"&gt;**Gentoo**&lt;/span&gt;'</span>)</span>
<span id="cb23-6"></span>
<span id="cb23-7">plot_simps <span class="ot">&lt;-</span> plot_simps  <span class="sc">+</span> </span>
<span id="cb23-8">  <span class="fu">labs</span>(<span class="at">x =</span> <span class="st">"Bill Lenght [mm]"</span>, <span class="at">y =</span> <span class="st">"Bill Depth [mm]"</span>,</span>
<span id="cb23-9">       <span class="at">color =</span> <span class="st">"Species"</span>,</span>
<span id="cb23-10">       <span class="at">title =</span> title_text,</span>
<span id="cb23-11">       <span class="at">caption =</span> <span class="st">"Source: Penguins Data"</span>) <span class="sc">+</span> </span>
<span id="cb23-12">  <span class="fu">scale_y_continuous</span>(</span>
<span id="cb23-13">    <span class="at">breaks =</span> <span class="dv">13</span><span class="sc">:</span><span class="dv">22</span></span>
<span id="cb23-14">  )<span class="sc">+</span> </span>
<span id="cb23-15">  <span class="fu">scale_x_continuous</span>(</span>
<span id="cb23-16">    <span class="at">breaks =</span> <span class="fu">seq</span>(<span class="dv">30</span>,<span class="dv">60</span>,<span class="at">by =</span> <span class="dv">5</span>)</span>
<span id="cb23-17">    )<span class="sc">+</span> </span>
<span id="cb23-18">  <span class="co">#guide = none, legend wird ausgelassen</span></span>
<span id="cb23-19">  <span class="fu">scale_color_manual</span>(<span class="at">values =</span> thematic<span class="sc">::</span><span class="fu">okabe_ito</span>(<span class="dv">3</span>), <span class="at">guide =</span> <span class="st">"none"</span>) <span class="sc">+</span></span>
<span id="cb23-20">  <span class="fu">theme_minimal</span>(<span class="at">base_family =</span> <span class="st">'Source Sans Pro'</span>, <span class="at">base_size =</span> <span class="dv">12</span>)<span class="sc">+</span></span>
<span id="cb23-21">  <span class="fu">theme</span>(<span class="at">plot.title =</span> ggtext<span class="sc">::</span><span class="fu">element_markdown</span>(<span class="at">color =</span> <span class="st">'grey20'</span>, <span class="at">size =</span> <span class="fu">rel</span>(<span class="fl">1.7</span>),<span class="at">face=</span> <span class="st">"bold"</span>),</span>
<span id="cb23-22">        <span class="at">plot.title.position =</span> <span class="st">"plot"</span>,</span>
<span id="cb23-23">  <span class="co"># Bold axis titles</span></span>
<span id="cb23-24">  <span class="at">axis.title =</span> <span class="fu">element_text</span>(<span class="at">face =</span> <span class="st">"bold"</span>),</span>
<span id="cb23-25">  <span class="co"># Add some space above the x-axis title and make it left-aligned</span></span>
<span id="cb23-26">  <span class="at">axis.title.x =</span> <span class="fu">element_text</span>(<span class="at">margin =</span> <span class="fu">margin</span>(<span class="at">t =</span> <span class="dv">10</span>), <span class="at">hjust =</span> <span class="dv">0</span>),</span>
<span id="cb23-27">  <span class="co"># Add some space to the right of the y-axis title and make it top-aligned</span></span>
<span id="cb23-28">  <span class="at">axis.title.y =</span> <span class="fu">element_text</span>(<span class="at">margin =</span> <span class="fu">margin</span>(<span class="at">r =</span> <span class="dv">10</span>), <span class="at">hjust =</span> <span class="dv">1</span>, <span class="fu">margin</span> (<span class="dv">0</span>,<span class="dv">4</span>,<span class="dv">0</span>,<span class="dv">0</span>)),) </span>
<span id="cb23-29">plot_simps</span></code></pre></div></div>
</details>
<div class="cell-output-display">
<div>
<figure class="figure">
<p><img src="/media/projects/simpsons-paradox/unnamed-chunk-13-1.png" width="960" loading="lazy"></p>
</figure>
</div>
</div>
</div>
</section>
<section id="save-plot" class="level2">
<h2 class="anchored" data-anchor-id="save-plot">Save plot</h2>
<div class="cell" data-execute="false">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb24"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb24-1"><span class="fu">library</span>(here)</span></code></pre></div></div>
</details>
<div class="cell-output cell-output-stderr">
<pre><code>here() starts at /Users/oliverzingg/Portfolio</code></pre>
</div>
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb26"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb26-1">p <span class="ot">&lt;-</span> <span class="fu">here</span>(<span class="st">"my_plot.png"</span>)</span>
<span id="cb26-2"><span class="co">#ggsave(p,plot_simps, width=45, height=30, units = "cm", dpi=500)</span></span></code></pre></div></div>
</details>
</div>

</section>

<a onclick="window.scrollTo(0, 0); return false;" role="button" id="quarto-back-to-top"><i class="bi bi-arrow-up"></i> Back to top</a><div id="quarto-appendix" class="default"><section class="quarto-appendix-contents" role="doc-bibliography" id="quarto-bibliography"><h2 class="anchored quarto-appendix-heading">References</h2><div id="refs" class="references csl-bib-body hanging-indent" data-entry-spacing="0" role="list">
<div id="ref-pingu" class="csl-entry" role="listitem">
Gorman, Tony D. AND Fraser, Kristen B. AND Williams. 2014. <span>“Ecological Sexual Dimorphism and Environmental Variability Within a Community of Antarctic Penguins (Genus Pygoscelis).”</span> <em>PLOS ONE</em> 9 (March). <a href="https://doi.org/10.1371/journal.pone.0090081" target="_blank" rel="noopener">https://doi.org/10.1371/journal.pone.0090081</a>.
</div>
<div id="ref-hoxMultilevelAnalysisTechniques2017" class="csl-entry" role="listitem">
Hox, Joop J., Mirjam Moerbeek, and Rens Van de Schoot. 2017. <em>Multilevel Analysis: <span>Techniques</span> and Applications</em>. <span>Routledge</span>.
</div>
</div></section></div>
