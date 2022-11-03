import MarkdownIt from "markdown-it";

export const markdown = new MarkdownIt({
    html: true
})
    // .use(markdownItAnchor)
    // .use(markdownItAttrs)
    // .use(markdownItFootnote)
    // .use(markdownItDefList)
    // .use(markdownItImplicitFigures, {
    //     figcaption: true,
    //     copyAttrs: "class"
    // })
    .disable("code");
