import path from "path";

import { renderMdx } from "./handle-markdown.js";
import { render } from "./markdown.js";
import { log } from "./console.js";
import { args } from "./index.js";
import { saveFile } from "./io.js";
import { chunk } from "./utils.js";

const parseSearchContent = markdown => {
    // Remove tags
    const content = markdown.replace(/<\/?[^>]+(>|$)/g, "");

    // Split into sentences
    const segmenter = new Intl.Segmenter("en", { granularity: "sentence" });
    const segments = [...segmenter.segment(content)]
        .map(segment => segment.segment)
        // Cap sentences at 240 chars
        .map(line => chunk(line, 240))
        .flat()
        // Remove trailing whitespace
        .map(line => line.trim())
        // Remove empty lines
        .filter(line => line.length > 0);

    return segments;
};

export const buildSearchData = ({ fields, site, outPath, templates }) => {
    const allPages = site.allPages;

    const searchData = allPages
        .filter(page => !page.frontmatter.hideFromSearch)
        .map(page => {
            const includedFrontmatter = fields.reduce(
                (acc, field) => ({ ...acc, [field]: page.frontmatter[field] }),
                {}
            );

            const scope = {
                page: page,
                site
            };

            try {
                const markdownContents =
                    page.type === "mdx"
                        ? renderMdx(page.markdown, templates, scope)
                        : render(page.markdown);

                const content = parseSearchContent(markdownContents);
                return { ...includedFrontmatter, url: page.url, content };
            } catch (err) {
                if (args.verbose)
                    log([`Problem rendering search page`, page.url], "red");
                console.error(err);
            }
        });

    const feedPath = path.resolve(outPath, "search-data.json");
    if (args.verbose) log(`Writing sitemap to ${feedPath}`, "green");
    saveFile(feedPath, JSON.stringify(searchData));
};
