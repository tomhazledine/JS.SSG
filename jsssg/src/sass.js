import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import path from "path";
import postcss from "postcss";
import sass from "sass";

import { log } from "./console.js";
import { args } from "./index.js";
import { saveFile } from "./io.js";

export const compileSass = async (stylePath, PATHS, appPrefix = false) => {
    let rawCSS;
    try {
        rawCSS = sass.compile(stylePath);
    } catch (err) {
        log(`Invalid SCSS: ${stylePath}`, "red");
        console.error(err);
        return;
    }

    const compiledCSS = await postcss([autoprefixer, cssnano]).process(
        rawCSS.css,
        {
            from: stylePath
        }
    );

    const pathMeta = path.parse(stylePath);

    const prefix = appPrefix ? `${appPrefix}.` : "";

    const outPath = stylePath
        .replace(PATHS.STYLES, PATHS.OUT)
        .replace(pathMeta.base, `${prefix}${pathMeta.name}.css`);

    if (args.verbose) log(`Writing css to ${outPath}`, "green");
    saveFile(outPath, compiledCSS.css);
};
