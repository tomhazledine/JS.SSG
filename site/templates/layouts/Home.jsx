import { markdown } from "jsssg";

import Main from "./Main.js";
import HomeGraph from "../components/HomeGraph.js";
import FeaturedIntro from "../components/FeaturedIntro.js";
import FeaturedPopular from "../components/FeaturedPopular.js";
import NewsletterSignup from "../components/NewsletterSignup.js";

const Home = ({ content, page = {}, site = {} }) => {
    return (
        <Main page={page} site={site}>
            <div className="wrapper--main content-area" id="primary">
                <main id="main" className="site-main stack--large" role="main">
                    <HomeGraph />
                    <div className="stack--small">
                        <header className="entry-header">
                            <h1 className="entry-title">{page.heading}</h1>
                        </header>
                        <div
                            id="content"
                            className="stack entry-content selectable-area"
                            dangerouslySetInnerHTML={{
                                __html: markdown(page.intro)
                            }}
                        />
                    </div>
                    <hr />
                    <FeaturedIntro
                        page={page}
                        collection={site.collections.pages.tags.intro}
                    />
                    <FeaturedPopular
                        page={page}
                        collection={site.collections.pages.tags.popular}
                    />
                    <hr />
                    <div
                        className="stack entry-content selectable-area"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                    <hr />
                    <NewsletterSignup
                        newsletterTitle={site.newsletterTitle}
                        newsletterIntro={site.newsletterIntro}
                        message={page.signup_message}
                    />
                </main>
            </div>
        </Main>
    );
};

export default Home;
