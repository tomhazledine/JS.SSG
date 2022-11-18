import ArticleCategories from "./ArticleCategories.jsx";
import { date } from "../../tools/date.js";

const Snippet = ({ article, includeCategories = true }) => (
    <article className="snippet">
        <code className="snippet__date">{date(article.frontmatter.date)}</code>
        <a className="snippet__link" href={article.url} rel="bookmark">
            {article.frontmatter.title}
        </a>
        {includeCategories && (
            <span className="categories">
                <ArticleCategories
                    categories={article.frontmatter.categories}
                />
            </span>
        )}
    </article>
);

export default Snippet;
