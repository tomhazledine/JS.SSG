const Home = ({ content, page = {}, site = {} }) => {
    return `<!doctype html>
<html lang="en">
    <body>
        <h1>The home layout</h1>
        ${content}
    </body>
</html>`;
};

export default Home;
