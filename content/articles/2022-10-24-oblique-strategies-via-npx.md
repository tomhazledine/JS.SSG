---
permalink: /oblique-strategies-via-npx/
layout: "article.njk"
title: "Oblique Strategies via npx"
date: "2022-10-24"
excerpt: "A node script that prints one of Brian Eno's Oblique Strategies into your terminal"
tags: ["articles"]
categories: ["code"]
---

In 1975 Brian Eno and Peter Schmidt released their [Oblique Strategies](https://www.enoshop.co.uk/product/oblique-strategies.html); _"Over One Hundred Worthwhile Dilemmas"_

> The Oblique Strategies constitute a set of over 100 cards, each of which is a suggestion of a course of action or thinking to assist in creative situations. These famous cards have been used by many artists and creative people all over the world since their initial publication. Fifth edition 2001.

You can buy your own set of the cards on Brian Eno's shop ([www.enoshop.co.uk/product/oblique-strategies](https://www.enoshop.co.uk/product/oblique-strategies.html)), but you can also get a mini taste of oblique inspiration in your terminal by running the following npx command:

```bash
npx oblique-strategy
```

## Examples

```
┌────────────────────────┐
│                        │
│  Remove a restriction  │
│                        │
│    - Edition 4 (1996)  │
│                        │
└────────────────────────┘
```

```
┌─────────────────────────────┐
│                             │
│  Is the tuning appropriate  │
│                             │
│         - Edition 1 (1975)  │
│                             │
└─────────────────────────────┘
```

```
┌──────────────────────────────────┐
│                                  │
│  Fill every beat with something  │
│                                  │
│              - Edition 2 (1978)  │
│                                  │
└──────────────────────────────────┘
```

## About the code

The full code for this npm package is viewable on my GitHub at [github.com/tomhazledine/oblique-strategy](https://github.com/tomhazledine/oblique-strategy), but there's not really too much to it. There are more lines dedicated to drawing the box around the output than there are for actually picking the strategy.

!["proof" that I own a legit copy of the strategies](/images/articles/oblique-strategies-box-960.jpg){data-alt="An open box of Oblique Strategies on a wooden table-top. The top card is visible, and reads 'Think: Inside the work. Outside the work.'"}

The strategies themselves were all found on other GitHub repos. I've deliberately not credited any of those projects because, well, they're clearly breaching some kind of copyright 🤷‍♂️ - as too, I should note, am I. As recompense for my flagrant disregard of others' work, I've bought a physical copy of the Oblique Strategies [for the princely sum of £50](https://www.enoshop.co.uk/product/oblique-strategies.html) and I'll take this repo down the second anyone complains.

In truth this was more of a learning exercise for me. I wanted to master the `npx` process and learned a lot about `package.bin` in the process, so I'm considering this project a success.
