---
permalink: /fullpage-screenshots-in-firefox/
layout: "article.njk"
title: "Fullpage screenshots in Firefox"
date: "2014-02-07"
excerpt: "I crawled through rafts of Firefox and Chrome extensions trying to take a screenshot of an entire webpage. It turns out Firefox can do it natively."
tags: articles
categories: ["code"]
---

Every now and then I need to take a screenshot of an entire webpage, generally to use in my [portfolio](/portfolio). Manually positioning the cursor for a `cmd shift 4` screenshot (on a Mac) feels a little imprecise for my tastes, and I want to capture the _whole_ of a site, not just the area visible in the viewport.

All the browser extensions I tried turned out a little buggy. Areas of the page would be repeated, like a visual interpretation of a CD skipping, or fonts would render strangely, as if they'd been run through an IE8 simulator or something.

Finally I stumbled upon this neat little trick. Sadly it doesn't help me get girls or lose weight like all the “one weird trick” pop-up ads keep promising me, but it does mean I can take a screenshot of an entire webpage using one line of code.

## The answer!

Navigate to the page you want to shoot and open up Firefox's Developer Tools command line using `shift f2` (Mac users might need to remember to press `fn` as well, if their keyboard rebinds `f2` to increase the monitor's brightness). Then all you need to do is type the following line:

```bash
screenshot --fullpage YourFileNameHere
```

And voilà! A screenshot has been taken of the current page in its entirety – not just the visible area! If you're super lazy, you can even leave off the file name; Firefox will just use the current date and time to save the image under.

I found I needed to crop off a sliver of transparency on the right hand side when I opened the shots up in Photoshop, but that's a small price to pay for the time saved not having to stitch together various peepshow-views of a page.

## See it in action

You can see some of the screenshots I took using this method over on my portfolio page. ~The ‘phone’ view of the Atlantic Brewery page is particularly long and thin – an image I'd have struggled to create using any other method.~
