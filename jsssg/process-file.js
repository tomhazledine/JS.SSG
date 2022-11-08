import path from "path";

import { args } from "./index.js";
import { log } from "./console.js";
import { copyFile, readFile } from "./io.js";
import { parseFrontmatter } from "./frontmatter.js";
import { handleMarkdown } from "./handle-markdown.js";

export const processFile = async filePath => {
    const extension = path.extname(filePath);

    // Ignore weird files (i.e. `.DS_Store` etc.)
    if (extension === "") return { type: "not a file" };

    // Read frontmatter from markdown files
    if (extension === ".md") {
        const fileContents = await readFile(filePath);
        const { frontmatter, markdown } = parseFrontmatter(fileContents);
        return { type: "markdown", frontmatter, markdown, path: filePath };
    }

    // Handle all other filetypes (just return the path, because
    // we'll just be copying these files unchanged)
    return { type: extension, path: filePath };
};

const handleCopy = (file, PATHS) => {
    const destinationPath = file.path.replace(PATHS.IN, PATHS.OUT);
    if (args.verbose) log(`Copying ${destinationPath}`, "green");
    copyFile(filePath, destinationPath);
};

export const handleFileBuild = async ({ file, PATHS, templates, site }) => {
    switch (file.type) {
        case "markdown":
            handleMarkdown({ file, PATHS, templates, site });
            break;
        default:
            handleCopy(file, PATHS);
            break;
    }
};

export const parseSiteData = (data, pages) => {
    return { ...data, pages };
};
