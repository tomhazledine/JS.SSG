import Main from "./Main.jsx";

import HomeGraph from "../components/HomeGraph.jsx";
import FeaturedIntro from "../components/FeaturedIntro.jsx";
import FeaturedPopular from "../components/FeaturedPopular.jsx";
import NewsletterSignup from "../components/NewsletterSignup.js";

const Home = ({ content, page = {}, site = {} }) => {
    return (
        <Main page={page} site={site}>
            <div className="wrapper--main content-area" id="primary">
                <main id="main" className="site-main stack--large" role="main">
                    <HomeGraph />
                    <header className="entry-header">
                        <h1 className="entry-title">{page.heading}</h1>
                    </header>
                    <div
                        id="content"
                        className="stack entry-content selectable-area"
                    >
                        {page.intro}
                    </div>
                    <hr />$
                    <FeaturedIntro
                        page={page}
                        collection={site.collections.pages.tags.intro}
                    />
                    <FeaturedPopular
                        page={page}
                        collection={site.collections.pages.tags.popular}
                    />
                    <hr />
                    <div className="stack entry-content selectable-area">
                        {content}
                    </div>
                    <hr />$
                    <NewsletterSignup
                        {...{ site, message: page.signup_message }}
                    />
                </main>
            </div>
        </Main>
    );
};

export default Home;
