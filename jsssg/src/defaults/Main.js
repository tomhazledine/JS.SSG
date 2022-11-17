const Main = ({ content, page = {}, site = {} }) => {
    return `<!doctype html>
<html lang="en">
    <body>
        ${content}
    </body>
</html>`;
};

export default Main;
