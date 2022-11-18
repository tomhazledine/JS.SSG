import { markdown } from "jsssg";

import Main from "./Main.jsx";
import Icon from "../components/Icon/index.jsx";
import Snippet from "../components/Snippet.jsx";
import NewsletterSnippet from "../components/NewsletterSnippet.jsx";

const Articles = ({ content, page = {}, site = {} }) => {
    const articles = site.collections.pages.tags.articles;

    const articlesMarkup = articles
        .map(article => {
            if (article.frontmatter.tags.includes("pfn")) {
                return NewsletterSnippet({ article });
            }
            return Snippet({ article });
        })
        .join("");

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
                        itemprop="image"
                        itemscope
                        itemtype="https://schema.org/ImageObject"
                    >
                        <Icon slug="pages" />
                        <img
                            style="display:none;"
                            className="hidden--visually"
                            src="/images/pages_large.png"
                            alt=""
                        />
                        <meta
                            itemprop="url"
                            content="/images/pages_large.png"
                        />
                        <meta itemprop="width" content="32" />
                        <meta itemprop="height" content="32" />
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
