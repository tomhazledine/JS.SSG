import path from "path";

import { getConfig } from "./config.js";
import { log } from "./console.js";
import { copyFile, readFile, saveFile } from "./io.js";
import { parseFrontmatter } from "./frontmatter.js";
import { render } from "./markdown.js";

export const config = getConfig();
export const markdown = render;

export const processFile = async (filePath, PATHS) => {
    const extension = path.extname(filePath);

    // Ignore weird files (i.e. `.DS_Store` etc.)
    if (extension === "") return;

    const destinationPath = filePath.replace(PATHS.IN, PATHS.OUT);

    // Load all templates from templates/index.js
    const { default: templates } = await import(PATHS.TEMPLATES);

    if (extension === ".md") {
        const updatePath = path.join(
            path.dirname(destinationPath),
            path.basename(destinationPath, path.extname(destinationPath)) +
                ".html"
        );

        const fileContents = await readFile(filePath);
        const { frontmatter, markdown } = parseFrontmatter(fileContents);
        const markdownContents = render(markdown);
        const fallbackTemplate = "main";
        const layout = frontmatter.layout.toLowerCase() || fallbackTemplate;
        const template =
            typeof templates[layout] !== "undefined"
                ? templates[layout]
                : templates[fallbackTemplate];

        const body = template({
            content: markdownContents,
            page: frontmatter,
            site: config.data
        });

        if (!config.quiet) log(`Writing ${updatePath}`, "green");
        saveFile(updatePath, body);
    } else {
        if (!config.quiet) log(`Copying ${destinationPath}`, "green");
        copyFile(filePath, destinationPath);
    }
};
