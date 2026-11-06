---
title: "Building a company theme for ggplot2"
summary: "A reusable ggplot2 theme for consistent, on-brand charts."
year: 2023
kind: "Visualisation"
tags: ["ggplot2", "Design systems", "R"]
order: 11
cover: "/media/projects/company-theme/unnamed-chunk-2-1.png"
format: "html"
---
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb1"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb1-1"><span class="co">#Codes for colors of TX</span></span>
<span id="cb1-2">color_tx <span class="ot">&lt;-</span> <span class="fu">c</span>(<span class="st">"#04d790"</span>,<span class="st">"#061926"</span>,<span class="st">"#ecfcf4"</span>)</span>
<span id="cb1-3"></span>
<span id="cb1-4"></span>
<span id="cb1-5"><span class="co"># Plot</span></span>
<span id="cb1-6">p <span class="ot">&lt;-</span> <span class="fu">ggplot</span>(cars, <span class="fu">aes</span>(dist, speed))<span class="sc">+</span></span>
<span id="cb1-7">  <span class="fu">geom_point</span>(<span class="at">color =</span> color_tx[<span class="dv">1</span>], <span class="at">size =</span> <span class="dv">2</span>) <span class="sc">+</span></span>
<span id="cb1-8">  <span class="fu">theme_minimal</span>()<span class="sc">+</span></span>
<span id="cb1-9">  <span class="fu">theme</span>(<span class="at">plot.background =</span> <span class="fu">element_rect</span>(<span class="at">fill =</span> color_tx[<span class="dv">2</span>]),</span>
<span id="cb1-10">        <span class="at">axis.title =</span> <span class="fu">element_text</span>(<span class="at">face =</span> <span class="st">"bold"</span>, <span class="at">color =</span> <span class="st">"white"</span>),</span>
<span id="cb1-11">        <span class="at">axis.text =</span> <span class="fu">element_text</span>(<span class="at">color =</span> <span class="st">"grey90"</span>),</span>
<span id="cb1-12">        <span class="at">panel.grid.minor =</span> <span class="fu">element_blank</span>(),</span>
<span id="cb1-13">        <span class="at">panel.grid.major =</span> <span class="fu">element_line</span>(<span class="at">size =</span> <span class="fl">0.5</span>, <span class="at">color =</span> <span class="st">"grey90"</span>)) </span></code></pre></div></div>
</details>
<div class="cell-output cell-output-stderr">
<pre><code>Warning: The `size` argument of `element_line()` is deprecated as of ggplot2 3.4.0.
ℹ Please use the `linewidth` argument instead.</code></pre>
</div>
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb3"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb3-1"><span class="co"># Theme        </span></span>
<span id="cb3-2">tx_theme <span class="ot">&lt;-</span> <span class="fu">theme_minimal</span>(<span class="at">base_size =</span> <span class="dv">18</span>) <span class="sc">+</span></span>
<span id="cb3-3">  <span class="fu">theme</span>(<span class="at">panel.grid.minor =</span> <span class="fu">element_blank</span>(),</span>
<span id="cb3-4">        <span class="at">panel.grid.major =</span> <span class="fu">element_line</span>(<span class="at">color =</span> <span class="st">"grey70"</span>,<span class="at">linetype =</span> <span class="dv">1</span>),</span>
<span id="cb3-5">        <span class="co"># Bold, bigger title</span></span>
<span id="cb3-6">        <span class="at">plot.title =</span> <span class="fu">element_text</span>(<span class="at">face =</span> <span class="st">"bold"</span>, <span class="at">size =</span> <span class="fu">rel</span>(<span class="fl">1.7</span>), <span class="at">color =</span> <span class="st">"#04d790"</span>),</span>
<span id="cb3-7">        <span class="co"># Plain, slightly bigger subtitle that is grey</span></span>
<span id="cb3-8">        <span class="at">plot.subtitle =</span> <span class="fu">element_text</span>(<span class="at">face =</span> <span class="st">"plain"</span>, <span class="at">size =</span> <span class="fu">rel</span>(<span class="fl">1.3</span>), <span class="at">color =</span> <span class="st">"grey70"</span>),</span>
<span id="cb3-9">        <span class="co"># Italic, smaller, grey caption that is left-aligned</span></span>
<span id="cb3-10">        <span class="at">plot.caption =</span> <span class="fu">element_text</span>(<span class="at">face =</span> <span class="st">"italic"</span>, <span class="at">size =</span> <span class="fu">rel</span>(<span class="fl">0.7</span>),</span>
<span id="cb3-11">                                    <span class="at">color =</span> <span class="st">"grey70"</span>, <span class="at">hjust =</span> <span class="dv">0</span>),</span>
<span id="cb3-12">        <span class="co"># Title left</span></span>
<span id="cb3-13">        <span class="at">plot.title.position =</span> <span class="st">"plot"</span>,</span>
<span id="cb3-14">        <span class="co"># Bold legend titles</span></span>
<span id="cb3-15">        <span class="at">legend.title =</span> <span class="fu">element_text</span>(<span class="at">face =</span> <span class="st">"bold"</span>),</span>
<span id="cb3-16">        <span class="co"># Bold, slightly larger facet titles that are left-aligned for the sake of repetition</span></span>
<span id="cb3-17">        <span class="co">#strip.text = element_text(face = "bold", size = rel(1.1), hjust = 0),</span></span>
<span id="cb3-18">        <span class="co"># Bold axis titles</span></span>
<span id="cb3-19">        <span class="at">axis.title =</span> <span class="fu">element_text</span>(<span class="at">face =</span> <span class="st">"bold"</span>, <span class="at">color =</span> <span class="st">"White"</span>),</span>
<span id="cb3-20">        <span class="co"># Tex color</span></span>
<span id="cb3-21">        <span class="at">axis.text =</span> <span class="fu">element_text</span>(<span class="at">color =</span> <span class="st">"grey70"</span>),</span>
<span id="cb3-22">        <span class="co"># Add some space above the x-axis title and make it left-aligned</span></span>
<span id="cb3-23">        <span class="at">axis.title.x =</span> <span class="fu">element_text</span>(<span class="at">margin =</span> <span class="fu">margin</span>(<span class="at">t =</span> <span class="dv">15</span>), <span class="at">hjust =</span> <span class="dv">0</span>),</span>
<span id="cb3-24">        <span class="co"># Add some space to the right of the y-axis title and make it top-aligned</span></span>
<span id="cb3-25">        <span class="at">axis.title.y =</span> <span class="fu">element_text</span>(<span class="at">margin =</span> <span class="fu">margin</span>(<span class="at">r =</span> <span class="dv">15</span>), <span class="at">hjust =</span> <span class="dv">1</span>),</span>
<span id="cb3-26">        <span class="co"># Add a light grey background to the facet titles, with no borders</span></span>
<span id="cb3-27">        <span class="co">#strip.background = element_rect(fill = "grey90", color = NA),</span></span>
<span id="cb3-28">        <span class="co"># Add a thin grey border around all the plots to tie in the facet titles</span></span>
<span id="cb3-29">        <span class="co">#panel.border = element_rect(color = "grey90", fill = NA),</span></span>
<span id="cb3-30">        <span class="co"># Add color TX</span></span>
<span id="cb3-31">        <span class="at">plot.background =</span> <span class="fu">element_rect</span>(<span class="at">fill =</span> color_tx[<span class="dv">2</span>]),</span>
<span id="cb3-32">        <span class="at">plot.margin =</span> <span class="fu">margin</span>(<span class="fu">rep</span>(<span class="dv">18</span>, <span class="dv">4</span>))) </span>
<span id="cb3-33"></span>
<span id="cb3-34">       </span>
<span id="cb3-35"></span>
<span id="cb3-36"></span>
<span id="cb3-37"></span>
<span id="cb3-38"><span class="co"># plot Scatter</span></span>
<span id="cb3-39">p <span class="ot">&lt;-</span> <span class="fu">ggplot</span>(cars, <span class="fu">aes</span>(dist, speed)) <span class="sc">+</span></span>
<span id="cb3-40">  <span class="fu">geom_point</span>(<span class="at">color =</span> <span class="st">"#04d790"</span>, <span class="at">size =</span> <span class="dv">2</span>) <span class="sc">+</span></span>
<span id="cb3-41">  <span class="fu">labs</span>(</span>
<span id="cb3-42">    <span class="at">title =</span> <span class="st">"Test, here goes title"</span>,</span>
<span id="cb3-43">    <span class="at">x =</span> <span class="st">"Distance"</span>,</span>
<span id="cb3-44">    <span class="at">y =</span> <span class="st">"Speed"</span>,</span>
<span id="cb3-45">    <span class="at">subtitle =</span> <span class="st">"Subtitle"</span>,</span>
<span id="cb3-46">    <span class="at">caption =</span> <span class="st">"Data:  Test data"</span>) <span class="sc">+</span></span>
<span id="cb3-47">  <span class="fu">scale_x_continuous</span>(<span class="at">limits =</span> <span class="fu">c</span>(<span class="sc">-</span><span class="dv">5</span>,<span class="dv">125</span>))  <span class="sc">+</span></span>
<span id="cb3-48">  tx_theme  </span>
<span id="cb3-49"></span>
<span id="cb3-50"><span class="co"># plot Bar</span></span>
<span id="cb3-51">cars <span class="ot">&lt;-</span> cars <span class="sc">%&gt;%</span> <span class="fu">mutate</span>(<span class="at">fast =</span> <span class="fu">factor</span>(<span class="fu">ifelse</span>(speed <span class="sc">&gt;</span> <span class="fu">median</span>(speed), <span class="dv">1</span>,<span class="dv">0</span>)))</span>
<span id="cb3-52">p <span class="ot">&lt;-</span> <span class="fu">ggplot</span>(cars, <span class="fu">aes</span>(fast,dist)) <span class="sc">+</span></span>
<span id="cb3-53">  <span class="fu">geom_col</span>(<span class="at">fill =</span> color_tx[<span class="dv">1</span>]) <span class="sc">+</span></span>
<span id="cb3-54">  <span class="fu">scale_x_discrete</span>(<span class="at">labels=</span><span class="fu">c</span>(<span class="st">'Slow'</span>, <span class="st">'Fast'</span>))<span class="sc">+</span></span>
<span id="cb3-55">  tx_theme</span>
<span id="cb3-56"></span>
<span id="cb3-57"><span class="co"># Plot uncertainty</span></span>
<span id="cb3-58"></span>
<span id="cb3-59">p <span class="ot">&lt;-</span> <span class="fu">ggplot</span>(cars, <span class="fu">aes</span>(fast,dist)) <span class="sc">+</span></span>
<span id="cb3-60">  <span class="fu">geom_boxplot</span>(<span class="at">fill =</span> color_tx[<span class="dv">1</span>]) <span class="sc">+</span></span>
<span id="cb3-61">  <span class="fu">scale_x_discrete</span>(<span class="at">labels=</span><span class="fu">c</span>(<span class="st">'Slow'</span>, <span class="st">'Fast'</span>))<span class="sc">+</span></span>
<span id="cb3-62">  tx_theme</span></code></pre></div></div>
</details>
</div>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb4"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb4-1">p <span class="ot">&lt;-</span> <span class="fu">ggplot</span>(cars, <span class="fu">aes</span>(fast,dist)) <span class="sc">+</span></span>
<span id="cb4-2">  <span class="fu">geom_boxplot</span>(<span class="at">col =</span> <span class="st">"white"</span>, <span class="at">fill =</span> color_tx[<span class="dv">1</span>], <span class="at">linewidth =</span> <span class="fl">1.5</span>, <span class="at">fatten =</span> <span class="dv">1</span>, <span class="at">outlier.size =</span> <span class="dv">3</span>) <span class="sc">+</span></span>
<span id="cb4-3">  <span class="fu">scale_x_discrete</span>(<span class="at">labels=</span><span class="fu">c</span>(<span class="st">'Slow'</span>, <span class="st">'Fast'</span>))<span class="sc">+</span></span>
<span id="cb4-4">  <span class="do">## use either geom_point() or geom_jitter()</span></span>
<span id="cb4-5">  <span class="fu">geom_point</span>(</span>
<span id="cb4-6">    <span class="at">size =</span> <span class="dv">3</span>,</span>
<span id="cb4-7">    <span class="at">alpha =</span> .<span class="dv">5</span>,</span>
<span id="cb4-8">    <span class="at">color =</span> color_tx[<span class="dv">3</span>],</span>
<span id="cb4-9">    <span class="at">position =</span> <span class="fu">position_jitter</span>(</span>
<span id="cb4-10">      <span class="do">## control randomness and range of jitter</span></span>
<span id="cb4-11">      <span class="at">seed =</span> <span class="dv">1</span>, <span class="at">width =</span> .<span class="dv">2</span></span>
<span id="cb4-12">    ))   <span class="sc">+</span></span>
<span id="cb4-13">  <span class="fu">labs</span>(</span>
<span id="cb4-14">    <span class="at">title =</span> <span class="st">"Boxplots: Distance for Fast and Slow Cars"</span>,</span>
<span id="cb4-15">    <span class="at">subtitle =</span> <span class="st">"Dataset Cars"</span>,</span>
<span id="cb4-16">    <span class="at">y =</span> <span class="st">"Distance"</span></span>
<span id="cb4-17">  ) <span class="sc">+</span></span>
<span id="cb4-18">  tx_theme <span class="sc">+</span> </span>
<span id="cb4-19">  <span class="fu">theme</span>(<span class="at">panel.grid.major =</span> <span class="fu">element_line</span>(<span class="at">linetype =</span> <span class="dv">2</span>),</span>
<span id="cb4-20">                            <span class="at">panel.grid.major.x =</span> <span class="fu">element_blank</span>(),</span>
<span id="cb4-21">        <span class="at">axis.title.x =</span> <span class="fu">element_blank</span>(),</span>
<span id="cb4-22">        <span class="at">axis.text.x =</span> <span class="fu">element_text</span>(<span class="at">face =</span> <span class="st">"bold"</span>, <span class="at">size =</span> <span class="dv">20</span>, <span class="at">color =</span> <span class="st">"white"</span> ),</span>
<span id="cb4-23">        <span class="at">axis.title.y =</span> <span class="fu">element_text</span>(<span class="at">size =</span> <span class="dv">20</span>),</span>
<span id="cb4-24">        <span class="at">plot.margin=</span><span class="fu">unit</span>(<span class="fu">c</span>(<span class="dv">1</span>,<span class="dv">1</span>,<span class="dv">1</span>,<span class="dv">1</span>), <span class="st">'cm'</span>),</span>
<span id="cb4-25">        <span class="at">plot.subtitle =</span> <span class="fu">element_text</span>(<span class="at">margin=</span><span class="fu">margin</span>(<span class="dv">0</span>,<span class="dv">0</span>,<span class="dv">30</span>,<span class="dv">0</span>))) </span>
<span id="cb4-26"></span>
<span id="cb4-27">p</span></code></pre></div></div>
</details>
<div class="cell-output-display">
<div>
<figure class="figure">
<p><img src="/media/projects/company-theme/unnamed-chunk-2-1.png" width="960" loading="lazy"></p>
</figure>
</div>
</div>
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb5"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb5-1"><span class="co">#ggsave(here::here("posts","Theme", "box.svg"), width = 10, height = 7)</span></span></code></pre></div></div>
</details>
</div>

<a onclick="window.scrollTo(0, 0); return false;" role="button" id="quarto-back-to-top"><i class="bi bi-arrow-up"></i> Back to top</a>
