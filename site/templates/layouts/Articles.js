import { markdown } from "jsssg";

import Main from "./Main.js";
import Icon from "../components/Icon/index.js";
import Snippet from "./../components/Snippet.js";
import NewsletterSnippet from "./../components/NewsletterSnippet.js";

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

    const body = `
<div id="primary" class="content-area wrapper--main pseudo-home">
    <main id="main" class="site-main has-sidenotes stack--large" role="main">
        <div
            itemprop="image"
            itemscope
            itemtype="https://schema.org/ImageObject"
        >
            ${Icon({ slug: "pages" })}
            <img style="display:none;" class="hidden--visually" src="/images/pages_large.png" alt=""/>
            <meta itemprop="url" content="/images/pages_large.png"/>
            <meta itemprop="width" content="32"/>
            <meta itemprop="height" content="32"/>
        </div>

        <div class="clearfix homepage-sidenote-wrapper">
            ${articlesMarkup}
            <hr class="homepage-sidenote-hr"/>
            <span class="sidenote home-content">${markdown(content)}</span>
        </div>
    </main>
</div>`;

    return Main({ content: body, page, site });
};

export default Articles;
