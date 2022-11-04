#!/usr/bin/env node
// 👆 Used to tell Node.js that this is a CLI tool

"use strict";
import path from "path";
import fs from "fs";

import { getConfig } from "./config.js";
import { log } from "./console.js";
import { copyFile, readFile, readFolder, saveFile } from "./io.js";
import { parseFrontmatter } from "./frontmatter.js";
import { render } from "./markdown.js";
import { server } from "./server.js";

export const config = getConfig();
export const markdown = render;

const IN_DIRECTORY = path.resolve(".", `./${config.in}/`);
const TEMPLATE_DIRECTORY = path.resolve(".", `./${config.templates}/index.js`);
const OUT_DIRECTORY = path.resolve(".", `./${config.out}/`);

const processFile = async filePath => {
    const extension = path.extname(filePath);

    // Ignore weird files (i.e. `.DS_Store` etc.)
    if (extension === "") return;

    const destinationPath = filePath.replace(IN_DIRECTORY, OUT_DIRECTORY);

    // Load all templates from templates/index.js
    const { default: templates } = await import(TEMPLATE_DIRECTORY);

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

console.log("Generating static site...");

if (!config.quiet) console.log(`Removing old versions...`);
fs.rmSync(OUT_DIRECTORY, { recursive: true, force: true });

console.log("Getting all file paths...");
const allFiles = readFolder(IN_DIRECTORY);
console.log(`found ${allFiles.length} files`);

allFiles.forEach(filePath => processFile(filePath));
console.log(`Site generated at "/${config.out}"`);

if (config.serve) {
    console.log(`Serving result at http://localhost:8080/`);
    server(OUT_DIRECTORY);
}
