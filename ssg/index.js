#!/usr/bin/env node
// 👆 Used to tell Node.js that this is a CLI tool

"use strict";
import path from "path";
import fs from "fs";

import { getConfig } from "./config.js";
import { copyFile, readFolder } from "./io.js";
import { render } from "./markdown.js";
import { server } from "./server.js";
import { processFile } from "./process-file.js";

export const config = getConfig();
export const markdown = render;

const PATHS = {
    IN: path.resolve(".", `./${config.in}/`),
    TEMPLATES: path.resolve(".", `./${config.templates}/index.js`),
    PUBLIC: path.resolve(".", `./${config.public}/`),
    OUT: path.resolve(".", `./${config.out}/`)
};

console.log("Generating static site...");

if (!config.quiet) console.log(`Removing old versions...`);
fs.rmSync(PATHS.OUT, { recursive: true, force: true });

console.log("Getting all file paths...");
const allFiles = readFolder(PATHS.IN);
console.log(`found ${allFiles.length} files`);
allFiles.forEach(filePath => processFile(filePath, PATHS));

console.log("Getting all public file paths...");
const publicFiles = readFolder(PATHS.PUBLIC);
console.log(`found ${publicFiles.length} files`);
publicFiles.forEach(filePath =>
    copyFile(filePath, filePath.replace(PATHS.PUBLIC, PATHS.OUT))
);

console.log(`Site generated at "/${config.out}"`);

if (config.serve) {
    console.log(`Serving result at http://localhost:8080/`);
    server(PATHS.OUT);
}
