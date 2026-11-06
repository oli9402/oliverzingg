---
title: "Git"
order: 4
format: "html"
---
<p>Show an old version of a file</p>
<p>First show commit history of a specific file:</p>
<pre class="{bash}"><code>git log -- follow -- path/to/file</code></pre>
<p>Next copy commit id of the commit you want to see:</p>
<pre class="{bash}"><code>git checkout &lt;commitid&gt; -- src/foo.py</code></pre>
<p>Go back to latest commit version:</p>
<pre class="{bash}"><code>git checkout HEAD -- src/foo.py</code></pre>

<a onclick="window.scrollTo(0, 0); return false;" role="button" id="quarto-back-to-top"><i class="bi bi-arrow-up"></i> Back to top</a>
