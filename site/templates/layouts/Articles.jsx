import { markdown } from "jsssg";

import Main from "./Main.js";
import Icon from "../components/Icon.js";
import Snippet from "../components/Snippet.js";
import NewsletterSnippet from "../components/NewsletterSnippet.js";

const Articles = ({ content, page = {}, site = {} }) => {
    const articles = site.collections.pages.tags.articles;

    const articlesMarkup = articles.map(article => {
        if (article.frontmatter.tags.includes("pfn")) {
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
                <main
                    id="main"
                    className="site-main has-sidenotes stack--large"
                    role="main"
                >
                    <div
                        itemProp="image"
                        itemScope
                        itemType="https://schema.org/ImageObject"
                    >
                        <Icon slug="pages" />
                        <img
                            style={{ display: "none" }}
                            className="hidden--visually"
                            src="/images/pages_large.png"
                            alt=""
                        />
                        <meta
                            itemProp="url"
                            content="/images/pages_large.png"
                        />
                        <meta itemProp="width" content="32" />
                        <meta itemProp="height" content="32" />
                    </div>

                    <div className="clearfix homepage-sidenote-wrapper">
                        {articlesMarkup}
                        <hr className="homepage-sidenote-hr" />
                        <span
                            className="sidenote home-content"
                            dangerouslySetInnerHTML={{
                                __html: markdown(content)
                            }}
                        ></span>
                    </div>
                </main>
            </div>
        </Main>
    );
};

export default Articles;
