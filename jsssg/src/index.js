#!/usr/bin/env node
"use strict";

import path from "path";

import { build } from "./build.js";
import { cleanup } from "./cleanup.js";
import { parseArgs } from "./args.js";
import { getConfig } from "./config.js";
import { log } from "./console.js";
import { exit } from "./exit.js";
import { images } from "./images.js";
import { render } from "./markdown.js";
import { renderMdx } from "./handle-markdown.js";
import { server } from "./server.js";
import { initWatch } from "./watch.js";
import jsssgPackage from "../package.json" assert { type: "json" };

export const args = parseArgs(process.argv);
export const config = getConfig(args);
export const markdown = render;
export const mdx = renderMdx;
export const version = jsssgPackage.version;

const PATHS = {
    IN: path.resolve(".", `./${config.in}`),
    TEMPLATES: path.resolve(".", `./${config.templates}`),
    PUBLIC: path.resolve(".", `./${config.public}`),
    OUT: path.resolve(".", `./${config.out}`),
    IMAGES: path.resolve(".", `./${config.images}`),
    IGNORE: path.resolve(".", `./${config.in}/${config.ignore}`),
    STYLES: config.styles ? path.resolve(".", `./${config.styles}`) : false
};

console.log("Generating static site...");

const buildParams = { PATHS, config, args };

if (args.clean) {
    cleanup(buildParams);
}

build(buildParams);

if (args.images) {
    images(PATHS);
}

if (args.serve) {
    log(`Serving result at http://localhost:${args.port}/`, "blue");
    server(PATHS.OUT, args.port);
}

if (args.watch) {
    initWatch(PATHS, build, config, buildParams);
}

if (args.watch || args.serve) {
    exit();
}
