import { markdown } from "jsssg";

import Main from "./Main.jsx";
import Icon from "../components/Icon/index.jsx";
import TweetForm from "../components/TweetForm.jsx";
import NewsletterSignup from "../components/NewsletterSignup.jsx";
import PostNav from "../components/PostNav.js";
import { date, datefull } from "../../tools/date.js";
import { readTime } from "../../tools/readtime.js";

const Article = ({ content, page = {}, site = {} }) => {
    const iconSlug = page.custom_icon
        ? page.custom_icon
        : page.podcasts_for_nerds_logo
        ? page.podcasts_for_nerds_logo
        : page.categories && page.categories.length
        ? page.categories[0]
        : "pages";

    const standaloneTitle = page.standalone ? "entry-title--standalone" : "";
    const hiddenTitle = page.hide_title ? "hidden--visually" : "";

    const subtitle = page.subtitle ? (
        <h2 className="entry-subtitle entry-subtitle--standalone">
            {page.subtitle}
        </h2>
    ) : page.excerpt ? (
        <h2 className="entry-subtitle">{page.excerpt}</h2>
    ) : (
        ""
    );

    return (
        <Main {...{ page, site }}>
            <article
                className="wrapper--main"
                itemprop="mainEntity"
                itemtype="http://schema.org/BlogPosting"
            >
                <div
                    className="entry-content stack--large"
                    itemprop="articleBody mainEntityOfPage"
                >
                    <header className="entry-header stack--large">
                        <div
                            itemprop="image"
                            itemscope
                            itemtype="https://schema.org/ImageObject"
                        >
                            <Icon slug={iconSlug} />
                        </div>

                        <div className="stack--small">
                            <h1
                                className={`entry-title ${standaloneTitle} ${hiddenTitle}`}
                                itemprop="name headline"
                            >
                                {page.title}
                            </h1>
                            {subtitle}

                            <div
                                className={`entry-meta ${
                                    page.hide_meta || page.standalone
                                        ? "hidden--visually"
                                        : ""
                                }`}
                            >
                                <span className="hidden--visually">
                                    Published on{" "}
                                </span>
                                <time
                                    datetime={datefull(page.date)}
                                    itemprop="datePublished"
                                >
                                    {date(page.date)}
                                </time>
                                <span
                                    style="display:none;"
                                    className="hidden--visually"
                                >
                                    Modified on{" "}
                                    <time
                                        datetime={datefull(page.date)}
                                        itemprop="dateModified"
                                    >
                                        {date(page.date)}
                                    </time>
                                </span>
                                <span> – </span>
                                <span className="readingTime">
                                    Read time:
                                    {page.read_time_override
                                        ? page.read_time_override
                                        : readTime(content)}
                                </span>
                                <span
                                    className="hidden--visually"
                                    itemprop="author"
                                    itemscope=""
                                    itemtype="http://schema.org/Person"
                                >
                                    <span itemprop="name">{site.author}</span>
                                </span>
                                <span
                                    className="hidden--visually"
                                    itemprop="publisher"
                                    itemscope=""
                                    itemtype="http://schema.org/Organization"
                                >
                                    <meta
                                        itemprop="name"
                                        content={site.author}
                                    />
                                    <meta itemprop="url" content={site.url} />
                                    <div
                                        itemprop="logo"
                                        itemScope
                                        itemtype="https://schema.org/ImageObject"
                                    >
                                        <img
                                            style="display:none;"
                                            src="/images/pages.png"
                                            alt=""
                                        />
                                        <meta
                                            itemprop="url"
                                            content="/images/pages.png"
                                        />
                                        <meta itemprop="width" content="32" />
                                        <meta itemprop="height" content="32" />
                                    </div>
                                </span>
                            </div>
                        </div>
                    </header>
                    {page.intro_note && (
                        <div className="intro-note">
                            <span
                                className="intro-note-text"
                                dangerouslySetInnerHTML={{
                                    __html: markdown(page.intro_note)
                                }}
                            />
                        </div>
                    )}
                    <div
                        id="content"
                        className="content-area selectable-area first-selectable-area stack"
                    >
                        <div
                            dangerouslySetInnerHTML={{
                                __html: markdown(content)
                            }}
                        />
                    </div>
                    {!page.hide_twitter && (
                        <>
                            <hr />
                            <TweetForm url={site.url + page.url} />
                        </>
                    )}
                    {!page.hide_footer_signup && !page.hide_twitter && <hr />}
                    {!page.hide_footer_signup && (
                        <NewsletterSignup
                            site={site}
                            message={page.signup_message}
                        />
                    )}
                    {!page.standalone && (
                        <PostNav pagination={page.pagination.tags.articles} />
                    )}
                </div>
            </article>
        </Main>
    );
};

export default Article;
