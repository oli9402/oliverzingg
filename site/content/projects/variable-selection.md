---
title: "How sample size affects variable selection"
summary: "A simulation of how often lm() and stepwise selection pick the true predictors as the sample grows."
year: 2022
kind: "Simulation"
tags: ["Simulation", "Regression", "R"]
order: 8
cover: "/media/projects/variable-selection/jacksonj.jpg"
format: "html"
---
<p>With this exercise we want to inspect how <strong>lm function</strong> and <strong>step function</strong> vary when it comes to selection of correct variables depending on sample size.</p>
<p>Foto von <a href="https://unsplash.com/de/@jacksonjost?utm_content=creditCopyText&amp;utm_medium=referral&amp;utm_source=unsplash" target="_blank" rel="noopener">Jackson Jost</a> auf <a href="https://unsplash.com/de/fotos/tjKSTwb4mnI?utm_content=creditCopyText&amp;utm_medium=referral&amp;utm_source=unsplash" target="_blank" rel="noopener">Unsplash</a></p>
<section id="generate-data" class="level2">
<h2 class="anchored" data-anchor-id="generate-data">Generate Data</h2>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb1"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb1-1"><span class="co"># Load packages </span></span>
<span id="cb1-2"><span class="fu">library</span>(lme4)</span>
<span id="cb1-3"><span class="fu">library</span>(dplyr)</span>
<span id="cb1-4"><span class="fu">library</span>(ggplot2)</span>
<span id="cb1-5"></span>
<span id="cb1-6"><span class="fu">options</span>(<span class="at">scipen=</span><span class="dv">0</span>)</span>
<span id="cb1-7"><span class="fu">set.seed</span>(<span class="dv">101</span>)</span>
<span id="cb1-8"></span>
<span id="cb1-9"><span class="co"># Variable and Dataset preparation</span></span>
<span id="cb1-10">N <span class="ot">&lt;-</span> <span class="fu">c</span>(<span class="dv">25</span>, <span class="dv">30</span>, <span class="dv">40</span>, <span class="dv">60</span>, <span class="dv">100</span> ,<span class="dv">500</span>, <span class="dv">1000</span>)</span>
<span id="cb1-11"><span class="co"># create a data frame to later add which variables were selected </span></span>
<span id="cb1-12">predi_selection_lm <span class="ot">&lt;-</span> <span class="fu">as.data.frame</span>(<span class="fu">matrix</span>(<span class="cn">NA</span>, <span class="at">nrow =</span> <span class="dv">19</span>, <span class="at">ncol =</span> <span class="fu">length</span>(N)))</span>
<span id="cb1-13">predi_selection_step <span class="ot">&lt;-</span> <span class="fu">as.data.frame</span>(<span class="fu">matrix</span>(<span class="cn">NA</span>, <span class="at">nrow =</span> <span class="dv">19</span>, <span class="at">ncol =</span> <span class="fu">length</span>(N)))</span>
<span id="cb1-14"></span>
<span id="cb1-15"><span class="fu">names</span>(predi_selection_lm ) <span class="ot">&lt;-</span> <span class="fu">c</span>(<span class="st">"N25"</span>, <span class="st">"N30"</span>, <span class="st">"N40"</span>, <span class="st">"N60"</span>, <span class="st">"N100"</span>, <span class="st">"N500"</span>, <span class="st">"N1000"</span>)</span>
<span id="cb1-16"><span class="fu">names</span>(predi_selection_step ) <span class="ot">&lt;-</span> <span class="fu">c</span>(<span class="st">"N25"</span>, <span class="st">"N30"</span>, <span class="st">"N40"</span>, <span class="st">"N60"</span>, <span class="st">"N100"</span>, <span class="st">"N500"</span>, <span class="st">"N1000"</span>)</span>
<span id="cb1-17"></span>
<span id="cb1-18"><span class="co">#counter to use as index for table predi_selection (loop)</span></span>
<span id="cb1-19">a <span class="ot">=</span> <span class="dv">1</span></span>
<span id="cb1-20"></span>
<span id="cb1-21"><span class="co">#loop over different N (sample size)</span></span>
<span id="cb1-22"><span class="cf">for</span>(i <span class="cf">in</span> N){</span>
<span id="cb1-23">  <span class="co"># Simulation dataset</span></span>
<span id="cb1-24">  x1 <span class="ot">&lt;-</span> <span class="fu">runif</span>(i, <span class="dv">0</span>, <span class="dv">10</span>)</span>
<span id="cb1-25">  x2 <span class="ot">&lt;-</span> <span class="fu">runif</span>(i, <span class="dv">0</span>, <span class="dv">10</span>)</span>
<span id="cb1-26">  x3 <span class="ot">&lt;-</span> <span class="fu">runif</span>(i, <span class="dv">0</span>, <span class="dv">10</span>)</span>
<span id="cb1-27">  x4 <span class="ot">&lt;-</span> <span class="fu">runif</span>(i, <span class="dv">0</span>, <span class="dv">10</span>)</span>
<span id="cb1-28">  x5 <span class="ot">&lt;-</span> <span class="fu">runif</span>(i, <span class="dv">0</span>, <span class="dv">10</span>)</span>
<span id="cb1-29">  x6 <span class="ot">&lt;-</span> <span class="fu">runif</span>(i, <span class="dv">0</span>, <span class="dv">10</span>)</span>
<span id="cb1-30">  x7 <span class="ot">&lt;-</span> <span class="fu">runif</span>(i, <span class="dv">0</span>, <span class="dv">10</span>)</span>
<span id="cb1-31">  x8 <span class="ot">&lt;-</span> <span class="fu">runif</span>(i, <span class="dv">0</span>, <span class="dv">10</span>)</span>
<span id="cb1-32">  x9 <span class="ot">&lt;-</span> <span class="fu">runif</span>(i, <span class="dv">0</span>, <span class="dv">10</span>)</span>
<span id="cb1-33">  x10 <span class="ot">&lt;-</span> <span class="fu">runif</span>(i, <span class="dv">0</span>, <span class="dv">10</span>)</span>
<span id="cb1-34">  x11 <span class="ot">&lt;-</span> <span class="fu">runif</span>(i, <span class="dv">0</span>, <span class="dv">10</span>)</span>
<span id="cb1-35">  x12 <span class="ot">&lt;-</span> <span class="fu">runif</span>(i, <span class="dv">0</span>, <span class="dv">10</span>)</span>
<span id="cb1-36">  x13 <span class="ot">&lt;-</span> <span class="fu">runif</span>(i, <span class="dv">0</span>, <span class="dv">10</span>)</span>
<span id="cb1-37">  x14 <span class="ot">&lt;-</span> <span class="fu">runif</span>(i, <span class="dv">0</span>, <span class="dv">10</span>)</span>
<span id="cb1-38">  x15 <span class="ot">&lt;-</span> <span class="fu">runif</span>(i, <span class="dv">0</span>, <span class="dv">10</span>)</span>
<span id="cb1-39">  x16 <span class="ot">&lt;-</span> <span class="fu">runif</span>(i, <span class="dv">0</span>, <span class="dv">10</span>)</span>
<span id="cb1-40">  x17 <span class="ot">&lt;-</span> <span class="fu">runif</span>(i, <span class="dv">0</span>, <span class="dv">10</span>)</span>
<span id="cb1-41">  x18 <span class="ot">&lt;-</span> <span class="fu">runif</span>(i, <span class="dv">0</span>, <span class="dv">10</span>)</span>
<span id="cb1-42">  x19 <span class="ot">&lt;-</span> <span class="fu">runif</span>(i, <span class="dv">0</span>, <span class="dv">10</span>)</span>
<span id="cb1-43">  err <span class="ot">&lt;-</span> <span class="fu">runif</span>(i, <span class="dv">0</span>, <span class="dv">5</span>)</span>
<span id="cb1-44">  </span>
<span id="cb1-45">  data <span class="ot">&lt;-</span> <span class="fu">cbind</span>(x1,x2,x3,x4,x5,x6, x7, x8, x9 ,x10, x11, x12, x13, x14, x15, x16, x17, x18, x19,  err)</span>
<span id="cb1-46">  data <span class="ot">&lt;-</span> <span class="fu">as.data.frame</span>(data)</span>
<span id="cb1-47"> </span>
<span id="cb1-48">  <span class="co"># generate y values.</span></span>
<span id="cb1-49">  y <span class="ot">&lt;-</span> <span class="dv">30</span> <span class="sc">+</span> <span class="fl">0.4</span><span class="sc">*</span>x1 <span class="sc">+</span> <span class="dv">1</span><span class="sc">*</span>x2 <span class="sc">+</span> <span class="fl">2.3</span><span class="sc">*</span>x3 <span class="sc">+</span> <span class="fl">0.7</span><span class="sc">*</span>x4 <span class="sc">+</span> <span class="fl">0.2</span><span class="sc">*</span>x5  <span class="sc">+</span> <span class="dv">1</span><span class="sc">*</span>x6 <span class="sc">+</span> <span class="dv">2</span><span class="sc">*</span>x7 <span class="sc">+</span> <span class="dv">3</span><span class="sc">*</span>x8 <span class="sc">+</span> <span class="fl">1.5</span> <span class="sc">*</span>x9 <span class="sc">+</span> <span class="fl">0.5</span><span class="sc">*</span>x10 <span class="sc">+</span> err</span>
<span id="cb1-50">  </span>
<span id="cb1-51">  <span class="co"># add generated y values to data frame</span></span>
<span id="cb1-52">  data_2 <span class="ot">&lt;-</span> <span class="fu">cbind</span>(data, y)</span>
<span id="cb1-53">  </span>
<span id="cb1-54">  <span class="co"># Modelling with all variables as predi.</span></span>
<span id="cb1-55">  mod <span class="ot">&lt;-</span> <span class="fu">lm</span>(y<span class="sc">~</span> x1 <span class="sc">+</span> x2 <span class="sc">+</span> x3 <span class="sc">+</span> x4 <span class="sc">+</span> x5 <span class="sc">+</span> x5 <span class="sc">+</span>x6 <span class="sc">+</span> x7 <span class="sc">+</span> x8 <span class="sc">+</span> x9 <span class="sc">+</span> x10 <span class="sc">+</span> x11 <span class="sc">+</span> x12 <span class="sc">+</span> x13 <span class="sc">+</span> x14 <span class="sc">+</span> x15 <span class="sc">+</span> x16 <span class="sc">+</span> x17 <span class="sc">+</span> x18 <span class="sc">+</span> x19, <span class="at">data =</span>  data_2)</span>
<span id="cb1-56">  <span class="fu">summary</span>(mod)</span>
<span id="cb1-57">  </span>
<span id="cb1-58">  <span class="do">########################</span></span>
<span id="cb1-59">  <span class="co">#lets try step function#</span></span>
<span id="cb1-60">  <span class="do">########################</span></span>
<span id="cb1-61"> </span>
<span id="cb1-62"></span>
<span id="cb1-63">  <span class="co"># use step function and save final model as stepwise_model</span></span>
<span id="cb1-64">  stepwise_model <span class="ot">&lt;-</span>  <span class="fu">step</span>(mod)</span>
<span id="cb1-65"></span>
<span id="cb1-66">  </span>
<span id="cb1-67">  <span class="co"># Extract p-val: lm</span></span>
<span id="cb1-68">  p_val_lm <span class="ot">&lt;-</span> (<span class="fu">summary</span>(mod)<span class="sc">$</span>coefficients[,<span class="dv">4</span>])</span>
<span id="cb1-69">  p_val_lm <span class="ot">&lt;-</span> p_val_lm[<span class="dv">2</span><span class="sc">:</span><span class="dv">20</span>] <span class="co">#take out intercept</span></span>
<span id="cb1-70">  </span>
<span id="cb1-71">  <span class="co"># Extract p-val: step</span></span>
<span id="cb1-72">  p_val_step <span class="ot">&lt;-</span> <span class="fu">summary</span>(stepwise_model)<span class="sc">$</span>coefficients[,<span class="dv">4</span>]</span>
<span id="cb1-73">  p_val_step <span class="ot">&lt;-</span> p_val_step[<span class="dv">2</span><span class="sc">:</span><span class="dv">20</span>] <span class="co">#take out intercept</span></span>
<span id="cb1-74">  </span>
<span id="cb1-75">  <span class="co"># Store value: lm </span></span>
<span id="cb1-76">  predi_selection_lm[a] <span class="ot">&lt;-</span> <span class="fu">ifelse</span>(p_val_lm <span class="sc">&lt;</span> <span class="fl">0.05</span>, <span class="dv">1</span>, <span class="dv">0</span>)</span>
<span id="cb1-77">  </span>
<span id="cb1-78">  <span class="co">#store values for step different, because summary output dosen't include all variable like in lm </span></span>
<span id="cb1-79">  p_val_step <span class="ot">&lt;-</span>  <span class="fu">na.omit</span>(<span class="fu">ifelse</span>(p_val_step <span class="sc">&lt;</span> <span class="fl">0.05</span>, <span class="dv">1</span>, <span class="dv">0</span>))</span>
<span id="cb1-80"> </span>
<span id="cb1-81">   <span class="co">#remove selected pred. without 0.05</span></span>
<span id="cb1-82">  p_val_step <span class="ot">&lt;-</span> p_val_step[<span class="sc">!</span> p_val_step <span class="sc">%in%</span> <span class="dv">0</span>]</span>
<span id="cb1-83">  </span>
<span id="cb1-84">  <span class="co"># save the names of all selected coefficients as coes</span></span>
<span id="cb1-85">  coes <span class="ot">&lt;-</span> <span class="fu">names</span>(p_val_step)</span>
<span id="cb1-86">  </span>
<span id="cb1-87">  <span class="co"># create dummy var with all possible variables </span></span>
<span id="cb1-88">  dummy_var <span class="ot">&lt;-</span> <span class="fu">c</span>(<span class="st">'x1'</span>,<span class="st">'x2'</span>,<span class="st">'x3'</span>,<span class="st">'x4'</span>,<span class="st">'x5'</span>,<span class="st">'x6'</span>,<span class="st">'x7'</span>,<span class="st">'x8'</span>,<span class="st">'x9'</span>,<span class="st">'x10'</span>,<span class="st">'x11'</span>,<span class="st">'x12'</span>,<span class="st">'x13'</span>,<span class="st">'x14'</span>,<span class="st">'x15'</span>,<span class="st">'x16'</span>,<span class="st">'x17'</span>,<span class="st">'x18'</span>,<span class="st">'x19'</span>)</span>
<span id="cb1-89">  </span>
<span id="cb1-90">  <span class="co"># which out of all possible variable have been selected? </span></span>
<span id="cb1-91">  selected_coe <span class="ot">&lt;-</span> <span class="fu">ifelse</span>(dummy_var <span class="sc">%in%</span> coes, <span class="dv">1</span>,<span class="dv">0</span>)</span>
<span id="cb1-92">  </span>
<span id="cb1-93">  predi_selection_step[a] <span class="ot">&lt;-</span> selected_coe</span>
<span id="cb1-94">  </span>
<span id="cb1-95">  <span class="co">#increase counter by one</span></span>
<span id="cb1-96">  a <span class="ot">=</span> a <span class="sc">+</span> <span class="dv">1</span></span>
<span id="cb1-97">}</span>
<span id="cb1-98"></span>
<span id="cb1-99"><span class="co"># Summary accuracy predictors selection</span></span>
<span id="cb1-100">true_pred_dummy <span class="ot">&lt;-</span> <span class="fu">c</span>(<span class="dv">1</span>,<span class="dv">1</span>,<span class="dv">1</span>,<span class="dv">1</span>,<span class="dv">1</span>,<span class="dv">1</span>,<span class="dv">1</span>,<span class="dv">1</span>,<span class="dv">1</span>,<span class="dv">1</span>,<span class="dv">0</span>,<span class="dv">0</span>,<span class="dv">0</span>,<span class="dv">0</span>,<span class="dv">0</span>,<span class="dv">0</span>,<span class="dv">0</span>,<span class="dv">0</span>,<span class="dv">0</span>) <span class="co">#dummy code for the existing predictor </span></span>
<span id="cb1-101"></span>
<span id="cb1-102"><span class="co"># new data frame to compare true predi. to selected predi.</span></span>
<span id="cb1-103">predi_accuracy_lm <span class="ot">&lt;-</span> <span class="fu">data.frame</span>(<span class="fu">matrix</span>(<span class="cn">NA</span>, <span class="at">nrow =</span> <span class="dv">19</span>, <span class="at">ncol =</span> <span class="fu">length</span>(N)))</span>
<span id="cb1-104"><span class="fu">names</span>(predi_accuracy_lm) <span class="ot">&lt;-</span> <span class="fu">c</span>(<span class="st">"N25"</span>, <span class="st">"N30"</span>, <span class="st">"N40"</span>, <span class="st">"N60"</span>, <span class="st">"N100"</span>, <span class="st">"N500"</span>, <span class="st">"N1000"</span>)</span>
<span id="cb1-105"></span>
<span id="cb1-106">predi_accuracy_step <span class="ot">&lt;-</span> <span class="fu">data.frame</span>(<span class="fu">matrix</span>(<span class="cn">NA</span>, <span class="at">nrow =</span> <span class="dv">19</span>, <span class="at">ncol =</span> <span class="fu">length</span>(N)))</span>
<span id="cb1-107"><span class="fu">names</span>(predi_accuracy_step) <span class="ot">&lt;-</span> <span class="fu">c</span>(<span class="st">"N25"</span>, <span class="st">"N30"</span>, <span class="st">"N40"</span>, <span class="st">"N60"</span>, <span class="st">"N100"</span>, <span class="st">"N500"</span>, <span class="st">"N1000"</span>)</span>
<span id="cb1-108"></span>
<span id="cb1-109"><span class="co">#if all correct than coloumn all 1. </span></span>
<span id="cb1-110"><span class="cf">for</span> (j <span class="cf">in</span> <span class="dv">1</span><span class="sc">:</span><span class="fu">length</span>(N)){</span>
<span id="cb1-111">  predi_accuracy_lm[j] <span class="ot">&lt;-</span> <span class="fu">ifelse</span>(predi_selection_lm[j] <span class="sc">==</span> true_pred_dummy, <span class="dv">1</span>,<span class="dv">0</span>)</span>
<span id="cb1-112">  predi_accuracy_step[j] <span class="ot">&lt;-</span> <span class="fu">ifelse</span>(predi_selection_step[j] <span class="sc">==</span> true_pred_dummy, <span class="dv">1</span>,<span class="dv">0</span>)</span>
<span id="cb1-113">}</span></code></pre></div></div>
</details>
</div>
</section>
<section id="now-lets-visualize-these-results" class="level2">
<h2 class="anchored" data-anchor-id="now-lets-visualize-these-results">Now lets visualize these results</h2>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb2"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb2-1"><span class="co"># final data frame used for visualization</span></span>
<span id="cb2-2">sample_s <span class="ot">&lt;-</span> <span class="fu">c</span>(<span class="st">"N25"</span>, <span class="st">"N30"</span>, <span class="st">"N40"</span>, <span class="st">"N60"</span>, <span class="st">"N100"</span>, <span class="st">"N500"</span>, <span class="st">"N1000"</span>)</span>
<span id="cb2-3">summary_accuracy <span class="ot">&lt;-</span> <span class="fu">data.frame</span>(<span class="fu">cbind</span>(sample_s,<span class="fu">rep</span>(<span class="cn">NA</span>, <span class="at">times =</span> <span class="fu">length</span>(sample_s)),<span class="fu">rep</span>(<span class="cn">NA</span>, <span class="at">times =</span> <span class="fu">length</span>(sample_s))))</span>
<span id="cb2-4"><span class="fu">names</span>(summary_accuracy) <span class="ot">&lt;-</span> <span class="fu">c</span>(<span class="st">"sample_s"</span>, <span class="st">"accuracy_lm"</span>, <span class="st">"accuracy_step"</span>)</span>
<span id="cb2-5"></span>
<span id="cb2-6"></span>
<span id="cb2-7"></span>
<span id="cb2-8"><span class="cf">for</span>( i <span class="cf">in</span> <span class="dv">1</span><span class="sc">:</span> <span class="fu">nrow</span>(summary_accuracy)){</span>
<span id="cb2-9">  summary_accuracy[i,<span class="dv">2</span>] <span class="ot">&lt;-</span>  <span class="fu">mean</span>(predi_accuracy_lm[,i])</span>
<span id="cb2-10">  summary_accuracy[i,<span class="dv">3</span>] <span class="ot">&lt;-</span>  <span class="fu">mean</span>(predi_accuracy_step[,i])</span>
<span id="cb2-11"></span>
<span id="cb2-12">}</span>
<span id="cb2-13">summary_accuracy<span class="sc">$</span>accuracy_lm <span class="ot">&lt;-</span> <span class="fu">as.numeric</span>(summary_accuracy<span class="sc">$</span>accuracy_lm)</span>
<span id="cb2-14">summary_accuracy<span class="sc">$</span>accuracy_step <span class="ot">&lt;-</span> <span class="fu">as.numeric</span>(summary_accuracy<span class="sc">$</span>accuracy_step)</span>
<span id="cb2-15"><span class="fu">ggplot</span>(<span class="at">data =</span> summary_accuracy,<span class="fu">aes</span>(<span class="at">x=</span><span class="fu">factor</span>(sample_s, </span>
<span id="cb2-16">                                           <span class="at">level =</span> <span class="fu">c</span>(<span class="st">"N25"</span>, <span class="st">"N30"</span>, <span class="st">"N40"</span>, <span class="st">"N60"</span>, <span class="st">"N100"</span>, <span class="st">"N500"</span>, <span class="st">"N1000"</span>)) ,</span>
<span id="cb2-17">                                            <span class="at">y =</span> accuracy_lm)) <span class="sc">+</span> </span>
<span id="cb2-18">  <span class="fu">geom_bar</span>(<span class="at">stat=</span> <span class="st">"identity"</span>)<span class="sc">+</span></span>
<span id="cb2-19">  <span class="fu">xlab</span>(<span class="st">"sample size"</span>)<span class="sc">+</span></span>
<span id="cb2-20">  <span class="fu">labs</span>(<span class="at">title =</span> <span class="st">"Accuracy of selected predictor per sample size"</span>)</span></code></pre></div></div>
</details>
<div class="cell-output-display">
<div>
<figure class="figure">
<p><img src="/media/projects/variable-selection/unnamed-chunk-2-1.png" width="672" loading="lazy"></p>
</figure>
</div>
</div>
</div>
<p>This is the accuracy of the <strong>normal lm function</strong> with all predictors used.</p>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb3"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb3-1"><span class="fu">ggplot</span>(<span class="at">data =</span> summary_accuracy,<span class="fu">aes</span>(<span class="at">x=</span><span class="fu">factor</span>(sample_s, </span>
<span id="cb3-2">                                           <span class="at">level =</span> <span class="fu">c</span>(<span class="st">"N25"</span>, <span class="st">"N30"</span>, <span class="st">"N40"</span>, <span class="st">"N60"</span>, <span class="st">"N100"</span>, <span class="st">"N500"</span>, <span class="st">"N1000"</span>)) ,</span>
<span id="cb3-3">                                            <span class="at">y =</span> accuracy_step)) <span class="sc">+</span> </span>
<span id="cb3-4">  <span class="fu">geom_bar</span>(<span class="at">stat=</span> <span class="st">"identity"</span>)<span class="sc">+</span></span>
<span id="cb3-5">  <span class="fu">xlab</span>(<span class="st">"sample size"</span>)<span class="sc">+</span></span>
<span id="cb3-6">  <span class="fu">labs</span>(<span class="at">title =</span> <span class="st">"Accuracy of selected predictor per sample size"</span>)</span></code></pre></div></div>
</details>
<div class="cell-output-display">
<div>
<figure class="figure">
<p><img src="/media/projects/variable-selection/unnamed-chunk-3-1.png" width="672" loading="lazy"></p>
</figure>
</div>
</div>
</div>
<p>This is the accuracy of the <strong>step function</strong> default = backwards selection (starting with full model: all predictors) .</p>
</section>
<section id="summary" class="level2">
<h2 class="anchored" data-anchor-id="summary">Summary:</h2>
<ul>
<li>especially with low sample size N25 step function seems to perform less well than normal lm function</li>
<li>with increasing sample size both perform well and use all relevant predictors</li>
</ul>

</section>

<a onclick="window.scrollTo(0, 0); return false;" role="button" id="quarto-back-to-top"><i class="bi bi-arrow-up"></i> Back to top</a>
