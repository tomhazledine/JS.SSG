---
permalink: /bullet-journal-revisited/
layout: "article.njk"
title: "Bullet Journal Revisited"
date: "2017-01-20"
excerpt: "The Bullet Journal is a system for Getting Things Done. One nested pen-and-paper list that gets rewritten every morning."
tags: [articles, popular]
categories: ["general", "productivity"]
image: "/articles/journal.jpg"
---

<figure class="post-content__image-wrapper post-content__image-wrapper--has-sidebar">
    <img class="post-content__image" src="/images/articles/journal.jpg" alt="">
    <figcaption class="sidenote">My original analogue attempt at maintaining a Bullet Journal</figcaption>
</figure>

The "Bullet Journal"[^1] is a system for _Getting Things Done_. One nested pen-and-paper list that gets rewritten every morning. My first post on this site was about [the success I was having with the Bullet Journal](/bullet-journal-workflow). Over the last few weeks I've begun to use the journal system again, so I figured it was time for an update.

I used the Bullet Journal daily for about ten months (covering most of my time as a freelance developer). When an agency recruited me, I stopped using it. They had their own task-management tools, and I no longer had such an urgent need to organize my own time.

Fast-forward several years and I was beginning to feel the lack of a personal organization system. I was getting stuff done in work hours, for sure, but momentum was slipping on all my "side projects". I don't get people who struggle to come up with ideas for projects: I'm overwhelmed by ideas. What I find hard is _execution_. Getting Things Done is my Achilles heel. It was time to revisit the Bullet Journal.

## Going digital.

When I kept the daily task-list, I had a dedicated paper notebook. Keeping things analogue (as per the "pure" Bullet Journal method) was a way of maintaining focus. But now I'm much more comfortable keeping everything in the "cloud". I keep all my notes in a private Dropbox folder so I can access them wherever I am, regardless of what device I'm using. It also allows me to use my favourite writing apps[^2].

Constant access to my files has removed the downsides of keeping a digital list. In 2013 I was more comfortable carrying a physical notebook around with me. Now, I find it more convenient to keep a folder full of markdown files in the cloud.

Because I spend so much time working with markdown documents, and because markdown has such an elegant way of handling bulleted lists (with checkboxes!), adapting the Bullet Journal method was a natural choice.

## My evolved Bullet Journal system.

The central tenets of my journal are the same as the "official" system. I have one task list, and that gets refreshed every morning. I remove completed items, and anything still outstanding gets re-evaluated[^3].

Because the list is digital, I don't need to worry about adding a "migrated" marker when a task rolls-over into the next day. If it's done, it gets deleted. If I want it to "migrate" to the next day's list, it stays where it is. I've also moved away from the other markers used in the original setup. Sticking to the nested list works nicely for me, and I found the extra markers for events etc. made my lists over-complicated and overwhelming.

I nest my list by topic. By way of example, here's a snippet of a list I made for [adding a new feature](/calculating-reading-speed) to this very site:

```markdown
-   [ ] My personal website // This is the "master" list item
    -   [ ] readtime calculation
            _ [x] calculate seconds based on words-per-minute // I have completed this item.
            _ [ ] parse time into human-readable string \* [ ] write a blog post about the process + [ ] another feature
            // ...
```

When I kept my analogue journal, I would create "super objectives" for every month. The idea was that I could refer to those pages and make sure I was keeping up with my "big picture" goals. This was always a cumbersome process, and these super-objectives were often overlooked.

Space is not a factor for my digital journal, so I can afford to add as many items as I like. I even break those items into groups if the mood takes me. Right now I have "Big goals", "Technologies to learn (and master?)", "Dream goals", and "Short-term tasks".

_Big goals_ is at top of the page and has all my serious objectives for the year ahead (this is a new addition for 2017 - it's early days yet, so we'll see how this pans out...). My hope is that by keeping these items front-and-center means I can't ignore them. I've discovered there are few things more disheartening than finding a year-old task list and not being able to tick-off a single item.

_Technologies to learn (and master?)_ helps me keep on top of the things I'm trying to learn. Sample entries at the moment include `vue.js` & `web audio API`.

_Dream goals_ is more whimsical. These are things I'd like to do, but am unlikely to find time for. But by writing them down I can justify a major change in tack if a great opportunity comes along. (“Sure I can blow some money on a [fancy copper alembic-still](http://shop.premium-coppers.com/product-category/premium-copper-riveted-union-alembic-stills/); `make some whisky` is on my task list!”). It also helps to keep my procrastination in-check. If I find myself wasting time on some shiny new idea, I can't use the old "well, I've always dreamt of doing this" excuse. If I cared enough about it, I'd have put it on the list!

_Short-term tasks_ is the most mundane section, but also the most used and the most useful section. Lately I've been focusing on improving this website. As a result, my list is full of items like `setup LetsEncrypt on server` and `filter out lang-spam in G. Analytics`. Most of the items in this section are getting checked off, which is a signal that I'm close to my goal[^4]. Time to start thinking about the next short-term goal...

In the past, it has always been the time in-between projects when my focus has dipped. And once I lose my focus, I find it very hard to get back into the groove again. Predicting an imminent "danger zone" helps me sustain a higher level of productivity.

---

## Update:

Coincidentally, it appears I'm not the only one who's been investigating the Bullet Journal lately:

<div>
<script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/884_RC03/embed_loader.js"></script>
<script type="text/javascript">trends.embed.renderExploreWidget("TIMESERIES", {"comparisonItem":[{"keyword":"bullet journal","geo":"","time":"today 5-y"}],"category":0,"property":""}, {"exploreQuery":"q=bullet%20journal","guestPath":"https://www.google.co.uk:443/trends/embed/"});</script>
</div>

After this post was written, I checked Google's Search Trends tool and saw a surprising spike. My original 2013 article always sees a uplift in traffic around the new year, but the last twelve months have seen consistent growth that correlates with the general Google trend. My hope is that everyone who's trying out the Bullet Journal (myself included) can turn that interest into a genuine boost for productivity.

[^1]: Credit for the [Bullet Journal](http://www.bulletjournal.com/) concept goes to digital product designer [Ryder Carrol](http://www.rydercarroll.com/).
[^2]: My favourite writing apps are [Sublime Text](https://www.sublimetext.com) on my laptops and desktop, and [Byword](https://bywordapp.com/) on phone and tablet. I do all my writing in Markdown (be it drafts for complicated emails, notes on work projects, or aide-mémoire).
[^3]: The daily re-evaluation of all uncompleted tasks keeps the list fresh.
[^4]: The "new year refresh" has passed the 80% complete mark. That's farther than I've ever got before. Time to move on to the next project!
