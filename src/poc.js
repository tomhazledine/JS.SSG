import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { copyFile, readFile, readFolder, saveFile } from "./io.js";
import { markdown } from "./markdown.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const IN_DIRECTORY = path.resolve(__dirname, "../content/");
const OUT_DIRECTORY = path.resolve(__dirname, "../build/");

const processFile = async filePath => {
    const extension = path.extname(filePath);

    // Ignore weird files (i.e. `.DS_Store` etc.)
    if (extension === "") return;

    const copyPath = filePath.replace(IN_DIRECTORY, OUT_DIRECTORY);

    if (extension === ".md") {
        const updatePath = path.join(
            path.dirname(copyPath),
            path.basename(copyPath, path.extname(copyPath)) + ".html"
        );

        const fileContents = await readFile(filePath);
        const markdownContents = markdown.render(fileContents);
        saveFile(updatePath, markdownContents);
    } else {
        copyFile(filePath, copyPath);
    }

    // // If the file isn't an image format that we want
    // // to process, don't do anything else.
    // if (!VALID_FORMATS.includes(extension)) return;

    // try {
    //     const image = await sharp(filePath);
    //     const metadata = await image.metadata();

    //     sizes.forEach(async size => {
    //         // if (metadata.width < size) return;

    //         const resizedData = await sharp(filePath)
    //             .resize({ width: size, withoutEnlargement: true })
    //             .toBuffer();

    //         const resizedOutPath = outPath.replace(
    //             extension,
    //             `-${size}${extension}`
    //         );
    //         saveImageFile(resizedOutPath, resizedData);
    //     });
    // } catch (error) {
    //     console.error(`An error occurred when processing ${filePath}`);
    //     console.error(error);
    // }
};

console.log("Getting all file paths...");
const allFiles = readFolder(IN_DIRECTORY);
console.log(`found ${allFiles.length} files`);

allFiles.forEach(filePath => processFile(filePath));
