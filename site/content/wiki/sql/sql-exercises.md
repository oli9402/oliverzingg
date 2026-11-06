---
title: "SQL execution order and exercises"
order: 1
format: "html"
---
<section id="execution-hierarchie" class="level1">

<p>✅ SQL Logical Execution Order (most important version)</p>
<ol type="1">
<li><p>FROM</p></li>
<li><p>ON</p></li>
<li><p>JOIN</p></li>
<li><p>WHERE</p></li>
<li><p>GROUP BY</p></li>
<li><p>HAVING</p></li>
<li><p>SELECT</p></li>
<li><p>DISTINCT</p></li>
<li><p>WINDOW functions (e.g., LAG/LEAD)</p></li>
<li><p>ORDER BY</p></li>
<li><p>LIMIT / OFFSET</p></li>
</ol>
</section>
<section id="ex-1" class="level1">
<h2>Ex 1</h2>
<table class="caption-top table">
<caption>Visits</caption>
<colgroup>
<col style="width: 19%">
<col style="width: 13%">
</colgroup>
<tbody>
<tr class="odd">
<td>Column Name</td>
<td>Type</td>
</tr>
<tr class="even">
<td>visit_id customer_id</td>
<td>int int</td>
</tr>
</tbody>
</table>
<p>visit_id is the column with unique values for this table. This table contains information about the customers who visited the mall.</p>
<table class="caption-top table">
<caption>Transactions</caption>
<colgroup>
<col style="width: 23%">
<col style="width: 13%">
</colgroup>
<tbody>
<tr class="odd">
<td>Column Name</td>
<td>Type</td>
</tr>
<tr class="even">
<td>transaction_id visit_id amount</td>
<td>int int int</td>
</tr>
</tbody>
</table>
<p>transaction_id is column with unique values for this table. This table contains information about the transactions made during the visit_id.</p>
<p>Write a solution to find the IDs of the users who visited without making any transactions and the number of times they made these types of visits.</p>
<p>Return the result table sorted in any order.</p>
<p>The result format is in the following example.</p>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb1"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb1-1"><span class="co"># Write your MySQL query statement below</span></span>
<span id="cb1-2">SELECT </span>
<span id="cb1-3">  customer_id, </span>
<span id="cb1-4">  <span class="fu">COUNT</span>(visit_id) AS count_no_trans </span>
<span id="cb1-5">FROM </span>
<span id="cb1-6">  Visits </span>
<span id="cb1-7">WHERE </span>
<span id="cb1-8">  visit_id NOT <span class="fu">IN</span> (</span>
<span id="cb1-9">    SELECT </span>
<span id="cb1-10">      visit_id </span>
<span id="cb1-11">    FROM </span>
<span id="cb1-12">      Transactions</span>
<span id="cb1-13">  ) </span>
<span id="cb1-14">GROUP BY </span>
<span id="cb1-15">  customer_id</span></code></pre></div></div>
</details>
</div>
</section>
<section id="ex-2" class="level1">
<h2>Ex 2</h2>
<table class="caption-top table">
<caption>Weather</caption>
<colgroup>
<col style="width: 22%">
<col style="width: 13%">
</colgroup>
<tbody>
<tr class="odd">
<td>Column Name</td>
<td>Type</td>
</tr>
<tr class="even">
<td>id recordDate temperature</td>
<td>int date int</td>
</tr>
</tbody>
</table>
<p>id is the column with unique values for this table. There are no different rows with the same recordDate. This table contains information about the temperature on a certain day.</p>
<p>Write a solution to find all dates’ id with higher temperatures compared to its previous dates (yesterday).</p>
<div class="cell">
<details class="code-fold">
<summary>Show code</summary>
<div class="code-copy-outer-scaffold"><div class="sourceCode cell-code" id="cb2"><pre class="sourceCode r"><code class="sourceCode r"><span id="cb2-1"><span class="co"># Write your MySQL query statement below</span></span>
<span id="cb2-2">SELECT id </span>
<span id="cb2-3">FROM</span>
<span id="cb2-4">    (SELECT </span>
<span id="cb2-5">        id, </span>
<span id="cb2-6">        temperature, </span>
<span id="cb2-7">        recordDate, </span>
<span id="cb2-8">        <span class="fu">lag</span>(temperature) <span class="fu">OVER</span>(ORDER BY recordDate) AS prev_temp </span>
<span id="cb2-9">FROM Weather) t</span>
<span id="cb2-10">WHERE temperature <span class="sc">&gt;</span> prev_temp</span></code></pre></div></div>
</details>
</div>
<aside class="callout callout-note"><p class="callout-title">Note</p>
<p>Here, parentheses define a subquery, and SQL treats the subquery like a temporary table.</p>
<p>Important: The entire subquery is executed in its own full logical order, before it participates in the outer query.</p>
</aside>

</section>

<a onclick="window.scrollTo(0, 0); return false;" role="button" id="quarto-back-to-top"><i class="bi bi-arrow-up"></i> Back to top</a>
