import { markdown } from "jsssg";

import Main from "./Main.js";
import AllCategories from "../components/AllCategories.js";
import Icon from "../components/Icon.js";
import Snippet from "../components/Snippet.js";
import NewsletterSnippet from "../components/NewsletterSnippet.js";

const Category = ({ content, page = {}, site = {} }) => {
    const articles = site.collections.pages.categories[page.category];

    const articlesMarkup = articles.map(article => {
        if (article.frontmatter.categories.includes("podcasts for nerds")) {
            return <NewsletterSnippet key={article.url} article={article} />;
        }
        return (
            <Snippet
                key={article.url}
                {...{ article, includeCategories: false }}
            />
        );
    });

    return (
        <Main {...{ page, site }}>
            <div
                id="primary"
                className="content-area wrapper--main pseudo-home"
            >
                <main id="main" className="site-main stack--large" role="main">
                    <div
                        itemProp="image"
                        itemScope
                        itemType="https://schema.org/ImageObject"
                    >
                        <Icon slug={page.category} />
                    </div>

                    <div className="stack">
                        <h1>{page.title}</h1>

                        <span
                            className="home-content"
                            dangerouslySetInnerHTML={{
                                __html: markdown(content)
                            }}
                        />

                        <div className="stack--none">{articlesMarkup}</div>

                        <a href="/archive" className="categories__all-link">
                            View all posts
                        </a>

                        <div className="block">
                            <h3>Other categories:</h3>

                            <div className="categories__links categories">
                                <AllCategories
                                    categories={
                                        site.collections.pages.categories
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </Main>
    );
};

export default Category;
