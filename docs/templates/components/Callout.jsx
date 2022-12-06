import { markdown } from "jsssg";

const Callout = ({ title, children }) => {
    return (
        <div className="callout">
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
