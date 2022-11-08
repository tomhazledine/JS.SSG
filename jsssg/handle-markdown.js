import path from "path";

import { args } from "./index.js";
import { log } from "./console.js";
import { saveFile } from "./io.js";
import { render } from "./markdown.js";

export const handleMarkdown = async ({ file, templates, site }) => {
    const markdownContents = render(file.markdown);
    const fallbackTemplate = "main";
    const layout = file.frontmatter.layout.toLowerCase() || fallbackTemplate;
    const template =
        typeof templates[layout] !== "undefined"
            ? templates[layout]
            : templates[fallbackTemplate];
    const body = template({
        content: markdownContents,
        page: { ...file.frontmatter, url: file.url },
        site
    });
    if (args.verbose) log(`Writing ${file.filePath}`, "green");
    saveFile(file.filePath, body);
};
