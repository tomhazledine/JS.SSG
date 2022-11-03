---
permalink: /inline-svg-icons/
layout: "article.njk"
title: "Getting started with inline SVG icons"
date: "2015-05-31"
excerpt: "As a typography nerd, using a custom font to serve icons felt really good. However, it turns out inline SVG icons are better in almost every way."
tags: articles
categories: ["code"]
intro_note: "This post is pretty old now. I've since written about SVG icon sprites in more detail in the more recent post, [Inline SVG icon sprites are (still) not scary](/inline-svg-icon-sprites)."
---

I've long been an advocate of using icon fonts. They're resolution-independent, light-weight, and stylable with CSS. It turns out they're not the best option: inline SVG icons are better in almost every way.

We should all know by now that using raster images for icons is a bad idea. Limiting ourselves to one set resolution is not how we work in a multi-device ecosystem. It's not responsive, it's not performant, it's not nice.

For a while it seemed that Icon Fonts were the answer. They're vector based and therefore resolution-independent. You can style them with CSS. They have smaller file sizes than .JPGs or .PNGs, so they improve a site's performance. A font file is one asset to download (more http requests = poorer site performance), so we don't need to mess around with image sprites any more. And on top of all that, icon font creation can be easily automated with your task-runner of choice: simply drop your icon .SVGs into a folder and you're good to go.

```css
/* Calling an icon font icon as a pseudo element within CSS. */
.elementName:before {
    font-family: "iconfont";
    content: "\e001"; // The unicode value of the font character you want.
    color: #000; // The icon is text, so you can style it using regular CSS
}
```

## If it ain't broke, why fix it?

Lately the winds of change have been blowing. Fewer and fewer big-name sites are using icon fonts, and more and more are publicly coming out in favour of inline SVGs. At first I was sceptical: "that problem's already been solved", I thought. Actually inlining raw SVG code into a site seemed overly complicated, and harder to maintain and automate than an icon font setup. But was it? And were icon fonts as great as they first appeared?

<dl>
<dt>When icon fonts fail, things get weird.</dt>
<dd>Sometimes there's no telling what crazy character a browser will display in place of an icon that hasn't loaded.</dd>

<dt>There are inexplicable rendering inconsistencies.</dt>
<dd>Firefox in particular seemed, like an overly generous grandparent, determined to fatten my icons up. Faux-bold on regular fonts is ugly and annoying, but when it happens to brand assets like icons it's excruciating (and something clients <em>always</em> pick up on).</dd>

<dt>Automation isn't so seamless after all.</dt>
<dd>Oh hey, my <code>npm install</code> keeps failing. I wonder what the problem is: oh yeah, my <code>gulp-icon font</code> is throwing errors all up in my grill. Again. &#35;facepalm</dd>
</dl>

By contrast, pure SVG is a much more consistent format. I've been using SVGs within <code>&amp;lt;img&amp;gt;</code> tags since 2006, and I've never had any trouble with setting SVGs as CSS background images.

```css
/* SVG CSS background-image. */
.elementName {
    height: 1em;
    width: 1em;
    background-image: url(path/to/icon.png); // Fallback for browsers that don't like SVG.
    background-image: url(path/to/icon.svg);
}
```

The obvious _simple_ solution is to just use SVGs like that: set them with CSS or use <code><img></code> elements. That gives you scaleable vector graphics that work well in most environments. The trouble is, you're loading in a new file for every icon. Every icon would represent another HTTP request to the server, and would be a performance nightmare. No matter how "squishy" your design, if your site is slow to load it is _not_ "Responsive".

So we're back to the same multiple-requests problem we had in the bad old days of raster iconography. The answer back then was to use image sprites. Concatenate all the icons into one file, load them all with just one HTTP request, and use CSS to crop the image when you want to display a particular icon. It turns out we can do that with SVG too, except now we can do it better!

<h2>Inline SVG Sprites</h2>

SVGs are made of paths – collections of co-ordinates that describe the individual vectors of the image. Open an SVG in your favourite text editor and you can see those paths. What's more, you can add classes and IDs to them. Even more mindblowing: if you wrap the individual paths in a <code>symbol</code> tag you can combine multiple images into a single SVG file, and selectively pull them out using their IDs.

```html
<!-- Load the SVG file into your document... -->
<svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
>
    <symbol viewBox="0 0 10 10" id="iconID">
        <path d="{ vector data }" />
    </symbol>
</svg>

<!-- ...and then 'use' a specific icon -->
<svg class="icon">
    <use xlink:href="#iconID" />
</svg>
```

Now you might be thinking that this all looks like a whole lot of work, and you'd be right. Making sprites by hand sucks. Thankfully the arrow of progress is on our side. We may not have jetpacks and flying cars yet, but we _do_ have task runners. I used to use Grunt, but now I use Gulp (being a JS nerd, I find the syntax easier to follow) and there are SVG spriting plugins for both of them. I use `gulp-svg-sprite`, and so far it's worked like a charm (so far I've put it to work on a half-dozen private projects and a couple of client sites). In fact, it's proving to be much more reliable than any of the Gulp plugins for icon fonts ever were.

It takes a bit of configuring to get the drop-an-icon-into-a-folder-and-let-Gulp-do-the-rest workflow I'd maintained with icon fonts, but as long as you remember to specify that you want a `symbol` based sprite, you can't go too wrong.

```js
// My Gulp config
var svgConfig = {
    shape: {
        dimension: {
            // Set maximum dimensions
            maxWidth: 32,
            maxHeight: 32
        }
    },
    mode: {
        symbol: true // Activate the «symbol» mode
    }
};

// The task itself
gulp.task("svg", function () {
    return gulp
        .src("_uncompressed/icons/**/*.svg")
        .pipe(svgSprite(svgConfig))
        .pipe(gulp.dest("_includes"));
});
```

---

## Inline SVG in Jekyll

This site is built using the static-site generator Jekyll. Transferring this site's (admittedly meagre) icon set from an icon font to an inline SVG sprite couldn't have been easier. Make sure your task-runner outputs your sprite into Jekyll's `_includes` directory and you can pull in your sprite with a simple `{% raw %}{% include /symbol/svg/sprite.symbol.svg %}{% endraw %}`. And because Jekyll compiles _before_ deployment, you don't even have to make a single HTTP request to get your icons: it's all truly inline.

## Inline SVG in Wordpress

Jekyll's all well and good if your clients are happy with working in code and using the command line to update their site. Sadly the world hardly ever makes things _that_ easy for us. Wordpress sites don't have the advantage of being compiled before deployment, which means we need to use PHP to include the sprite.

Including an automatically generated SVG sprite using PHP is a little trickier than it first appears. `<?php include_once("path/to/svg/sprite.svg"); ?>` would seem like the obvious solution, but all that will give you is a face full of errors (if you've got `WP_DEBUG` set to `true`). It turns out the issue is with the XML and `DOCTYPE` added to the sprite by the gulp task, and the trick is to use `file_get_contents()` instead of `include_once()`.

## SVG & CSS

Styling the icons had a couple of little hurdles that I wasn't expecting. One of the joys of icon fonts was how easy they were to manipulate with CSS, and that's a feature that SVG sprites were promising too. Instead of `color: #000;` we use `fill: #000;` but, as with all CSS, watch out for specificity! If the paths themselves have explicit fills and strokes defined, then you won't be able to override them with external CSS.

Some of my legacy icons have in-built colours, and going through and stripping them out would be a real pain. Thankfully my buddy [Daryll](http://twitter.com/enshrined) was on hand to build me a tidy RegEx to programatically strip out any rogue fills:

```php
<?php
// Save the SVG file in a variable...
$rawSVG = file_get_contents(get_template_directory_uri() . "/path/to/svg/sprite.svg");
// ...then filter out any fills.
echo preg_replace( '/fill=("|\')(#)?([a-fA-F0-9]*)("|\')/i', '', $rawSVG );
?>
```

When I'm using Jekyll I still have to manually manage explicit in-file styling, but Jekyll projects tend to require a more fine-grained approach anyway. Another Big Win for CSS styling and SVGs comes from being able to add classes and IDs to specific paths _within_ individual icons. This provides us with the hooks we need to style (and animate and manipulate) almost every aspect of an icon discretely. Icon fonts were limited to one flat colour, but with SVG sprites we can colour every shape in an icon differently (should we need to).

For a long time I was very skeptical of using inline SVG for icon sets, primarily because of the perceived effort it would take to set up such a system. I'm happy to report that SVG sprites are considerably easier to get started with than I'd ever thought. I can't imagine ever using an icon font again.
