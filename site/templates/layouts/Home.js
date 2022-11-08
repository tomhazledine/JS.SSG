import Main from "./Main.js";

import HomeGraph from "../components/HomeGraph.js";
import FeaturedIntro from "../components/FeaturedIntro.js";
import FeaturedPopular from "../components/FeaturedPopular.js";
import NewsletterSignup from "../components/NewsletterSignup.js";

const Home = ({ content, page = {}, site = {} }) => {
    // console.log({ site.collections });
    const body = `
<div class="wrapper--main" id="primary" class="content-area">
    <main id="main" class="site-main stack--large" role="main">

        ${HomeGraph}

        <header class="entry-header">
            <h1 class="entry-title">${page.heading}</h1>
        </header>

        <div id="content" class="stack entry-content selectable-area">${
            page.intro
        }</div>

        <hr/>

        ${FeaturedIntro(page, site.collections.pages.tags.intro)}

        ${FeaturedPopular(page, site.collections.pages.tags.popular)}

        <hr/>

        <div class="stack entry-content selectable-area">${content}</div>

        <hr/>

        ${NewsletterSignup({ site, page })}

    </main>
</div>`;
    return Main({ content: body, page, site });
};

export default Home;
