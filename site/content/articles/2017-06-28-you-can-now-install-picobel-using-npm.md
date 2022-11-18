---
permalink: /you-can-now-install-picobel-using-npm/
layout: Article
title: "You can now install Picobel using NPM"
date: "2017-06-28"
excerpt: "Picobel is my open source JavaScript tool for turning HTML audio tags into styleable markup."
tags: ["articles"]
categories: ["audio", "code"]
---

I’ve finally published Picobel as a node package. Picobel is my open source JavaScript tool for turning HTML `<audio>` tags into styleable markup (a.k.a. regular divs and spans that you can target with your CSS).

For a while now it’s been possible to use Picobel by directly including the script in your project (just like all those old-school jQuery plugins). But it’s been a long time since I included a script or lib like that. My `package.json` rules the roost now, and almost everything I use gets installed with `npm install PACKAGE_NAME`. No doubt your workflow has advanced in a similar manner. With that in mind, it seemed foolish not to update Picobel to fit in with a more modern development workflow.

## What’s changed?

For the time being, there are no breaking changes to Picobel’s core functionality. If you have any `<audio>` tags on a web page, call `Picobel();` in your script and Picobel will replace those audio elements with markup that you can style directly. The only difference is how you get access to that `Picobel` function.

You can still include the script directly if you like, but now you’ll need to reference the `picobel.legacy.js` file instead. But for all you cool cats on the NPM bandwagon, things are much nicer...

Install Picobel in your project with `npm install picobel —save` and then import it into your JS file with `import Picobel from ‘picobel’;`. Then you’re free to call the `Picobel()` function just like before.

For more information about using options and themes with Picobel, take a look at the README.md on the project’s GitHub page.

## What’s on the horizon?

This update to Picobel is the precursor to quite a few changes. It’s part one of an ongoing project to convert Picobel to ES6, expand the test coverage to all Picobel’s internal methods, and get around to adding some requested new features and themes.
