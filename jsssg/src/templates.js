import path from "path";
import { readFolder } from "./io.js";

export const getTemplates = async (TEMPLATES, TEMPLATES_DIR, TEMP) => {
    const templatePaths = readFolder(TEMPLATES_DIR);

    const jsxTemplatePaths = templatePaths.filter(
        filePath => path.extname(filePath) === ".jsx"
    );
    const vanillaTemplatePaths = templatePaths.filter(
        filePath => path.extname(filePath) === ".js"
    );
    // console.log({ jsxTemplatePaths });
    // console.log({ vanillaTemplatePaths });

    const rawVanillaTemplates = await Promise.all(
        vanillaTemplatePaths.map(async filePath => {
            const { default: component } = await import(filePath);
            return component;
        })
    );
    const vanillaTemplates = rawVanillaTemplates
        .filter(comp => typeof comp === "function")
        .map(comp => ({ [comp.name]: comp }))
        .reduce((acc, curr) => ({ ...acc, ...curr }), {});

    // console.log(vanillaTemplates["Head"]({}));
    //         const componentName = path.basename(filePath, extension);
    //         if (extension === ".js") {
    //             const file = await readFile(filePath);
    //             return {};
    //         }
    //     })
    // );

    // console.log({ templates });

    //     componentPaths.map(
    //         async filePath => await parseJSX(filePath, PATHS.ROOT)
    //     )
    //     // componentPaths.map(async filePath => {
    //     //     const { default: component } = await import(filePath);
    //     //     return component;
    //     // })
    // );
    // const { default: templates } = await import(TEMPLATES);
    return vanillaTemplates;
};
