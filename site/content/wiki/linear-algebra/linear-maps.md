---
title: "Linear maps"
order: 3
format: "html"
---
<section id="overview" class="level2">
<h2 class="anchored" data-anchor-id="overview">Overview</h2>
<div class="cell" data-fig-width="6" data-layout-align="default">
<div class="cell-output-display">
<div id="fig-mermaid" class="quarto-float quarto-figure quarto-figure-center anchored">
<figure class="quarto-float quarto-float-fig figure">
<div aria-describedby="fig-mermaid-caption-0ceaefa1-69ba-4598-a22c-09a6ac19f8ca">
<div>
<pre class="mermaid mermaid-js" data-label="fig-mermaid"> 
flowchart TD
    A(Linear Maps &lt;br/&gt; linear transformation) --&gt; D[Domain,Codomain]
    
    A --&gt; B[Mapping Rule: L]
    B --&gt; BA[Linear mapping?]
    BA --&gt; |check with|BAA[Linearity rules] 
    BA --&gt; |quick check|BAB[Zero vector &lt;br/&gt;L0=0]
    
    B --&gt; BB[Matrix w.r.t. &lt;br/&gt; Standard Basis]
    B --&gt; BC[Matrix w.r.t. &lt;br/&gt;Non-Standard Basis]
    BC --&gt; |how to &lt;br/&gt;calculate map S &lt;br/&gt; w.r.t. basis:|BCA[Image of Basis &lt;br/&gt; using L]
    BCA --&gt; |use decomposition &lt;br/&gt; or LSE|BCB[to find coordinates. &lt;br/&gt; coefficients = coordinate. &lt;br/&gt; linear combination]
    BCB --&gt; |use coordinates &lt;br/&gt; vectors for|BCBA[Map S w.r.t &lt;br/&gt; new basis and insight &lt;br/&gt;about linear transformation]
    
    B --&gt; BD[Invertible Mapping]
    BD --&gt; |only possible &lt;br/&gt; if same dimension|BDA[inverse map of L: L^-1 &lt;br/&gt; = is unique and linear]
    BDA --&gt; |every reflection &lt;br/&gt;is invertibale|BDAA[L = L &lt;br/&gt; self-inverse]
    BDA --&gt; |if 2 x 2 matrix|BDAB[Use formular below]

    A --&gt; C[Affine Linear Maps]
    C --&gt; |Linear + shift|CA[Linear map + &lt;br/&gt;displacement vector w &lt;br/&gt; every linear map is &lt;br/&gt;affine map with w = 0 ]
    CA --&gt; |Image of zero vector|CB[displacement vector]
    CA --&gt; |used for example|CC[rotation around point other than origin]

    

</pre>
</div>
</div>
<figcaption class="quarto-float-caption-bottom quarto-float-caption quarto-float-fig" id="fig-mermaid-caption-0ceaefa1-69ba-4598-a22c-09a6ac19f8ca">
Figure&nbsp;1: A flow chart of concepts in linear maps
</figcaption>
</figure>
</div>
</div>
</div>
<section id="python-for-calculating-coordinates" class="level3">
<h3 class="anchored" data-anchor-id="python-for-calculating-coordinates">Python for calculating Coordinates</h3>
<p>Press on triangle to show Code.</p>
<div id="d822bb9c" class="cell" data-execution_count="1">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb1"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb1-1"><span class="im">import</span> numpy <span class="im">as</span> np</span>
<span id="cb1-2"><span class="im">import</span> scipy.linalg <span class="im">as</span> la</span>
<span id="cb1-3"></span>
<span id="cb1-4"></span>
<span id="cb1-5"></span>
<span id="cb1-6">A <span class="op">=</span> np.array([</span>
<span id="cb1-7">  [<span class="op">-</span><span class="dv">3</span>,<span class="dv">2</span>,<span class="dv">2</span>],</span>
<span id="cb1-8">  [<span class="op">-</span><span class="dv">3</span>,<span class="dv">1</span>,<span class="dv">3</span>],</span>
<span id="cb1-9">  [<span class="op">-</span><span class="dv">1</span>,<span class="dv">2</span>,<span class="dv">0</span>]</span>
<span id="cb1-10">  ])</span>
<span id="cb1-11"></span>
<span id="cb1-12"><span class="co">#-----------Example first vector-------#</span></span>
<span id="cb1-13">v_1 <span class="op">=</span> np.array([</span>
<span id="cb1-14">  [<span class="dv">2</span>],</span>
<span id="cb1-15">  [<span class="dv">1</span>],</span>
<span id="cb1-16">  [<span class="dv">2</span>]</span>
<span id="cb1-17">])</span>
<span id="cb1-18"></span>
<span id="cb1-19"><span class="co">#---------Calculate Image of basis v_1---#</span></span>
<span id="cb1-20">r_1 <span class="op">=</span> A<span class="op">@</span>v_1</span>
<span id="cb1-21"></span>
<span id="cb1-22"><span class="co">#--------After repeating for all basis--#</span></span>
<span id="cb1-23">S <span class="op">=</span> np.hstack([v_1, v_2, v_3])</span>
<span id="cb1-24"><span class="co">#' This gives us the coefficient matrix that is used as </span></span>
<span id="cb1-25"><span class="co">#' LSE to calculate coordinates</span></span>
<span id="cb1-26"></span>
<span id="cb1-27"><span class="co">#-------Solve each system----- #</span></span>
<span id="cb1-28"></span>
<span id="cb1-29"><span class="co">#LSE of image of v_1</span></span>
<span id="cb1-30">a_1 <span class="op">=</span> la.solve(S, r_1)</span>
<span id="cb1-31"></span>
<span id="cb1-32"></span>
<span id="cb1-33"><span class="co">#--------Final Matrix------#</span></span>
<span id="cb1-34">B <span class="op">=</span> np.hstack([a_1, a_2, a_3])</span></code></pre></div></div>
</details>
</div>
</section>
<section id="mapping" class="level3">
<h3 class="anchored" data-anchor-id="mapping">Mapping</h3>
<p>What matrix size do we need if we want to map <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8141em;"></span><span class="mord"><span class="mord mathbb">R</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">→</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.8141em;"></span><span class="mord"><span class="mord mathbb">R</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">3</span></span></span></span></span></span></span></span></span></span></span>?</p>
<ul>
<li>we would need a (3 x 2) matrix</li>
</ul>
</section>
<section id="inverse-of-2-x-2-matrix" class="level3">
<h3 class="anchored" data-anchor-id="inverse-of-2-x-2-matrix">Inverse of 2 x 2 Matrix</h3>
<p><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8141em;"></span><span class="mord"><span class="mord mathnormal">A</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">−</span><span class="mord mtight">1</span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1.2484em;vertical-align:-0.4033em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8451em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">a</span><span class="mord mathnormal mtight">d</span><span class="mbin mtight">−</span><span class="mord mathnormal mtight">b</span><span class="mord mathnormal mtight">c</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.4033em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:2.4em;vertical-align:-0.95em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;"><span class="delimsizing size3">(</span></span><span class="mord"><span class="mtable"><span class="col-align-c"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.45em;"><span style="top:-3.61em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">d</span></span></span><span style="top:-2.41em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">−</span><span class="mord mathnormal">c</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.95em;"><span></span></span></span></span></span><span class="arraycolsep" style="width:0.5em;"></span><span class="arraycolsep" style="width:0.5em;"></span><span class="col-align-c"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.45em;"><span style="top:-3.61em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">−</span><span class="mord mathnormal">b</span></span></span><span style="top:-2.41em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">a</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.95em;"><span></span></span></span></span></span></span></span><span class="mclose delimcenter" style="top:0em;"><span class="delimsizing size3">)</span></span></span></span></span></span></p>
<p>The denominator is the determinant of A.</p>
</section>
<section id="excerise-4.4" class="level3">
<h3 class="anchored" data-anchor-id="excerise-4.4">Excerise 4.4</h3>

</section>
</section>

<a onclick="window.scrollTo(0, 0); return false;" role="button" id="quarto-back-to-top"><i class="bi bi-arrow-up"></i> Back to top</a>
