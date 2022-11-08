import path from "path";

import { args } from "./index.js";
import { log } from "./console.js";
import { saveFile } from "./io.js";
import { render } from "./markdown.js";

const buildUpdatePath = (filePath, permalink, PATHS) => {
    if (!permalink || typeof permalink === "undefined") {
        const destinationPath = filePath.replace(PATHS.IN, PATHS.OUT);
        return path.join(
            path.dirname(destinationPath),
            path.basename(destinationPath, path.extname(destinationPath)) +
                ".html"
        );
    }

    if (path.extname(permalink)) {
        return path.join(PATHS.OUT, permalink);
    }

    return path.join(PATHS.OUT, permalink, "/index.html");
};

export const handleMarkdown = async ({ file, PATHS, templates, site }) => {
    const markdownContents = render(file.markdown);
    const fallbackTemplate = "main";
    const layout = file.frontmatter.layout.toLowerCase() || fallbackTemplate;
    const template =
        typeof templates[layout] !== "undefined"
            ? templates[layout]
            : templates[fallbackTemplate];
    const body = template({
        content: markdownContents,
        page: file.frontmatter,
        site
    });
    const updatePath = buildUpdatePath(
        file.path,
        file.frontmatter.permalink,
        PATHS
    );
    if (args.verbose) log(`Writing ${updatePath}`, "green");
    saveFile(updatePath, body);
};
