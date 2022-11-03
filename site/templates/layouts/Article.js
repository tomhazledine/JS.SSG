import Main from "./Main.js";

const Article = ({ content, page = {}, site = {} }) => {
    const body = `
    <div class="wrapper">
        ${content}
    </div>
    `;
    return Main({ content: body, page, site });
};

export default Article;
