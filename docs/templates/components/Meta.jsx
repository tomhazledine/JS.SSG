import { version } from "jsssg";

const Meta = ({ site }) => {
    return (
        <ul className="meta cluster cluster--no-gutter">
            <li className="meta__version">
                <span className="meta__key">Version:</span>{" "}
                <span className="meta__value">{version}</span>
            </li>
            <li className="meta__release-date">
                <span className="meta__key">Released:</span>{" "}
                <span className="meta__value">{site.latest.released}</span>
            </li>
            <li className="meta__link meta__value">
                {/* <a href={site.latest.github}>GitHub</a> */}
                <a href={site.latest.npm}>NPM</a>
            </li>
        </ul>
    );
};

export default Meta;
