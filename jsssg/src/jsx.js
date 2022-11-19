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
    try {
        const { default: component } = await import(componentID.path);

        return { [componentID.name]: { type: "jsx", component } };
    } catch (err) {
        if (args.verbose)
            console.log(
                `Problem reading temporary template: ${componentID.path}`
            );
        console.error(err);
    }
};

export const getJsxTemplates = async (componentPaths, templatesRoot) => {
    const componentIDs = await Promise.all(
        componentPaths.map(async filePath => await parseJSX(filePath))
    );
    const components = await Promise.all(
        componentIDs.map(async ID => await loadJSX(ID))
    );
    componentIDs.map(async ID => {
        if (args.verbose)
            console.log(`Deleting temporary template: ${ID.path}`);
        fs.rmSync(ID.path);
    });
    return components.reduce((acc, curr) => ({ ...acc, ...curr }), {});
};
