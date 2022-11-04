#!/usr/bin/env node
// 👆 Used to tell Node.js that this is a CLI tool

"use strict";
import path from "path";
import fs from "fs";
import watch from "node-watch";

import { getConfig } from "./config.js";
import { log } from "./console.js";
import { copyFile, readFolder } from "./io.js";
import { render } from "./markdown.js";
import { server } from "./server.js";
import { processFile } from "./process-file.js";

export const config = getConfig();
export const markdown = render;

const PATHS = {
    IN: path.resolve(".", `./${config.in}/`),
    TEMPLATES: path.resolve(".", `./${config.templates}/index.js`),
    TEMPLATES_DIR: path.resolve(".", `./${config.templates}`),
    PUBLIC: path.resolve(".", `./${config.public}/`),
    OUT: path.resolve(".", `./${config.out}/`)
};

console.log("Generating static site...");

const build = () => {
    if (!config.quiet) console.log(`Removing old versions...`);
    fs.rmSync(PATHS.OUT, { recursive: true, force: true });

    if (!config.quiet) console.log("Getting all file paths...");
    const allFiles = readFolder(PATHS.IN);
    if (!config.quiet) console.log(`found ${allFiles.length} files`);
    allFiles.forEach(filePath => processFile(filePath, PATHS));

    if (!config.quiet) console.log("Getting all public file paths...");
    const publicFiles = readFolder(PATHS.PUBLIC);
    if (!config.quiet) console.log(`found ${publicFiles.length} files`);
    publicFiles.forEach(filePath =>
        copyFile(filePath, filePath.replace(PATHS.PUBLIC, PATHS.OUT))
    );

    console.log(`Site generated at "/${config.out}"`);
};

build();

if (config.serve) {
    log(`Serving result at http://localhost:8080/`, "blue");
    server(PATHS.OUT);
}

if (config.watch) {
    const changed = (_, file) => {
        log(`File changed: ${file}`, "yellow");
        build();
    };
    watch(PATHS.IN, { recursive: true }, changed);
    watch(PATHS.TEMPLATES_DIR, { recursive: true }, changed);
    console.log(
        `Watching for changes on "${config.in}" and "${config.templates}"`
    );
}
