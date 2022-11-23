import path from "path";
import moment from "moment";

import { log } from "./console.js";
import defaultSitemapTemplate from "./defaults/Sitemap.jsx";
import { renderTemplate } from "./handle-markdown.js";
import { args } from "./index.js";
import { saveFile } from "./io.js";

export const dateSitemap = date =>
    moment(date, "YYYY-MM-DD").format("YYYY-MM-DD");

export const buildSitemapPage = ({ templates, site, outPath }) => {
    const template = templates.Sitemap || {
        type: "jsx",
        component: defaultSitemapTemplate
    };

    const body = renderTemplate({
        template,
        site
    });

    const feedPath = path.resolve(outPath, "sitemap.xml");
    if (args.verbose) log(`Writing sitemap to ${feedPath}`, "green");
    saveFile(feedPath, `<?xml version="1.0" encoding="UTF-8"?>\n` + body);
};
