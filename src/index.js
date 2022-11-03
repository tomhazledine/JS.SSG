import path from "path";
import { fileURLToPath } from "url";

import { config } from "./config.js";
import { copyFile, readFile, readFolder, saveFile } from "./io.js";
import { parseFrontmatter } from "./frontmatter.js";
import { markdown as md } from "./markdown.js";
import templates from "../site/templates/index.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const IN_DIRECTORY = path.resolve(__dirname, `../${config.in}/`);
const OUT_DIRECTORY = path.resolve(__dirname, `../${config.out}/`);

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
        const { frontmatter, markdown } = parseFrontmatter(fileContents);
        const markdownContents = md.render(markdown);
        const layout = frontmatter.layout || "Main";

        const body = templates[layout]({
            content: markdownContents,
            props: frontmatter
        });

        if (!config.quiet) console.log(`Writing ${updatePath}`);
        saveFile(updatePath, body);
    } else {
        if (!config.quiet) console.log(`Copying ${copyPath}`);
        copyFile(filePath, copyPath);
    }
};

console.log("Getting all file paths...");
const allFiles = readFolder(IN_DIRECTORY);
console.log(`found ${allFiles.length} files`);

allFiles.forEach(filePath => processFile(filePath));
console.log(`Site generated at "/${config.out}"`);
