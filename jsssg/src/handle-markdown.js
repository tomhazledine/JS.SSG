import { args } from "./index.js";
import { log } from "./console.js";
import { saveFile } from "./io.js";
import { render } from "./markdown.js";
import { generatePagination } from "./pagination.js";
import defaultTemplate from "./defaults/Main.js";

export const handleMarkdown = async ({ file, templates, site }) => {
    const markdownContents = render(file.markdown);
    const fallbackTemplate = "Main";
    const layout = file.frontmatter.layout
        ? file.frontmatter.layout
        : fallbackTemplate;

    const template =
        typeof templates[layout] !== "undefined"
            ? templates[layout]
            : typeof templates[fallbackTemplate] !== "undefined"
            ? templates[fallbackTemplate]
            : defaultTemplate;

    const pagination = await generatePagination(file, site);
    const body = template({
        content: markdownContents,
        page: { ...file.frontmatter, url: file.url, pagination },
        site
    });
    if (args.verbose) log(`Writing ${file.filePath}`, "green");
    saveFile(file.filePath, body);
};
