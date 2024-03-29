import path from "path";
import { copyFile, readFolder } from "./io.js";
import { parseSiteData } from "./parse-site-data.js";
import { handleFileBuild, processFile } from "./process-file.js";
import { buildRssPage } from "./rss.js";
import { compileSass } from "./sass.js";
import { buildSearchData } from "./search.js";
import { buildSitemapPage } from "./sitemap.js";
import { getTemplates } from "./templates.js";

export const build = async ({ PATHS, config, args }) => {
    // cleanup({ args, PATHS, config });

    if (args.verbose) console.log("Getting all content file paths...");
    const allFiles = readFolder(PATHS.IN, PATHS.IGNORE);
    if (args.verbose) console.log(`found ${allFiles.length} files`);

    if (args.verbose) console.log("Parsing frontmatter...");
    const unfilteredFileData = await Promise.all(
        allFiles.map(async filePath => await processFile(filePath, PATHS))
    );
    const fileData = unfilteredFileData.filter(
        file => file.type !== "not a file"
    );

    if (args.verbose) console.log("Loading templates...");
    const templates = await getTemplates(PATHS.TEMPLATES);

    if (args.verbose) console.log("Processing pages...");
    const site = { ...parseSiteData(config, fileData), templates };

    fileData.forEach(file =>
        handleFileBuild({
            file,
            PATHS,
            templates,
            site
        })
    );

    if (config.rss) {
        buildRssPage({ templates, site, outPath: PATHS.OUT });
    }

    if (config.sitemap) {
        buildSitemapPage({ templates, site, outPath: PATHS.OUT });
    }

    if (config.search) {
        buildSearchData({
            fields: config.searchFields,
            templates,
            site,
            outPath: PATHS.OUT
        });
    }

    if (args.verbose) console.log("Getting all public file paths...");
    const publicFiles = readFolder(PATHS.PUBLIC);
    if (args.verbose) console.log(`found ${publicFiles.length} files`);
    publicFiles.forEach(filePath =>
        copyFile(filePath, filePath.replace(PATHS.PUBLIC, PATHS.OUT))
    );

    if (config.styles) {
        const allStyleFiles = readFolder(PATHS.STYLES);
        allStyleFiles
            .filter(fullpath => !path.basename(fullpath).startsWith("_"))
            .forEach(stylePath =>
                compileSass(stylePath, PATHS, config.appName)
            );
    }

    console.log(`Site generated at "/${config.out}"`);
};
