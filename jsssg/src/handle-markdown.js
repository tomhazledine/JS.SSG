import { renderToStaticMarkup } from "react-dom/server";
import MDX from "@mdx-js/runtime";
import remarkDeflist from "remark-deflist";
import rehypeSlug from "rehype-slug";

import { args } from "./index.js";
import { log } from "./console.js";
import { saveFile } from "./io.js";
import { render } from "./markdown.js";
import { generatePagination } from "./pagination.js";
import defaultTemplate from "./defaults/Main.js";

export const renderTemplate = ({ template, ...props }) => {
    if (template.type === "js") {
        return template.component(props);
    }

    if (template.type === "jsx") {
        try {
            const Template = template.component;
            const markup = renderToStaticMarkup(<Template {...props} />);
            return markup;
        } catch (err) {
            if (args.verbose)
                log([`Problem rendering template`, template], "red");
            console.error(err);
        }
    }
    return "<span>template not found</span>";
};

export const renderMdx = (body, templates, scope = {}) => {
    const components = Object.keys(templates)
        .filter(key => templates[key].type === "jsx")
        .reduce(
            (acc, key) => ({ ...acc, [key]: templates[key].component }),
            {}
        );
    return renderToStaticMarkup(
        <MDX
            components={components}
            scope={scope}
            remarkPlugins={[remarkDeflist]}
            rehypePlugins={[rehypeSlug]}
        >
            {body}
        </MDX>
    );
};

export const handleMarkdown = async ({ file, templates, site }) => {
    const scope = {
        page: file,
        site
    };
    const markdownContents =
        file.type === "mdx"
            ? renderMdx(file.markdown, templates, scope)
            : render(file.markdown);
    const fallbackTemplate = "Main";
    const layout = file.frontmatter.layout
        ? file.frontmatter.layout
        : fallbackTemplate;

    const template =
        typeof templates[layout] !== "undefined"
            ? templates[layout]
            : typeof templates[fallbackTemplate] !== "undefined"
            ? templates[fallbackTemplate]
            : { type: "js", component: defaultTemplate };

    const pagination = await generatePagination(file, site);
    const body = renderTemplate({
        template,
        content: markdownContents,
        page: { ...file.frontmatter, url: file.url, pagination },
        site
    });
    if (args.verbose) log(`Writing ${file.filePath}`, "green");
    saveFile(file.filePath, body);
};
