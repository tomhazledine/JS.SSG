import path from "path";

import { args, config } from "./index.js";
import { log } from "./console.js";
import { copyFile, readFile, saveFile } from "./io.js";
import { parseFrontmatter } from "./frontmatter.js";
import { render } from "./markdown.js";

const buildUpdatePath = (filePath, permalink, PATHS) => {
    if (!permalink || typeof permalink === "undefined") {
        const destinationPath = filePath.replace(PATHS.IN, PATHS.OUT);
        return path.join(
            path.dirname(destinationPath),
            path.basename(destinationPath, path.extname(destinationPath)) +
                ".html"
        );
    }

    if (path.extname(permalink)) {
        return path.join(PATHS.OUT, permalink);
    }

    return path.join(PATHS.OUT, permalink, "/index.html");
};

export const processFile = async (filePath, PATHS) => {
    const extension = path.extname(filePath);

    // Ignore weird files (i.e. `.DS_Store` etc.)
    if (extension === "") return;

    // Load all templates from templates/index.js
    const { default: templates } = await import(PATHS.TEMPLATES);

    if (extension === ".md") {
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

        const updatePath = buildUpdatePath(
            filePath,
            frontmatter.permalink,
            PATHS
        );

        if (args.verbose) log(`Writing ${updatePath}`, "green");
        saveFile(updatePath, body);
    } else {
        const destinationPath = filePath.replace(PATHS.IN, PATHS.OUT);
        if (args.verbose) log(`Copying ${destinationPath}`, "green");
        copyFile(filePath, destinationPath);
    }
};
