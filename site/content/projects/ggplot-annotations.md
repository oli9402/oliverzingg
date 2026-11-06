---
title: "Themes and annotations in ggplot2"
summary: "Using themes and annotations to surface the story in a chart, with the gapminder data."
year: 2023
kind: "Visualisation"
tags: ["ggplot2", "Visualisation", "R"]
order: 10
cover: "/media/projects/ggplot-annotations/pic.png"
format: "html"
---
<section id="example-1-save-themes" class="level1">

<ul>
<li>https://datavizs23.classes.andrewheiss.com/example/05-example.html</li>
</ul>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb1"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb1-1"><span class="fu">library</span>(tidyverse)  <span class="co"># For ggplot, dplyr, and friends</span></span>
<span id="cb1-2"><span class="fu">library</span>(gapminder)  <span class="co"># For gapminder data</span></span>
<span id="cb1-3"><span class="fu">library</span>(scales)     <span class="co"># For nice axis labels</span></span>
<span id="cb1-4"></span>
<span id="cb1-5">gapminder_filtered <span class="ot">&lt;-</span> gapminder <span class="sc">%&gt;%</span> </span>
<span id="cb1-6">  <span class="fu">filter</span>(year <span class="sc">&gt;</span> <span class="dv">2000</span>)</span>
<span id="cb1-7"></span>
<span id="cb1-8">base_plot <span class="ot">&lt;-</span> <span class="fu">ggplot</span>(<span class="at">data =</span> gapminder_filtered,</span>
<span id="cb1-9">                    <span class="at">mapping =</span> <span class="fu">aes</span>(<span class="at">x =</span> gdpPercap, <span class="at">y =</span> lifeExp, </span>
<span id="cb1-10">                                  <span class="at">color =</span> continent, <span class="at">size =</span> pop)) <span class="sc">+</span></span>
<span id="cb1-11">  <span class="fu">geom_point</span>() <span class="sc">+</span></span>
<span id="cb1-12">  <span class="co"># Use dollars, and get rid of the cents part (i.e. $300 instead of $300.00)</span></span>
<span id="cb1-13">  <span class="fu">scale_x_log10</span>(<span class="at">labels =</span> <span class="fu">dollar_format</span>(<span class="at">accuracy =</span> <span class="dv">1</span>)) <span class="sc">+</span></span>
<span id="cb1-14">  <span class="co"># Format with commas</span></span>
<span id="cb1-15">  <span class="fu">scale_size_continuous</span>(<span class="at">labels =</span> comma) <span class="sc">+</span></span>
<span id="cb1-16">  <span class="co"># Use viridis</span></span>
<span id="cb1-17">  <span class="fu">scale_color_viridis_d</span>(<span class="at">option =</span> <span class="st">"plasma"</span>, <span class="at">end =</span> <span class="fl">0.9</span>) <span class="sc">+</span></span>
<span id="cb1-18">  <span class="fu">labs</span>(<span class="at">x =</span> <span class="st">"GDP per capita"</span>, <span class="at">y =</span> <span class="st">"Life expectancy"</span>,</span>
<span id="cb1-19">       <span class="at">color =</span> <span class="st">"Continent"</span>, <span class="at">size =</span> <span class="st">"Population"</span>,</span>
<span id="cb1-20">       <span class="at">title =</span> <span class="st">"Here's a cool title"</span>,</span>
<span id="cb1-21">       <span class="at">subtitle =</span> <span class="st">"And here's a neat subtitle"</span>,</span>
<span id="cb1-22">       <span class="at">caption =</span> <span class="st">"Source: The Gapminder Project"</span>) <span class="sc">+</span></span>
<span id="cb1-23">  <span class="fu">facet_wrap</span>(<span class="fu">vars</span>(year))</span></code></pre></div></div>
</details>
</div>
<section id="create-and-save-theme-my_pretty_theme" class="level2">
<h2 class="anchored" data-anchor-id="create-and-save-theme-my_pretty_theme">Create and save theme (my_pretty_theme)</h2>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb2"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb2-1">my_pretty_theme <span class="ot">&lt;-</span> <span class="fu">theme_minimal</span>(<span class="at">base_family =</span> <span class="st">"Roboto Condensed"</span>, <span class="at">base_size =</span> <span class="dv">12</span>) <span class="sc">+</span></span>
<span id="cb2-2">  <span class="fu">theme</span>(<span class="at">panel.grid.minor =</span> <span class="fu">element_blank</span>(),</span>
<span id="cb2-3">        <span class="co"># Bold, bigger title</span></span>
<span id="cb2-4">        <span class="at">plot.title =</span> <span class="fu">element_text</span>(<span class="at">face =</span> <span class="st">"bold"</span>, <span class="at">size =</span> <span class="fu">rel</span>(<span class="fl">1.7</span>)),</span>
<span id="cb2-5">        <span class="co"># Plain, slightly bigger subtitle that is grey</span></span>
<span id="cb2-6">        <span class="at">plot.subtitle =</span> <span class="fu">element_text</span>(<span class="at">face =</span> <span class="st">"plain"</span>, <span class="at">size =</span> <span class="fu">rel</span>(<span class="fl">1.3</span>), <span class="at">color =</span> <span class="st">"grey70"</span>),</span>
<span id="cb2-7">        <span class="co"># Italic, smaller, grey caption that is left-aligned</span></span>
<span id="cb2-8">        <span class="at">plot.caption =</span> <span class="fu">element_text</span>(<span class="at">face =</span> <span class="st">"italic"</span>, <span class="at">size =</span> <span class="fu">rel</span>(<span class="fl">0.7</span>), </span>
<span id="cb2-9">                                    <span class="at">color =</span> <span class="st">"grey70"</span>, <span class="at">hjust =</span> <span class="dv">0</span>),</span>
<span id="cb2-10">        <span class="co"># Bold legend titles</span></span>
<span id="cb2-11">        <span class="at">legend.title =</span> <span class="fu">element_text</span>(<span class="at">face =</span> <span class="st">"bold"</span>),</span>
<span id="cb2-12">        <span class="co"># Bold, slightly larger facet titles that are left-aligned for the sake of repetition</span></span>
<span id="cb2-13">        <span class="at">strip.text =</span> <span class="fu">element_text</span>(<span class="at">face =</span> <span class="st">"bold"</span>, <span class="at">size =</span> <span class="fu">rel</span>(<span class="fl">1.1</span>), <span class="at">hjust =</span> <span class="dv">0</span>),</span>
<span id="cb2-14">        <span class="co"># Bold axis titles</span></span>
<span id="cb2-15">        <span class="at">axis.title =</span> <span class="fu">element_text</span>(<span class="at">face =</span> <span class="st">"bold"</span>),</span>
<span id="cb2-16">        <span class="co"># Add some space above the x-axis title and make it left-aligned</span></span>
<span id="cb2-17">        <span class="at">axis.title.x =</span> <span class="fu">element_text</span>(<span class="at">margin =</span> <span class="fu">margin</span>(<span class="at">t =</span> <span class="dv">10</span>), <span class="at">hjust =</span> <span class="dv">0</span>),</span>
<span id="cb2-18">        <span class="co"># Add some space to the right of the y-axis title and make it top-aligned</span></span>
<span id="cb2-19">        <span class="at">axis.title.y =</span> <span class="fu">element_text</span>(<span class="at">margin =</span> <span class="fu">margin</span>(<span class="at">r =</span> <span class="dv">10</span>), <span class="at">hjust =</span> <span class="dv">1</span>),</span>
<span id="cb2-20">        <span class="co"># Add a light grey background to the facet titles, with no borders</span></span>
<span id="cb2-21">        <span class="at">strip.background =</span> <span class="fu">element_rect</span>(<span class="at">fill =</span> <span class="st">"grey90"</span>, <span class="at">color =</span> <span class="cn">NA</span>),</span>
<span id="cb2-22">        <span class="co"># Add a thin grey border around all the plots to tie in the facet titles</span></span>
<span id="cb2-23">        <span class="at">panel.border =</span> <span class="fu">element_rect</span>(<span class="at">color =</span> <span class="st">"grey90"</span>, <span class="at">fill =</span> <span class="cn">NA</span>))</span></code></pre></div></div>
</details>
</div>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb3"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb3-1">base_plot <span class="sc">+</span> </span>
<span id="cb3-2">  my_pretty_theme</span></code></pre></div></div>
</details>
<div class="cell-output-display">
<div>
<figure class="figure">
<p><img src="/media/projects/ggplot-annotations/unnamed-chunk-3-1.png" width="960" loading="lazy"></p>
</figure>
</div>
</div>
</div>
</section>
<section id="lets-make-this-plot-even-better-d" class="level2">
<h2 class="anchored" data-anchor-id="lets-make-this-plot-even-better-d">Lets make this plot even better :D</h2>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb4"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb4-1"><span class="fu">library</span>(tidyverse)</span>
<span id="cb4-2"><span class="fu">library</span>(gapminder)</span>
<span id="cb4-3"><span class="fu">library</span>(scales)</span>
<span id="cb4-4"><span class="fu">library</span>(ggtext)</span>
<span id="cb4-5"><span class="fu">library</span>(thematic)</span>
<span id="cb4-6"></span>
<span id="cb4-7">gapminder_filtered <span class="ot">&lt;-</span> gapminder <span class="sc">%&gt;%</span> </span>
<span id="cb4-8">  <span class="fu">filter</span>(year <span class="sc">&gt;</span> <span class="dv">2000</span>)</span>
<span id="cb4-9"></span>
<span id="cb4-10">colors <span class="ot">&lt;-</span> thematic<span class="sc">::</span><span class="fu">okabe_ito</span>(<span class="dv">5</span>)</span>
<span id="cb4-11">title_text <span class="ot">&lt;-</span> glue<span class="sc">::</span><span class="fu">glue</span>(</span>
<span id="cb4-12">  <span class="st">' Life Expectancy per GDP for &lt;span style = "color:{colors[1]}"&gt;**Africa**&lt;/span&gt;, &lt;span style = "color:{colors[2]}"&gt;**America**&lt;/span&gt;, &lt;span style = "color:{colors[3]}"&gt;**Asia**&lt;/span&gt;, &lt;br&gt; &lt;span style = "color:{colors[4]}"&gt;**Europa**&lt;/span&gt; and &lt;span style = "color:{colors[5]}"&gt;**Oceania**&lt;/span&gt;'</span></span>
<span id="cb4-13">)</span>
<span id="cb4-14"></span>
<span id="cb4-15">plot_nice <span class="ot">&lt;-</span> <span class="fu">ggplot</span>(<span class="at">data =</span> gapminder_filtered,</span>
<span id="cb4-16">                    <span class="at">mapping =</span> <span class="fu">aes</span>(<span class="at">x =</span> gdpPercap, <span class="at">y =</span> lifeExp, </span>
<span id="cb4-17">                                  <span class="at">color =</span> continent, <span class="at">size =</span> pop)) <span class="sc">+</span></span>
<span id="cb4-18">  <span class="fu">geom_point</span>() <span class="sc">+</span> </span>
<span id="cb4-19">  <span class="co"># Use dollars, and get rid of the cents part (i.e. $300 instead of $300.00)</span></span>
<span id="cb4-20">  <span class="co">#log10 scale = abstände nicht gleich(nicht-linear): x-1*x = x+1</span></span>
<span id="cb4-21">  <span class="fu">scale_x_log10</span>(<span class="at">labels =</span> <span class="fu">dollar_format</span>(<span class="at">accuracy =</span> <span class="dv">1</span>)) <span class="sc">+</span></span>
<span id="cb4-22">  <span class="co"># Format with commas (anstatt wissenschaftliche Notation für Population)</span></span>
<span id="cb4-23">  <span class="fu">scale_size_continuous</span>(<span class="at">labels =</span> comma) <span class="sc">+</span></span>
<span id="cb4-24">  <span class="co"># Use viridis color</span></span>
<span id="cb4-25">  <span class="fu">scale_color_viridis_d</span>(<span class="at">option =</span> <span class="st">"plasma"</span>, <span class="at">end =</span> <span class="fl">0.9</span>) <span class="sc">+</span></span>
<span id="cb4-26">  <span class="fu">labs</span>(<span class="at">x =</span> <span class="st">"GDP per capita"</span>, <span class="at">y =</span> <span class="st">"Life expectancy"</span>,</span>
<span id="cb4-27">       <span class="at">color =</span> <span class="st">"Continent"</span>, <span class="at">size =</span> <span class="st">"Population"</span>,</span>
<span id="cb4-28">       <span class="at">title =</span> title_text,</span>
<span id="cb4-29">       <span class="at">subtitle =</span> <span class="st">"Visible Correlation between GDP (per capita) and Life expecanty"</span>,</span>
<span id="cb4-30">       <span class="at">caption =</span> <span class="st">"Source: The Gapminder Project"</span>) <span class="sc">+</span></span>
<span id="cb4-31">  <span class="fu">facet_wrap</span>(<span class="fu">vars</span>(year))<span class="sc">+</span></span>
<span id="cb4-32"></span>
<span id="cb4-33">  <span class="fu">theme_minimal</span>(<span class="at">base_family =</span> <span class="st">'Source Sans Pro'</span>, <span class="at">base_size =</span> <span class="dv">12</span>) <span class="sc">+</span> </span>
<span id="cb4-34">  <span class="co">#guide = none, legend wird ausgelassen</span></span>
<span id="cb4-35">  <span class="fu">scale_color_manual</span>(<span class="at">values =</span> thematic<span class="sc">::</span><span class="fu">okabe_ito</span>(<span class="dv">5</span>), <span class="at">guide =</span> <span class="st">"none"</span>)<span class="sc">+</span></span>
<span id="cb4-36">  <span class="co">#grauere Hintergrund verschwindet+</span></span>
<span id="cb4-37">  <span class="fu">theme</span>(<span class="at">panel.grid.minor =</span> <span class="fu">element_blank</span>(),</span>
<span id="cb4-38">  <span class="co"># Plain, slightly bigger subtitle that is grey</span></span>
<span id="cb4-39">  <span class="at">plot.subtitle =</span> <span class="fu">element_text</span>(<span class="at">face =</span> <span class="st">"plain"</span>, <span class="at">size =</span> <span class="fu">rel</span>(<span class="fl">1.3</span>), <span class="at">color =</span> <span class="st">"grey70"</span>),</span>
<span id="cb4-40">  <span class="co"># Italic, smaller, grey caption that is left-aligned</span></span>
<span id="cb4-41">  <span class="at">plot.caption =</span> <span class="fu">element_text</span>(<span class="at">face =</span> <span class="st">"italic"</span>, <span class="at">size =</span> <span class="fu">rel</span>(<span class="fl">0.7</span>), </span>
<span id="cb4-42">                              <span class="at">color =</span> <span class="st">"grey70"</span>, <span class="at">hjust =</span> <span class="dv">0</span>),</span>
<span id="cb4-43">  <span class="co">#Bold legend titles</span></span>
<span id="cb4-44">  <span class="at">legend.title =</span> <span class="fu">element_text</span>(<span class="at">face =</span> <span class="st">"bold"</span>),</span>
<span id="cb4-45">  <span class="co"># Bold, slightly larger facet titles that are left-aligned for the sake of repetition</span></span>
<span id="cb4-46">  <span class="at">strip.text =</span> <span class="fu">element_text</span>(<span class="at">face =</span> <span class="st">"bold"</span>, <span class="at">size =</span> <span class="fu">rel</span>(<span class="fl">1.1</span>), <span class="at">hjust =</span> <span class="dv">0</span>, <span class="at">color =</span> <span class="st">"white"</span>),</span>
<span id="cb4-47">  <span class="at">plot.title =</span> ggtext<span class="sc">::</span><span class="fu">element_markdown</span>(</span>
<span id="cb4-48">    <span class="at">color =</span> <span class="st">'grey20'</span>, <span class="at">family =</span> <span class="st">'Merriweather'</span>, <span class="at">size =</span> <span class="fu">rel</span>(<span class="fl">1.7</span>),<span class="at">face =</span> <span class="st">"bold"</span></span>
<span id="cb4-49">  ),</span>
<span id="cb4-50">  <span class="at">plot.title.position =</span> <span class="st">"plot"</span>,</span>
<span id="cb4-51">  <span class="co"># Bold axis titles</span></span>
<span id="cb4-52">  <span class="at">axis.title =</span> <span class="fu">element_text</span>(<span class="at">face =</span> <span class="st">"bold"</span>),</span>
<span id="cb4-53">  <span class="co"># Add some space above the x-axis title and make it left-aligned</span></span>
<span id="cb4-54">  <span class="at">axis.title.x =</span> <span class="fu">element_text</span>(<span class="at">margin =</span> <span class="fu">margin</span>(<span class="at">t =</span> <span class="dv">10</span>), <span class="at">hjust =</span> <span class="dv">0</span>),</span>
<span id="cb4-55">  <span class="co"># Add some space to the right of the y-axis title and make it top-aligned</span></span>
<span id="cb4-56">  <span class="at">axis.title.y =</span> <span class="fu">element_text</span>(<span class="at">margin =</span> <span class="fu">margin</span>(<span class="at">r =</span> <span class="dv">10</span>), <span class="at">hjust =</span> <span class="dv">1</span>, <span class="fu">margin</span> (<span class="dv">0</span>,<span class="dv">4</span>,<span class="dv">0</span>,<span class="dv">0</span>)),</span>
<span id="cb4-57">  <span class="co"># Add a light grey background to the facet titles, with no borders</span></span>
<span id="cb4-58">  <span class="at">strip.background =</span> <span class="fu">element_rect</span>(<span class="at">fill =</span> <span class="st">"grey20"</span>, <span class="at">color =</span> <span class="cn">NA</span>),</span>
<span id="cb4-59">  <span class="co"># Add a thin grey border around all the plots to tie in the facet titles</span></span>
<span id="cb4-60">  <span class="at">panel.border =</span> <span class="fu">element_rect</span>(<span class="at">color =</span> <span class="st">"grey20"</span>, <span class="at">fill =</span> <span class="cn">NA</span>),</span>
<span id="cb4-61">  <span class="at">legend.position =</span> <span class="st">"top"</span>,</span>
<span id="cb4-62">  <span class="at">legend.justification =</span> <span class="dv">1</span>)</span>
<span id="cb4-63"></span>
<span id="cb4-64">plot_nice</span></code></pre></div></div>
</details>
<div class="cell-output-display">
<div>
<figure class="figure">
<p><img src="/media/projects/ggplot-annotations/unnamed-chunk-4-1.png" width="960" loading="lazy"></p>
</figure>
</div>
</div>
</div>
</section>
<section id="we-can-add-some-annotations" class="level2">
<h2 class="anchored" data-anchor-id="we-can-add-some-annotations">We can add some annotations</h2>
<p>Annotionations can be great to highlight information that gets lost otherwise. For example we see that South Africa increases its GDP per capita from 2002 to 2007 but life expectancy decreases by 4 years.</p>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb5"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb5-1"><span class="co">#find african country with dip in lifeexp: South Africa(2002: x = 7711 ,y= 53.4; 2007: x = 9270, y = 49.3)</span></span>
<span id="cb5-2">gapminder_filtered <span class="sc">|&gt;</span> </span>
<span id="cb5-3">  <span class="fu">filter</span>(continent <span class="sc">==</span> <span class="st">"Africa"</span> <span class="sc">&amp;</span> <span class="fu">between</span>(gdpPercap,<span class="dv">3000</span>,<span class="dv">10000</span>) <span class="sc">&amp;</span> <span class="fu">between</span>(lifeExp,<span class="dv">48</span>,<span class="dv">55</span>)) <span class="sc">|&gt;</span> <span class="fu">arrange</span>(<span class="fu">desc</span>(pop))</span></code></pre></div></div>
</details>
<div class="cell-output cell-output-stdout">
<pre><code># A tibble: 6 × 6
  country           continent  year lifeExp      pop gdpPercap
  &lt;fct&gt;             &lt;fct&gt;     &lt;int&gt;   &lt;dbl&gt;    &lt;int&gt;     &lt;dbl&gt;
1 South Africa      Africa     2002    53.4 44433622     7711.
2 South Africa      Africa     2007    49.3 43997828     9270.
3 Congo, Rep.       Africa     2002    53.0  3328795     3484.
4 Namibia           Africa     2007    52.9  2055080     4811.
5 Namibia           Africa     2002    51.5  1972153     4072.
6 Equatorial Guinea Africa     2002    49.3   495627     7703.</code></pre>
</div>
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb7"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb7-1"><span class="co"># creat df for different arrow coordinations</span></span>
<span id="cb7-2">df_2002 <span class="ot">&lt;-</span>  gapminder_filtered <span class="sc">%&gt;%</span></span>
<span id="cb7-3">  <span class="fu">filter</span>(year <span class="sc">==</span> <span class="dv">2002</span>) <span class="sc">%&gt;%</span> </span>
<span id="cb7-4">  <span class="fu">mutate</span>(</span>
<span id="cb7-5">    <span class="at">start_x =</span> <span class="dv">12000</span>,</span>
<span id="cb7-6">    <span class="at">end_x =</span> <span class="dv">9000</span>,</span>
<span id="cb7-7">    <span class="at">start_y =</span> <span class="dv">55</span>,</span>
<span id="cb7-8">    <span class="at">end_y =</span> <span class="fl">53.4</span></span>
<span id="cb7-9">  )</span>
<span id="cb7-10"></span>
<span id="cb7-11"><span class="co"># creat df for different arrow coordinations</span></span>
<span id="cb7-12">df_2007 <span class="ot">&lt;-</span>  gapminder_filtered <span class="sc">%&gt;%</span></span>
<span id="cb7-13">  <span class="fu">filter</span>(year <span class="sc">==</span> <span class="dv">2007</span>) <span class="sc">%&gt;%</span> </span>
<span id="cb7-14">  <span class="fu">mutate</span>(</span>
<span id="cb7-15">    <span class="at">start_x =</span> <span class="dv">12000</span>,</span>
<span id="cb7-16">    <span class="at">end_x =</span> <span class="dv">10000</span>,</span>
<span id="cb7-17">    <span class="at">start_y =</span> <span class="dv">55</span>,</span>
<span id="cb7-18">    <span class="at">end_y =</span> <span class="fl">49.3</span></span>
<span id="cb7-19">  )</span>
<span id="cb7-20"></span>
<span id="cb7-21"></span>
<span id="cb7-22"></span>
<span id="cb7-23">plot_nice_anno <span class="ot">&lt;-</span> plot_nice <span class="sc">+</span> <span class="fu">geom_label</span>(<span class="fu">aes</span>(<span class="at">x =</span> <span class="dv">12000</span>, <span class="at">y =</span> <span class="dv">55</span>, <span class="at">label =</span> <span class="st">"South Africa"</span>), </span>
<span id="cb7-24">                  <span class="at">hjust =</span> <span class="dv">0</span>, </span>
<span id="cb7-25">                  <span class="at">vjust =</span> <span class="fl">0.5</span>, </span>
<span id="cb7-26">                  <span class="at">lineheight =</span> <span class="fl">0.8</span>,</span>
<span id="cb7-27">                  <span class="at">colour =</span> colors[<span class="dv">1</span>], </span>
<span id="cb7-28">                  <span class="at">fill =</span> <span class="st">"white"</span>, </span>
<span id="cb7-29">                  <span class="at">label.size =</span> <span class="cn">NA</span>, </span>
<span id="cb7-30">                  <span class="at">size =</span> <span class="dv">5</span>)   <span class="sc">+</span></span>
<span id="cb7-31">  <span class="fu">geom_curve</span>(<span class="at">data =</span> df_2002, <span class="fu">aes</span>(<span class="at">x =</span> start_x, <span class="at">y =</span> start_y, <span class="at">xend =</span> end_x, <span class="at">yend =</span> end_y), </span>
<span id="cb7-32">             <span class="at">colour =</span> <span class="st">"grey20"</span>, </span>
<span id="cb7-33">             <span class="at">size=</span><span class="fl">0.8</span>, </span>
<span id="cb7-34">             <span class="at">curvature =</span> <span class="sc">-</span><span class="fl">0.2</span>,</span>
<span id="cb7-35">             <span class="at">arrow =</span> <span class="fu">arrow</span>(<span class="at">length =</span> <span class="fu">unit</span>(<span class="fl">0.03</span>, <span class="st">"npc"</span>))) <span class="sc">+</span> </span>
<span id="cb7-36">  <span class="fu">geom_curve</span>(<span class="at">data =</span> df_2007, <span class="fu">aes</span>(<span class="at">x =</span> start_x, <span class="at">y =</span> start_y, <span class="at">xend =</span> end_x, <span class="at">yend =</span> end_y), </span>
<span id="cb7-37">             <span class="at">colour =</span> <span class="st">"grey20"</span>, </span>
<span id="cb7-38">             <span class="at">size=</span><span class="fl">0.8</span>, </span>
<span id="cb7-39">             <span class="at">curvature =</span> <span class="sc">-</span><span class="fl">0.2</span>,</span>
<span id="cb7-40">             <span class="at">arrow =</span> <span class="fu">arrow</span>(<span class="at">length =</span> <span class="fu">unit</span>(<span class="fl">0.03</span>, <span class="st">"npc"</span>)))</span>
<span id="cb7-41">plot_nice_anno</span></code></pre></div></div>
</details>
<div class="cell-output-display">
<div>
<figure class="figure">
<p><img src="/media/projects/ggplot-annotations/unnamed-chunk-5-1.png" width="960" loading="lazy"></p>
</figure>
</div>
</div>
</div>
</section>
<section id="lets-keep-playing-around" class="level2">
<h2 class="anchored" data-anchor-id="lets-keep-playing-around">Lets keep playing around</h2>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb8"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb8-1">plot_nice_anno <span class="sc">+</span></span>
<span id="cb8-2">  <span class="fu">scale_y_continuous</span>(</span>
<span id="cb8-3">    <span class="at">breaks =</span> <span class="fu">c</span>(<span class="dv">4</span><span class="sc">:</span><span class="dv">7</span><span class="sc">*</span><span class="dv">10</span>, <span class="fu">seq</span>(<span class="dv">70</span>, <span class="dv">80</span>, <span class="at">by =</span> <span class="dv">2</span>))</span>
<span id="cb8-4">    ) <span class="sc">+</span> <span class="fu">coord_cartesian</span>(<span class="at">clip =</span> <span class="st">"off"</span>)</span></code></pre></div></div>
</details>
<div class="cell-output-display">
<div>
<figure class="figure">
<p><img src="/media/projects/ggplot-annotations/unnamed-chunk-6-1.png" width="960" loading="lazy"></p>
</figure>
</div>
</div>
</div>

</section>
</section>

<a onclick="window.scrollTo(0, 0); return false;" role="button" id="quarto-back-to-top"><i class="bi bi-arrow-up"></i> Back to top</a>
