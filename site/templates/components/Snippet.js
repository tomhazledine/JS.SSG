import ArticleCategories from "./ArticleCategories.js";
import { date } from "../../tools/date.js";

const Snippet = ({ article, includeCategories = true }) => {
    const categoriesList = ArticleCategories({
        categories: article.frontmatter.categories
    });

    const categories = includeCategories
        ? `<span class="categories">${categoriesList}</span>`
        : "";

    return `
<article class="snippet">
    <code class="snippet__date">${date(article.frontmatter.date)}</code>
    <a class="snippet__link" href=${article.url} rel="bookmark">
        ${article.frontmatter.title}
    </a>
    ${categories}
</article>`;
};

export default Snippet;
