import path from "path";

import { readFolder } from "./io.js";
import { getJsxTemplates } from "./jsx.js";
import { args } from "./index.js";

export const getTemplates = async TEMPLATES => {
    const templatePaths = readFolder(TEMPLATES);

    const jsxTemplatePaths = templatePaths.filter(
        filePath => path.extname(filePath) === ".jsx"
    );
    const vanillaTemplatePaths = templatePaths.filter(
        filePath => path.extname(filePath) === ".js"
    );

    if (args.verbose) console.log("Loading vanilla JS templates...");
    const rawVanillaTemplates = await Promise.all(
        vanillaTemplatePaths.map(async filePath => {
            const { default: component } = await import(filePath);
            return component;
        })
    );

    const vanillaTemplates = rawVanillaTemplates
        .filter(comp => typeof comp === "function")
        .map(component => ({ [component.name]: { type: "js", component } }))
        .reduce((acc, curr) => ({ ...acc, ...curr }), {});

    if (args.verbose) console.log("Loading JSX templates...");
    const jsxTemplates = await getJsxTemplates(jsxTemplatePaths, TEMPLATES);

    return { ...vanillaTemplates, ...jsxTemplates };
};
