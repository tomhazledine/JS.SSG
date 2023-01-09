import { markdown } from "jsssg";

import { slugify } from "../utils/helpers.js";

export default ({ title, children }) => {
    return (
        <div
            className="callout stack--small"
            id={`note-${slugify(title || "anon")}`}
        >
            {title && (
                <h4 dangerouslySetInnerHTML={{ __html: markdown(title) }} />
            )}
            <div
                className="markdown-stuff"
                dangerouslySetInnerHTML={{ __html: markdown(children) }}
            />
        </div>
    );
};
