#!/usr/bin/env node
// 👆 Used to tell Node.js that this is a CLI tool

"use strict";
import path from "path";
import fs from "fs";
import watch from "node-watch";

import { getConfig, parseArgs } from "./config.js";
import { log } from "./console.js";
import { copyFile, readFolder } from "./io.js";
import { render } from "./markdown.js";
import { server } from "./server.js";
import { handleFileBuild, processFile } from "./process-file.js";
import { parseSiteData } from "./parse-site-data.js";
import { getTemplates } from "./templates.js";

export const args = parseArgs(process.argv);
export const config = getConfig();
export const markdown = render;

const PATHS = {
    IN: path.resolve(".", `./${config.in}/`),
    TEMPLATES: path.resolve(".", `./${config.templates}`),
    PUBLIC: path.resolve(".", `./${config.public}/`),
    OUT: path.resolve(".", `./${config.out}/`)
};

console.log("Generating static site...");

const build = async () => {
    if (args.verbose) console.log(`Removing old versions...`);
    fs.rmSync(PATHS.OUT, { recursive: true, force: true });

    if (args.verbose) console.log("Getting all content file paths...");
    const allFiles = readFolder(PATHS.IN);
    if (args.verbose) console.log(`found ${allFiles.length} files`);

    if (args.verbose) console.log("Parsing frontmatter...");
    const fileData = await Promise.all(
        allFiles.map(async filePath => await processFile(filePath, PATHS))
    );

    if (args.verbose) console.log("Processing pages...");
    const site = parseSiteData(config, fileData);

    if (args.verbose) console.log("Loading templates...");
    // Load all templates from templates/index.js
    const templates = await getTemplates(PATHS.TEMPLATES);

    fileData.forEach(file =>
        handleFileBuild({
            file,
            PATHS,
            templates,
            site
        })
    );

    if (args.verbose) console.log("Getting all public file paths...");
    const publicFiles = readFolder(PATHS.PUBLIC);
    if (args.verbose) console.log(`found ${publicFiles.length} files`);
    publicFiles.forEach(filePath =>
        copyFile(filePath, filePath.replace(PATHS.PUBLIC, PATHS.OUT))
    );

    console.log(`Site generated at "/${config.out}"`);
};

build();

if (args.serve) {
    log(`Serving result at http://localhost:${args.port}/`, "blue");
    server(PATHS.OUT, args.port);
}

if (args.watch) {
    const changed = (_, file) => {
        log(`File changed: ${file}`, "yellow");
        build();
    };
    watch(PATHS.IN, { recursive: true }, changed);
    // watch(PATHS.TEMPLATES, { recursive: true }, changed);
    console.log(
        `Watching for changes on "${config.in}" and "${config.templates}"`
    );
}
