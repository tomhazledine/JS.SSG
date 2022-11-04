import path from "path";
import { mergeDeep } from "./utils.js";
import { readFile } from "./io.js";

const defaults = {
    in: "content",
    out: "build",
    templates: "templates",
    public: "public",
    quiet: true,
    serve: false
};

export const getConfig = () => {
    const rawUserConfig = readFile(path.resolve(".", `./config.json`));
    const userConfig = JSON.parse(rawUserConfig);
    const config = mergeDeep(defaults, userConfig);
    return config;
};
