import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import postcss from "postcss";
import sass from "sass";

import { log } from "./console.js";
import { args } from "./index.js";
import { saveFile } from "./io.js";

export const compileSass = async (stylePath, PATHS) => {
    const rawCSS = sass.compile(stylePath);

    const compiledCSS = await postcss([autoprefixer, cssnano]).process(
        rawCSS.css,
        {
            from: stylePath
        }
    );

    const outPath = stylePath
        .replace(PATHS.STYLES, PATHS.OUT)
        .replace(".scss", ".css");

    if (args.verbose) log(`Writing css to ${outPath}`, "green");
    saveFile(outPath, compiledCSS.css);
};
