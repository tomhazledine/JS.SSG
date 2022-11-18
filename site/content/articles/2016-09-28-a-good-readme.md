---
permalink: /a-good-readme/
layout: Article
title: "You are only as good as your README"
date: "2016-09-28"
excerpt: 'All code is an abstraction. If we were writing explicitly for computers we would write in machine code or assembly-language. We don''t, because "hello world" would take months to write. So instead of typing in binary, we use languages that hide the mess out of sight.'
tags: articles
categories: ["code", "career"]
---

Our programming languages substitute the complex logical underpinnings with easy-to-remember words. Typing `for` or `while` is an abstraction that suits our brains better than a string of ones and zeros. We program using languages <em>we</em> understand. Code is not for computers, it's for us.

And our code is not just written for ourselves. Other developers will need to read our code and understand it. If we are writing something useful, other people will want to incorporate it in their own work. If we are writing code for a client, somewhere down the line someone else will have to support that code. If you want your code to have a life beyond your own computer, other people will need to be able to read and understand it.

## We write code for other developers.

This is why we comment our code. This is why we use human-readable names for our variables (and let our compilation scripts reduce them to memory-efficient abstractions for us). This is why we respect coding standards and make damned-sure all our indentation is consistent and accurate.

This is also why the most important file in any project is not your `index.html` or your `package.json` or your `composer.lock`. The most important file in your project is your `README.md`.

The README file is the simplest file in your project. It doesn't control your routing or manage dependencies or run any code at all. It's nothing more than a simple text file. Your README is where you tell people what you were doing, what tools you used for what you were doing, and how you did what you were doing. And if you're feeling really generous you can tell people how they can add to what you were doing.

For a new set of eyes looking at your project, the README is their orientation. It's the first place they look, and it tells them where they should look next. When we write code we are writing for other developers, and if our READMEs aren't useful we may as well not be writing at all.
