import { markdown } from "jsssg";

import Main from "./Main.js";
import Icon from "../components/Icon.js";
import TweetForm from "../components/TweetForm.js";
import NewsletterSignup from "../components/NewsletterSignup.js";
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
                itemProp="mainEntity"
                itemType="http://schema.org/BlogPosting"
            >
                <div
                    className="entry-content stack--large"
                    itemProp="articleBody mainEntityOfPage"
                >
                    <header className="entry-header stack--large">
                        <div
                            itemProp="image"
                            itemScope
                            itemType="https://schema.org/ImageObject"
                        >
                            <Icon slug={iconSlug} />
                        </div>

                        <div className="stack--small">
                            <h1
                                className={`entry-title ${standaloneTitle} ${hiddenTitle}`}
                                itemProp="name headline"
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
                                    dateTime={datefull(page.date)}
                                    itemProp="datePublished"
                                >
                                    {date(page.date)}
                                </time>
                                <span
                                    style={{ display: "none" }}
                                    className="hidden--visually"
                                >
                                    Modified on{" "}
                                    <time
                                        dateTime={datefull(page.date)}
                                        itemProp="dateModified"
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
                                    itemProp="author"
                                    itemScope=""
                                    itemType="http://schema.org/Person"
                                >
                                    <span itemProp="name">{site.author}</span>
                                </span>
                                <span
                                    className="hidden--visually"
                                    itemProp="publisher"
                                    itemScope=""
                                    itemType="http://schema.org/Organization"
                                >
                                    <meta
                                        itemProp="name"
                                        content={site.author}
                                    />
                                    <meta itemProp="url" content={site.url} />
                                    <div
                                        itemProp="logo"
                                        itemScope
                                        itemType="https://schema.org/ImageObject"
                                    >
                                        <img
                                            style={{ display: "none" }}
                                            src="/images/pages.png"
                                            alt=""
                                        />
                                        <meta
                                            itemProp="url"
                                            content="/images/pages.png"
                                        />
                                        <meta itemProp="width" content="32" />
                                        <meta itemProp="height" content="32" />
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
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                    {!page.hide_twitter && (
                        <>
                            <hr />
                            <TweetForm url={site.url + page.url} />
                        </>
                    )}
                    {!page.hide_footer_signup && !page.hide_twitter && <hr />}
                    {!page.hide_footer_signup && (
                        <NewsletterSignup
                            newsletterTitle={site.newsletterTitle}
                            newsletterIntro={site.newsletterIntro}
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
