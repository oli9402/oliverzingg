---
title: "Building my first R package"
summary: "Notes on structuring an R package: dependencies, DESCRIPTION files, documentation and testing."
year: 2024
kind: "Tools"
tags: ["R", "Package development"]
order: 12
format: "html"
---
<section id="introduction" class="level1">

<section id="installing-packages" class="level2">
<h2 class="anchored" data-anchor-id="installing-packages">Installing Packages</h2>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb1"><pre class="sourceCode bash"><code class="sourceCode bash"><span id="cb1-1"><span class="ex">install.packages</span><span class="er">(</span><span class="st">"devtools"</span><span class="kw">)</span></span>
<span id="cb1-2"><span class="ex">install.packages</span><span class="er">(</span><span class="st">"usethis"</span><span class="kw">)</span></span></code></pre></div></div>
</details>
</div>
</section>
<section id="create-package" class="level2">
<h2 class="anchored" data-anchor-id="create-package">Create Package</h2>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb2"><pre class="sourceCode bash"><code class="sourceCode bash"><span id="cb2-1"><span class="ex">library</span><span class="er">(</span><span class="ex">usethis</span><span class="kw">)</span></span>
<span id="cb2-2"><span class="ex">create_package</span><span class="er">(</span><span class="st">'~/Documents/siliconPackage'</span><span class="kw">)</span></span></code></pre></div></div>
</details>
</div>
</section>
<section id="create-file" class="level2">
<h2 class="anchored" data-anchor-id="create-file">Create file</h2>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb3"><pre class="sourceCode bash"><code class="sourceCode bash"><span id="cb3-1"><span class="ex">library</span><span class="er">(</span><span class="ex">usethis</span><span class="kw">)</span></span>
<span id="cb3-2"><span class="ex">use_r</span><span class="er">(</span><span class="st">'silicon'</span><span class="kw">)</span></span></code></pre></div></div>
</details>
</div>
</section>
<section id="package-vs-r-script" class="level2">
<h2 class="anchored" data-anchor-id="package-vs-r-script">Package vs R Script</h2>
<p>In normal R Scripts you call libraries but in a package you track dependencies differently with using <code>use_package()</code> which adds the package to the DESCRIPTION file.</p>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb4"><pre class="sourceCode bash"><code class="sourceCode bash"><span id="cb4-1"><span class="ex">use_package</span><span class="er">(</span><span class="st">'ggplot2'</span><span class="kw">)</span></span></code></pre></div></div>
</details>
</div>
<p>By default, r looks for function inside your own package first so we do not explicitly state the package name. But for external packages like <code>ggplot2</code> we would use <code>ggplot2::function</code></p>
<section id="rprofile" class="level3">
<h3 class="anchored" data-anchor-id="rprofile">.Rprofile</h3>
<p>With an .Rprofile file we can add libraries that should be loaded after opening the Package Project in R</p>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb5"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb5-1"><span class="cf">if</span> (<span class="sc">!</span><span class="fu">require</span>(devtools)) {</span>
<span id="cb5-2">  <span class="fu">install.packages</span>(<span class="st">"devtools"</span>)</span>
<span id="cb5-3">  <span class="fu">library</span>(devtools)</span>
<span id="cb5-4">}</span></code></pre></div></div>
</details>
</div>
</section>
</section>
<section id="do-checks" class="level2">
<h2 class="anchored" data-anchor-id="do-checks">Do Checks</h2>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb6"><pre class="sourceCode bash"><code class="sourceCode bash"><span id="cb6-1"><span class="fu">devtools::check()</span></span></code></pre></div></div>
</details>
</div>
</section>
<section id="publish-on-github" class="level2">
<h2 class="anchored" data-anchor-id="publish-on-github">Publish on Github</h2>
<p>First init git with <code>use_git('init package')</code></p>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb7"><pre class="sourceCode bash"><code class="sourceCode bash"><span id="cb7-1"><span class="fu">use_github()</span></span>
<span id="cb7-2"><span class="co">#or </span></span>
<span id="cb7-3"><span class="ex">use_github</span><span class="er">(</span><span class="st">'NameOfOrganization'</span><span class="kw">)</span></span></code></pre></div></div>
</details>
</div>
</section>
<section id="download-package" class="level2">
<h2 class="anchored" data-anchor-id="download-package">Download Package</h2>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb8"><pre class="sourceCode bash"><code class="sourceCode bash"><span id="cb8-1"><span class="ex">devtools::install_github</span><span class="er">(</span><span class="st">'username/packagename'</span><span class="kw">)</span></span></code></pre></div></div>
</details>
</div>
</section>
<section id="documentation" class="level2">
<h2 class="anchored" data-anchor-id="documentation">Documentation</h2>
<p>Roxygen2 is a way of documenting function and with <code>@export</code> we tell roxygen2 that this function is ready for export and is accessible for other users that load the package. We can also call the usual <code>?function</code> the returns our short description. Other function <strong>without</strong> <code>@export</code> are internal function and can’t be accessed.</p>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb9"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb9-1"><span class="co">#' Title</span></span>
<span id="cb9-2"><span class="co">#' </span></span>
<span id="cb9-3"><span class="co">#' Short description of function with *markdown* syntax</span></span>
<span id="cb9-4"><span class="co">#' </span></span>
<span id="cb9-5"><span class="co">#' @export</span></span>
<span id="cb9-6">function_name <span class="ot">&lt;-</span> <span class="cf">function</span>(){</span>
<span id="cb9-7">  </span>
<span id="cb9-8">}</span></code></pre></div></div>
</details>
</div>
<p>To make the documentation call the following in the console:</p>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb10"><pre class="sourceCode bash"><code class="sourceCode bash"><span id="cb10-1"><span class="fu">devtools::document()</span></span></code></pre></div></div>
</details>
</div>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb11"><pre class="sourceCode bash"><code class="sourceCode bash"><span id="cb11-1"><span class="fu">use_mit_license()</span></span></code></pre></div></div>
</details>
</div>
</section>
<section id="test-created-functions" class="level2">
<h2 class="anchored" data-anchor-id="test-created-functions">Test created functions</h2>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb12"><pre class="sourceCode bash"><code class="sourceCode bash"><span id="cb12-1"><span class="fu">use_testthat()</span></span>
<span id="cb12-2"></span>
<span id="cb12-3"><span class="ex">use_test</span><span class="er">(</span><span class="st">'nameOfRRcript'</span><span class="kw">)</span></span>
<span id="cb12-4"></span>
<span id="cb12-5"><span class="fu">test()</span></span></code></pre></div></div>
</details>
</div>
<p>Alternatively in RStudio we can use <code>Build</code> to run all tests.</p>
</section>
<section id="rename-file" class="level2">
<h2 class="anchored" data-anchor-id="rename-file">Rename file</h2>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb13"><pre class="sourceCode bash"><code class="sourceCode bash"><span id="cb13-1"><span class="ex">rename_file</span><span class="er">(</span><span class="st">'old'</span><span class="ex">,</span> <span class="st">'new'</span><span class="kw">)</span></span></code></pre></div></div>
</details>
</div>
</section>
<section id="add-readme-for-github" class="level2">
<h2 class="anchored" data-anchor-id="add-readme-for-github">Add readme for github</h2>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb14"><pre class="sourceCode bash"><code class="sourceCode bash"><span id="cb14-1"><span class="fu">use_readme_rmd()</span></span>
<span id="cb14-2"><span class="fu">build_readme()</span></span></code></pre></div></div>
</details>
</div>

</section>
</section>

<a onclick="window.scrollTo(0, 0); return false;" role="button" id="quarto-back-to-top"><i class="bi bi-arrow-up"></i> Back to top</a>
