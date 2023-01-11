import { markdown } from "jsssg";

import { slugify } from "../utils/helpers.js";

export default ({ title, message = false, children }) => {
    return (
        <div
            className="callout stack--small"
            id={`note-${slugify(title || "anon")}`}
        >
            {title && (
                <h4 dangerouslySetInnerHTML={{ __html: markdown(title) }} />
            )}
            {children && (
                <div
                    className="markdown-stuff"
                    dangerouslySetInnerHTML={{ __html: markdown(children) }}
                />
            )}
            {typeof message === "string" && (
                <div
                    className="markdown-stuff"
                    dangerouslySetInnerHTML={{ __html: markdown(message) }}
                />
            )}
        </div>
    );
};
