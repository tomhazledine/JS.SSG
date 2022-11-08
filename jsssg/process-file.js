import path from "path";

import { args } from "./index.js";
import { log } from "./console.js";
import { buildPagePaths, copyFile, readFile } from "./io.js";
import { parseFrontmatter } from "./frontmatter.js";
import { handleMarkdown } from "./handle-markdown.js";

export const processFile = async (filePath, PATHS) => {
    const extension = path.extname(filePath);

    // Ignore weird files (i.e. `.DS_Store` etc.)
    if (extension === "") return { type: "not a file" };

    // Read frontmatter from markdown files
    if (extension === ".md") {
        if (args.verbose) log(`Parsing frontmatter for ${filePath}`);
        const fileContents = await readFile(filePath);
        try {
            const { frontmatter, markdown } = parseFrontmatter(fileContents);
            const paths = buildPagePaths(
                filePath,
                frontmatter.permalink,
                PATHS
            );
            return { type: "markdown", frontmatter, markdown, ...paths };
        } catch (err) {
            console.log(`Invalid frontmatter: ${filePath}`);
        }
    }

    // Handle all other filetypes (just return the path, because
    // we'll just be copying these files unchanged)
    return { type: extension, filePath };
};

const handleCopy = (file, PATHS) => {
    const destinationPath = file.filePath.replace(PATHS.IN, PATHS.OUT);
    if (args.verbose) log(`Copying ${destinationPath}`, "green");
    copyFile(file.filePath, destinationPath);
};

export const handleFileBuild = async ({ file, PATHS, templates, site }) => {
    switch (file.type) {
        case "markdown":
            handleMarkdown({ file, templates, site });
            break;
        default:
            handleCopy(file, PATHS);
            break;
    }
};
