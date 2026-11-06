---
title: "Python basics"
order: 1
format: "html"
---
<section id="pycharm" class="level2">
<h2 class="anchored" data-anchor-id="pycharm">Pycharm</h2>
<p>Use <code># %% Test</code>to create executable blocks</p>
</section>
<section id="namespace" class="level2">
<h2 class="anchored" data-anchor-id="namespace">Namespace</h2>
<ul>
<li><em>built-in</em>: all objects provided by python</li>
<li><em>global</em>: programmer defined objects across whole script</li>
<li><em>local</em>: programmer defined objects in function blocks</li>
</ul>
<p>Object name must only be unique <strong>within a given namespace</strong>:</p>
<div id="eca7003d" class="cell" data-execution_count="1">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb1"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb1-1"><span class="kw">def</span> my_function(x):</span>
<span id="cb1-2">  <span class="cf">return</span> x<span class="op">+</span><span class="dv">10</span></span>
<span id="cb1-3"></span>
<span id="cb1-4"><span class="kw">def</span> test_function(x):</span>
<span id="cb1-5">  <span class="kw">def</span> my_function(y):  <span class="co"># my_function: this is possible since different namespace </span></span>
<span id="cb1-6">    <span class="cf">return</span> y <span class="op">+</span> <span class="dv">20</span></span>
<span id="cb1-7">  x <span class="op">=</span> my_function(<span class="dv">2</span>)</span>
<span id="cb1-8">  <span class="cf">return</span> x </span>
<span id="cb1-9"></span>
<span id="cb1-10">test_function()(y<span class="op">=</span><span class="dv">10</span>)</span></code></pre></div></div>
</div>
<p>Inside a function you can access a global object via the keyword <code>global</code>. You can also increase a global var inside a function for example. But this should be avoided global access.</p>
<p>The keyword <code>nonlocal</code> will access a variable in the next higher namespace.</p>
</section>
<section id="scope" class="level2">
<h2 class="anchored" data-anchor-id="scope">Scope</h2>
<p>Scope of an object refers to the code section from which an object is accessible.</p>
</section>
<section id="indexing" class="level2">
<h2 class="anchored" data-anchor-id="indexing">Indexing</h2>
<p>Last index is not included:</p>
<div id="89df2cfd" class="cell" data-execution_count="2">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb2"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb2-1">a <span class="op">=</span> [<span class="dv">1</span>,<span class="dv">2</span>,<span class="dv">3</span>,<span class="dv">4</span>,<span class="dv">5</span>]</span>
<span id="cb2-2"></span>
<span id="cb2-3"><span class="co"># Full list</span></span>
<span id="cb2-4">a[:<span class="dv">5</span>]</span>
<span id="cb2-5"></span>
<span id="cb2-6">a[<span class="op">-</span><span class="dv">1</span>:] <span class="co">#equal to a[-1:5]</span></span>
<span id="cb2-7"></span>
<span id="cb2-8">a[<span class="op">-</span><span class="dv">1</span>:<span class="dv">1</span>:<span class="op">-</span><span class="dv">1</span>] <span class="co">#2 is index 2 but not included</span></span>
<span id="cb2-9"></span>
<span id="cb2-10"><span class="co">#full list in reverse</span></span>
<span id="cb2-11">a[<span class="op">-</span><span class="dv">1</span>::<span class="op">-</span><span class="dv">1</span>]   <span class="co">#equal to a[::-1]</span></span>
<span id="cb2-12">a[:<span class="op">-</span><span class="dv">2</span>] <span class="co">#-2 is index of 4 but not included</span></span>
<span id="cb2-13"></span>
<span id="cb2-14">a[:<span class="op">-</span><span class="dv">2</span>:<span class="op">-</span><span class="dv">1</span>]</span>
<span id="cb2-15"></span>
<span id="cb2-16"><span class="co"># Print last string of language</span></span>
<span id="cb2-17">L <span class="op">=</span> [<span class="st">"Mojo"</span>, <span class="st">"is"</span>, <span class="st">"a"</span>, <span class="st">"language"</span>]</span>
<span id="cb2-18"><span class="bu">print</span>(L[<span class="dv">3</span>][<span class="op">-</span><span class="dv">1</span>:])</span>
<span id="cb2-19"></span>
<span id="cb2-20"><span class="co"># Print up to last string in last element</span></span>
<span id="cb2-21">L <span class="op">=</span> [<span class="st">"Mojo"</span>, <span class="st">"is"</span>, <span class="st">"a"</span>, <span class="st">"language"</span>]</span>
<span id="cb2-22"><span class="bu">print</span>(L[<span class="dv">3</span>][:<span class="op">-</span><span class="dv">1</span>])</span></code></pre></div></div>
</div>
<p>2D Lists return first line</p>
<div id="f339b3ea" class="cell" data-execution_count="3">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb3"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb3-1">data <span class="op">=</span> [[<span class="dv">1</span>, <span class="dv">2</span>, <span class="dv">3</span>], [<span class="dv">4</span>, <span class="dv">5</span>, <span class="dv">6</span>], [<span class="dv">7</span>, <span class="dv">8</span>, <span class="dv">9</span>]]</span>
<span id="cb3-2">[row[<span class="dv">0</span>] <span class="cf">for</span> row <span class="kw">in</span> data]</span></code></pre></div></div>
</div>
<p>Modify index</p>
<div id="ba980d70" class="cell" data-execution_count="4">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb4"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb4-1">numbers <span class="op">=</span> [<span class="dv">1</span>, <span class="dv">2</span>, <span class="dv">3</span>, <span class="dv">4</span>, <span class="dv">5</span>, <span class="dv">6</span>, <span class="dv">7</span>, <span class="dv">8</span>, <span class="dv">9</span>]</span>
<span id="cb4-2">numbers[<span class="dv">1</span>:<span class="dv">4</span>] <span class="op">=</span> [<span class="dv">10</span>, <span class="dv">20</span>, <span class="dv">30</span>]</span></code></pre></div></div>
</div>
<p>For loops</p>
<div id="e48f52ce" class="cell" data-execution_count="5">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb5"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb5-1">numbers <span class="op">=</span> [<span class="dv">12</span>, <span class="dv">32</span>, <span class="dv">34</span>, <span class="dv">4</span>,<span class="dv">25</span>, <span class="dv">6</span>, <span class="dv">72</span>, <span class="dv">8</span>, <span class="dv">19</span>] <span class="co">#9 elements</span></span>
<span id="cb5-2"></span>
<span id="cb5-3"><span class="bu">len</span>(numbers) <span class="co">#returns 9</span></span>
<span id="cb5-4"><span class="bu">print</span>(<span class="st">''</span>)</span>
<span id="cb5-5"></span>
<span id="cb5-6">i <span class="op">=</span> <span class="bu">range</span>(<span class="dv">6</span>) <span class="co">#returns 0-5</span></span>
<span id="cb5-7"><span class="cf">for</span> idx <span class="kw">in</span> i: </span>
<span id="cb5-8">  <span class="bu">print</span>(idx, end<span class="op">=</span> <span class="st">' '</span>)</span>
<span id="cb5-9">  </span>
<span id="cb5-10"><span class="bu">print</span>(<span class="st">'</span><span class="ch">\n</span><span class="st">'</span>)</span>
<span id="cb5-11">i <span class="op">=</span> <span class="bu">range</span>(<span class="bu">len</span>(numbers)) <span class="co">#0-8 -&gt; 9 elements</span></span>
<span id="cb5-12"><span class="cf">for</span> idx <span class="kw">in</span> i: </span>
<span id="cb5-13">  <span class="bu">print</span>(idx, end<span class="op">=</span> <span class="st">' '</span>)</span>
<span id="cb5-14"></span>
<span id="cb5-15"><span class="bu">print</span>(<span class="st">'</span><span class="ch">\n</span><span class="st">'</span>)</span>
<span id="cb5-16">i <span class="op">=</span> <span class="bu">range</span>(<span class="dv">1</span>,<span class="bu">len</span>(numbers)) <span class="co">#1-8 -&gt; 8 elements</span></span>
<span id="cb5-17"><span class="cf">for</span> idx <span class="kw">in</span> i: </span>
<span id="cb5-18">  <span class="bu">print</span>(idx, end<span class="op">=</span> <span class="st">' '</span>)</span></code></pre></div></div>
</div>
<p>Enumerate returns index and value</p>
<div id="ce49c42d" class="cell" data-execution_count="6">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb6"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb6-1">numbers <span class="op">=</span> [<span class="dv">12</span>, <span class="dv">32</span>, <span class="dv">34</span>, <span class="dv">4</span>,<span class="dv">25</span>, <span class="dv">6</span>, <span class="dv">72</span>, <span class="dv">8</span>, <span class="dv">19</span>] <span class="co">#9 elements</span></span>
<span id="cb6-2"></span>
<span id="cb6-3"><span class="cf">for</span> i <span class="kw">in</span> <span class="bu">enumerate</span>(numbers):</span>
<span id="cb6-4">  <span class="bu">print</span>(i, end <span class="op">=</span> <span class="st">', '</span>)</span>
<span id="cb6-5">  <span class="bu">print</span>(i[<span class="dv">0</span>], end <span class="op">=</span> <span class="st">', '</span>)</span>
<span id="cb6-6">  <span class="bu">print</span>(i[<span class="dv">1</span>])</span>
<span id="cb6-7"></span>
<span id="cb6-8"><span class="bu">print</span>(<span class="st">'----'</span>)</span>
<span id="cb6-9"><span class="co"># we can also save both values individuel</span></span>
<span id="cb6-10"><span class="cf">for</span> idx, value <span class="kw">in</span> <span class="bu">enumerate</span>(numbers):</span>
<span id="cb6-11">  <span class="bu">print</span>(idx , value)</span></code></pre></div></div>
</div>
<p>Using <code>range(start, stop, step)</code> in for loop we can reverse the steps with -1.</p>
<div id="9947d140" class="cell" data-execution_count="7">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb7"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb7-1"><span class="cf">for</span> i <span class="kw">in</span> <span class="bu">range</span>(<span class="dv">5</span>,<span class="dv">0</span>,<span class="op">-</span><span class="dv">1</span>):</span>
<span id="cb7-2">  <span class="bu">print</span>(i)</span></code></pre></div></div>
</div>
</section>
<section id="functions" class="level2">
<h2 class="anchored" data-anchor-id="functions">Functions</h2>
<p>Functions can only return one reference to a storage location. So returning multiple references must be saved in a list:</p>
<div id="d9155171" class="cell" data-execution_count="8">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb8"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb8-1"><span class="kw">def</span> function(a,b):</span>
<span id="cb8-2">  <span class="cf">return</span> <span class="bu">list</span>(a,b)</span></code></pre></div></div>
</div>
<p>Learning material for python functions (e.g., str.split()): <a href="https://github.com/TheAlgorithms/Python/blob/master/strings/split.py" target="_blank" rel="noopener">here</a></p>
<section id="function-chaining" class="level3">
<h3 class="anchored" data-anchor-id="function-chaining">Function chaining:</h3>
<div id="717023b9" class="cell" data-execution_count="9">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb9"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb9-1">function_1(function_2(a)) <span class="op">=</span> function_2(a).function_1()</span></code></pre></div></div>
</div>
</section>
<section id="function-arguments" class="level3">
<h3 class="anchored" data-anchor-id="function-arguments">Function Arguments</h3>
<div id="4aa580d8" class="cell" data-execution_count="10">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb10"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb10-1">a,b,c <span class="op">=</span> <span class="dv">3</span>,<span class="dv">4</span>,<span class="dv">5</span></span>
<span id="cb10-2"></span>
<span id="cb10-3">a,b,c <span class="op">=</span> <span class="dv">3</span>,<span class="dv">4</span>,<span class="dv">5</span>,<span class="dv">6</span> <span class="co">## Error</span></span>
<span id="cb10-4"></span>
<span id="cb10-5">a,b,<span class="op">*</span>c <span class="op">=</span> <span class="dv">3</span>,<span class="dv">4</span>,<span class="dv">5</span>,<span class="dv">6</span> <span class="co"># Works: assign all remaining var to c</span></span></code></pre></div></div>
</div>
<p><code>*</code> packs elements into a list. Use <code>*</code> again to unpack:</p>
<div id="b283f6ce" class="cell" data-execution_count="11">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb11"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb11-1"><span class="bu">print</span>(a,b,<span class="op">*</span>c)</span></code></pre></div></div>
</div>
<p>This can be done in function parameter aswell:</p>
<div id="5e9dee5b" class="cell" data-execution_count="12">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb12"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb12-1">dic <span class="op">=</span> {<span class="st">'a'</span>:<span class="dv">1</span>, <span class="st">'b'</span>:<span class="dv">3</span>}</span>
<span id="cb12-2"><span class="kw">def</span> my_f(a,b):</span>
<span id="cb12-3">    <span class="cf">return</span> a<span class="op">+</span>b</span>
<span id="cb12-4"></span>
<span id="cb12-5">my_f(<span class="op">**</span>dic) <span class="co">#Returns  4</span></span></code></pre></div></div>
</div>
<p><code>**</code> unpacks a dictionary. can only be used as parameter input?</p>
<p>Using <code>*args</code> in as parameter must be then accessed with a for loop, since it is provided to the function as tupple.</p>
<div id="c25078b2" class="cell" data-execution_count="13">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb13"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb13-1"><span class="co"># print first n letters of words</span></span>
<span id="cb13-2"></span>
<span id="cb13-3"><span class="kw">def</span> strcut(<span class="op">*</span><span class="bu">str</span>, n):</span>
<span id="cb13-4">    <span class="cf">for</span> i <span class="kw">in</span> <span class="bu">str</span>:</span>
<span id="cb13-5">        <span class="bu">print</span>(i[:n])</span>
<span id="cb13-6"><span class="co"># or </span></span>
<span id="cb13-7"></span>
<span id="cb13-8"><span class="kw">def</span> strcut(<span class="op">*</span><span class="bu">str</span>,n):</span>
<span id="cb13-9">    <span class="bu">print</span>(<span class="st">'</span><span class="ch">\n</span><span class="st">'</span>.join(i[:n] <span class="cf">for</span> i <span class="kw">in</span> <span class="bu">str</span>))</span></code></pre></div></div>
</div>
</section>
<section id="else-after-function" class="level3">
<h3 class="anchored" data-anchor-id="else-after-function">Else after Function</h3>
<p>Else is executed after the for loop is over (more specific after the StopIteration is raised by the iterator) but if we use break (the loop doesn’t come to and end: else is not executed.) The else keyword in try-except works similar but if try reaches it’s end.</p>
<p>If for example we search a list for a flag item we can use else for the case that the flag item is not in the list.</p>
<div id="d61eb491" class="cell" data-execution_count="14">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb14"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb14-1">mylist <span class="op">=</span> [<span class="dv">1</span>,<span class="dv">2</span>,<span class="dv">3</span>,<span class="dv">4</span>]</span>
<span id="cb14-2">theflag <span class="op">=</span> <span class="dv">5</span></span>
<span id="cb14-3"></span>
<span id="cb14-4"><span class="kw">def</span> process(i):</span>
<span id="cb14-5">    <span class="cf">return</span> i <span class="op">+</span> <span class="fl">0.5</span></span>
<span id="cb14-6"></span>
<span id="cb14-7"><span class="cf">for</span> i <span class="kw">in</span> mylist:</span>
<span id="cb14-8">    <span class="cf">if</span> i <span class="op">==</span> theflag:</span>
<span id="cb14-9">        <span class="cf">break</span></span>
<span id="cb14-10">    process(i)</span>
<span id="cb14-11"><span class="cf">else</span>:</span>
<span id="cb14-12">    <span class="cf">raise</span> <span class="pp">ValueError</span>(<span class="st">"List argument missing terminal flag."</span>)</span></code></pre></div></div>
</div>
</section>
<section id="recursion" class="level3">
<h3 class="anchored" data-anchor-id="recursion">Recursion</h3>
<p>Simple recursion of factorial()</p>
<div id="8f8a3635" class="cell" data-execution_count="15">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb15"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb15-1"><span class="kw">def</span> fac(n):</span>
<span id="cb15-2">  <span class="cf">if</span> n <span class="op">==</span> <span class="dv">1</span>:</span>
<span id="cb15-3">    <span class="cf">return</span> <span class="dv">1</span></span>
<span id="cb15-4">  <span class="cf">else</span>: </span>
<span id="cb15-5">    <span class="cf">return</span> n <span class="op">*</span> fac(n<span class="op">-</span><span class="dv">1</span>)</span></code></pre></div></div>
</div>
</section>
<section id="string-split-function" class="level3">
<h3 class="anchored" data-anchor-id="string-split-function">String split function</h3>
<div id="55fd16af" class="cell" data-execution_count="16">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb16"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb16-1"><span class="kw">def</span> split(string, delimiter):</span>
<span id="cb16-2">  </span>
<span id="cb16-3">  result_list <span class="op">=</span> []</span>
<span id="cb16-4">  </span>
<span id="cb16-5">  start <span class="op">=</span> <span class="dv">0</span></span>
<span id="cb16-6">  <span class="cf">for</span> index, char <span class="kw">in</span> <span class="bu">enumerate</span>(string):</span>
<span id="cb16-7">      <span class="cf">if</span> char <span class="op">==</span> delimiter:</span>
<span id="cb16-8">          result_list.append(string[start:index])</span>
<span id="cb16-9">          start <span class="op">=</span> index <span class="op">+</span> <span class="dv">1</span></span>
<span id="cb16-10">  <span class="cf">if</span> start <span class="op">==</span> <span class="dv">0</span>:</span>
<span id="cb16-11">      <span class="cf">return</span> [string]</span>
<span id="cb16-12">  result_list.append(string[start:index <span class="op">+</span> <span class="dv">1</span>])</span>
<span id="cb16-13">    </span>
<span id="cb16-14">  <span class="cf">return</span> result_list</span></code></pre></div></div>
</div>
</section>
<section id="string-join-function" class="level3">
<h3 class="anchored" data-anchor-id="string-join-function">String join function</h3>
<p>takes an iterable (list, tuple) and concatenates its elements into a single string. The seperator is provided as string from which join is called</p>
<div id="3f31bdf8" class="cell" data-execution_count="17">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb17"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb17-1">l <span class="op">=</span> [<span class="st">'1'</span>,<span class="st">'2'</span>,<span class="st">'3'</span>]</span>
<span id="cb17-2"><span class="bu">print</span>(<span class="st">'#'</span>.join(l))</span></code></pre></div></div>
<div class="cell-output cell-output-stdout">
<pre><code>1#2#3</code></pre>
</div>
</div>
<p>If int in list:</p>
<div id="4c2da1be" class="cell" data-execution_count="18">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb19"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb19-1">l <span class="op">=</span> [<span class="dv">1</span>,<span class="dv">2</span>,<span class="dv">3</span>]</span>
<span id="cb19-2"><span class="bu">print</span>(<span class="st">'#'</span>.join(<span class="bu">map</span>(<span class="bu">str</span>,l)))</span></code></pre></div></div>
<div class="cell-output cell-output-stdout">
<pre><code>1#2#3</code></pre>
</div>
</div>
</section>
<section id="args-and-kwargs" class="level3">
<h3 class="anchored" data-anchor-id="args-and-kwargs">*args and **kwargs</h3>
<p>They allow you to write functions that can accept an arbitrary number of arguments, making your code more flexible.</p>
<p>*args collects arguments into a tuple:</p>
<div id="0a142794" class="cell" data-execution_count="19">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb21"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb21-1"><span class="kw">def</span> print_numbers(<span class="op">*</span>args):</span>
<span id="cb21-2">    <span class="cf">for</span> number <span class="kw">in</span> args:</span>
<span id="cb21-3">        <span class="bu">print</span>(number)</span>
<span id="cb21-4"></span>
<span id="cb21-5">print_numbers(<span class="dv">1</span>, <span class="dv">2</span>, <span class="dv">3</span>, <span class="dv">4</span>)</span></code></pre></div></div>
</div>
<p>**kwargs collects arguments into a dictionary</p>
<div id="e76c7077" class="cell" data-execution_count="20">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb22"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb22-1"><span class="kw">def</span> print_student_info(<span class="op">**</span>kwargs):</span>
<span id="cb22-2">    <span class="cf">for</span> key, value <span class="kw">in</span> kwargs.items():</span>
<span id="cb22-3">        <span class="bu">print</span>(<span class="ss">f"</span><span class="sc">{</span>key<span class="sc">}</span><span class="ss">: </span><span class="sc">{</span>value<span class="sc">}</span><span class="ss">"</span>)</span>
<span id="cb22-4"></span>
<span id="cb22-5">print_student_info(name<span class="op">=</span><span class="st">"Alice"</span>, age<span class="op">=</span><span class="dv">20</span>, grade<span class="op">=</span><span class="st">"A"</span>)</span></code></pre></div></div>
<div class="cell-output cell-output-stdout">
<pre><code>name: Alice
age: 20
grade: A</code></pre>
</div>
</div>
<p>Combining both args and kwargs</p>
<div id="870b3d91" class="cell" data-execution_count="21">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb24"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb24-1"><span class="kw">def</span> print_info(name, <span class="op">*</span>args, <span class="op">**</span>kwargs):</span>
<span id="cb24-2">    <span class="bu">print</span>(<span class="ss">f"Name: </span><span class="sc">{</span>name<span class="sc">}</span><span class="ss">"</span>)</span>
<span id="cb24-3">    <span class="bu">print</span>(<span class="st">"Additional info:"</span>, args)</span>
<span id="cb24-4">    <span class="bu">print</span>(<span class="st">"Details:"</span>, kwargs)</span>
<span id="cb24-5"></span>
<span id="cb24-6">print_info(<span class="st">"Alice"</span>, <span class="dv">25</span>, <span class="st">"Engineer"</span>, country<span class="op">=</span><span class="st">"USA"</span>, city<span class="op">=</span><span class="st">"New York"</span>)</span></code></pre></div></div>
</div>
</section>
</section>
<section id="list" class="level2">
<h2 class="anchored" data-anchor-id="list">List</h2>
<p>Append new element to list</p>
<div id="bee792c2" class="cell" data-execution_count="22">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb25"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb25-1">li <span class="op">=</span> [<span class="dv">1</span>,<span class="dv">2</span>,<span class="dv">2</span>,<span class="dv">3</span>]</span>
<span id="cb25-2"></span>
<span id="cb25-3">li.append(<span class="dv">4</span>) </span>
<span id="cb25-4">li <span class="op">+=</span> [<span class="dv">4</span>]</span>
<span id="cb25-5"></span>
<span id="cb25-6">[<span class="dv">2</span>] <span class="op">+</span> [<span class="dv">1</span>] <span class="co">## -&gt; [2,1]</span></span></code></pre></div></div>
</div>
</section>
<section id="non-sequence-types" class="level2">
<h2 class="anchored" data-anchor-id="non-sequence-types">Non-Sequence Types</h2>
<p>In Python, non-sequence types are objects that do not store elements in a specific order and do not support indexing or slicing.</p>
<ul>
<li>Set, Dictionary, Numbers(int,float, complex), bool, None</li>
</ul>
</section>
<section id="dictionnary" class="level2">
<h2 class="anchored" data-anchor-id="dictionnary">Dictionnary</h2>
<div id="f9428269" class="cell" data-execution_count="23">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb26"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb26-1">info <span class="op">=</span> {<span class="st">"name"</span>: <span class="st">"Alice"</span>, <span class="st">"age"</span>: <span class="dv">30</span>}</span>
<span id="cb26-2"><span class="cf">for</span> key <span class="kw">in</span> info:</span>
<span id="cb26-3">    <span class="bu">print</span>(key)  <span class="co"># Output: name, age</span></span>
<span id="cb26-4"></span>
<span id="cb26-5"><span class="co"># Iterating over keys and values</span></span>
<span id="cb26-6"><span class="cf">for</span> key, value <span class="kw">in</span> info.items():</span>
<span id="cb26-7">    <span class="bu">print</span>(key, value)  <span class="co"># Output: name Alice, age 30</span></span></code></pre></div></div>
</div>
<section id="exam-exercise" class="level3">
<h3 class="anchored" data-anchor-id="exam-exercise">Exam exercise</h3>
<div id="24393c25" class="cell" data-execution_count="24">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb27"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb27-1"><span class="co"># Example list</span></span>
<span id="cb27-2">my_list <span class="op">=</span> [<span class="dv">10</span>, <span class="dv">20</span>, <span class="dv">30</span>, <span class="dv">40</span>, <span class="dv">50</span>]</span>
<span id="cb27-3"></span>
<span id="cb27-4"><span class="co"># Initialize an empty dictionary</span></span>
<span id="cb27-5">mydict <span class="op">=</span> {}</span>
<span id="cb27-6"></span>
<span id="cb27-7"><span class="co"># Iterate over the list using enumerate</span></span>
<span id="cb27-8"><span class="cf">for</span> index, value <span class="kw">in</span> <span class="bu">enumerate</span>(my_list):</span>
<span id="cb27-9">    <span class="co"># Add the index and value to the dictionary</span></span>
<span id="cb27-10">    mydict[index] <span class="op">=</span> value</span>
<span id="cb27-11"></span>
<span id="cb27-12"><span class="co"># Print the dictionary to verify the result</span></span>
<span id="cb27-13"><span class="bu">print</span>(mydict)</span></code></pre></div></div>
</div>
<section id="dict-comprehension" class="level4">
<h4 class="anchored" data-anchor-id="dict-comprehension">Dict comprehension</h4>
<div id="7b1f7c4b" class="cell" data-execution_count="25">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb28"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb28-1"><span class="co"># Create the dictionary using dictionary comprehension</span></span>
<span id="cb28-2">mydict <span class="op">=</span> {index: value <span class="cf">for</span> index, value <span class="kw">in</span> <span class="bu">enumerate</span>(my_list)}</span></code></pre></div></div>
</div>
</section>
</section>
<section id="exercise-illias" class="level3">
<h3 class="anchored" data-anchor-id="exercise-illias">exercise illias</h3>
<div id="3525b2db" class="cell" data-execution_count="26">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb29"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb29-1">q_dict <span class="op">=</span> {<span class="st">'idx'</span>: [],<span class="st">'qm'</span>:[], <span class="st">'cat'</span>: []}</span>
<span id="cb29-2"></span>
<span id="cb29-3"></span>
<span id="cb29-4"><span class="cf">for</span> idx, value <span class="kw">in</span> <span class="bu">enumerate</span>(q):</span>
<span id="cb29-5">    q_dict[<span class="st">'idx'</span>].append(idx)</span>
<span id="cb29-6">    q_dict[<span class="st">'qm'</span>].append(value)</span>
<span id="cb29-7"></span>
<span id="cb29-8">    <span class="co"># you can also use if, elif, else</span></span>
<span id="cb29-9">    <span class="co"># if value &lt; 0.2</span></span>
<span id="cb29-10">    <span class="co"># elif value &lt; 0.4</span></span>
<span id="cb29-11">    <span class="co"># elif &lt; 0.6....</span></span>
<span id="cb29-12">    <span class="cf">match</span> value:</span>
<span id="cb29-13">        <span class="cf">case</span> value <span class="cf">if</span> <span class="fl">0.2</span> <span class="op">&gt;</span> value <span class="op">&gt;=</span> <span class="dv">0</span>:</span>
<span id="cb29-14">            q_dict[<span class="st">'cat'</span>].append(<span class="st">'bad'</span>)</span>
<span id="cb29-15">        <span class="cf">case</span> value <span class="cf">if</span> <span class="fl">0.4</span> <span class="op">&gt;</span> value <span class="op">&gt;=</span> <span class="fl">0.2</span>:</span>
<span id="cb29-16">            q_dict[<span class="st">'cat'</span>].append(<span class="st">'weak'</span>)</span>
<span id="cb29-17">        <span class="cf">case</span> value <span class="cf">if</span> <span class="fl">0.6</span> <span class="op">&gt;</span> value <span class="op">&gt;=</span> <span class="fl">0.4</span>:</span>
<span id="cb29-18">            q_dict[<span class="st">'cat'</span>].append(<span class="st">'balanced'</span>)</span>
<span id="cb29-19">        <span class="cf">case</span> value <span class="cf">if</span> <span class="fl">0.6</span> <span class="op">&lt;=</span> value <span class="op">&lt;</span> <span class="fl">0.8</span>:</span>
<span id="cb29-20">            q_dict[<span class="st">'cat'</span>].append(<span class="st">'good'</span>)</span>
<span id="cb29-21">        <span class="cf">case</span> value <span class="cf">if</span> <span class="fl">0.8</span> <span class="op">&lt;=</span> value <span class="op">&lt;=</span> <span class="dv">1</span>:</span>
<span id="cb29-22">            q_dict[<span class="st">'cat'</span>].append(<span class="st">'very good'</span>)</span></code></pre></div></div>
</div>
</section>
</section>
<section id="string-formating" class="level2">
<h2 class="anchored" data-anchor-id="string-formating">String formating</h2>
<p>There are multiple ways here are two:</p>
<section id="formatted-string-literals" class="level3">
<h3 class="anchored" data-anchor-id="formatted-string-literals">Formatted String Literals</h3>
<p>Start with an f or F. Allows including variable names with {}.</p>
<p>Example: right align and use 5 spaces including var1</p>
<div id="625f05bc" class="cell" data-execution_count="27">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb30"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb30-1"><span class="bu">print</span>(<span class="ss">f"</span><span class="sc">{</span>var1<span class="sc">:&gt;5}</span><span class="ss">"</span>)</span></code></pre></div></div>
</div>
<p>Example: self documentation and debugging: returns var name and what is stored <code>var1= -&gt; var1=7</code></p>
<div id="9fec4dc9" class="cell" data-execution_count="28">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb31"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb31-1"><span class="bu">print</span>(<span class="ss">f"</span><span class="sc">{</span>var1<span class="op">=</span><span class="sc">}</span><span class="ss">"</span>)</span></code></pre></div></div>
</div>
</section>
<section id="format-method" class="level3">
<h3 class="anchored" data-anchor-id="format-method">Format() Method</h3>
<p>String objects provides methods/functions and apply it to string object</p>
<p>More flexible way to string literals: {} only placeholders, must be specified in format()</p>
<div id="300253aa" class="cell" data-execution_count="29">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb32"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb32-1">var1 <span class="op">=</span><span class="st">'world'</span></span>
<span id="cb32-2">var2 <span class="op">=</span> <span class="dv">7</span></span>
<span id="cb32-3"></span>
<span id="cb32-4"><span class="bu">print</span>(<span class="st">"hello </span><span class="sc">{}</span><span class="st"> </span><span class="sc">{}</span><span class="st">"</span>.<span class="bu">format</span>(var1, var2))</span>
<span id="cb32-5"><span class="bu">print</span>(<span class="st">"hello </span><span class="sc">{1}</span><span class="st"> </span><span class="sc">{0}</span><span class="st">"</span>.<span class="bu">format</span>(var2, var1))</span>
<span id="cb32-6"></span>
<span id="cb32-7"><span class="bu">dict</span> <span class="op">=</span> {<span class="st">'num'</span>: <span class="dv">7</span>, <span class="st">'txt'</span>: <span class="st">'world'</span>}</span>
<span id="cb32-8"><span class="bu">print</span>(<span class="st">"hello </span><span class="sc">{0[txt]}</span><span class="st"> </span><span class="sc">{0[num]}</span><span class="st">"</span>.<span class="bu">format</span>(<span class="bu">dict</span>))</span></code></pre></div></div>
</div>
</section>
<section id="c-style-string-format" class="level3">
<h3 class="anchored" data-anchor-id="c-style-string-format">C-style string format</h3>
<div id="00ea815c" class="cell" data-execution_count="30">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb33"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb33-1">first_name <span class="op">=</span> <span class="bu">input</span>(<span class="st">"Enter your first name: "</span>) <span class="co"># your input: Anna</span></span>
<span id="cb33-2">last_name <span class="op">=</span> <span class="bu">input</span>(<span class="st">"Enter your last name: "</span>) <span class="co"># your input: Meier</span></span>
<span id="cb33-3">birth_year <span class="op">=</span> <span class="bu">input</span>(<span class="st">"Enter your birth year: "</span>) <span class="co"># your input: 1998</span></span>
<span id="cb33-4">username <span class="op">=</span> <span class="st">"</span><span class="sc">%s%s%s</span><span class="st">"</span> <span class="op">%</span> (first_name[<span class="dv">0</span>].lower(), last_name[:<span class="dv">3</span>].lower(), birth_year[<span class="op">-</span><span class="dv">2</span>:])</span>
<span id="cb33-5"><span class="bu">print</span>(<span class="st">"Generated username: </span><span class="sc">%s</span><span class="st">"</span> <span class="op">%</span> username)</span>
<span id="cb33-6"></span>
<span id="cb33-7"><span class="co">#output: Generated username: amei98</span></span></code></pre></div></div>
</div>
</section>
<section id="test-whether-letter-of-string-is-digit-or-str" class="level3">
<h3 class="anchored" data-anchor-id="test-whether-letter-of-string-is-digit-or-str">test whether letter of string is digit or str:</h3>
<p>Use <code>string.isdigit()</code> and <code>string.isalpha()</code></p>
<ul>
<li>‘.’, ‘(space)’ or ‘,’ are not seen as letters</li>
</ul>
<div id="f4a36716" class="cell" data-execution_count="31">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb34"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb34-1">string <span class="op">=</span> <span class="st">'Python 3.2'</span></span>
<span id="cb34-2"></span>
<span id="cb34-3">cnt_digits <span class="op">=</span> <span class="dv">0</span></span>
<span id="cb34-4">cnt_str <span class="op">=</span> <span class="dv">0</span></span>
<span id="cb34-5"></span>
<span id="cb34-6"><span class="cf">for</span> s <span class="kw">in</span> string:</span>
<span id="cb34-7">  <span class="cf">if</span> s.isdigit():</span>
<span id="cb34-8">    cnt_digits <span class="op">+=</span> <span class="dv">1</span> </span>
<span id="cb34-9">  <span class="cf">elif</span> s.isalpha():</span>
<span id="cb34-10">    cnt_str <span class="op">+</span> <span class="op">=</span> <span class="dv">1</span></span></code></pre></div></div>
</div>
</section>
</section>
<section id="file-handling" class="level2">
<h2 class="anchored" data-anchor-id="file-handling">File Handling</h2>
<p><code>open(file_name, mode)</code> creates file object in python. It opens a pipe stream of the file that must be closed again <code>close()</code>.</p>
<p>Python provides a way to handle close with the function <code>with</code>. As soon as the block is left, the file is closed.</p>
<div id="7f926aa6" class="cell" data-execution_count="32">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb35"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb35-1"><span class="cf">with</span> <span class="bu">open</span>(file_name, mode) <span class="im">as</span> file_object: </span>
<span id="cb35-2">  ...</span>
<span id="cb35-3">  ...</span>
<span id="cb35-4">  ...</span></code></pre></div></div>
</div>
<section id="read" class="level3">
<h3 class="anchored" data-anchor-id="read">Read</h3>
</section>
</section>
<section id="object-oriented-programming" class="level2">
<h2 class="anchored" data-anchor-id="object-oriented-programming">Object Oriented Programming</h2>
<p>Variables are references to objects and objects belong to a class.</p>
<p><code>x = 99</code> is a references to storage location of a object of class int</p>
<section id="class" class="level3">
<h3 class="anchored" data-anchor-id="class">Class</h3>
<p>Blueprint for what an object should look like and how it should function. Has several elements. Functions are called methods (inside a class)</p>
<ul>
<li>header: indicates beginning of class</li>
<li><strong>init</strong>(): constructor (build) for objects</li>
<li>variables: Class and object</li>
<li>self: reference to the object that is created</li>
<li>class variable: -A class variable in Python is a variable that is shared among all instances of a class. It is defined <em>within the class but outside of any instance methods</em>. Class variables are commonly used when a value needs to be <em>consistent across all instances of a class</em>.
<ul>
<li>In methods you can access a class variable with for example: <code>Customer.class_variable_name</code> no self. is needed.</li>
</ul></li>
</ul>
</section>
<section id="class-methods" class="level3">
<h3 class="anchored" data-anchor-id="class-methods">Class Methods</h3>
</section>
<section id="static-methods" class="level3">
<h3 class="anchored" data-anchor-id="static-methods">Static Methods</h3>
<p>Same as regular function but defined in a class. Still they are rather independent of the class but are accessed with class.function. No self is needed.</p>
<div id="ecb86f8b" class="cell" data-execution_count="33">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb36"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb36-1"><span class="kw">class</span> A:</span>
<span id="cb36-2">  <span class="kw">def</span> <span class="fu">__init__</span>(<span class="va">self</span>):</span>
<span id="cb36-3">    ...</span>
<span id="cb36-4">    </span>
<span id="cb36-5">  <span class="at">@staticmethods</span></span>
<span id="cb36-6">  <span class="kw">def</span> function(<span class="bu">str</span>):</span>
<span id="cb36-7">    <span class="cf">return</span> function(<span class="bu">str</span>)</span>
<span id="cb36-8">  </span>
<span id="cb36-9"><span class="kw">class</span>.function</span></code></pre></div></div>
</div>
</section>
<section id="object-methods" class="level3">
<h3 class="anchored" data-anchor-id="object-methods">Object Methods</h3>
<div id="5a2800ae" class="cell" data-execution_count="34">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb37"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb37-1"><span class="kw">class</span> PackageName: </span>
<span id="cb37-2">  <span class="co">"""</span></span>
<span id="cb37-3"><span class="co">  Description</span></span>
<span id="cb37-4"><span class="co">  """</span></span>
<span id="cb37-5">  <span class="kw">def</span> <span class="fu">__init__</span>(<span class="va">self</span>, name: <span class="bu">str</span>, quality: <span class="bu">str</span>) <span class="op">-&gt;</span> none:</span>
<span id="cb37-6">      <span class="va">self</span>.name <span class="op">=</span> name</span>
<span id="cb37-7">      <span class="va">self</span>.quality <span class="op">=</span> quality</span>
<span id="cb37-8"><span class="co"># create an object from this class</span></span>
<span id="cb37-9"></span>
<span id="cb37-10">x: PackageName <span class="op">=</span> PackageName(name <span class="op">=</span> <span class="st">'ggplot'</span>, quality <span class="op">=</span> <span class="st">'high'</span>) <span class="co">#self becomes x</span></span></code></pre></div></div>
</div>
<div class="quarto-video ratio ratio-16x9"><iframe data-external="1" src="https://www.youtube.com/embed/rLyYb7BFgQI" title="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe></div>
</section>
<section id="dunder-methods" class="level3">
<h3 class="anchored" data-anchor-id="dunder-methods">Dunder Methods</h3>
<p>How should objects of a class behave for certain operations</p>
<div id="d70290e6" class="cell" data-execution_count="35">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb38"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb38-1"><span class="kw">class</span> A: </span>
<span id="cb38-2">  ...</span>
<span id="cb38-3">  </span>
<span id="cb38-4">  <span class="kw">def</span> <span class="fu">__add__</span>(<span class="va">self</span>,other):</span>
<span id="cb38-5">    <span class="cf">return</span> <span class="ss">f'</span><span class="sc">{</span><span class="va">self</span><span class="sc">.</span>name<span class="sc">}</span><span class="ss"> + </span><span class="sc">{</span>other<span class="sc">.</span>name<span class="sc">}</span><span class="ss">'</span></span>
<span id="cb38-6">  </span>
<span id="cb38-7"></span>
<span id="cb38-8"></span>
<span id="cb38-9">x <span class="op">=</span> A()</span>
<span id="cb38-10">y <span class="op">=</span> A()</span>
<span id="cb38-11"></span>
<span id="cb38-12"><span class="bu">print</span>(x <span class="op">+</span> y)</span></code></pre></div></div>
</div>
</section>
<section id="subclass" class="level3">
<h3 class="anchored" data-anchor-id="subclass">Subclass</h3>
<p>Inheritance creates a hierarchy of classes</p>
<ul>
<li>Animal -&gt; Bird and Cow</li>
</ul>
<p>test with <code>issubclass(Bird, Animal)</code>. Child classes get all properties from parent class.</p>
<section id="inheritance" class="level4">
<h4 class="anchored" data-anchor-id="inheritance">Inheritance</h4>
<p>We can use <code>super()</code> to refer to the upper level class (parent class in this case) If we first create a class, the function of the object class if inhereted to our created object.</p>
<div id="cb1aefa8" class="cell" data-execution_count="36">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb39"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb39-1"><span class="kw">class</span> Animal(<span class="bu">object</span> <span class="kw">class</span>): </span>
<span id="cb39-2">  <span class="kw">def</span> <span class="fu">__init__</span>(<span class="va">self</span>, weight):</span>
<span id="cb39-3">    <span class="va">self</span>.weight <span class="op">=</span> weight</span>
<span id="cb39-4">    </span>
<span id="cb39-5"><span class="kw">class</span> Bird(Animal):</span>
<span id="cb39-6">  <span class="kw">def</span> _init__(<span class="va">self</span>, weight): <span class="co">#override</span></span>
<span id="cb39-7">    <span class="bu">super</span>().<span class="fu">__init__</span>(weight)</span>
<span id="cb39-8">    <span class="co"># or Animal.__init__(self, weight)</span></span></code></pre></div></div>
</div>
</section>
<section id="inheritance-override" class="level4">
<h4 class="anchored" data-anchor-id="inheritance-override">Inheritance: Override</h4>
<p>We don’t want all methods or variables from parent class. The interpreter first checks methods and objects in the subclass before it checks the parents, so we can just overwrite the objects in the subclass (or extend functionality). We have to use the same name for the method or other objects!</p>
</section>
</section>
<section id="access-modifiers" class="level3">
<h3 class="anchored" data-anchor-id="access-modifiers">Access Modifiers</h3>
<ul>
<li>public: access through object</li>
<li>protected: only in subclass accessible
<ul>
<li>create with self._name. Is used to mark internal use in class and subclass</li>
</ul></li>
<li>private: only in declaration of own class accessible
<ul>
<li>create with self.__name. Python internally renames variable. Can’t be accessed in sub classes</li>
</ul></li>
</ul>
<section id="example-private-attribute-and-private-method" class="level4">
<h4 class="anchored" data-anchor-id="example-private-attribute-and-private-method">Example private attribute and private method:</h4>
<div id="e47706cb" class="cell" data-execution_count="37">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb40"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb40-1"><span class="kw">class</span> BankAccount:</span>
<span id="cb40-2">    <span class="kw">def</span> <span class="fu">__init__</span>(<span class="va">self</span>, balance):</span>
<span id="cb40-3">        <span class="va">self</span>.__balance <span class="op">=</span> balance  <span class="co"># Private attribute</span></span>
<span id="cb40-4"></span>
<span id="cb40-5">    <span class="kw">def</span> __secret_method(<span class="va">self</span>):  <span class="co"># Private method</span></span>
<span id="cb40-6">        <span class="bu">print</span>(<span class="st">"This is a secret method!"</span>)</span>
<span id="cb40-7"></span>
<span id="cb40-8">    <span class="kw">def</span> get_balance(<span class="va">self</span>):</span>
<span id="cb40-9">        <span class="cf">return</span> <span class="va">self</span>.__balance  <span class="co"># ✅ Allowed within the class</span></span>
<span id="cb40-10"></span>
<span id="cb40-11"><span class="co"># Trying to access private members</span></span>
<span id="cb40-12">account <span class="op">=</span> BankAccount(<span class="dv">1000</span>)</span>
<span id="cb40-13"><span class="co"># print(account.__balance)  # ❌ AttributeError</span></span>
<span id="cb40-14"><span class="co"># account.__secret_method()  # ❌ AttributeError</span></span>
<span id="cb40-15"></span>
<span id="cb40-16"><span class="co"># Accessing private members using name mangling (not recommended)</span></span>
<span id="cb40-17"><span class="bu">print</span>(account._BankAccount__balance)  <span class="co"># ✅ Works, but discouraged</span></span>
<span id="cb40-18">account._BankAccount__secret_method()  <span class="co"># ✅ Works, but discouraged</span></span></code></pre></div></div>
</div>
</section>
<section id="example-protected-attribute-and-protected-method" class="level4">
<h4 class="anchored" data-anchor-id="example-protected-attribute-and-protected-method">Example protected attribute and protected method:</h4>
<div id="12a2dbbb" class="cell" data-execution_count="38">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb41"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb41-1"><span class="kw">class</span> Car:</span>
<span id="cb41-2">    <span class="kw">def</span> <span class="fu">__init__</span>(<span class="va">self</span>, brand):</span>
<span id="cb41-3">        <span class="va">self</span>._brand <span class="op">=</span> brand  <span class="co"># Protected attribute</span></span>
<span id="cb41-4"></span>
<span id="cb41-5">    <span class="kw">def</span> _show_brand(<span class="va">self</span>):  <span class="co"># Protected method</span></span>
<span id="cb41-6">        <span class="bu">print</span>(<span class="ss">f"Brand: </span><span class="sc">{</span><span class="va">self</span><span class="sc">.</span>_brand<span class="sc">}</span><span class="ss">"</span>)</span>
<span id="cb41-7"></span>
<span id="cb41-8"><span class="kw">class</span> SportsCar(Car):</span>
<span id="cb41-9">    <span class="kw">def</span> display(<span class="va">self</span>):</span>
<span id="cb41-10">        <span class="bu">print</span>(<span class="ss">f"Sports Car Brand: </span><span class="sc">{</span><span class="va">self</span><span class="sc">.</span>_brand<span class="sc">}</span><span class="ss">"</span>)  <span class="co"># ✅ Allowed in subclass</span></span>
<span id="cb41-11"></span>
<span id="cb41-12"><span class="co"># Accessing protected attributes and methods</span></span>
<span id="cb41-13">c <span class="op">=</span> Car(<span class="st">"Tesla"</span>)</span>
<span id="cb41-14"><span class="bu">print</span>(c._brand)  <span class="co"># ⚠️ Allowed but discouraged</span></span>
<span id="cb41-15">c._show_brand()  <span class="co"># ⚠️ Allowed but discouraged</span></span></code></pre></div></div>
</div>
</section>
</section>
</section>
<section id="mulitple-inheritance" class="level2">
<h2 class="anchored" data-anchor-id="mulitple-inheritance">Mulitple inheritance</h2>
<p>Multiple parents. Can cause problems for the interpreter if same methods twice.</p>
<p>Solved with Method Resolution Order (MRO): tries to find a linearization of all classes and depends on the order of inheritance. It doesn’t find a feasible solution every time. Sometimes it helps to swap order.</p>
</section>
<section id="modules" class="level2">
<h2 class="anchored" data-anchor-id="modules">Modules</h2>
<p>paths when import:</p>
<ul>
<li>the current script sets the root for the ide but not for the terminal.</li>
<li>with <code>..</code> you can move up in the folder hierarchy.</li>
<li>instead of / or \ python uses .</li>
<li><code>from math import *</code> imports everything and you can refer to the function without <code>math.</code>
<ul>
<li>not a good style since it can cause problems</li>
</ul></li>
</ul>
</section>
<section id="if-name-main" class="level2">
<h2 class="anchored" data-anchor-id="if-name-main">If name = main</h2>
<p>the name of the script is only <em>main</em> if it’s the root script.</p>
<p>So if you add:</p>
<div id="b9d735f1" class="cell" data-execution_count="39">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb42"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb42-1"><span class="cf">if</span> <span class="va">__name__</span> <span class="op">=</span> <span class="st">"main"</span>:</span>
<span id="cb42-2">  ...tests</span></code></pre></div></div>
</div>
<p>you can code functionality that only runs when the script is the root and doesn’t run when the file has been imported into a different script.</p>
</section>
<section id="deep-vs.-shallow-copy" class="level2">
<h2 class="anchored" data-anchor-id="deep-vs.-shallow-copy">Deep vs.&nbsp;Shallow Copy</h2>
<p>Variable stores references to an object that is stored in <em>one or more(string, lists, tuples..)</em> storage cells. So copying a variable, copies the reference:</p>
<div id="88cd4a95" class="cell" data-execution_count="40">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb43"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb43-1">x <span class="op">=</span> <span class="fl">99.23</span></span>
<span id="cb43-2">y <span class="op">=</span> x <span class="co"># copy of reference</span></span>
<span id="cb43-3"></span>
<span id="cb43-4"><span class="bu">id</span>(x) <span class="op">==</span> <span class="bu">id</span>(y) </span>
<span id="cb43-5"></span>
<span id="cb43-6">x <span class="op">=</span> <span class="fl">43.12</span></span>
<span id="cb43-7"><span class="bu">id</span>(x) <span class="op">==</span> <span class="bu">id</span>(y)</span>
<span id="cb43-8"></span>
<span id="cb43-9"><span class="co"># But..</span></span>
<span id="cb43-10">a <span class="op">=</span> <span class="fl">19.2</span></span>
<span id="cb43-11">b <span class="op">=</span> <span class="fl">19.2</span></span>
<span id="cb43-12"></span>
<span id="cb43-13"><span class="bu">id</span>(a) <span class="op">==</span> <span class="bu">id</span>(b) <span class="co">#two different instances of object int</span></span></code></pre></div></div>
<div class="cell-output cell-output-display" data-execution_count="4">
<pre><code>False</code></pre>
</div>
</div>
<p>Assigning a new value creates a new instance of object int by calling: <code>b = int.__new__(value)</code>.</p>
<p>Lists are mutable objects: x only refers to the first element of list.</p>
<div id="6cb96679" class="cell" data-execution_count="41">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb45"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb45-1">x <span class="op">=</span> [<span class="dv">1</span>,<span class="dv">2</span>,<span class="dv">3</span>,<span class="dv">4</span>,<span class="dv">5</span>]</span>
<span id="cb45-2"></span>
<span id="cb45-3">y <span class="op">=</span> x  <span class="co">#copy</span></span>
<span id="cb45-4">y[<span class="dv">2</span>] <span class="op">=</span> <span class="dv">6</span> <span class="co">#change 3 element, doesnt' create a new object!!</span></span>
<span id="cb45-5"></span>
<span id="cb45-6"><span class="bu">print</span>(x)</span>
<span id="cb45-7"></span>
<span id="cb45-8">y[<span class="dv">0</span>] <span class="op">=</span> <span class="dv">9</span></span>
<span id="cb45-9"><span class="bu">id</span>(x) <span class="op">==</span> <span class="bu">id</span>(y)</span></code></pre></div></div>
<div class="cell-output cell-output-stdout">
<pre><code>[1, 2, 6, 4, 5]</code></pre>
</div>
<div class="cell-output cell-output-display" data-execution_count="5">
<pre><code>True</code></pre>
</div>
</div>
<p>This is a side effect. So we can create a real copy with the <code>copy()</code> function. Only available for mutable objects (sequences), so not for tuples.</p>
<div id="e0e81a38" class="cell" data-execution_count="42">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb48"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb48-1">x <span class="op">=</span> [<span class="dv">1</span>,<span class="dv">2</span>,<span class="dv">3</span>,<span class="dv">4</span>,<span class="dv">5</span>]</span>
<span id="cb48-2"></span>
<span id="cb48-3">y <span class="op">=</span> x.copy()</span>
<span id="cb48-4"></span>
<span id="cb48-5"><span class="bu">id</span>(x) <span class="op">==</span> <span class="bu">id</span>(y)</span>
<span id="cb48-6"></span>
<span id="cb48-7">str_text <span class="op">=</span> <span class="st">'hello'</span></span>
<span id="cb48-8"></span>
<span id="cb48-9"><span class="co">#str_copy = str_text.copy() doens't work since string gernally not mutable</span></span></code></pre></div></div>
</div>
<p>Nested Lists = special case. <code>copy()</code> <em>returns a shallow copy!</em>: Nested lists are references to new storage location</p>
<div id="d6173a50" class="cell" data-execution_count="43">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb49"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb49-1">nested_list <span class="op">=</span> [<span class="dv">1</span>,<span class="dv">2</span>,<span class="dv">3</span>,[<span class="dv">4</span>,<span class="dv">5</span>]]</span>
<span id="cb49-2"></span>
<span id="cb49-3">y <span class="op">=</span> nested_list.copy()</span>
<span id="cb49-4"></span>
<span id="cb49-5">y[<span class="op">-</span><span class="dv">1</span>][<span class="dv">0</span>] <span class="op">=</span> <span class="dv">99</span></span>
<span id="cb49-6"></span>
<span id="cb49-7"><span class="bu">print</span>(y)</span>
<span id="cb49-8"><span class="bu">print</span>(<span class="ss">f'not desired change: </span><span class="sc">{</span>nested_list<span class="op">=</span><span class="sc">}</span><span class="ss">'</span>)</span>
<span id="cb49-9"></span>
<span id="cb49-10"><span class="bu">print</span>(<span class="ss">f'</span><span class="sc">{</span><span class="bu">id</span>(y) <span class="op">==</span> <span class="bu">id</span>(nested_list)<span class="op">=</span><span class="sc">}</span><span class="ss">'</span>)</span></code></pre></div></div>
<div class="cell-output cell-output-stdout">
<pre><code>[1, 2, 3, [99, 5]]
not desired change: nested_list=[1, 2, 3, [99, 5]]
id(y) == id(nested_list)=False</code></pre>
</div>
</div>
<div id="990bc130" class="cell" data-execution_count="44">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb51"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb51-1"><span class="co">#import copy</span></span>
<span id="cb51-2">nested_list <span class="op">=</span> [<span class="dv">1</span>,<span class="dv">2</span>,<span class="dv">3</span>,[<span class="dv">4</span>,<span class="dv">5</span>]]</span>
<span id="cb51-3"></span>
<span id="cb51-4"><span class="co">#y = nested_list.copy.deepcopy(nested_list)</span></span>
<span id="cb51-5">y[<span class="op">-</span><span class="dv">1</span>][<span class="dv">0</span>] <span class="op">=</span> <span class="dv">99</span></span>
<span id="cb51-6"></span>
<span id="cb51-7"><span class="bu">print</span>(<span class="ss">f'didn</span><span class="ch">\'</span><span class="ss">t change: </span><span class="sc">{</span>nested_list<span class="op">=</span><span class="sc">}</span><span class="ss">'</span>)</span></code></pre></div></div>
</div>
</section>
<section id="lambda-function" class="level2">
<h2 class="anchored" data-anchor-id="lambda-function">Lambda Function</h2>
<p>Keep in mind:</p>
<div id="76922919" class="cell" data-execution_count="45">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb52"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb52-1"><span class="kw">def</span> my_fun():</span>
<span id="cb52-2">  <span class="kw">def</span> inner_fun(x):</span>
<span id="cb52-3">    <span class="cf">return</span> x </span>
<span id="cb52-4">  <span class="cf">return</span> inner_fun</span>
<span id="cb52-5"></span>
<span id="cb52-6">my_if <span class="op">=</span> my_fun() <span class="co">#reference to inner function</span></span>
<span id="cb52-7"><span class="bu">print</span>(my_if(<span class="st">'hello'</span>))</span>
<span id="cb52-8"></span>
<span id="cb52-9"><span class="co">#is the same as </span></span>
<span id="cb52-10"></span>
<span id="cb52-11">my_if <span class="op">=</span> my_fun <span class="co">#reference to outer function</span></span>
<span id="cb52-12"><span class="bu">print</span>(my_if()(<span class="st">'hello'</span>))</span></code></pre></div></div>
</div>
<p>Lambda: No header. Only body of function. Only one expression.</p>
<div id="5c4f3cdd" class="cell" data-execution_count="46">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb53"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb53-1">x <span class="op">=</span> <span class="kw">lambda</span> a,b: a <span class="op">+</span> b</span>
<span id="cb53-2"></span>
<span id="cb53-3"><span class="bu">print</span>(<span class="st">'x: '</span>, x(<span class="dv">3</span>,<span class="dv">5</span>))</span></code></pre></div></div>
<div class="cell-output cell-output-stdout">
<pre><code>x:  8</code></pre>
</div>
</div>
<div id="11c266e3" class="cell" data-execution_count="47">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb55"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb55-1"><span class="kw">def</span> fun():</span>
<span id="cb55-2">  <span class="cf">return</span> <span class="st">'hello'</span> </span>
<span id="cb55-3">  </span>
<span id="cb55-4">x <span class="op">=</span> <span class="kw">lambda</span>: fun()</span>
<span id="cb55-5"></span>
<span id="cb55-6"><span class="bu">print</span>(<span class="st">'x: '</span>, x())</span>
<span id="cb55-7"></span>
<span id="cb55-8">x <span class="op">=</span> <span class="kw">lambda</span> a: a()</span>
<span id="cb55-9"><span class="bu">print</span>(<span class="st">'x: '</span>, x(fun))</span></code></pre></div></div>
<div class="cell-output cell-output-stdout">
<pre><code>x:  hello
x:  hello</code></pre>
</div>
</div>
<p>We can use lambda for generic methods example:</p>
<div id="fc0423b3" class="cell" data-execution_count="48">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb57"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb57-1"><span class="kw">def</span> fun_ii(f, a, b):</span>
<span id="cb57-2">  <span class="cf">return</span> f(a,b)</span>
<span id="cb57-3"></span>
<span id="cb57-4"><span class="bu">print</span>(<span class="st">'fun_ii: '</span> , fun_ii(<span class="kw">lambda</span> x,y: x <span class="op">+</span> y, <span class="dv">2</span>, <span class="dv">3</span>))</span>
<span id="cb57-5"><span class="bu">print</span>(<span class="st">'fun_ii: '</span> , fun_ii(<span class="kw">lambda</span> x,y: x <span class="op">-</span> y, <span class="dv">2</span>, <span class="dv">3</span>))</span></code></pre></div></div>
<div class="cell-output cell-output-stdout">
<pre><code>fun_ii:  5
fun_ii:  -1</code></pre>
</div>
</div>
<p>Usually combined with other functions like <code>map()</code> or <code>sort()</code>.</p>
<p><code>map()</code>: applies a function to every single item of an iterable. Same as for loop.</p>
<div id="9a72e2d9" class="cell" data-execution_count="49">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb59"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb59-1">numbers <span class="op">=</span> [<span class="dv">1</span>,<span class="dv">2</span>,<span class="dv">3</span>,<span class="dv">4</span>]</span>
<span id="cb59-2">test <span class="op">=</span> <span class="bu">map</span>(<span class="kw">lambda</span> element: element<span class="op">-</span><span class="dv">1</span>,numbers) <span class="co">#we get a map object back</span></span>
<span id="cb59-3"></span>
<span id="cb59-4">test <span class="op">=</span> <span class="bu">list</span>(<span class="bu">map</span>(<span class="kw">lambda</span> element: element<span class="op">-</span><span class="dv">1</span>,numbers)) <span class="co">#create a list. List(test)</span></span>
<span id="cb59-5">test</span></code></pre></div></div>
<div class="cell-output cell-output-display" data-execution_count="10">
<pre><code>[0, 1, 2, 3]</code></pre>
</div>
</div>
<p><code>sort()</code>: sorts an iterable based on a given comparator</p>
<div id="d6066e8c" class="cell" data-execution_count="50">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb61"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb61-1"><span class="co">#sorts based on remains after modulo</span></span>
<span id="cb61-2">numbers <span class="op">=</span> [<span class="dv">1</span>,<span class="dv">2</span>,<span class="dv">3</span>,<span class="dv">4</span>,<span class="dv">6</span>]</span>
<span id="cb61-3"></span>
<span id="cb61-4">numbers.sort(key<span class="op">=</span> <span class="kw">lambda</span> element: element <span class="op">%</span><span class="dv">3</span>)</span>
<span id="cb61-5"><span class="bu">print</span>(numbers)</span></code></pre></div></div>
<div class="cell-output cell-output-stdout">
<pre><code>[3, 6, 1, 4, 2]</code></pre>
</div>
</div>
</section>
<section id="list-comprehension" class="level2">
<h2 class="anchored" data-anchor-id="list-comprehension">List Comprehension</h2>
<p>Single expression of for loop:</p>
<div id="5a0e1342" class="cell" data-execution_count="51">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb63"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb63-1">x <span class="op">=</span> [<span class="dv">1</span>,<span class="dv">2</span>,<span class="dv">3</span>,<span class="dv">4</span>,<span class="dv">5</span>,<span class="dv">6</span>]</span>
<span id="cb63-2"><span class="bu">print</span>(x)</span>
<span id="cb63-3"></span>
<span id="cb63-4">x2 <span class="op">=</span>[i<span class="op">**</span><span class="dv">2</span> <span class="cf">for</span> i <span class="kw">in</span> x]</span>
<span id="cb63-5"><span class="bu">print</span>(x2)</span>
<span id="cb63-6"></span>
<span id="cb63-7">x <span class="op">=</span> [i<span class="op">**</span><span class="dv">2</span> <span class="cf">for</span> i <span class="kw">in</span> x]</span>
<span id="cb63-8"><span class="bu">print</span>(x)</span></code></pre></div></div>
<div class="cell-output cell-output-stdout">
<pre><code>[1, 2, 3, 4, 5, 6]
[1, 4, 9, 16, 25, 36]
[1, 4, 9, 16, 25, 36]</code></pre>
</div>
</div>
<p>Add conditions</p>
<div id="88c8eee3" class="cell" data-execution_count="52">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb65"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb65-1">x <span class="op">=</span> [<span class="dv">1</span>,<span class="dv">2</span>,<span class="dv">3</span>,<span class="dv">4</span>,<span class="dv">5</span>,<span class="dv">6</span>]</span>
<span id="cb65-2"></span>
<span id="cb65-3">x2 <span class="op">=</span> [i<span class="op">**</span><span class="dv">2</span> <span class="cf">for</span> i <span class="kw">in</span> x <span class="cf">if</span> i<span class="op">%</span><span class="dv">2</span>] <span class="co">#unequal numbers (&gt;0 equals true)</span></span>
<span id="cb65-4"><span class="bu">print</span>(x2)</span>
<span id="cb65-5"></span>
<span id="cb65-6">x3 <span class="op">=</span> [i<span class="op">**</span><span class="dv">2</span> <span class="cf">for</span> i <span class="kw">in</span> x <span class="cf">if</span> <span class="kw">not</span> i<span class="op">%</span><span class="dv">2</span>] <span class="co">#equal numbers !(&gt;0 equals true)</span></span>
<span id="cb65-7"><span class="bu">print</span>(x3)</span>
<span id="cb65-8"></span>
<span id="cb65-9">x4 <span class="op">=</span> [i<span class="op">**</span><span class="dv">2</span> <span class="cf">if</span> <span class="kw">not</span> i<span class="op">%</span><span class="dv">2</span> <span class="cf">else</span> i<span class="op">-</span><span class="dv">10</span> <span class="cf">for</span> i <span class="kw">in</span> x] <span class="co">#if else short-hand</span></span>
<span id="cb65-10"><span class="bu">print</span>(x4)</span></code></pre></div></div>
<div class="cell-output cell-output-stdout">
<pre><code>[1, 9, 25]
[4, 16, 36]
[-9, 4, -7, 16, -5, 36]</code></pre>
</div>
</div>
<p>Nested Looops</p>
<div id="244240ed" class="cell" data-execution_count="53">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb67"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb67-1">li <span class="op">=</span> [[<span class="dv">1</span>,<span class="dv">2</span>,<span class="dv">3</span>],[<span class="dv">22</span>,<span class="dv">33</span>]]</span>
<span id="cb67-2"></span>
<span id="cb67-3">res <span class="op">=</span> [element<span class="op">*</span><span class="dv">2</span> <span class="cf">for</span> row <span class="kw">in</span> li <span class="cf">for</span> element <span class="kw">in</span> row] <span class="co">#simple list return</span></span>
<span id="cb67-4">res2 <span class="op">=</span> [[element<span class="op">*</span><span class="dv">2</span> <span class="cf">for</span> element <span class="kw">in</span> row] <span class="cf">for</span> row <span class="kw">in</span> li] <span class="co">#nested list return</span></span>
<span id="cb67-5"><span class="bu">print</span>(res)</span>
<span id="cb67-6"><span class="bu">print</span>(<span class="st">'</span><span class="ch">\n</span><span class="st">'</span>)</span>
<span id="cb67-7"><span class="bu">print</span>(res2)</span></code></pre></div></div>
<div class="cell-output cell-output-stdout">
<pre><code>[2, 4, 6, 44, 66]

[[2, 4, 6], [44, 66]]</code></pre>
</div>
</div>
<p>Comprehension with tuples returns a generator but you can use unpacker <code>*</code>.</p>
<div id="91122961" class="cell" data-execution_count="54">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb69"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb69-1">word_list <span class="op">=</span> [<span class="st">"apple"</span>, <span class="st">"banana"</span>, <span class="st">"cherry"</span>, <span class="st">"date"</span>]</span>
<span id="cb69-2"></span>
<span id="cb69-3"><span class="co"># Use list comprehension to add "__" to every entry</span></span>
<span id="cb69-4">modified_list <span class="op">=</span> [word <span class="op">+</span> <span class="st">"__"</span> <span class="cf">for</span> word <span class="kw">in</span> word_list]</span></code></pre></div></div>
</div>
</section>
<section id="dictionairy-comprehension" class="level2">
<h2 class="anchored" data-anchor-id="dictionairy-comprehension">Dictionairy comprehension</h2>
<p><code>zip()</code> returns list of tuples</p>
<div id="ca76cf47" class="cell" data-execution_count="55">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb70"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb70-1"><span class="co">#turn into dict</span></span>
<span id="cb70-2">x <span class="op">=</span> [<span class="dv">1</span>,<span class="dv">2</span>,<span class="dv">4</span>,<span class="dv">5</span>]</span>
<span id="cb70-3"></span>
<span id="cb70-4">d <span class="op">=</span> {i:i <span class="cf">for</span> i <span class="kw">in</span> x}</span>
<span id="cb70-5"><span class="bu">print</span>(d)</span>
<span id="cb70-6">d1 <span class="op">=</span> {k:v <span class="cf">for</span> (k,v) <span class="kw">in</span> <span class="bu">enumerate</span>(x)}</span>
<span id="cb70-7"><span class="bu">print</span>(d1)</span>
<span id="cb70-8"></span>
<span id="cb70-9">d2 <span class="op">=</span> {k:v <span class="cf">for</span> (k,v) <span class="kw">in</span> <span class="bu">zip</span>([<span class="st">'a'</span>,<span class="st">'b'</span>,<span class="st">'c'</span>],x)}</span>
<span id="cb70-10"><span class="bu">print</span>(d2)</span></code></pre></div></div>
<div class="cell-output cell-output-stdout">
<pre><code>{1: 1, 2: 2, 4: 4, 5: 5}
{0: 1, 1: 2, 2: 4, 3: 5}
{'a': 1, 'b': 2, 'c': 4}</code></pre>
</div>
</div>
<div id="25f88441" class="cell" data-execution_count="56">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb72"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb72-1"><span class="im">from</span> random <span class="im">import</span> sample</span>
<span id="cb72-2"></span>
<span id="cb72-3"><span class="kw">class</span> Stream:</span>
<span id="cb72-4">    <span class="kw">def</span> <span class="fu">__init__</span>(<span class="va">self</span>, <span class="bu">id</span>):</span>
<span id="cb72-5">        <span class="va">self</span>.my_id <span class="op">=</span> <span class="bu">id</span></span>
<span id="cb72-6">    </span>
<span id="cb72-7">    <span class="kw">def</span> <span class="fu">__repr__</span>(<span class="va">self</span>):</span>
<span id="cb72-8">        <span class="cf">return</span> <span class="ss">f"Stream obj: </span><span class="sc">{</span><span class="va">self</span><span class="sc">.</span>my_id<span class="sc">}</span><span class="ss">"</span></span>
<span id="cb72-9"></span>
<span id="cb72-10"><span class="co"># Create 10 stream objects with random IDs (e.g., from 1 to 100)</span></span>
<span id="cb72-11">stream_objects <span class="op">=</span> [Stream(<span class="bu">id</span>) <span class="cf">for</span> <span class="bu">id</span> <span class="kw">in</span> sample(<span class="bu">range</span>(<span class="dv">1</span>, <span class="dv">101</span>), <span class="dv">10</span>)]</span>
<span id="cb72-12"></span>
<span id="cb72-13"><span class="co"># Print each stream object using unpack operator </span></span>
<span id="cb72-14"><span class="bu">print</span>(<span class="op">*</span>stream_objects, sep<span class="op">=</span><span class="st">'</span><span class="ch">\n</span><span class="st">'</span>)</span></code></pre></div></div>
<div class="cell-output cell-output-stdout">
<pre><code>Stream obj: 40
Stream obj: 7
Stream obj: 91
Stream obj: 11
Stream obj: 71
Stream obj: 82
Stream obj: 39
Stream obj: 15
Stream obj: 45
Stream obj: 73</code></pre>
</div>
</div>
</section>
<section id="try-except" class="level2">
<h2 class="anchored" data-anchor-id="try-except">Try-Except</h2>
<p>Strict order:</p>
<ul>
<li>try:</li>
<li>except: (optional if there is finally)</li>
<li>else: (optional, <em>executed only if no exception is raised.</em>)</li>
<li>finally: (optional if there is except, is executed always no matter what)
<ul>
<li>finally still breaks code if there is an error so everything after finally is not executed (if no exception is given).</li>
<li>finally is good for garbarge collection: delete used variable in try, close files etc. or to give message why something went wrong</li>
</ul></li>
</ul>
<div id="53643033" class="cell" data-execution_count="57">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb74"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb74-1"><span class="cf">try</span>:</span>
<span id="cb74-2">  num <span class="op">=</span> <span class="bu">input</span>(<span class="st">'Enter a number: '</span>)</span>
<span id="cb74-3">  frac <span class="op">=</span> <span class="dv">1</span><span class="op">/</span><span class="bu">int</span>(num)</span>
<span id="cb74-4"><span class="cf">except</span> <span class="pp">ValueError</span> <span class="im">as</span> e:</span>
<span id="cb74-5">  <span class="bu">print</span>(<span class="st">'no number given:'</span>, e)</span>
<span id="cb74-6"><span class="cf">except</span> <span class="pp">ZeroDivisionError</span>:</span>
<span id="cb74-7">  <span class="bu">print</span>(<span class="st">'can not divide by 0'</span>)</span>
<span id="cb74-8"><span class="cf">except</span>:</span>
<span id="cb74-9">  <span class="bu">print</span>(<span class="st">'any other error happend'</span>)</span>
<span id="cb74-10"><span class="cf">else</span>:</span>
<span id="cb74-11">  <span class="bu">print</span>(<span class="ss">f'the fraction is: </span><span class="sc">{</span>frac<span class="sc">}</span><span class="ss">'</span>)</span>
<span id="cb74-12"><span class="cf">finally</span>:</span>
<span id="cb74-13">  <span class="bu">print</span>(<span class="st">'leaving try-except clause'</span>)</span></code></pre></div></div>
</div>
<p>Exceptions are handled in order and once one is executed the reset is skipt including else statement. For example the second ZeroDivisionError will not be executed.</p>
<div id="09a71944" class="cell" data-execution_count="58">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb75"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb75-1"><span class="cf">try</span>:</span>
<span id="cb75-2">  num <span class="op">=</span> <span class="bu">input</span>(<span class="st">'Enter a number: '</span>)</span>
<span id="cb75-3">  frac <span class="op">=</span> <span class="dv">1</span><span class="op">/</span><span class="bu">int</span>(num)</span>
<span id="cb75-4"><span class="cf">except</span> (<span class="pp">ValueError</span>,<span class="pp">ZeroDivisionError</span>) <span class="im">as</span> e:</span>
<span id="cb75-5">  <span class="bu">print</span>(<span class="st">'no number given:'</span>, e)</span>
<span id="cb75-6"><span class="cf">except</span> <span class="pp">ZeroDivisionError</span>:</span>
<span id="cb75-7">  <span class="bu">print</span>(<span class="st">'can not divide by 0'</span>)</span>
<span id="cb75-8"><span class="cf">except</span>:</span>
<span id="cb75-9">  <span class="bu">print</span>(<span class="st">'any other error happend'</span>)</span>
<span id="cb75-10"><span class="cf">else</span>:</span>
<span id="cb75-11">  <span class="bu">print</span>(<span class="ss">f'the fraction is: </span><span class="sc">{</span>frac<span class="sc">}</span><span class="ss">'</span>)</span>
<span id="cb75-12"><span class="cf">finally</span>:</span>
<span id="cb75-13">  <span class="bu">print</span>(<span class="st">'leaving try-except clause'</span>)</span></code></pre></div></div>
<div class="cell-output cell-output-stdout">
<pre><code>any other error happend
leaving try-except clause</code></pre>
</div>
</div>
<p>These examples are explicit Exceptions since we specifiy the excat error. If we use <code>except Exception as e</code> then this is implicit.</p>
<div id="72d217d0" class="cell" data-execution_count="59">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb77"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb77-1"><span class="kw">def</span> strselect(string,key,p):</span>
<span id="cb77-2">    return_list <span class="op">=</span> []</span>
<span id="cb77-3">    <span class="cf">for</span> i <span class="kw">in</span> string:</span>
<span id="cb77-4">        <span class="cf">try</span>:    </span>
<span id="cb77-5">            <span class="cf">if</span> i[p] <span class="op">==</span> key:</span>
<span id="cb77-6">                return_list.append(i)</span>
<span id="cb77-7">        <span class="cf">except</span> <span class="pp">IndexError</span> <span class="im">as</span> e:</span>
<span id="cb77-8">            <span class="bu">print</span>(<span class="st">"string index out of range"</span>)</span>
<span id="cb77-9">    <span class="cf">return</span> return_list</span>
<span id="cb77-10"></span>
<span id="cb77-11"></span>
<span id="cb77-12"><span class="co">#possible function call:</span></span>
<span id="cb77-13"><span class="bu">print</span>(strselect([<span class="st">"hello"</span>, <span class="st">"of"</span>, <span class="st">"help"</span>, <span class="st">"world"</span>], key <span class="op">=</span> <span class="st">"l"</span>, p <span class="op">=</span> <span class="dv">2</span>))</span></code></pre></div></div>
<div class="cell-output cell-output-stdout">
<pre><code>string index out of range
['hello', 'help']</code></pre>
</div>
</div>
<section id="customize-and-raise-errors" class="level3">
<h3 class="anchored" data-anchor-id="customize-and-raise-errors">Customize and Raise Errors</h3>
<p>Using the keyword <code>raise</code> we can raise an error:</p>
<p>If creating an own CustError class don’t inheritage from BaseException.</p>
<div id="bab73b23" class="cell" data-execution_count="60">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb79"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb79-1"><span class="kw">class</span> CustError(<span class="pp">Exception</span>):</span>
<span id="cb79-2">  <span class="kw">def</span> <span class="fu">__init__</span>(<span class="va">self</span>,message):</span>
<span id="cb79-3">    <span class="bu">super</span>().<span class="fu">__init__</span>(message)</span>
<span id="cb79-4">    </span>
<span id="cb79-5">    <span class="co"># customize error code..</span></span>
<span id="cb79-6">    <span class="va">self</span>.errors <span class="op">=</span> <span class="st">"custom error"</span></span>
<span id="cb79-7"></span>
<span id="cb79-8"><span class="cf">if</span> <span class="bu">input</span>(<span class="st">'enter number: '</span>) <span class="op">==</span> <span class="st">'0'</span>: </span>
<span id="cb79-9">  <span class="cf">raise</span> CustError(<span class="st">'customized error message'</span>)</span>
<span id="cb79-10"></span>
<span id="cb79-11"><span class="kw">def</span> invert_value(val):</span>
<span id="cb79-12">  <span class="cf">if</span> <span class="bu">type</span>(val) <span class="op">!=</span> <span class="bu">int</span>:</span>
<span id="cb79-13">    <span class="cf">raise</span> <span class="pp">ValueError</span>(<span class="st">'the given value is not of type integer.'</span>)</span>
<span id="cb79-14">  </span>
<span id="cb79-15">  <span class="cf">return</span> <span class="dv">1</span><span class="op">/</span>val</span>
<span id="cb79-16"></span>
<span id="cb79-17"><span class="cf">try</span>: </span>
<span id="cb79-18">  invert_value(<span class="fl">19.2</span>)</span>
<span id="cb79-19"><span class="cf">except</span> <span class="pp">ValueError</span> <span class="im">as</span> e:</span>
<span id="cb79-20">  <span class="bu">print</span>(e)</span>
<span id="cb79-21">  </span>
<span id="cb79-22">  <span class="co">#returns our custome message</span></span></code></pre></div></div>
</div>
</section>
</section>
<section id="generator" class="level2">
<h2 class="anchored" data-anchor-id="generator">Generator</h2>
<p><em>Iterable</em></p>
<p>Objects that implements the <code>__iter__()</code> method and returns an iterator Examples: lists,tuples, sets, strings</p>
<div id="0fe02428" class="cell" data-execution_count="61">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb80"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb80-1"><span class="co"># Iterable object (list)</span></span>
<span id="cb80-2">my_list <span class="op">=</span> [<span class="dv">1</span>, <span class="dv">2</span>, <span class="dv">3</span>]</span>
<span id="cb80-3"></span>
<span id="cb80-4"><span class="co"># Create an iterator from the iterable</span></span>
<span id="cb80-5">my_iterator <span class="op">=</span> <span class="bu">iter</span>(my_list)</span>
<span id="cb80-6"></span>
<span id="cb80-7"><span class="co"># Checking if the iterator is an iterable</span></span>
<span id="cb80-8"><span class="bu">print</span>(<span class="bu">isinstance</span>(my_iterator, Iterable))  <span class="co"># True (because an iterator is iterable)</span></span>
<span id="cb80-9"></span>
<span id="cb80-10"><span class="co"># Iterating through the iterator</span></span>
<span id="cb80-11"><span class="bu">print</span>(<span class="bu">next</span>(my_iterator))  <span class="co"># Output: 1</span></span>
<span id="cb80-12"><span class="bu">print</span>(<span class="bu">next</span>(my_iterator))  <span class="co"># Output: 2</span></span>
<span id="cb80-13"><span class="bu">print</span>(<span class="bu">next</span>(my_iterator))  <span class="co"># Output: 3</span></span>
<span id="cb80-14"></span>
<span id="cb80-15"><span class="co"># The following call will raise StopIteration as all items are exhausted</span></span>
<span id="cb80-16"><span class="co"># print(next(my_iterator))  # StopIteration</span></span></code></pre></div></div>
</div>
<p><em>Iterator: </em></p>
<p>In <code>for i in li:</code> the keyword <code>for</code> creates an iterator and passes the provided list (iterable). The iterator points to the first element of the list and the object is returned. The we call the <code>__next__()</code> method of this object to get the second object in li until <code>__next__()</code> raises an <em>StopIteration</em> exception. An iterator is always an iterable but not all iterables are iterators</p>
<ul>
<li>str, lists, tuples, sets, dictionaries, ranges, files, generators</li>
</ul>
<div id="c10bb092" class="cell" data-execution_count="62">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb81"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb81-1">x <span class="op">=</span> <span class="bu">list</span>(<span class="bu">range</span>(<span class="dv">9</span>))</span>
<span id="cb81-2"></span>
<span id="cb81-3"></span>
<span id="cb81-4">itr <span class="op">=</span> <span class="bu">iter</span>(x)</span>
<span id="cb81-5"></span>
<span id="cb81-6">itr.<span class="fu">__next__</span>()</span>
<span id="cb81-7">itr.<span class="fu">__next__</span>()</span>
<span id="cb81-8"><span class="bu">print</span>(<span class="st">'-'</span><span class="op">*</span><span class="dv">10</span>)</span>
<span id="cb81-9"><span class="co"># Iterator remembers current position so for loop will only print remaining i's</span></span>
<span id="cb81-10"><span class="cf">for</span> i <span class="kw">in</span> itr: </span>
<span id="cb81-11">  <span class="bu">print</span>(i)</span>
<span id="cb81-12"></span>
<span id="cb81-13"><span class="co"># raises error</span></span>
<span id="cb81-14"><span class="co">#itr.__next__()</span></span></code></pre></div></div>
<div class="cell-output cell-output-stdout">
<pre><code>----------
2
3
4
5
6
7
8</code></pre>
</div>
</div>
<div id="beb92b42" class="cell" data-execution_count="63">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb83"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb83-1"><span class="co"># A generator expression</span></span>
<span id="cb83-2">gen_expr <span class="op">=</span> (x <span class="op">*</span> <span class="dv">2</span> <span class="cf">for</span> x <span class="kw">in</span> <span class="bu">range</span>(<span class="dv">5</span>))</span>
<span id="cb83-3"></span>
<span id="cb83-4"><span class="bu">next</span>(gen_expr)</span></code></pre></div></div>
</div>
<section id="non-iterable" class="level3">
<h3 class="anchored" data-anchor-id="non-iterable">non-Iterable</h3>
<p>a non-iterable object is an object that cannot be looped over:</p>
<ul>
<li>int, float, bool, complex, none</li>
</ul>
</section>
<section id="concept-of-generator-generator-function" class="level3">
<h3 class="anchored" data-anchor-id="concept-of-generator-generator-function">Concept of Generator (Generator Function)</h3>
<p>Each iteration is called on demand and not at the start: saving memory (lazy evaluation)</p>
<ul>
<li>Uses yield keyword instead of return and returns a generator iterator.</li>
<li>Breaks at each yield but remembers where it was and can be continuied until StopIterator is raised</li>
<li>can be written as generator expression without yield: <code>(x**2 for x in range(4))</code></li>
<li></li>
</ul>
<div id="a5e502f7" class="cell" data-execution_count="64">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb84"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb84-1"><span class="kw">def</span> my_sum(x):</span>
<span id="cb84-2">  </span>
<span id="cb84-3">  <span class="cf">return</span> x <span class="op">+</span> <span class="dv">2</span></span>
<span id="cb84-4"></span>
<span id="cb84-5"><span class="kw">def</span> my_sum_gen(x):</span>
<span id="cb84-6">  </span>
<span id="cb84-7">  y <span class="op">=</span> x </span>
<span id="cb84-8">  <span class="cf">while</span> <span class="va">True</span>:</span>
<span id="cb84-9">    </span>
<span id="cb84-10">    <span class="cf">yield</span> y <span class="op">+</span> <span class="dv">2</span> </span>
<span id="cb84-11">    <span class="cf">yield</span> y <span class="op">+</span> <span class="dv">5</span></span>
<span id="cb84-12">    </span>
<span id="cb84-13"></span>
<span id="cb84-14">r2 <span class="op">=</span> my_sum_gen(<span class="dv">7</span>)</span>
<span id="cb84-15"></span>
<span id="cb84-16"><span class="bu">print</span>(<span class="bu">next</span>(r2))</span>
<span id="cb84-17"><span class="bu">print</span>(<span class="bu">next</span>(r2))</span></code></pre></div></div>
<div class="cell-output cell-output-stdout">
<pre><code>9
12</code></pre>
</div>
</div>
<p>Example</p>
<p>“In ordered large list are there values smaller than 0?”</p>
<div id="4b47c281" class="cell" data-execution_count="65">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb86"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb86-1">k <span class="op">=</span> <span class="bu">range</span>(<span class="dv">1_000_000</span>)</span>
<span id="cb86-2"><span class="bu">any</span>(x <span class="op">&lt;</span> <span class="dv">0</span> <span class="cf">for</span> x <span class="kw">in</span> k)</span></code></pre></div></div>
<div class="cell-output cell-output-display" data-execution_count="22">
<pre><code>False</code></pre>
</div>
</div>
<div id="2a07cc80" class="cell" data-execution_count="66">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb88"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb88-1"><span class="co"># A generator function</span></span>
<span id="cb88-2"><span class="kw">def</span> my_generator():</span>
<span id="cb88-3">    <span class="cf">yield</span> <span class="dv">1</span></span>
<span id="cb88-4">    <span class="cf">yield</span> <span class="dv">2</span></span>
<span id="cb88-5">    <span class="cf">yield</span> <span class="dv">3</span></span>
<span id="cb88-6"></span>
<span id="cb88-7"><span class="co"># Create a generator object</span></span>
<span id="cb88-8">gen <span class="op">=</span> my_generator()</span>
<span id="cb88-9"></span>
<span id="cb88-10"><span class="co"># Using the generator object in a for loop (iteration)</span></span>
<span id="cb88-11"><span class="cf">for</span> value <span class="kw">in</span> gen:</span>
<span id="cb88-12">    <span class="bu">print</span>(value)</span></code></pre></div></div>
<div class="cell-output cell-output-stdout">
<pre><code>1
2
3</code></pre>
</div>
</div>
</section>
</section>
<section id="exercise-test" class="level1">

<section id="largest-number-delete-if-in-last-position" class="level2">
<h2 class="anchored" data-anchor-id="largest-number-delete-if-in-last-position">Largest number: delete if in last position</h2>
<div id="1d4fb578" class="cell" data-execution_count="67">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb90"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb90-1"><span class="cf">for</span> i <span class="kw">in</span> numbers[:<span class="op">-</span><span class="dv">1</span>]: <span class="co">#go through numbers except last </span></span>
<span id="cb90-2">    <span class="cf">if</span> i <span class="op">==</span> <span class="bu">max</span>(numbers):</span>
<span id="cb90-3">        <span class="cf">break</span> <span class="co">#exit loop: max number not last position</span></span>
<span id="cb90-4"><span class="cf">else</span>: <span class="co">#is executed only if for loop comes to end</span></span>
<span id="cb90-5">    numbers.pop() <span class="co">#removes last number</span></span></code></pre></div></div>
</div>
</section>
<section id="oop-buildings" class="level2">
<h2 class="anchored" data-anchor-id="oop-buildings">OOP Buildings</h2>
<div id="2516364e" class="cell" data-execution_count="68">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb91"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb91-1"><span class="kw">class</span> Building:</span>
<span id="cb91-2">    <span class="co"># Class variables</span></span>
<span id="cb91-3">    _counter <span class="op">=</span> <span class="dv">0</span></span>
<span id="cb91-4">    _id_container <span class="op">=</span> []</span>
<span id="cb91-5"></span>
<span id="cb91-6">    <span class="kw">def</span> <span class="fu">__init__</span>(<span class="va">self</span>, number_of_floors):</span>
<span id="cb91-7">        <span class="co"># Object variables</span></span>
<span id="cb91-8">        <span class="va">self</span>._number_of_floors <span class="op">=</span> number_of_floors</span>
<span id="cb91-9">        <span class="va">self</span>._building_id <span class="op">=</span> <span class="va">self</span>._get_new_id()  <span class="co"># Assign building id at creation</span></span>
<span id="cb91-10"></span>
<span id="cb91-11">    <span class="kw">def</span> _get_new_id(<span class="va">self</span>):</span>
<span id="cb91-12">        <span class="co"># Increment counter and create a new building ID</span></span>
<span id="cb91-13">        Building._counter <span class="op">+=</span> <span class="dv">1</span></span>
<span id="cb91-14">        building_id <span class="op">=</span> Building._counter</span>
<span id="cb91-15">        <span class="cf">if</span> building_id <span class="kw">in</span> Building._id_container:</span>
<span id="cb91-16">            <span class="cf">raise</span> <span class="pp">ValueError</span>(<span class="ss">f"Building ID </span><span class="sc">{</span>building_id<span class="sc">}</span><span class="ss"> is already taken."</span>)</span>
<span id="cb91-17">        Building._id_container.append(building_id)</span>
<span id="cb91-18">        <span class="cf">return</span> building_id</span>
<span id="cb91-19"></span>
<span id="cb91-20">    <span class="kw">def</span> get_number_of_floors(<span class="va">self</span>):</span>
<span id="cb91-21">        <span class="co"># Return the number of floors for the building</span></span>
<span id="cb91-22">        <span class="cf">return</span> <span class="va">self</span>._number_of_floors</span>
<span id="cb91-23"></span>
<span id="cb91-24"><span class="kw">class</span> OfficeBuilding(Building):</span>
<span id="cb91-25">    <span class="kw">def</span> <span class="fu">__init__</span>(<span class="va">self</span>, number_of_floors, number_of_working_places):</span>
<span id="cb91-26">        <span class="co"># Call parent class constructor to initialize number_of_floors and building_id</span></span>
<span id="cb91-27">        <span class="bu">super</span>().<span class="fu">__init__</span>(number_of_floors)</span>
<span id="cb91-28">        <span class="co"># Additional object variable for office buildings</span></span>
<span id="cb91-29">        <span class="va">self</span>._number_of_working_places <span class="op">=</span> number_of_working_places</span>
<span id="cb91-30"></span>
<span id="cb91-31">    <span class="kw">def</span> get_number_of_working_places(<span class="va">self</span>):</span>
<span id="cb91-32">        <span class="co"># Return the number of working places for the office building</span></span>
<span id="cb91-33">        <span class="cf">return</span> <span class="va">self</span>._number_of_working_places</span>
<span id="cb91-34"></span>
<span id="cb91-35"><span class="co"># Create a Building object with 10 floors</span></span>
<span id="cb91-36">building_1 <span class="op">=</span> Building(<span class="dv">10</span>)</span>
<span id="cb91-37"><span class="co"># Create an OfficeBuilding object with 15 floors and 200 working places</span></span>
<span id="cb91-38">office_building_1 <span class="op">=</span> OfficeBuilding(<span class="dv">15</span>, <span class="dv">200</span>)</span>
<span id="cb91-39"></span>
<span id="cb91-40"><span class="co"># Print building IDs and number of floors for both buildings</span></span>
<span id="cb91-41"><span class="bu">print</span>(<span class="ss">f"Building 1 ID: </span><span class="sc">{</span>building_1<span class="sc">.</span>_building_id<span class="sc">}</span><span class="ss">, Floors: </span><span class="sc">{</span>building_1<span class="sc">.</span>get_number_of_floors()<span class="sc">}</span><span class="ss">"</span>)</span>
<span id="cb91-42"><span class="bu">print</span>(<span class="ss">f"Office Building 1 ID: </span><span class="sc">{</span>office_building_1<span class="sc">.</span>_building_id<span class="sc">}</span><span class="ss">, Floors: </span><span class="sc">{</span>office_building_1<span class="sc">.</span>get_number_of_floors()<span class="sc">}</span><span class="ss">, Working Places: </span><span class="sc">{</span>office_building_1<span class="sc">.</span>get_number_of_working_places()<span class="sc">}</span><span class="ss">"</span>)</span></code></pre></div></div>
</div>
</section>
<section id="lambda-divisor-3" class="level2">
<h2 class="anchored" data-anchor-id="lambda-divisor-3">Lambda Divisor 3</h2>
<div id="2afc6d52" class="cell" data-execution_count="69">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb92"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb92-1"><span class="co"># Define the lambda function using conditional expression</span></span>
<span id="cb92-2">divisible_by_3 <span class="op">=</span> <span class="kw">lambda</span> num: <span class="va">True</span> <span class="cf">if</span> num <span class="op">%</span> <span class="dv">3</span> <span class="op">==</span> <span class="dv">0</span> <span class="cf">else</span> <span class="va">False</span></span>
<span id="cb92-3"></span>
<span id="cb92-4"><span class="co"># Example list (even_list)</span></span>
<span id="cb92-5">even_list <span class="op">=</span> [<span class="dv">2</span>, <span class="dv">3</span>, <span class="dv">6</span>, <span class="dv">8</span>, <span class="dv">9</span>, <span class="dv">12</span>, <span class="dv">15</span>, <span class="dv">20</span>, <span class="dv">21</span>, <span class="dv">24</span>]</span>
<span id="cb92-6"></span>
<span id="cb92-7"><span class="co"># Use the lambda function to filter the numbers divisible by 3</span></span>
<span id="cb92-8">divisible_by_3_list <span class="op">=</span> [num <span class="cf">for</span> num <span class="kw">in</span> even_list <span class="cf">if</span> divisible_by_3(num)]</span>
<span id="cb92-9"></span>
<span id="cb92-10"><span class="co"># Print the resulting list</span></span>
<span id="cb92-11"><span class="bu">print</span>(divisible_by_3_list)</span></code></pre></div></div>
</div>
</section>
<section id="lambda-dict" class="level2">
<h2 class="anchored" data-anchor-id="lambda-dict">Lambda dict</h2>
<div id="59a11726" class="cell" data-execution_count="70">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb93"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb93-1"><span class="co"># Example list</span></span>
<span id="cb93-2">even_list <span class="op">=</span> [<span class="dv">2</span>, <span class="dv">3</span>, <span class="dv">6</span>, <span class="dv">8</span>, <span class="dv">9</span>, <span class="dv">12</span>, <span class="dv">15</span>, <span class="dv">20</span>, <span class="dv">21</span>, <span class="dv">24</span>]</span>
<span id="cb93-3"></span>
<span id="cb93-4"><span class="co"># Create dictionary using lambda function and dictionary comprehension</span></span>
<span id="cb93-5">divisible_dict <span class="op">=</span> {num: (<span class="kw">lambda</span> x: <span class="va">True</span> <span class="cf">if</span> <span class="dv">98729</span> <span class="op">%</span> x <span class="op">==</span> <span class="dv">0</span> <span class="cf">else</span> <span class="va">False</span>)(num) <span class="cf">for</span> num <span class="kw">in</span> even_list}</span>
<span id="cb93-6"></span>
<span id="cb93-7"><span class="co"># Print the resulting dictionary</span></span>
<span id="cb93-8"><span class="bu">print</span>(divisible_dict)</span></code></pre></div></div>
</div>
</section>
<section id="customer" class="level2">
<h2 class="anchored" data-anchor-id="customer">Customer</h2>
<div id="1a826ba5" class="cell" data-execution_count="71">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb94"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb94-1"><span class="co">#!/usr/bin/ python</span></span>
<span id="cb94-2"></span>
<span id="cb94-3"><span class="kw">class</span> Customer():</span>
<span id="cb94-4"></span>
<span id="cb94-5">    custType <span class="op">=</span> <span class="st">'standard'</span></span>
<span id="cb94-6">    custNo <span class="op">=</span> <span class="dv">0</span></span>
<span id="cb94-7"></span>
<span id="cb94-8">    <span class="kw">def</span> <span class="fu">__init__</span>(<span class="va">self</span>, first_name, last_name, company_name):</span>
<span id="cb94-9">        <span class="va">self</span>.f_name <span class="op">=</span> first_name</span>
<span id="cb94-10">        <span class="va">self</span>.l_name <span class="op">=</span> last_name</span>
<span id="cb94-11">        <span class="va">self</span>.c_name <span class="op">=</span> company_name</span>
<span id="cb94-12">        <span class="va">self</span>.custNo <span class="op">=</span> <span class="va">None</span>                      <span class="co"># customer number</span></span>
<span id="cb94-13">        <span class="va">self</span>.dist2hub <span class="op">=</span> <span class="va">None</span>                    <span class="co"># distance to storage hub</span></span>
<span id="cb94-14">        <span class="va">self</span>.avgDelPerYear <span class="op">=</span> <span class="va">None</span>               <span class="co"># average no of deliveries per year</span></span>
<span id="cb94-15">        <span class="va">self</span>.recCargoWeight <span class="op">=</span> <span class="va">None</span>              <span class="co"># recording (list) of delivery weights</span></span>
<span id="cb94-16"></span>
<span id="cb94-17">    <span class="kw">def</span> load_cust_data(<span class="va">self</span>):</span>
<span id="cb94-18">        <span class="co">'''</span></span>
<span id="cb94-19"><span class="co">        The method 'load_cust_data()' initializes instance variables that are</span></span>
<span id="cb94-20"><span class="co">        initialized with none. These numbers have no effect on the program</span></span>
<span id="cb94-21"><span class="co">        extension, i.e. are irrelevant for the evaluation.</span></span>
<span id="cb94-22"><span class="co">        '''</span></span>
<span id="cb94-23">        <span class="va">self</span>.custNo <span class="op">=</span> Customer.custNo</span>
<span id="cb94-24">        <span class="va">self</span>.dist2hub <span class="op">=</span> (<span class="va">self</span>.custNo<span class="op">+</span><span class="dv">15</span>)<span class="op">*</span><span class="dv">15</span></span>
<span id="cb94-25">        <span class="va">self</span>.avgDelPerYear <span class="op">=</span> <span class="dv">1</span><span class="op">/</span><span class="va">self</span>.dist2hub<span class="op">*</span><span class="dv">2250</span></span>
<span id="cb94-26">        <span class="va">self</span>.recCargoWeight <span class="op">=</span> <span class="bu">list</span>(<span class="bu">range</span>(<span class="va">self</span>.custNo))</span>
<span id="cb94-27">        Customer.custNo <span class="op">+=</span> <span class="dv">1</span>                    <span class="co"># increment customer number</span></span>
<span id="cb94-28"></span>
<span id="cb94-29">    <span class="kw">def</span> correctCargoWeights(<span class="va">self</span>,correction):</span>
<span id="cb94-30">        <span class="co">'''</span></span>
<span id="cb94-31"><span class="co">        For cargoWeight correction, the passed lambda function from the parameter</span></span>
<span id="cb94-32"><span class="co">        list is applied on all elements of the cargoWeight instance variable</span></span>
<span id="cb94-33"><span class="co">        (i.e. the parameter correction points to a lambda function).</span></span>
<span id="cb94-34"><span class="co">        '''</span></span>
<span id="cb94-35">        <span class="va">self</span>.recCargoWeight <span class="op">=</span> <span class="bu">list</span>(<span class="bu">map</span>(correction, <span class="va">self</span>.recCargoWeight))</span></code></pre></div></div>
</div>
<section id="example-of-use" class="level3">
<h3 class="anchored" data-anchor-id="example-of-use">Example of Use</h3>
<div id="9a2cdb2c" class="cell" data-execution_count="72">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb95"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb95-1"><span class="co"># Create a new Customer object</span></span>
<span id="cb95-2">customer1 <span class="op">=</span> Customer(<span class="st">"John"</span>, <span class="st">"Doe"</span>, <span class="st">"ABC Corp"</span>)</span>
<span id="cb95-3"></span>
<span id="cb95-4"><span class="co"># Load customer data</span></span>
<span id="cb95-5">customer1.load_cust_data()</span>
<span id="cb95-6"></span>
<span id="cb95-7"><span class="co"># Print customer details</span></span>
<span id="cb95-8"><span class="bu">print</span>(<span class="ss">f"Customer </span><span class="sc">{</span>customer1<span class="sc">.</span>f_name<span class="sc">}</span><span class="ss"> </span><span class="sc">{</span>customer1<span class="sc">.</span>l_name<span class="sc">}</span><span class="ss"> has ID </span><span class="sc">{</span>customer1<span class="sc">.</span>custNo<span class="sc">}</span><span class="ss">"</span>)</span>
<span id="cb95-9"><span class="bu">print</span>(<span class="ss">f"Distance to Hub: </span><span class="sc">{</span>customer1<span class="sc">.</span>dist2hub<span class="sc">}</span><span class="ss">"</span>)</span>
<span id="cb95-10"><span class="bu">print</span>(<span class="ss">f"Average Deliveries per Year: </span><span class="sc">{</span>customer1<span class="sc">.</span>avgDelPerYear<span class="sc">}</span><span class="ss">"</span>)</span>
<span id="cb95-11"><span class="bu">print</span>(<span class="ss">f"Cargo Weights: </span><span class="sc">{</span>customer1<span class="sc">.</span>recCargoWeight<span class="sc">}</span><span class="ss">"</span>)</span>
<span id="cb95-12"></span>
<span id="cb95-13"><span class="co"># Correct cargo weights using a lambda function (e.g., multiplying each by 2)</span></span>
<span id="cb95-14">customer1.correctCargoWeights(<span class="kw">lambda</span> x: x <span class="op">*</span> <span class="dv">2</span>)</span>
<span id="cb95-15"></span>
<span id="cb95-16"><span class="co"># Print corrected cargo weights</span></span>
<span id="cb95-17"><span class="bu">print</span>(<span class="ss">f"Corrected Cargo Weights: </span><span class="sc">{</span>customer1<span class="sc">.</span>recCargoWeight<span class="sc">}</span><span class="ss">"</span>)</span></code></pre></div></div>
</div>
<p>Customer John Doe has ID 0 Distance to Hub: 225 Average Deliveries per Year: 10.0 Cargo Weights: [0] Corrected Cargo Weights: [0]</p>
</section>
<section id="sportcustomer-in-different-file" class="level3">
<h3 class="anchored" data-anchor-id="sportcustomer-in-different-file">SportCustomer in different file</h3>
<div id="75de6854" class="cell" data-execution_count="73">
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb96"><pre class="sourceCode python"><code class="sourceCode python"><span id="cb96-1"><span class="co"># Assuming that SportCustomer class should inherit from Customer (or any base class)</span></span>
<span id="cb96-2"><span class="im">from</span> customer <span class="im">import</span> Customer</span>
<span id="cb96-3"></span>
<span id="cb96-4"><span class="kw">class</span> SportCustomer(Customer):</span>
<span id="cb96-5">    <span class="kw">def</span> <span class="fu">__init__</span>(<span class="va">self</span>, first_name, last_name, company_name):</span>
<span id="cb96-6">        <span class="co"># Initialize the parent class (Customer)</span></span>
<span id="cb96-7">        <span class="bu">super</span>().<span class="fu">__init__</span>(first_name, last_name, company_name)</span>
<span id="cb96-8">        <span class="va">self</span>.priority <span class="op">=</span> <span class="va">None</span>  <span class="co"># Initialize the priority instance variable</span></span>
<span id="cb96-9"></span>
<span id="cb96-10">    <span class="kw">def</span> setPriority(<span class="va">self</span>, priority):</span>
<span id="cb96-11">        <span class="co">"""</span></span>
<span id="cb96-12"><span class="co">        Sets the 'priority' instance variable.</span></span>
<span id="cb96-13"><span class="co">        Raises a ValueError if the passed priority is greater than 100.</span></span>
<span id="cb96-14"><span class="co">        """</span></span>
<span id="cb96-15">        <span class="cf">if</span> priority <span class="op">&gt;</span> <span class="dv">100</span>:</span>
<span id="cb96-16">            <span class="cf">raise</span> <span class="pp">ValueError</span>(<span class="st">"Priority value cannot be greater than 100"</span>)</span>
<span id="cb96-17">        <span class="va">self</span>.priority <span class="op">=</span> priority</span></code></pre></div></div>
</div>

</section>
</section>
</section>

<a onclick="window.scrollTo(0, 0); return false;" role="button" id="quarto-back-to-top"><i class="bi bi-arrow-up"></i> Back to top</a>
