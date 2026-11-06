---
title: "Interactive presentations with Quarto"
summary: "Reveal.js slides with interactive echarts4r plots, rendered to a single HTML file anyone can open."
year: 2024
kind: "Tools"
tags: ["Quarto", "echarts4r", "Reveal.js"]
order: 5
cover: "/media/projects/quarto-presentations/quarto.png"
format: "html"
---
<p>In quarto for R environment we can create presentations that runs on revealjs. The rendered quarto file results in a HTML file that can be open in regular browsers and makes it great for sharing. Using scss the presentation can be customized. Using R packages like echarts4r we can use javascript tools for creating interactive plots. Compared to a dashboard this can be helpful to guide an audience through specific plots in a presentation style which can be easier to follow or communicate a certain message.</p>
<p>As an example here is a very simple presentation created: <a href="https://oli9402.github.io/Interactive-Slides-" target="_blank" rel="noopener">Link to fullscreen presentation</a></p>
<p>Using <em>iframes</em> we can incorporate the same presentation into this blog post but certain controls like <strong>F for fullscreen</strong> doesn’t work.</p>
<aside class="callout callout-tip"><p class="callout-title">Controls in Iframe</p>
<p>Press on the presentation displayed below and use right and left <strong>arrow keys</strong> to navigate.</p>
</aside>
<iframe width="700" height="400" src="https://oli9402.github.io/Interactive-Slides-/" title="Quarto Presentation" data-external="1"></iframe>

<a onclick="window.scrollTo(0, 0); return false;" role="button" id="quarto-back-to-top"><i class="bi bi-arrow-up"></i> Back to top</a>
