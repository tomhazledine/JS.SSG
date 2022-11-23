import path from "path";

import defaultRSSTemplate from "./defaults/RSS.jsx";
import { renderTemplate } from "./handle-markdown.js";
import { args } from "./index.js";
import { saveFile } from "./io.js";

export const buildRssPage = ({ templates, site, outPath }) => {
    const template = templates.RSS || {
        type: "jsx",
        component: defaultRSSTemplate
    };
    const body = renderTemplate({
        template,
        site
    });

    const feedPath = path.resolve(outPath, "feed.xml");
    if (args.verbose) log(`Writing ${feedPath}`, "green");
    saveFile(feedPath, `<?xml version="1.0" encoding="UTF-8"?>\n` + body);
};
