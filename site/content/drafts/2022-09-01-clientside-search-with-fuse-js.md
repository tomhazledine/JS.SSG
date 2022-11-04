---
permalink: /clientside-search-with-fuse-js/
layout: "article"
title: "Searching an Eleventy site with Fuse.js"
date: "2022-09-01"
excerpt: "How to add client-side search to an Eleventy site"
tags: articles
categories: ["code"]
---

In the bad old days (of, like, a couple of years ago) adding search functionality to a statically-generated site required third-party services that provided a search backend (like Algolia or Elastic or whatever). Thankfully we can now run a (simple) search using only client-side tech thanks to libraries like [Fuse.js](https://fusejs.io). As Fuse say in their docs: _"you don’t need to setup a dedicated backend just to handle search."_

## How does a website search function work?

A website search function, in the broadest possible terms, creates an index of your data and finds matches in that index. For a blog, the index should include all the posts and pages, as well as their meta data (categories, date, etc.). Then when you perform a search, a search algorithm is run against that index and a list of matches are returned. The nuance comes in both _how_ that index is created and in the complexity of the matching algorithm.

If I (a dumb frontender) were creating the search function, I'd take my search term and look for any exact matches in the strings within my index (which would be an array of objects for each post, with `title` and `content` keys):

```js
// My index
const index = [
    {
        title: "The post title..",
        content: "The post content..."
    }
    // etc...
];

// My naive search function
const search = term => index.find(post => post.content.contains(term));
```

There are lots of problems with this

Fuse JS (and other similar libraries) provide you with functions that will generate a search index from your data, and then allow you to query that index for search results. The data you put into Fuse is an array of objects (in the example case of a blog, each post becomes an object in the array). You tell Fuse which of the object's keys you want to search against (for example, `title` and `content`) and Fuse provides you with a function you can call to return an array of search results.

These are the steps that we'll cover in this article:

1. [Generating the raw data for an Eleventy site](#1.-generating-the-raw-data-for-an-eleventy-site)
    1. [Setting up a JSON page to be included in the output of our build](#setting-up-a-json-page-to-be-included-in-the-output-of-our-build)
    2. [Getting the data from all the pages we want to include _into_ that JSON page](#getting-the-data-from-all-the-pages-we-want-to-include-into-that-json-page)
2. [Configuring the Fuse index](#configuring-the-fuse-index)
3. [Performing a search]()

---

## 1. Generating the raw data for an Eleventy site

Fuse needs a data object to generate an index from. We need to create a JSON object that contains all the site content that we want to include in the search index. For an Eleventy site, this is a two-step process:

1. [Setting up a JSON page to be included in the output of our build](#setting-up-a-json-page-to-be-included-in-the-output-of-our-build)
2. [Getting the data from all the pages we want to include _into_ that JSON page](#getting-the-data-from-all-the-pages-we-want-to-include-into-that-json-page)

### Setting up a JSON page to be included in the output of our build

We can add a JSON page to our site using a 11ty JavaScript template. Rather than creating a page with `.md` as the extension, we use `.11ty.js` - this tells Eleventy to run the JavaScript on the page (rather that attempting to render it as Markdown).

To allow the use of `11ty.js` pages, we need to add `11ty.js` to the list of allowed template formats in our Eleventy config:

```js
// .eleventy.js
module.exports = eleventyConfig => {
    // ...
    return {
        // ...
        templateFormats: ["html", "liquid", "njk", "11ty.js", "md"]
        // Be sure to include all the *other* formats you need as well!
    };
};
```

An `11ty.js` page can return anything we like as a module export:

```js
module.exports = "<p>stuff to render on the page</p>";
```

But if we want to take this a step further and programmatically generate the content to be rendered, then we can export a function:

```js
module.exports = data => `<p>${data.stuff} to render on the page</p>`;
```

Markdown files have YAML frontmatter that we can use within their templates, but for `11ty.js` pages the process is slightly trickier. We can't use traditional frontmatter, but we can inject key/values into the templates `data` object. Sadly the only way I could get this to work was by exporting a class (yuck!):

> I really don't enjoy writing classes and `module.exports` style JS. I **much** prefer ESM

```js
class GenerateSearchData {
    data() {
        return {
            customFrontmatterKey: "value"
        };
    }

    render(data) {
        const items = /* get the items we want to search over here */;
        return JSON.stringify(items);
    }
}

module.exports = GenerateSearchData;
```

The reason for doing this is so we can add a custom permalink for the page we're creating, as well as exclude it from the site's `data.collections` (because this isn't a page we want to appear in our list of blog posts).

```js
data() {
    return {
        permalink: "/search-data.json",
        eleventyExcludeFromCollections: true
    };
}
```

Now when we build our Eleventy site we'll be able to visit `/search-data.json` and see a page of JSON data. The only issue now is that the page is empty, which brings us to the next step in the process:

### Getting the data from all the pages we want to include into that JSON page

Focusing on the `render()` method from the `GenerateSearchData` class we created earlier (again, I _wish_ there was a more "functional" ESM-friendly way to do this!), the `data` parameter gives us access to the "collections" stored in Eleventy. `collections.all` is the list of all our posts, so to generate an object for each post involves mapping across the `data.collections.all` value.

We'll want to do a couple of things to this data before outputting the final JSON. Firstly we'll want to filter out any pages that have the `eleventyExcludeFromCollections` frontmatter value set (as we mentioned before, these are pages that we do _not_ want to include in our search index):

```js
const items = data.collections.all.filter(
    item => !item.eleventyExcludeFromCollections
);
```

Then we'll want to parse the content of those posts into an array of shorter segments. Fuse is built to search over structured object data, so long strings of text are not useful (under the hood, Fuse has a `maxPatternLength` that determines the portion of a string that Fuse will search and I _think_ this defaults to `64` characters).

Your data may break up into a different structure, but for the pages on this site it makes sense to naively split the large content block into "sentences" (basically splitting every time we see a period `.`). Note I'm also stripping html tags from the generated HTML rather than using the raw Markdown content as it suits the content on this site a bit better. It's dumb, but it works for me.

```js
const items = data.collections.all.map(item => {
    const content = item.templateContent;
    const contentArray = content.replace(/<\/?[^>]+>/gi, "").split(". ");
});
```

The last step is to return an object for each page with just the values I care about (in this instance, it's `title`, `excerpt`, `url`, and `content`) and stringifying the final output. Putting all that together looks like this:

```js
render(data) {
    const items = data.collections.all
        .filter(item => !item.eleventyExcludeFromCollections)
        .map(item => {
            const content = item.templateContent;
            const contentArray = content
                .replace(/<\/?[^>]+>/gi, "")
                .split(". ");
            return {
                title: item.data.title,
                excerpt: item.data.excerpt,
                url: item.url,
                content: contentArray
            };
        });
    return JSON.stringify(items);
}
```

Now when we visit [`/search-data.json`](/search-data.json) we see a properly formatted JSON array with an object for each of our posts! 🎉

## Configuring the Fuse index
