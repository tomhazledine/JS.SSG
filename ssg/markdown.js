import MarkdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItAttrs from "markdown-it-attrs";
import markdownItDefList from "markdown-it-deflist";
import markdownItFootnote from "markdown-it-footnote";
import markdownItImplicitFigures from "markdown-it-implicit-figures";

export const markdown = new MarkdownIt({
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

export const render = content => markdown.render(content);
