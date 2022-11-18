const Main = ({ content, page = {}, site = {} }) => {
    return `<!doctype html>
<html lang="en">
    <body>
        <h1>The default fallback template</h1>
        ${content}
    </body>
</html>`;
};

export default Main;
