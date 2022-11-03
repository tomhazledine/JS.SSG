---
permalink: /rugby-prediction-retrospective/
layout: "article"
title: "Rugby prediction: retrospective"
date: "2019-12-30"
excerpt: "Data visualisation and prediction algorithm for the 2019 Rugby World Cup"
tags: ["articles"]
categories: ["data"]
custom_stylesheet: "/tomhazledine.rugby.css"
not_rss_friendly: true
---

Making predictions is a dangerous game, especially if you publicise them. Before this year's (2019's) Rugby World Cup, I was chewing the ear off anyone who'd sit still long enough: "I know how the world cup will turn out. I've made an algorithm!" Not only did I bore all my friends, exhaust my colleagues, and [write up my predictions here on my blog](https://www.tomhazledine.com/rugby-world-cup-predictions/)... Not only that, but I actually put my hard-earned money on the line. So confident was I in my predictions, I made a series of bets. "Sure things", I thought them.

## Pride comes before a fall

As anyone who saw my predictions will know already, my algorithm was no match for reality. After a perfect first weekend, things began to unravel from the second weekend of matches. I became very clear very quickly that my predictions were _way_ off.

{% include "rugby/bad-pool.njk" %}

## So what went wrong?

-   I underestimated the specific impact of the players on the pitch and overestimated the record of the team as a whole. Some (but not all) teams are defined by one or two star players, and subsequently highly susceptible to the whims of injury and individual form.
-   Japan surpassed all my expectations, proving that the tier system lacks nuance. A large part of my algorithm hinged on the idea of "tiers": the gulf in budget and schedule and player-pool mean that "tier one" teams (like the 6 Nations and SANZAAR) are heavily favoured over "tier two" teams. If nothing else, 2019 was the year a new "tier one" team was born. But Japan's ascendancy aside, the two-tier model has been shown time and time again to be a flawed indicator of performance. I can now see evidence of four tiers, at least. And the big question for my algorithm is this: should the model use tiers as part of the calculation, or are tiers the _output_ of the model?
-   Past performance is not a reliable indicator of future performance.
-   Much like the players themselves, training and strategy have a big impact on performance (this is maybe the _biggest_ failing of my algorithm - _of course_ a team's strategy has an impact on their results #facepalm). As much as I may previously dismissed their influence, coaches have a big impact. They sometimes field "experimental" teams in the run up to a big tournament; it helps to blood inexperienced players, and provides a playground for experimentation in game-management and set-pieces. And on top of all this, certain teams will target certain games. England saved some tricks for their (in their eyes) inevitable showdown with New Zealand, South Africa held back some devastating weapons for the final (in a staggering display of self-belief), and Japan poured everything into their pool match against Ireland (who in turn fielded a second-string team of their own, naïvely writing the fixture off as a "sure thing"). If the 2019 world cup has taught me anything, it's that there are no "sure things" on a rugby pitch.
-   It's easy to mock, but some teams do have a history of choking on big occasions. Not to pick on Ireland, but "Ireland-crash-out-in-the-quarter-finals" has become a potent meme. And how do you factor in the French? They always over-perform at world cups (and almost as inevitably do something mind bogglingly stupid, too).

You can't build a reliable algorithm on past scores alone. There are so many other factors that impact how a team performs. You might be able to quantify most (if not all) of them, but that information is not hidden in the scores of past games.

## Do I mind?

Of course not. I might have put real money on the line, but it was (thankfully) money I could afford to lose. In fact, the added excitement of having something at stake in _every match_ makes me think I got my money's worth, and then some. The 2019 world cup was the most surprising and entertaining world cup that I've ever followed. The upsets and close-calls that so confounded my algorithm were the very things that made the whole event such fun.

## Will I continue to work on my algorithm?

You betcha, I will. Roll on the 2020 Six Nations!
