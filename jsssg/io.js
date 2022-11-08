import fs from "fs";
import path from "path";
import { args } from "./index.js";
import { log } from "./console.js";

const isDir = targetPath => {
    try {
        return fs.lstatSync(targetPath).isDirectory();
    } catch (e) {
        return false;
    }
};

const getAllFilePaths = root => {
    if (isDir(root)) {
        if (args.verbose) log(`Reading ${root}`, "green");
        const files = fs.readdirSync(root);
        return files.map(file => getAllFilePaths(`${root}/${file}`));
    }
    return root;
};

const ensureDirectoryExistence = filePath => {
    const dirname = path.dirname(filePath);
    if (isDir(dirname)) {
        return true;
    }
    if (args.verbose) log(`Creating folder ${dirname}`, "green");
    fs.mkdirSync(dirname, { recursive: true });
    return true;
};

export const readFolder = startPath =>
    getAllFilePaths(startPath).flat(Infinity);

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
        fs.writeFileSync(filePath, data);
    }
};

export const readFile = path => {
    try {
        const data = fs.readFileSync(path, "utf8");
        return data;
    } catch (err) {
        console.error(err);
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
        url: relativePath.replace("/index.html", "/"),
        filePath: path.join(PATHS.OUT, relativePath)
    };
};
