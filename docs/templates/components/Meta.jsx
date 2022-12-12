const Meta = ({ site }) => {
    return (
        <ul className="meta cluster cluster--no-gutter">
            <li className="meta__version">Version: {site.latest.version}</li>
            <li className="meta__release-date">
                Released: {site.latest.released}
            </li>
            <li className="meta__link">
                <a href={site.latest.github}>GitHub</a>
            </li>
        </ul>
    );
};

export default Meta;
