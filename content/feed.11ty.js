const pluginRss = require("@11ty/eleventy-plugin-rss");

const MarkdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require("markdown-it-attrs");
const markdownItDefList = require("markdown-it-deflist");
const markdownItFootnote = require("markdown-it-footnote");
const markdownItImplicitFigures = require("markdown-it-implicit-figures");

const md = new MarkdownIt({
    html: true
})
    .use(markdownItAnchor)
    .use(markdownItAttrs)
    .use(markdownItFootnote)
    .use(markdownItDefList)
    .use(markdownItImplicitFigures, {
        figcaption: true,
        copyAttrs: "class"
    })
    .disable("code");

const formatDate = date => pluginRss.dateToRfc3339(date);

module.exports = {
    data: {
        permalink: "/feed.xml"
    },
    render(data) {
        const rawUpdatedDate = pluginRss.getNewestCollectionItemDate(
            data.collections.articles
        );
        const updatedDate = formatDate(rawUpdatedDate);

        const posts = data.collections.articles
            .reverse()
            .map(async post => {
                // console.log({ post });
                const postUrl = data.site.url + post.data.permalink;
                const postDate = formatDate(post.date);
                const rawContent = md.render(post.templateContent);
                console.log({ rawContent });
                const parsedContent = await pluginRss.convertHtmlToAbsoluteUrls(
                    rawContent,
                    postUrl
                );
                console.log({ parsedContent });
                const content = pluginRss.convertHtmlToAbsoluteUrls(
                    md.render(post.templateContent),
                    postUrl
                ); // post.templateContent | markdown | htmlToAbsoluteUrls(absolutePostUrl
                const caveat = post.data.not_rss_friendly
                    ? `${md.render(
                          post.data.site.rssCaveat
                      )}<p>View the original here: <a href="${postUrl}">${postUrl}</a></p>`
                    : "";
                return `<entry>
          <title>${post.data.title}</title>
          <link href="${postUrl}"/>
          <updated>${postDate}</updated>
          <id>${postUrl}</id>
          <content type="html">
              ${caveat}
              ${content}
          </content>
        </entry>`;
            })
            .join("");

        return `<?xml version="1.0" encoding="utf-8"?>
                <feed xmlns="http://www.w3.org/2005/Atom">
                  <title>${data.site.title}</title>
                  <subtitle>${data.site.summary}</subtitle>
                  <link href="${data.site.url}${data.permalink}" rel="self"/>
                  <link href="${data.site.url}"/>
                  <updated>${updatedDate}</updated>
                  <id>${data.site.url}/</id>
                  <author>
                    <name>${data.site.author}</name>
                    <email>${data.site.authorEmail}</email>
                  </author>
                  ${posts}
                </feed>`;
    }
};

// {%- for post in collections.articles | reverse %}
// {% set absolutePostUrl %}{{ post.url | url | absoluteUrl(site.url) }}{% endset %}
// <entry>
//   <title>{{ post.data.title }}</title>
//   <link href="{{ absolutePostUrl }}"/>
//   <updated>{{ post.date | dateToRfc3339 }}</updated>
//   <id>{{ absolutePostUrl }}</id>
//   <content type="html">
//       {%- if post.data.not_rss_friendly -%}
//           ${
//               data.site.rssCaveat
//               // | markdown
//           }}<p>View the original here: <a href="{{ absolutePostUrl }}">{{ absolutePostUrl }}</a></p>
//       {%- endif -%}
//       {{ post.templateContent | markdown | htmlToAbsoluteUrls(absolutePostUrl) }}</content>
// </entry>
// {%- endfor %}
