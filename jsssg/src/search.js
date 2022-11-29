import path from "path";

import { renderMdx } from "./handle-markdown.js";
import { render } from "./markdown.js";
import { log } from "./console.js";
import { args } from "./index.js";
import { saveFile } from "./io.js";
import { chunk } from "./utils.js";

const parseSearchContent = markdown =>
    markdown
        // Remove tags
        .replace(/<\/?[^>]+(>|$)/g, "")
        // Split into sentences
        .split("\n")
        // Remove empty lines
        .filter(line => line !== "")
        // Cap sentences at 240 chars
        .map(line => chunk(line, 240))
        .flat();

export const buildSearchData = ({ fields, site, outPath, templates }) => {
    const allPages = site.allPages;

    const searchData = allPages
        .filter(page => !page.frontmatter.hideFromSearch)
        .map(page => {
            const includedFrontmatter = fields.reduce(
                (acc, field) => ({ ...acc, [field]: page.frontmatter[field] }),
                {}
            );

            const markdownContents =
                page.type === "mdx"
                    ? renderMdx(page.markdown, templates)
                    : render(page.markdown);

            const content = parseSearchContent(markdownContents);
            return { ...includedFrontmatter, url: page.url, content };
        });

    const feedPath = path.resolve(outPath, "search-data.json");
    if (args.verbose) log(`Writing sitemap to ${feedPath}`, "green");
    saveFile(feedPath, JSON.stringify(searchData));
};
