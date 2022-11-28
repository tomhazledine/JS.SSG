import path from "path";
import sharp from "sharp";
import { optimize } from "svgo";

import { log } from "./console.js";
import { args } from "./index.js";
import { copyFile, readFile, readFolder, saveFile } from "./io.js";

const createSize = async (imagePath, size, defaultPath, extension) => {
    try {
        const resizedData = await sharp(imagePath).resize(size).toBuffer();
        const outPath = defaultPath.replace(extension, `-${size}${extension}`);
        if (args.verbose) log(`Saving ${outPath}`);
        saveFile(outPath, resizedData);
    } catch (err) {
        if (args.verbose) log("An error occurred during processing", "red");
        console.error(err);
    }
};

const handleImage = async (imagePath, sizes = [200], PATHS) => {
    const passThroughExtensions = [".icns", ".ico", ".gif"];

    const extension = path.extname(imagePath);
    if (extension === ".jpg" || extension === ".png") {
        try {
            const outPath = imagePath.replace(
                PATHS.IMAGES,
                path.join(PATHS.OUT, "/images")
            );
            if (args.verbose) log(`Copying ${outPath}`);
            copyFile(imagePath, outPath);
            sizes.map(size => createSize(imagePath, size, outPath, extension));
        } catch (err) {
            if (args.verbose) log("An error occurred during processing", "red");
            console.error(err);
        }
    } else if (extension === ".svg") {
        const fileContents = await readFile(imagePath);

        const result = optimize(fileContents, {
            // optional but recommended field
            path: imagePath,
            // all config fields are also available here
            multipass: true
        });

        const outPath = imagePath.replace(
            PATHS.IMAGES,
            path.join(PATHS.OUT, "/images")
        );
        if (args.verbose) log(`Saving ${outPath}`);
        saveFile(outPath, result.data);
    } else if (passThroughExtensions.includes(extension)) {
        const outPath = imagePath.replace(
            PATHS.IMAGES,
            path.join(PATHS.OUT, "/images")
        );
        if (args.verbose) log(`Copying ${outPath}`);
        copyFile(imagePath, outPath);
    } else {
        if (args.verbose)
            log(
                `unsupported format [${extension}] found for ${imagePath}`,
                "yellow"
            );
        // console.warn(
        //     `unsupported format [${extension}] found for ${imagePath}`
        // );
    }
};

export const images = PATHS => {
    console.log("Getting all image file paths...");
    const allImagePaths = readFolder(PATHS.IMAGES);
    console.log(`found ${allImagePaths.length} image files`);

    allImagePaths.map(imagePath => {
        handleImage(imagePath, [600, 400, 200, 160, 100], PATHS);
    });
};
