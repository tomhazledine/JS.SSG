#!/usr/bin/env node
// 👆 Used to tell Node.js that this is a CLI tool

"use strict";
import path from "path";
import fs from "fs";

import { getConfig } from "./config.js";
import { copyFile, readFile, readFolder, saveFile } from "./io.js";
import { parseFrontmatter } from "./frontmatter.js";
import { render } from "./markdown.js";
import templates from "../site/templates/index.js";

export const config = getConfig();
export const markdown = render;

const IN_DIRECTORY = path.resolve(".", `./${config.in}/`);
const OUT_DIRECTORY = path.resolve(".", `./${config.out}/`);

// Clean old versions
fs.rmSync(OUT_DIRECTORY, { recursive: true, force: true });

console.log("Generating static site...");

const processFile = async filePath => {
    const extension = path.extname(filePath);

    // Ignore weird files (i.e. `.DS_Store` etc.)
    if (extension === "") return;

    const copyPath = filePath.replace(IN_DIRECTORY, OUT_DIRECTORY);

    if (extension === ".md") {
        const updatePath = path.join(
            path.dirname(copyPath),
            path.basename(copyPath, path.extname(copyPath)) + ".html"
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

        if (!config.quiet) console.log(`Writing ${updatePath}`);
        saveFile(updatePath, body);
    } else {
        if (!config.quiet) console.log(`Copying ${copyPath}`);
        copyFile(filePath, copyPath);
    }
};

console.log("Getting all file paths...");
const allFiles = readFolder(IN_DIRECTORY);
console.log(`found ${allFiles.length} files`);

allFiles.forEach(filePath => processFile(filePath));
console.log(`Site generated at "/${config.out}"`);
