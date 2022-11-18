import { markdown } from "jsssg";

import Main from "./Main.jsx";
import AllCategories from "../components/AllCategories.js";
import Snippet from "../components/Snippet.js";
import NewsletterSnippet from "../components/NewsletterSnippet.js";

const Category = ({ content, page = {}, site = {} }) => {
    const articles = site.collections.pages.categories[page.category];

    const articlesMarkup = articles
        .map(article => {
            if (article.frontmatter.categories.includes("podcasts for nerds")) {
                return NewsletterSnippet({ article });
            }
            return Snippet({ article, includeCategories: false });
        })
        .join("");

    const body = `
    <div id="primary" class="content-area wrapper--main pseudo-home">
        <main id="main" class="site-main stack--large" role="main">
            <div itemprop="image" itemscope itemtype="https://schema.org/ImageObject">
                ${"" /*icons(iconSlug)*/}
            </div>

            <div class="stack">

                <h1>${page.title}</h1>

                <span class="home-content">${markdown(content)}</span>
                
                <div class="stack--none">${articlesMarkup}</div>

                <a href="/archive" class="categories__all-link">View all posts</a>

                <div class="block">
                    <h3>Other categories:</h3>

                    <div class="categories__links categories">
                        ${AllCategories(site.collections.pages.categories)}
                    </div>
                </div>
            </div>
        </main>
    </div>`;

    return Main({ content: body, page, site });
};

export default Category;
