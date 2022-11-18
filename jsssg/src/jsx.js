import path from "path";
import fs from "fs";

import { args } from "./index.js";
import { transformSync } from "esbuild";
import { readFile, saveFile } from "./io.js";

export const parseJSX = async filePath => {
    const dirname = path.dirname(filePath);
    const extension = path.extname(filePath);
    const componentName = path.basename(filePath, extension);
    const tempFilePath = path.join(dirname, `/${componentName}.js`);

    const raw = await readFile(filePath);
    const parsed = transformSync(raw, {
        jsx: "automatic",
        loader: "jsx"
    });
    if (args.verbose) console.log(`Saving temporary template: ${tempFilePath}`);
    saveFile(tempFilePath, parsed.code);
    return { name: componentName, path: tempFilePath };
};

export const loadJSX = async componentID => {
    const { default: component } = await import(componentID.path);
    if (args.verbose)
        console.log(`Deleting temporary template: ${componentID.path}`);
    fs.rmSync(componentID.path);
    return { [componentID.name]: { type: "jsx", component } };
};

export const getJsxTemplates = async (componentPaths, templatesRoot) => {
    const componentIDs = await Promise.all(
        componentPaths.map(async filePath => await parseJSX(filePath))
    );
    const components = await Promise.all(
        componentIDs.map(async ID => await loadJSX(ID))
    );
    return components.reduce((acc, curr) => ({ ...acc, ...curr }), {});
};
