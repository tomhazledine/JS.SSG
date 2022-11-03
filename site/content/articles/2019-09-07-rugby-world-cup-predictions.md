---
permalink: /rugby-world-cup-predictions/
layout: "article.njk"
title: "Algorithmically predicting the results of the 2019 Rugby World Cup"
date: "2019-09-07"
excerpt: "Data visualisation and prediction algorithm for the 2019 Rugby World Cup"
tags: articles
categories: ["data"]
# scripts: ['rugby']
custom_stylesheet: "/tomhazledine.rugby.css"
not_rss_friendly: true
---

I've been working on a rugby prediction algorithm for a while now. My basic premise is that the World Rugby rankings are a good indicator of past performance, but don't give the full picture when predicting _future_ results. I've already [visualised my predictions based on form alone](/rugby-world-cup-2019), and the results look reasonable - so is there room for improvement?

My hypothesis is that a more accurate prediction can be made if we take into account short-term form and past performance against specific opponents.

With this in mind, my new model combines four key metrics:

1. **All-time performance** - as shown by current world ranking
2. **Recent Form: tier 1** - how well have the team performed in their last 10 matches against tier 1 opposition.
3. **Recent Form: tier 2** - how well have the team performed in their last 10 matches against tier 2 opposition.
4. **History against opponent** - how well have the team performed against the specific opponent we're predicting the result for?

There's obviously plenty more that I can add to this algorithm, but with the World Cup actually starting soon (tomorrow, at time of writing), I've got a hard deadline for "just shipping" whatever I've got.

## The predictions

{% include "rugby/v2.pools.njk" %}

<!-- <div id="rugby-pools"></div> -->
