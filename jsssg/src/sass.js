import sass from "sass";

import { log } from "./console.js";
import { args } from "./index.js";
import { saveFile } from "./io.js";

export const compileSass = (stylePath, PATHS) => {
    const result = sass.compile(stylePath);

    const outPath = stylePath
        .replace(PATHS.STYLES, PATHS.OUT)
        .replace(".scss", ".css");

    if (args.verbose) log(`Writing css to ${outPath}`, "green");
    saveFile(outPath, result.css);
};
