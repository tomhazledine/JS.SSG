import Head from "../components/Head.js";
import SitewideAlert from "../components/SitewideAlert.js";
import HeaderAnimation from "../components/HeaderAnimation.js";
import Header from "../components/Header.js";
import TweetWidget from "../components/TweetWidget.js";
import Analytics from "../components/Analytics.js";

const Main = ({ content, page = {}, site = {} }) => {
    const scripts =
        page.scripts &&
        page.scripts
            .map(script => `<script src="/tomhazledine.${script}.js"></script>`)
            .join("");

    return `<!doctype html>
<html lang="en">
    ${Head({ page, site })}
    <body class="body body--dark">
        ${SitewideAlert(site.alert)}
        ${HeaderAnimation}
        <a class="skip-link screen-reader-text" href="#content">Skip to content</a>
        
        ${Header({ page, site })}
        
        ${content}

        <footer>
            ${TweetWidget}
            <script src="/tomhazledine.app.js"></script>
            ${scripts}
            ${Analytics}
        </footer>

    </body>
</html>`;
};

export default Main;
