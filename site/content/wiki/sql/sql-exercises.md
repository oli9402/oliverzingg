---
title: "SQL execution order and exercises"
order: 1
---

✅ SQL Logical Execution Order (most important version)

1.  FROM

2.  ON

3.  JOIN

4.  WHERE

5.  GROUP BY

6.  HAVING

7.  SELECT

8.  DISTINCT

9.  WINDOW functions (e.g., LAG/LEAD)

10.  ORDER BY

11.  LIMIT / OFFSET


## Ex 1

<table class="caption-top table"><caption>Visits</caption> <colgroup><col style="width: 19%"> <col style="width: 13%"></colgroup><tbody><tr class="odd"><td>Column Name</td><td>Type</td></tr><tr class="even"><td>visit_id customer_id</td><td>int int</td></tr></tbody></table>

visit\_id is the column with unique values for this table. This table contains information about the customers who visited the mall.

<table class="caption-top table"><caption>Transactions</caption> <colgroup><col style="width: 23%"> <col style="width: 13%"></colgroup><tbody><tr class="odd"><td>Column Name</td><td>Type</td></tr><tr class="even"><td>transaction_id visit_id amount</td><td>int int int</td></tr></tbody></table>

transaction\_id is column with unique values for this table. This table contains information about the transactions made during the visit\_id.

Write a solution to find the IDs of the users who visited without making any transactions and the number of times they made these types of visits.

Return the result table sorted in any order.

The result format is in the following example.

```r
# Write your MySQL query statement below
SELECT
  customer_id,
  COUNT(visit_id) AS count_no_trans
FROM
  Visits
WHERE
  visit_id NOT IN (
    SELECT
      visit_id
    FROM
      Transactions
  )
GROUP BY
  customer_id
```

## Ex 2

<table class="caption-top table"><caption>Weather</caption> <colgroup><col style="width: 22%"> <col style="width: 13%"></colgroup><tbody><tr class="odd"><td>Column Name</td><td>Type</td></tr><tr class="even"><td>id recordDate temperature</td><td>int date int</td></tr></tbody></table>

id is the column with unique values for this table. There are no different rows with the same recordDate. This table contains information about the temperature on a certain day.

Write a solution to find all dates’ id with higher temperatures compared to its previous dates (yesterday).

```r
# Write your MySQL query statement below
SELECT id
FROM
    (SELECT
        id,
        temperature,
        recordDate,
        lag(temperature) OVER(ORDER BY recordDate) AS prev_temp
FROM Weather) t
WHERE temperature > prev_temp
```

> [!NOTE]
> Here, parentheses define a subquery, and SQL treats the subquery like a temporary table.
>
> Important: The entire subquery is executed in its own full logical order, before it participates in the outer query.

Back to top
