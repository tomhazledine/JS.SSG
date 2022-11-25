#!/usr/bin/env node
// 👆 Used to tell Node.js that this is a CLI tool

"use strict";
import path from "path";
import fs from "fs";

import { getConfig, parseArgs } from "./config.js";
import { log } from "./console.js";
import { copyFile, readFolder } from "./io.js";
import { render } from "./markdown.js";
import { server } from "./server.js";
import { handleFileBuild, processFile } from "./process-file.js";
import { parseSiteData } from "./parse-site-data.js";
import { getTemplates } from "./templates.js";
import { buildRssPage } from "./rss.js";
import { buildSitemapPage } from "./sitemap.js";
import { initWatch } from "./watch.js";

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
    const templates = await getTemplates(PATHS.TEMPLATES);

    fileData.forEach(file =>
        handleFileBuild({
            file,
            PATHS,
            templates,
            site
        })
    );

    if (config.rss) {
        buildRssPage({ templates, site, outPath: PATHS.OUT });
    }

    if (config.sitemap) {
        buildSitemapPage({ templates, site, outPath: PATHS.OUT });
    }

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
    initWatch(PATHS, build, config);
}
