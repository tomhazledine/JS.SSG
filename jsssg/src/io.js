import fs from "fs";
import path from "path";
import { args } from "./index.js";
import { log } from "./console.js";

const checkDir = targetPath => {
    try {
        const stats = fs.lstatSync(targetPath);
        return {
            exists: true,
            dir: stats.isDirectory()
        };
    } catch (e) {
        return { exists: false, dir: false };
    }
};

const getAllFilePaths = root => {
    if (checkDir(root).exists && checkDir(root).dir) {
        if (args.verbose) log(`Reading ${root}`, "green");
        const files = fs.readdirSync(root);
        return files.map(file => getAllFilePaths(`${root}/${file}`));
    }
    if (!checkDir(root).exists) {
        return [];
    }
    return root;
};

const ensureDirectoryExistence = filePath => {
    const dirname = path.dirname(filePath);
    if (checkDir(dirname).exists) {
        return true;
    }
    if (args.verbose) log(`Creating folder ${dirname}`, "green");
    fs.mkdirSync(dirname, { recursive: true });
    return true;
};

export const readFolder = (startPath, ignorePath = false) => {
    const allPaths = getAllFilePaths(startPath);
    const flattenedPaths = allPaths
        .flat(Infinity)
        .filter(path => !path.includes(ignorePath));
    return flattenedPaths;
};

export const copyFile = (originalFilePath, newFilePath) => {
    const targetExists = ensureDirectoryExistence(newFilePath);
    if (targetExists) {
        fs.copyFile(originalFilePath, newFilePath, err => {
            if (err) throw err;
        });
    }
};

export const saveFile = (filePath, data) => {
    const targetExists = ensureDirectoryExistence(filePath);
    if (targetExists) {
        fs.writeFileSync(filePath, data, "utf8");
    }
};

export const readFile = path => {
    try {
        const data = fs.readFileSync(path, "utf8");
        return data;
    } catch (err) {
        throw err;
    }
};

export const buildPagePath = (filePath, permalink, PATHS) => {
    if (!permalink || typeof permalink === "undefined") {
        const destinationPath = filePath.replace(PATHS.IN, "");
        return path.join(
            path.dirname(destinationPath),
            path.basename(destinationPath, path.extname(destinationPath)) +
                "/index.html"
        );
    }

    if (path.extname(permalink)) return permalink;

    return path.join(permalink, "/index.html");
};

export const buildPagePaths = (filePath, permalink, PATHS) => {
    const relativePath = buildPagePath(filePath, permalink, PATHS).replace(
        "/index/",
        "/"
    );
    return {
        url: path.resolve("/", relativePath.replace("/index.html", "/")),
        filePath: path.join(PATHS.OUT, relativePath)
    };
};
