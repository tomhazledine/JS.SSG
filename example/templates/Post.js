const Post = ({ content, page = {}, site = {} }) => {
    return `<!doctype html>
<html lang="en">
    <body>
        <h1>${page.title}</h1>
        <h2>(Using the "Post" layout)</h2>
        ${content}
    </body>
</html>`;
};

export default Post;
