import { markdown } from "jsssg";

import { slugify } from "../utils/helpers.js";

const Callout = ({ title, children }) => {
    return (
        <div className="callout" id={`note-${slugify(title)}`}>
            <span className="callout__eyebrow">Note</span>
            {title && (
                <h3 dangerouslySetInnerHTML={{ __html: markdown(title) }} />
            )}
            <div
                className="markdown-stuff"
                dangerouslySetInnerHTML={{ __html: markdown(children) }}
            />
        </div>
    );
};

export default Callout;
