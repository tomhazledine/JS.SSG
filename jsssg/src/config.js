import path from "path";
import { mergeDeep } from "./utils.js";
import { readFile } from "./io.js";

export const getConfig = args => {
    const defaultConfig = {
        appName: false,
        in: "content",
        out: "build",
        templates: "templates",
        images: "images",
        public: "public",
        styles: false,
        ignore: "drafts",
        collections: ["categories", "tags"],
        search: true,
        searchFields: ["title"],
        rss: true,
        sitemap: true,
        clean: false,
        data: {
            url: `http://localhost:${args.port}/`
        }
    };

    try {
        const rawUserConfig = readFile(path.resolve(".", `./config.json`));
        if (!rawUserConfig) return defaultConfig;
        const userConfig = JSON.parse(rawUserConfig);
        const config = mergeDeep(defaultConfig, userConfig);
        return config;
    } catch {
        if (args.verbose) console.log(`no config file found. Using defaults.`);
        return defaultConfig;
    }
};
