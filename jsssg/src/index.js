#!/usr/bin/env node
// 👆 Used to tell Node.js that this is a CLI tool

"use strict";
import path from "path";

import { build } from "./build.js";
import { getConfig, parseArgs } from "./config.js";
import { log } from "./console.js";
import { render } from "./markdown.js";
import { server } from "./server.js";
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

const buildParams = { PATHS, config, args };

build(buildParams);

if (args.serve) {
    log(`Serving result at http://localhost:${args.port}/`, "blue");
    server(PATHS.OUT, args.port);
}

if (args.watch) {
    initWatch(PATHS, build, config, buildParams);
}
