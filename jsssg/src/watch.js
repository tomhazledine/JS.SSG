import watch from "node-watch";

import { log } from "./console.js";

export const initWatch = (PATHS, build, config, buildParams) => {
    const changed = (_, file) => {
        log(`File changed: ${file}`, "yellow");
        build(buildParams);
    };

    const pathsToWatch = [
        PATHS.IN
        // PATHS.TEMPLATES
    ];

    if (PATHS.STYLES) pathsToWatch.push(PATHS.STYLES);

    console.log(`Watching for changes on ${pathsToWatch.join(" & ")}`);
    watch(pathsToWatch, { recursive: true }, changed);
};
