import path from "path";
import { mergeDeep } from "./utils.js";
import { readFile } from "./io.js";

const defaultConfig = {
    in: "content",
    out: "build",
    templates: "templates",
    images: "images",
    public: "public",
    ignore: "drafts",
    collections: ["categories", "tags"],
    search: true,
    searchFields: ["title"],
    rss: true,
    sitemap: true,
    clean: false
};

export const getConfig = () => {
    const rawUserConfig = readFile(path.resolve(".", `./config.json`));
    const userConfig = JSON.parse(rawUserConfig);
    const config = mergeDeep(defaultConfig, userConfig);
    return config;
};

const defaultArgs = {
    serve: false,
    watch: false,
    verbose: false,
    port: "8080",
    images: false
};

export const parseArgs = rawArgs => {
    const [a, b, ...relevant] = rawArgs;
    const args = relevant
        .map(arg => {
            const [key, value] = arg.split("=");
            return { [key.replace(/-/g, "")]: value || true };
        })
        .reduce((args, arg) => ({ ...args, ...arg }), {});
    return mergeDeep(defaultArgs, args);
};
