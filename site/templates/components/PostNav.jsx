const PostNav = ({ pagination }) => {
    const next = pagination.next ? (
        <div className="postNavigation postNavigation--newer">
            <p>Newer post:</p>
            <a href={pagination.next.url} rel="bookmark">
                {pagination.next.frontmatter.title}
            </a>
        </div>
    ) : (
        <div className="postNavigation postNavigation--placeholder" />
    );
    const prev = pagination.prev ? (
        <div className="postNavigation postNavigation--newer">
            <p>Newer post:</p>
            <a href={pagination.prev.url} rel="bookmark">
                {pagination.prev.frontmatter.title}
            </a>
        </div>
    ) : (
        <div className="postNavigation postNavigation--placeholder" />
    );

    return (
        <div className="clearfix singleNavigation">
            {next}
            {prev}
        </div>
    );
};

export default PostNav;
