---
permalink: /rugby-world-cup-2019/
# layout: "rugby-pools.njk"
layout: "article"
title: "Using world ranking to predict the results of the 2019 Rugby World Cup pool stages"
date: "2019-08-21"
excerpt: "Data visualisation for the pool stages of the 2019 Rugby World Cup"
tags: articles
categories: ["data"]
# scripts: ['rugby']
custom_stylesheet: "/tomhazledine.rugby.css"
not_rss_friendly: true
---

This year (2019) is a rugby world cup year. I like data visualisation, and I like rugby. So here's my primitive attempt to calculate the results of the pool stages of the 2019 World Cup. My simple heuristic is that **world ranking** (as of Aug 22<sup>nd</sup> 2019) is a predictor of a team's success. In effect, my simple algorithm states that a team with a higher ranking will always beat a team with a lower ranking.

Just here for the predictions? [skip to the end](#rugby-pools)

> Note: I'm not trying to predict who **will** win a match, just who is **expected** to win. When the inevitable "upsets" occur (like Japan vs. South Africa in 2015), I want to be able to say "wow! They only had a `{N}%` chance of winning, but they did it!"

So let's translate that calculation into code:

```js
const chanceOfWinning = (teamRank, oppositionRank) => {
    const combinedRanks = teamRank + oppositionRank;
    const invertedRanking = combinedRanks - teamRank; // Becasue a rank of 1 is the best
    const percentage = (invertedRanking / combinedRanks) * 100;
    return percentage.toFixed(1); // Round to 1 decimal place
};

chanceOfWinning(2, 13); // 86.7
// NZL are ranked `2`, and ITA are ranked `13`
// Therefore NZL have an 86.7% chance of beating ITA
```

With this primitive algorithm, I can produce a _"likelihood of winning"_ percentage for any pairing of teams. And on first inspection it looks pretty good (based on my own _subjective_ opinion of who should win a given match). New Zealand are currently ranked #2 in the world, and should be expected to crush a #13 side like Italy. Samoa and Russia (#16 and #20 respectively) should be a much closer match, but you'd expect Samoa to emerge victorious.

<div class="matches--solo">
    <div class="match match--solo">
        <span class="match__team">
            <span class="match__team-ranking">2</span>nzl
        </span>
        <div class="match__bar">
            <div class="bar__inner bar__inner--0 bar__inner--win" style="width: 86.7%;">
                <span class="bar__value">86.7%</span>
            </div>
            <div class="bar__inner bar__inner--1 bar__inner--loss" style="width: 13.3%;">
                <span class="bar__value">13.3%</span>
            </div>
            <span class="match__bar-divider"></span>
        </div>
        <span class="match__team match__team--last">
            ita<span class="match__team-ranking">13</span>
        </span>
    </div>
    <div class="match match--solo">
        <span class="match__team">
            <span class="match__team-ranking">16</span>sam
        </span>
        <div class="match__bar">
            <div class="bar__inner bar__inner--0 bar__inner--win" style="width: 55.6%;">
                <span class="bar__value">55.6%</span>
            </div>
            <div class="bar__inner bar__inner--1 bar__inner--loss" style="width: 44.4%;">
                <span class="bar__value">44.4%</span>
            </div>
            <span class="match__bar-divider"></span>
        </div>
        <span class="match__team match__team--last">
            rus<span class="match__team-ranking">20</span>
        </span>
    </div>
</div>

## There are problems with using rank

But this method starts to look a bit shaky when we include the #1 ranked team in the world (a crown recently claimed by Wales at the time of writing). Not because Wales are particularly special, but because this algorithm massively favours lower rankings. I'd expect Wales to crush Uraguay (#19 in the world), but would _not_ expect them to have such an easy time against Australia (ranked #6). The ranking-based algorithm predicts _both_ matches would be walkovers:

<div class="matches--solo">
    <div class="match">
        <span class="match__team">
            <span class="match__team-ranking">1</span>wal
        </span>
        <div class="match__bar">
            <div class="bar__inner bar__inner--0 bar__inner--win" style="width: 95%;">
                <span class="bar__value">95%</span>
            </div>
            <div class="bar__inner bar__inner--1 bar__inner--loss" style="width: 5%;">
                <span class="bar__value">5%</span>
            </div>
            <span class="match__bar-divider"></span>
        </div>
        <span class="match__team match__team--last">
            ura<span class="match__team-ranking">19</span>
        </span>
    </div>
    <div class="match">
        <span class="match__team">
            <span class="match__team-ranking">1</span>wal
        </span>
        <div class="match__bar">
            <div class="bar__inner bar__inner--0 bar__inner--win" style="width: 85.7%;">
                <span class="bar__value">85.7%</span>
            </div>
            <div class="bar__inner bar__inner--1 bar__inner--loss" style="width: 14.3%;">
                <span class="bar__value">14.3%</span>
            </div>
            <span class="match__bar-divider"></span>
        </div>
        <span class="match__team match__team--last">
            aus<span class="match__team-ranking">6</span>
        </span>
    </div>
</div>

And there's another problem with using world rankings. Rankings, by their very nature, are ordinal. By ranking alone, the difference between #1 and #2 is the same as the difference between #2 and #3, and so on... Whereas in reality, some teams are much closer than their mere ranking would suggest.

## Using points rather than ranking

A better metric to use as the base for our calculation would be _points_. Word Rugby, the sport's governing body, uses a points system to determine the world rankings. These points are based on match performance, and range from zero to one hundred (the top side generally has a rating of somewhere near 90 points). In late August 2019, Wales have 89.43 points and New Zealand have 89.40 - it's tight at the top! Australia are on 84.05 and Uraguay have 65.18 points.

Using `points` rather than `rank` changes our algorithm slightly (we no longer need to invert the team's value, as higher points are better).

```js
const chanceOfWinning = (teamPoints, oppositionPoints) => {
    const combinedRanks = teamPoints + oppositionPoints;
    const percentage = (teamPoints / combinedRanks) * 100;
    return percentage.toFixed(1);
};
```

Plumbing our examples into this calculation produces a much tighter set of matches. The end results are still the same (in this system, a team with higher points will always beat a team with lower points, in just the same way as the team with the better ranking always wins).

<div class="matches--solo">
    <div class="match match--solo">
        <span class="match__team">
            <span class="match__team-ranking">2</span>nzl
        </span>
        <div class="match__bar">
            <div class="bar__inner bar__inner--0 bar__inner--win" style="width: 55.4%;">
                <span class="bar__value">55.4%</span>
            </div>
            <div class="bar__inner bar__inner--1 bar__inner--loss" style="width: 44.6%;">
                <span class="bar__value">44.6%</span>
            </div>
            <span class="match__bar-divider"></span>
        </div>
        <span class="match__team match__team--last">
            ita<span class="match__team-ranking">13</span>
        </span>
    </div>
    <div class="match match--solo">
        <span class="match__team">
            <span class="match__team-ranking">16</span>sam
        </span>
        <div class="match__bar">
            <div class="bar__inner bar__inner--0 bar__inner--win" style="width: 51.6%;">
                <span class="bar__value">51.6%</span>
            </div>
            <div class="bar__inner bar__inner--1 bar__inner--loss" style="width: 48.4%;">
                <span class="bar__value">48.4%</span>
            </div>
            <span class="match__bar-divider"></span>
        </div>
        <span class="match__team match__team--last">
            rus<span class="match__team-ranking">20</span>
        </span>
    </div>
    <div class="match">
        <span class="match__team">
            <span class="match__team-ranking">1</span>wal
        </span>
        <div class="match__bar">
            <div class="bar__inner bar__inner--0 bar__inner--win" style="width: 57.8%;">
                <span class="bar__value">57.8%</span>
            </div>
            <div class="bar__inner bar__inner--1 bar__inner--loss" style="width: 42.2%;">
                <span class="bar__value">42.2%</span>
            </div>
            <span class="match__bar-divider"></span>
        </div>
        <span class="match__team match__team--last">
            ura<span class="match__team-ranking">19</span>
        </span>
    </div>
    <div class="match">
        <span class="match__team">
            <span class="match__team-ranking">1</span>wal
        </span>
        <div class="match__bar">
            <div class="bar__inner bar__inner--0 bar__inner--win" style="width: 51.6%;">
                <span class="bar__value">51.6%</span>
            </div>
            <div class="bar__inner bar__inner--1 bar__inner--loss" style="width: 48.4%;">
                <span class="bar__value">48.4%</span>
            </div>
            <span class="match__bar-divider"></span>
        </div>
        <span class="match__team match__team--last">
            aus<span class="match__team-ranking">6</span>
        </span>
    </div>
</div>

These results look a little better than the ranking-only method. The delta between WAL/URA and WAL/AUS looks more realistic, and whoever is in the #1 spot has less of an unfair advantage. But now the _amounts_ look wrong. Any theory that gives Italy a 44.6% of beating New Zealand **must** be inaccurate.

## Increasing the weighting

The points-based system is a better reflection of the team's relative chance of winning, but to my eyes the results aren't extreme enough. It gives too much credit to the lower-tier teams, and not enough to the top-tier ones. For the calculation to better match my expectations, it needs to favour the teams at the top of the rankings. Not only that, but it needs to do it _progressively_ - so a team in the middle gets a bit of a boost, but not as much as those at the top get.

I need to write a function that will adjust the points value of each team. The easiest way to get the result I'm after is to multiply each team's points by a power.

```js
const adjustment = num => Math.pow(num, 5);
```

{% include "rugby/rank-graph.njk" %}

<!-- <div id="rugby-rank-graph"></div> -->

```js
const chanceOfWinning = (teamPoints, oppositionPoints) => {
    const combinedRanks = adjustment(teamPoints) + adjustment(oppositionPoints);
    const percentage = (adjustment(teamPoints) / combinedRanks) * 100;
    return percentage.toFixed(1);
};
```

I started with `2` as the exponent, and that was better than nothing, but still not enough. `10` was too extreme, and in the end I settled on `5`. Increasing each team's points by a power of `5` gave me a set of probabilities that looked about right. That formula added just enough of a notch in the middle of the graph - and thereby increasing the likelihood of a top-tier team beating a lower-tier one.

<div class="matches--solo">
    <div class="match">
        <span class="match__team">
            <span class="match__team-ranking">2</span>nzl
        </span>
        <div class="match__bar">
            <div class="bar__inner bar__inner--0 bar__inner--win" style="width: 74.6%;">
                <span class="bar__value">74.6%</span>
            </div>
            <div class="bar__inner bar__inner--1 bar__inner--loss" style="width: 25.4%;">
                <span class="bar__value">25.4%</span>
            </div>
            <span class="match__bar-divider"></span>
        </div>
        <span class="match__team match__team--last">
            ita<span class="match__team-ranking">13</span>
        </span>
    </div>
    <div class="match match--solo">
        <span class="match__team">
            <span class="match__team-ranking">16</span>sam
        </span>
        <div class="match__bar">
            <div class="bar__inner bar__inner--0 bar__inner--win" style="width: 57.9%;">
                <span class="bar__value">57.9%</span>
            </div>
            <div class="bar__inner bar__inner--1 bar__inner--loss" style="width: 42.1%;">
                <span class="bar__value">42.1%</span>
            </div>
            <span class="match__bar-divider"></span>
        </div>
        <span class="match__team match__team--last">
            rus<span class="match__team-ranking">20</span>
        </span>
    </div>
    <div class="match">
        <span class="match__team">
            <span class="match__team-ranking">1</span>wal
        </span>
        <div class="match__bar">
            <div class="bar__inner bar__inner--0 bar__inner--win" style="width: 82.9%;">
                <span class="bar__value">82.9%</span>
            </div>
            <div class="bar__inner bar__inner--1 bar__inner--loss" style="width: 17.1%;">
                <span class="bar__value">17.1%</span>
            </div>
            <span class="match__bar-divider"></span>
        </div>
        <span class="match__team match__team--last">
            ura<span class="match__team-ranking">19</span>
        </span>
    </div>
    <div class="match">
        <span class="match__team">
            <span class="match__team-ranking">1</span>wal
        </span>
        <div class="match__bar">
            <div class="bar__inner bar__inner--0 bar__inner--win" style="width: 57.7%;">
                <span class="bar__value">57.7%</span>
            </div>
            <div class="bar__inner bar__inner--1 bar__inner--loss" style="width: 42.3%;">
                <span class="bar__value">42.3%</span>
            </div>
            <span class="match__bar-divider"></span>
        </div>
        <span class="match__team match__team--last">
            aus<span class="match__team-ranking">6</span>
        </span>
    </div>
</div>

---

## Results for all the pools

This is of course only based on my experience of rugby and my own highly subjective opinions. But it is still anchored in reality because I'm using the points as a starting point, and treating each team equally (as much as I _want_ to give England a boost, the algorithm doesn't support it).

Ironically, this calculation shows that the draw for this world cup _does_ give England a slight boost. The top 8 teams make it through to the quarter finals as you would expect. But when it comes to the semis, 4<sup>th</sup> ranked South Africa miss out, while 5<sup>th</sup> ranked England manage to sneak in. A side-effect of the pools being drawn years before the event. On the other hand, it probably shows that the draw-process works fairly well if, given all the top 8 make it into the quarters (or at least shows that the rankings have been comparatively static).

I'm not expecting these predictions to come true - there's a lot more to success in rugby than simple rankings. But I do find this kind of objective analysis useful for setting expectations. Looking at these predictions, I'll make more of an effort to see matches I might otherwise have passed on. Tonga vs. USA, for instance, looks like it'll be a close one. As do Scotland vs. Japan and New Zealand vs. South Africa (although after this year's Championship you don't need an algorithm to tell you that'll be a real grudge match!).

<div class="wrapper--rugby">
<div class="pool">

### Pool A matches

{% include "rugby/pool-a.njk" %}

### Pool A results

| Pos. | Team     | Wins   |
| ---- | -------- | ------ |
| 1st  | Ireland  | 4 wins |
| 2nd  | Scotland | 3 wins |
| 3rd  | Japan    | 2 wins |
| 4th  | Samoa    | 1 win  |
| 5th  | Russia   | 0 wins |

</div>

<div class="pool">

### Pool B matches

{% include "rugby/pool-b.njk" %}

### Pool B results

| Pos. | Team         | Wins   |
| ---- | ------------ | ------ |
| 1st  | New Zealand  | 4 wins |
| 2nd  | South Africa | 3 wins |
| 3rd  | Italy        | 2 wins |
| 4th  | Canada       | 1 win  |
| 5th  | Namibia      | 0 wins |

</div>
</div>

<div class="wrapper--rugby">
<div class="pool">

### Pool C matches

{% include "rugby/pool-c.njk" %}

### Pool C results

| Pos. | Team          | Wins   |
| ---- | ------------- | ------ |
| 1st  | England       | 4 wins |
| 2nd  | France        | 3 wins |
| 3rd  | Argentina     | 2 wins |
| 4th  | United States | 1 win  |
| 5th  | Tonga         | 0 wins |

</div>

<div class="pool">

### Pool D matches

{% include "rugby/pool-d.njk" %}

### Pool D results

| Pos. | Team      | Wins   |
| ---- | --------- | ------ |
| 1st  | Wales     | 4 wins |
| 2nd  | Australia | 3 wins |
| 3rd  | Fiji      | 3 wins |
| 4th  | Georgia   | 1 win  |
| 5th  | Uraguay   | 0 wins |

</div>
</div>

<!-- <div id="rugby-pools"></div> -->
