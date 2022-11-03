---
permalink: /html-doesnt-need-any-styling/
layout: "article"
title: "Well-written HTML doesn't need any styling. Except that it does."
date: "2017-01-15"
excerpt: "One of the best things about HTML is that it just works. As with much of the web, things only get weird when designers and developers start adding things."
tags: articles
categories: ["code"]
---

One of the best things about HTML is that it just works. As with much of the web, things only get weird when designers and developers start adding things. By default, a raw HTML file will render quite nicely in every browser on every device. Hierarchy is clear, lists look like lists, tables look like tables, we have _bold_ text and _italics_, and [links](#) (the ‘hyper’ in HTML) are obvious.

Lately I've discovered a few bloggers who have embraced this quality. [Dan Luu](http://danluu.com/), for instance, is such a developers'-developer that he doesn't even have a stylesheet on his blog. All that matters is the content, free from artifice or sneaky designer-tricks. His writing stands or falls on its own merits. HTML has everything he needs, so why include anything else?

Myself, I disagree. Reading his articles is _hard_, even though they are expertly written. The aesthetic works well for him - it suits the style of his writing, and emphasises his credentials - but there's one aspect that makes his pages nigh-on unreadable on all but a few devices: the lines are simply too long.

My monitor at home is bigger than most, but not huge by modern standards. At this size, most paragraphs appear as just a couple of lines stretching the width of the screen. There's a reason books are the size and proportions that they are: there is an upper limit to the line-length that a person can comfortably read.

Counter to what you might expect, our eyes don't smoothly follow the lines on the page. When we read our eyes are actually jumping back and forth in very small movements[^1]. If the lines get too long, our brain struggles to tell which line is which and the movements become unaligned: everything scrambles, and we have to work hard to find our place again. Below a certain length (usually somewhere between 55 and 75 characters) our eyes can easily discern where the next line begins.

The spacing between the lines also plays a part here (known as "leading" after the strips of lead placed between the lines of text in letterpress printing). Too wide or too tight a space, and our eyes struggle to get their bearings. The best books have just the right balance of leading and line-length. Raw HTML, however, is not at all bothered by the lengths of its lines. Super widescreen display? HTML will keep those lines running from edge to edge, readability be damned.

There is, of course, an easy fix. All we need to do is add three lines of CSS to our HTML page, and everything looks much better.

```css
body {
    max-width: 50em;
    padding: 2em 0.5em;
    margin: 0 auto;
}
```

Here we're setting a `max-width`: if we used a simple `width`, we'd force the page to be that wide even on small screens (so we'd have to scroll sideways to see all our content). This runs counter to the spirit of HTML, which fits to any available space, so using `max-width` is better (if the screen is larger than 50em, it will cap the line-length, otherwise it lets HTML do its thing).

Notice, too, that we're using `em` units. These are linked to the size of the type (literally the width of a letter "m"), so we can be sure the width will be proportional to the text.

As for the rest of the rules, the `padding` is making sure the text is never jammed uncomfortably close to the edges of the screen, and the `margin: 0 auto;` rule then centres the block in the middle of the screen.

That's not a lot of styling, but it has a tremendous impact on the readability of a web page.

One of the benefits of presenting your content in nothing but HTML is that the browser only has to make a single file request to the server. Traditional CSS lives in its own file, and is therefore another request. Normally that's no problem at all, but in this context it's literally doubling the amount of load the page places on the server. The simple get-out for this is to in-line the CSS rules within the HTML file. It's not stylistically "pure" or "best practice", but does actually work.

So next time you're swept up in the machismo of [a HTML-purist rallying cry](http://motherfuckingwebsite.com/), spare a thought for your readers and think about your line-length.

[^1]: The tiny eye movements are called _saccades_. Our brain is taking-in the whole block of text at once, not just the specific word we've got to. It's similar to how we perceive paintings: our eyes can only focus on one tiny part at any one time, but we "see" the picture as a whole. As an interesting aside, the size of the in-focus area you can see at any one time is easy to demonstrate. Hold your arm out in front of you with your thumb pointing up: the in-focus area is roughly the size of your thumbnail. Our brains fill in the rest while our eyes dart around faster than we can perceive.
