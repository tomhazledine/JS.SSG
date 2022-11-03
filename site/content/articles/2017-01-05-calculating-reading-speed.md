---
permalink: /calculating-reading-speed/
layout: "article"
title: "n-minute read: calculating an average reading speed"
date: "2017-01-05"
excerpt: "I'm interested in measuring what effect, if any, displaying an approximate reading-time for articles will have on readers of my site."
tags: articles
categories: ["code"]
---

I'm interested in measuring what effect, if any, displaying an approximate reading-time for articles will have on readers of my site[^1]. Will people be put off by knowing in advance that an article will take a long time to read? Will they gravitate to shorter pieces, or avoid them because they're looking for more in-depth content? Will it have no effect at all?

My hypothesis is this: adding a read-time to post summaries will increase click-throughs from the archive page to full-post views. It reduces the "mystery meat" problem by providing users with objective data about their options, meaning they are better prepared to make a decision about which post to read.

Because this is an increasingly common idea[^2], there are [many](http://zurb.com/forrst/posts/Medium_like_estimated_reading_time_in_PHP-G6j) [examples](https://gist.github.com/mynameispj/3170442) of reading-time-calculation functions out there. I've borrowed and adapted concepts from all over the place, but diverged from most I saw in two main ways.

-   Firstly, where others have focused on concision, I have opted for a more verbose style. One of my goals in writing pieces like this is to fully understand the code I'm working with. Breaking down each discrete operation into its own line (and compulsively commenting everything) ensures I know what every part of the code is doing (and hopefully makes it easier for readers to understand, too).
-   Secondly, I've chosen to separate the calculation-logic from display-logic. The working-out of the length of time the content will take to read just needs to output a number. Turning that number into human-readable text is another process, and thus another function in my solution.

The "Separation of Concerns" is a fundamental programming concept, and ties in nicely with the WordPress rubric: content-manipulation is for plugins, display-stuff is for themes. If I were planning to release this code, I could make a plugin to handle the calculation and let theme creators outputting the result any which way they choose.

## Calculating the time

Here's my final function for calculating the read-time in seconds. This example is written in JavaScript, but only because that's what I like to write in. The general gist _(count the words, divide by the reading-speed)_ can be applied to any language.

```js
const readingTime = content => {
    // Predefined words-per-minute rate.
    const wordsPerMinute = 225;
    const wordsPerSecond = wordsPerMinute / 60;

    // Count the words in the content.
    const wordCount = content.split(" ").length;

    // How many seconds (total)?
    seconds = Math.floor(wordCount / wordsPerSecond);

    return seconds;
};
```

## Displaying the time

When it comes to outputting this calculation to the screen, there are a few steps we need to take. Firstly, my guess is that very few people have an innate understanding of time when it's expressed as seconds. Thirty-seconds is a chunk of time I can comprehend, but when we go much above sixty, my instant-comprehension drops dramatically. Without thinking, do you know how long 438 seconds is? I certainly don't.[^3]

The simplest option would be to convert our time-in-seconds into mm:ss format. And "Minutes and seconds" is a pretty standard way to show short periods of time, so it would solve the intuitive-comprehension problem. In essence, this boils down to converting a decimal number (in _base ten_) to a sexagesimal number (_base sixty_).

Getting the number of minutes is easy: we just divide the number of seconds by 60 (the number of seconds in a minute), and round down to the nearest whole number:

```js
const minuteCount = Math.floor(seconds / 60);
```

Getting the number of seconds is a little tricker, but here modular arithmetic is our friend. What we want is the _remainder_ (a.k.a. the _modulus_) from the minute-calculation, which we get by using the modulo operator:

```js
const minuteRemainder = seconds % 60;
```

## Getting fancy with our output

Simply showing users the minutes-and-seconds that our calculation spits out doesn't feel right to me. This is, after all, a very _rough_ approximation of reading-time, as no two people read at exactly the same speed. I'd far rather show a more _human_ result.

The simplest (but most verbose) way to get the effect I was after was to simply set a custom message if the number of seconds fell within a certain range:

```js
let message;
if ( seconds < 30 ) {

    message = 'hardly any time at all.';

} elseif  ( seconds < 50 ) {

    message = 'less than a minute.';

} elseif  ( seconds < 55 ) {

    message = 'nearly a minute.';

// ...
```

But this could get tiresome pretty quickly, and I much prefer a more dynamic approach. After a bit of tinkering I finally settled on a system that created a message based around how close the total-length was to a round minute. If the result is within two seconds of a minute (e.g. 122 seconds, or 239 seconds), then the result reads "`minuteCount` minutes, on the nose", and so on and so forth.

```js
// ...
} else if ( minuteRemainder &lt; 2 || minuteRemainder > 58 ) {

    // If we're within +/- 2 seconds of a minute:
    message = `${minuteCount} minutes, on the nose.`;

} elseif ( minuteRemainder > 50 ) {

    // If we're within less than 10 seconds short of any minute:
    message = `just shy of ${minuteCount} minutes.`;

// ...
```

The last challenge was to convert the raw integers (`1`, `2`, `3`...) into strings (`"one"`, `"two"`, `"three"`...). To do this I've simplified [Karl Rixon's much more comprehensive solution](http://www.karlrixon.co.uk/writing/convert-numbers-to-words-with-php). His function handles virtually _every_ number conceivable, with support for positives, negatives, decimal-points - the works! All we need to do for our current goal is convert the basic integers into strings, and we don't even need to go up very far up the number-line, either. It's unlikely I'll be writing anything that takes more than ten or fifteen minutes to read.

```js
const dictionary  = {}
    0: 'zero',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    // ... etc.
);

const string = dictionary[number];
```

_View the full `convertNumberToWords()` function I used [in this Gist](https://gist.github.com/tomhazledine/2964e71499c4fd28e469997933982d52). This version uses PHP because it was written for a WordPress site._

## Putting it all together

With all our functions created, all that's left is to [put it all together](https://gist.github.com/tomhazledine/a5255b16a29ecb9f2ffb515158402f63) and hook the whole thing up to the content we want to measure (in this instance the WordPress post content):

```js
// Get reading time.
const readingTime = readingTime(content);
const readingTimeString = parseReadTime(readingTime);
```

Whether or not this will actually achieve anything remains to be seen. Will people click-through more when they know how much time they'll need to commit up-front? Maybe, maybe not. Either way, I've enjoyed diving into the problem (probably _too_ deep).

[^1]: [Medium](https://medium.com/remys-blog/first-impressions-of-react-ef780fb33a60#.95xzhexqq) is the obvious example, but I've seen it used effectively on other sites, too. The most recent example I saw was on the [Boagworld](https://boagworld.com/design/do-you-make-users-go-ooh) site.
[^2]: This is, of course, on a very trivial scale. But the idea that displaying more information (provided it's easily digestible) leads to more decisive action by users has wider implications. Most of my day-to-day work is focused around "moving the needle" on conversion rates. A percentage-point increase in click-throughs to a checkout represents a Job Well Done.
[^3]: A big assumption in this project is that there is a uniform reading rate, which there really isn't. Most code examples I looked at stuck to a standard words-per-minute rate of 200, but I (very unscientifically) tested my own reading-speed and found it to be closer to 300wpm. The real task at hand here is to give people a rough-estimate, so erring on the side of caution (going at the pace of the slowest) is probably the best option. I eventually settled on 225wpm as a usable middle-ground.
