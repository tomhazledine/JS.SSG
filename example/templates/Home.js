const Home = ({ content, page = {}, site = {} }) => {
    return `<!doctype html>
<html lang="en">
    <body>
        <h1>The home layout</h1>
        ${content}
        <ul>
            ${site.posts
                .map(
                    post =>
                        `<li><a href="${post.url}">${post.frontmatter.title}</a></li>`
                )
                .join("")}
        </ul>
    </body>
</html>`;
};

export default Home;
