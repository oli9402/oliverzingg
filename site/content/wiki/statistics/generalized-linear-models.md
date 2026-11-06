---
title: "Generalized linear models"
order: 2
format: "html"
---
<section id="generalized-linear-models" class="level1">

<p>Depending on the outcome variable, we can use different types of models. For example, if the outcome variable is binary, we can use a logistic regression model. If the outcome variable is continuous, we can use a linear regression model. If the outcome variable is count data, we can use a Poisson regression model.</p>
<section id="binary-and-binomial-dependet-variable" class="level2">
<h2 class="anchored" data-anchor-id="binary-and-binomial-dependet-variable">Binary and binomial dependet variable</h2>
<p>Binary and binomial data naturally fall within the range of 0 to 1 (and are mathematically the same: binary = total number of trials is 1). Using a linear regression model would there predict values outside of this range. This would be a extrapolation which would make sense. Furthermore, in the case of logistic regression using a identity link function (i.e.&nbsp;linear regression) the predicted values would be heavily be influences by extreme values. Therefore, we adapt the linear regression based on attributes of the dependent variables. Additionally, we can’t assume normal distribution of errors for inference. Therefore, with this kind of data we assume other distributions as binomial distribution.</p>
<aside class="callout callout-note"><p class="callout-title">Note</p>
<p>Not all proportions are binomial. Binomial data always refer to a ration among two integers. Proportions between conitous variables are not binomial data. Binomial data is something that was tested several times and has only two possible outcomes. The number of trials is <strong>essential to define the precision of each observation</strong>. So we need independent trials with outcome 0 or 1.</p>
</aside>
<aside class="callout callout-note"><p class="callout-title">Note</p>
<p>Proportions between continous variables can be analysed with LM after transformation (i.e.&nbsp;arc-sin-square-root)</p>
</aside>
<aside class="callout callout-note"><p class="callout-title">Note</p>
<p>Binomial distribution is a discrete probability distribution that describes the number of successes in a fixed number of independent Bernoulli trials, each with the same probability of success. Coin tosses.</p>
</aside>
<p>For binary and binomial data we use a logit link function that bounds the y between 0 and 1. The logit link function is defined as:</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">o</span><span class="mord mathnormal" style="margin-right:0.0359em;">g</span><span class="mord mathnormal">i</span><span class="mord mathnormal">t</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.0359em;">y</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1.988em;vertical-align:-0.8804em;"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">o</span><span class="mord mathnormal" style="margin-right:0.0359em;">g</span><span class="mopen">(</span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.1076em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal" style="margin-right:0.0359em;">y</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0359em;">y</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.8804em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mclose">)</span></span></span></span></span></p>
<p>We therefore model the logit of y. The model transforms probabilities into log-odds so we can use linear modeling</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">o</span><span class="mord mathnormal" style="margin-right:0.0359em;">g</span><span class="mord mathnormal">i</span><span class="mord mathnormal">t</span><span class="mopen">(</span><span class="mord text"><span class="mord">probability&nbsp;of&nbsp;success:&nbsp;p</span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1.988em;vertical-align:-0.8804em;"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">o</span><span class="mord mathnormal" style="margin-right:0.0359em;">g</span><span class="mopen">(</span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.1076em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal">p</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">p</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.8804em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0528em;">β</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0528em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">0</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6153em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0528em;">β</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0528em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mord">...</span></span></span></span></span></p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.988em;vertical-align:-0.8804em;"></span><span class="mord mathnormal">e</span><span class="mord mathnormal">x</span><span class="mord mathnormal">p</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">o</span><span class="mord mathnormal" style="margin-right:0.0359em;">g</span><span class="mopen">(</span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.1076em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal">p</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">p</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.8804em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mclose">))</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1.988em;vertical-align:-0.8804em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.1076em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal">p</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">p</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.8804em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal">e</span><span class="mord mathnormal">x</span><span class="mord mathnormal">p</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0528em;">β</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0528em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">0</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal">e</span><span class="mord mathnormal">x</span><span class="mord mathnormal">p</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0528em;">β</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0528em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span></span></p>
<aside class="callout callout-note"><p class="callout-title">Note</p>
<ul>
<li>Logit transforms probabilities into something you can model linearly.</li>
<li>Exponentiation converts model coefficients back to a scale you can interpret (odds ratios).</li>
<li>If you want to interpret effects on probability, use the divide by 4 rule or predict actual probabilities.</li>
</ul>
</aside>
<p>For binomial data we use <code>cbind()</code>, for logistic regression we don’t use <code>cbind()</code>.</p>
<div class="cell">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb1"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb1-1">glm.model <span class="ot">&lt;-</span> <span class="fu">glm</span>(<span class="fu">cbind</span>(<span class="st">"nr_of_successes"</span>, <span class="st">"nr_of_failures"</span>) <span class="sc">~</span> <span class="st">"predictor1"</span> <span class="sc">+</span> <span class="st">"predictor2"</span>, </span>
<span id="cb1-2">                 <span class="at">data =</span> <span class="st">"data"</span>, </span>
<span id="cb1-3">                 <span class="at">family =</span> <span class="st">"binomial"</span>)</span></code></pre></div></div>
</div>
</section>
<section id="multinomial-dependent-variable" class="level2">
<h2 class="anchored" data-anchor-id="multinomial-dependent-variable">Multinomial dependent variable</h2>
<p>Is a categorical variable with more than two levels. For example, the outcome variable could be a categorical variable with three levels: “low”, “medium”, and “high”. In this case, we can use a multinomial logistic regression model. The multinomial logistic regression model is an extension of the binary logistic regression model that allows for more than two categories. The multinomial logistic regression model uses a softmax function to model the probabilities of each category. The softmax function converts a vector of raw scores (logits) into a probability distribution, ensuring the sum of probabilities for all classes equals one.</p>
<div class="cell">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb2"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb2-1"><span class="fu">library</span>(nnet)</span>
<span id="cb2-2">multinom.model <span class="ot">&lt;-</span> <span class="fu">multinom</span>(<span class="st">"outcome_variable"</span> <span class="sc">~</span> <span class="st">"predictor1"</span> <span class="sc">+</span> <span class="st">"predictor2"</span>, </span>
<span id="cb2-3">                             <span class="at">data =</span> <span class="st">"data"</span>)</span></code></pre></div></div>
</div>
<section id="set-cutoff" class="level3">
<h3 class="anchored" data-anchor-id="set-cutoff">Set cutoff</h3>
<p>For logistic regression we set a cutoff the classify the outcome variable. The cutoff is the probability threshold above which we classify the outcome variable as 1 (success) and below which we classify the outcome variable as 0 (failure). The default cutoff is 0.5, but we can set a different cutoff based on the specific problem and the cost of false positives and false negatives.</p>
<div class="cell">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb3"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb3-1">glm.log <span class="ot">&lt;-</span> <span class="fu">glm</span>(<span class="st">"outcome_variable"</span> <span class="sc">~</span> <span class="st">"predictor1"</span> <span class="sc">+</span> <span class="st">"predictor2"</span>, </span>
<span id="cb3-2">                 <span class="at">data =</span> <span class="st">"data"</span>, </span>
<span id="cb3-3">                 <span class="at">family =</span> <span class="st">"binomial"</span>)</span>
<span id="cb3-4">classification <span class="ot">&lt;-</span> <span class="fu">ifelse</span>(<span class="fu">fitted</span>(glm.log) <span class="sc">&gt;</span> <span class="fl">0.5</span>, <span class="dv">1</span>, <span class="dv">0</span>)</span></code></pre></div></div>
</div>
<p>Now let’s compare fitted vs.&nbsp;observed (confusion matrix)</p>
<div class="cell">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb4"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb4-1">compare <span class="ot">&lt;-</span> <span class="fu">data.frame</span>(<span class="at">obs =</span> df<span class="sc">$</span>obs,</span>
<span id="cb4-2">                      <span class="at">fitted =</span> classification)</span>
<span id="cb4-3"><span class="co"># absolute</span></span>
<span id="cb4-4"><span class="fu">table</span>(<span class="at">obs =</span> compare<span class="sc">$</span>obs,</span>
<span id="cb4-5">      <span class="at">fitted =</span> compare<span class="sc">$</span>fitted)</span>
<span id="cb4-6"><span class="co"># percentage</span></span>
<span id="cb4-7"><span class="fu">table</span>(<span class="at">obs =</span> compare<span class="sc">$</span>obs,</span>
<span id="cb4-8">      <span class="at">fitted =</span> compare<span class="sc">$</span>fitted) <span class="sc">%&gt;%</span> </span>
<span id="cb4-9">  <span class="fu">prop.table</span>() <span class="sc">%&gt;%</span></span>
<span id="cb4-10">  <span class="fu">round</span>(<span class="at">digits =</span> <span class="dv">2</span>)</span></code></pre></div></div>
</div>
<p>Naturally we would continue analysing different cutoff points with ROC and AUC.</p>
</section>
</section>
<section id="poisson-regression" class="level2">
<h2 class="anchored" data-anchor-id="poisson-regression">Poisson regression</h2>
<p>This model handels count data which is often encountered in real life situations where y data doens’t follow a normal distribution. Using a Linear model to model count data can lead to following problems:</p>
<ul>
<li>The predicted values can be negative, which is not possible for count data.</li>
<li>The predicted values are not integers, which is also not possible for count data.</li>
<li>The variance of count data naturally increases with the expected value (i.e.&nbsp;mean)</li>
</ul>
<aside class="callout callout-note"><p class="callout-title">Note</p>
<p>Mean-variance dependence: the variance of the data increases with the mean. This is not the case for normal distribution, where the variance is constant. Therefore heteroscedasticity is a problem when using linear models to model count data.</p>
</aside>
<section id="idea" class="level3">
<h3 class="anchored" data-anchor-id="idea">Idea</h3>
<p>Change the linear model formular so that we only predict positive values:</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord katex-accent"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.6944em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathnormal" style="margin-right:0.0359em;">y</span></span><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.1944em;"><span class="mord">^</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1944em;"><span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1.2079em;vertical-align:-0.25em;"></span><span class="mord mathnormal">e</span><span class="mord mathnormal">x</span><span class="mord mathnormal">p</span><span class="mopen">(</span><span class="mord"><span class="mord katex-accent"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.9579em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathnormal" style="margin-right:0.0528em;">β</span></span><span style="top:-3.2634em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.1667em;"><span class="mord">^</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1944em;"><span></span></span></span></span></span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0528em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">0</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1.1523em;vertical-align:-0.1944em;"></span><span class="mord"><span class="mord katex-accent"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.9579em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathnormal" style="margin-right:0.0528em;">β</span></span><span style="top:-3.2634em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.1667em;"><span class="mord">^</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1944em;"><span></span></span></span></span></span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0528em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span></span> this is equal to:</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">o</span><span class="mord mathnormal" style="margin-right:0.0359em;">g</span><span class="mopen">(</span><span class="mord katex-accent"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.6944em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathnormal" style="margin-right:0.0359em;">y</span></span><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.1944em;"><span class="mord">^</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1944em;"><span></span></span></span></span></span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1.1523em;vertical-align:-0.1944em;"></span><span class="mord"><span class="mord katex-accent"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.9579em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathnormal" style="margin-right:0.0528em;">β</span></span><span style="top:-3.2634em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.1667em;"><span class="mord">^</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1944em;"><span></span></span></span></span></span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0528em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">0</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1.1523em;vertical-align:-0.1944em;"></span><span class="mord"><span class="mord katex-accent"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.9579em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathnormal" style="margin-right:0.0528em;">β</span></span><span style="top:-3.2634em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.1667em;"><span class="mord">^</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1944em;"><span></span></span></span></span></span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0528em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.5806em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal">x</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></p>
<p>We see that we can use natural logarithm as a link function. Next, we want y to be integer values and that the variance is dependent on the mean. Therefore, we use a Poisson distribution. The Poisson distribution is a discrete probability distribution that describes the number of events occurring in a fixed interval of time or space, given a known average rate of occurrence. The Poisson distribution is characterized by its mean (λ), which is also equal to its variance.</p>
<div class="cell">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb5"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb5-1">glm.poisson <span class="ot">&lt;-</span> <span class="fu">glm</span>(<span class="st">"outcome_variable"</span> <span class="sc">~</span> <span class="st">"predictor1"</span> <span class="sc">+</span> <span class="st">"predictor2"</span>, </span>
<span id="cb5-2">                     <span class="at">data =</span> <span class="st">"data"</span>, </span>
<span id="cb5-3">                     <span class="at">family =</span> <span class="st">"poisson"</span>)</span></code></pre></div></div>
</div>
</section>
<section id="overdispersion" class="level3">
<h3 class="anchored" data-anchor-id="overdispersion">Overdispersion</h3>
<p><em>Dispersion parameter for poisson family taken to be 1</em> refers to the assumption that the variance increases linearly with the mean. In real life situations this is not the case. The variance is often larger than the mean. This is called overdispersion. In this case we can use a quasipoisson model.</p>
<p>Compare Residual deviance with the degrees of freedom. If the residual deviance is larger than the degrees of freedom, then we have overdispersion.</p>
<div class="cell">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb6"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb6-1">glm.poisson <span class="ot">&lt;-</span> <span class="fu">glm</span>(<span class="st">"outcome_variable"</span> <span class="sc">~</span> <span class="st">"predictor1"</span> <span class="sc">+</span> <span class="st">"predictor2"</span>, </span>
<span id="cb6-2">                     <span class="at">data =</span> <span class="st">"data"</span>, </span>
<span id="cb6-3">                     <span class="at">family =</span> <span class="st">"quasipoisson"</span>)</span></code></pre></div></div>
</div>
<p>This imokies that the variance increases faster than linearly. The estimated coefficents are identifical but the standard error change and as a consequences the p-values change. ## GAM Extension of Linear Model to non-linearity</p>
</section>
</section>
<section id="interpretation-of-coefficients" class="level2">
<h2 class="anchored" data-anchor-id="interpretation-of-coefficients">Interpretation of Coefficients</h2>
<section id="poisson-model" class="level3">
<h3 class="anchored" data-anchor-id="poisson-model">Poisson Model</h3>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb7"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb7-1"><span class="co">#install.packages("faraway")</span></span>
<span id="cb7-2"><span class="fu">library</span>(faraway)</span>
<span id="cb7-3"><span class="fu">library</span>(tidyverse)</span></code></pre></div></div>
</details>
<div class="cell-output cell-output-stderr">
<pre><code>── Attaching core tidyverse packages ──────────────────────── tidyverse 2.0.0 ──
✔ dplyr     1.1.4     ✔ readr     2.1.5
✔ forcats   1.0.0     ✔ stringr   1.5.1
✔ ggplot2   3.5.1     ✔ tibble    3.2.1
✔ lubridate 1.9.4     ✔ tidyr     1.3.1
✔ purrr     1.0.2     
── Conflicts ────────────────────────────────────────── tidyverse_conflicts() ──
✖ dplyr::filter() masks stats::filter()
✖ dplyr::lag()    masks stats::lag()
ℹ Use the conflicted package (&lt;http://conflicted.r-lib.org/&gt;) to force all conflicts to become errors</code></pre>
</div>
</div>
<div class="cell">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb9"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb9-1">glm.complaints <span class="ot">&lt;-</span> <span class="fu">glm</span>(complaints <span class="sc">~</span> . , <span class="at">data =</span> esdcomp,</span>
<span id="cb9-2">                      <span class="at">family =</span> <span class="st">"poisson"</span>)</span>
<span id="cb9-3"></span>
<span id="cb9-4"><span class="fu">summary</span>(glm.complaints)</span></code></pre></div></div>
<div class="cell-output cell-output-stdout">
<pre style="color: blue"><code>
Call:
glm(formula = complaints ~ ., family = "poisson", data = esdcomp)

Coefficients:
              Estimate Std. Error z value Pr(&gt;|z|)   
(Intercept) -0.0803448  1.1542122  -0.070  0.94450   
visits       0.0009499  0.0003386   2.806  0.00502 **
residencyY  -0.2319740  0.2029388  -1.143  0.25301   
genderM      0.1122391  0.2235043   0.502  0.61554   
revenue     -0.0033827  0.0041553  -0.814  0.41560   
hours       -0.0001569  0.0006634  -0.237  0.81298   
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

(Dispersion parameter for poisson family taken to be 1)

    Null deviance: 89.447  on 43  degrees of freedom
Residual deviance: 49.995  on 38  degrees of freedom
AIC: 184.77

Number of Fisher Scoring iterations: 5</code></pre>
</div>
</div>
<p>Since we are modelling log(y) we have to exponentiate (inverse functions) the coefficients to get the multiplicative effect of a one unit increase in the predictor variable on the expected value of y.</p>
<section id="factor" class="level4">
<h4 class="anchored" data-anchor-id="factor">Factor</h4>
<div class="cell">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb11"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb11-1"><span class="fu">exp</span>(<span class="fu">coef</span>(glm.complaints)[<span class="st">"genderM"</span>]) <span class="sc">%&gt;%</span> <span class="fu">round</span>(<span class="at">digits =</span> <span class="dv">2</span>)</span></code></pre></div></div>
<div class="cell-output cell-output-stdout">
<pre><code>genderM 
   1.12 </code></pre>
</div>
</div>
<aside class="callout callout-note"><p class="callout-title">Note</p>
<p>Males get on average 12% more complaints than women doctors</p>
</aside>
</section>
<section id="continous" class="level4">
<h4 class="anchored" data-anchor-id="continous">Continous</h4>
<div class="cell">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb13"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb13-1"><span class="fu">exp</span>(<span class="fu">coef</span>(glm.complaints)[<span class="st">"visits"</span>]) <span class="sc">%&gt;%</span> <span class="fu">round</span>(<span class="at">digits =</span> <span class="dv">5</span>)</span></code></pre></div></div>
<div class="cell-output cell-output-stdout">
<pre><code> visits 
1.00095 </code></pre>
</div>
</div>
<aside class="callout callout-note"><p class="callout-title">Note</p>
<p>For a given doctor, increasing its number of visits by one,would results in about 0.1% more complaints.</p>
</aside>
<p>Increase in visist by one is not really interesting:</p>
<div class="cell">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb15"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb15-1"><span class="fu">range</span>(esdcomp<span class="sc">$</span>visits)</span></code></pre></div></div>
<div class="cell-output cell-output-stdout">
<pre><code>[1]  879 3763</code></pre>
</div>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb17"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb17-1"><span class="fu">exp</span>(<span class="fu">coef</span>(glm.complaints)[<span class="st">"visits"</span>]<span class="sc">*</span><span class="dv">50</span>) <span class="sc">%&gt;%</span> <span class="fu">round</span>(<span class="at">digits =</span> <span class="dv">5</span>)</span></code></pre></div></div>
<div class="cell-output cell-output-stdout">
<pre><code> visits 
1.04864 </code></pre>
</div>
</div>
<aside class="callout callout-note"><p class="callout-title">Note</p>
<p>For a given doctor, if you were to increase its number of visits by 50, then we expect this doctor to get about 4.86% more complaints</p>
</aside>
</section>
</section>
<section id="binomial-model" class="level3">
<h3 class="anchored" data-anchor-id="binomial-model">Binomial Model</h3>
<div class="cell">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb19"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb19-1">glm.insects <span class="ot">&lt;-</span> <span class="fu">glm</span>(<span class="fu">cbind</span>(dead, alive)<span class="sc">~</span> conc,</span>
<span id="cb19-2">                  <span class="at">family =</span> <span class="st">"binomial"</span>,</span>
<span id="cb19-3">                  <span class="at">data =</span> bliss)</span>
<span id="cb19-4"></span>
<span id="cb19-5"><span class="fu">summary</span>(glm.insects)</span></code></pre></div></div>
<div class="cell-output cell-output-stdout">
<pre style="color: blue"><code>
Call:
glm(formula = cbind(dead, alive) ~ conc, family = "binomial", 
    data = bliss)

Coefficients:
            Estimate Std. Error z value Pr(&gt;|z|)    
(Intercept)  -2.3238     0.4179  -5.561 2.69e-08 ***
conc          1.1619     0.1814   6.405 1.51e-10 ***
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

(Dispersion parameter for binomial family taken to be 1)

    Null deviance: 64.76327  on 4  degrees of freedom
Residual deviance:  0.37875  on 3  degrees of freedom
AIC: 20.854

Number of Fisher Scoring iterations: 4</code></pre>
</div>
</div>
<section id="continous-1" class="level4">
<h4 class="anchored" data-anchor-id="continous-1">Continous</h4>
<div class="cell">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb21"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb21-1"><span class="fu">exp</span>(<span class="fu">coef</span>(glm.insects)[<span class="st">"conc"</span>]) <span class="sc">%&gt;%</span> <span class="fu">round</span>(<span class="at">digits =</span> <span class="dv">2</span>)</span></code></pre></div></div>
<div class="cell-output cell-output-stdout">
<pre><code>conc 
 3.2 </code></pre>
</div>
</div>
<aside class="callout callout-note"><p class="callout-title">Note</p>
<p>By increasing the concentration of the insecticide by one unit, we will obtain an increased risk in the odds of about 3 times. Where odds are the ratio of the probability of success (p) to the probability of failure (1-p). In this case success is the death of the insects.</p>
</aside>
<div class="quarto-figure quarto-figure-center">
<figure class="figure">
<p><img src="/media/wiki/statistics/generalized-linear-models/odds.png" loading="lazy"></p>
<figcaption>Odds of our model</figcaption>
</figure>
</div>
<p>With one unit increase in concentration, the odds of death increase by a factor of 3. This means that the odds of death are 3 times higher for each unit increase in concentration:</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">:</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:2.0074em;vertical-align:-0.686em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3214em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">3</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">→</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">:</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">→</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">:</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">3</span></span></span></span></span></p>
</section>
<section id="factors" class="level4">
<h4 class="anchored" data-anchor-id="factors">Factors</h4>
</section>
<section id="divide-by-4" class="level4">
<h4 class="anchored" data-anchor-id="divide-by-4">Divide by 4</h4>
<p>Quick interpretation of odds as upper bound increase in probability of y = 1.</p>
</section>
</section>
<section id="overdispersion-1" class="level3">
<h3 class="anchored" data-anchor-id="overdispersion-1">Overdispersion</h3>
<p>You can add quasibinomial to the family argument. This will give you a dispersion parameter that is greater than 1. But only works for binomial data and not binary.</p>

</section>
</section>
</section>

<a onclick="window.scrollTo(0, 0); return false;" role="button" id="quarto-back-to-top"><i class="bi bi-arrow-up"></i> Back to top</a>
