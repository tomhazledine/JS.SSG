import Head from "../components/Head.jsx";
import SiteWideAlert from "../components/SiteWideAlert.jsx";
import HeaderAnimation from "../components/HeaderAnimation.jsx";
import Header from "../components/Header.js";
import TweetWidget from "../components/TweetWidget.jsx";
import Analytics from "../components/Analytics.js";

const Main = ({ page, site, children }) => {
    const scripts = page.scripts
        ? page.scripts
              .map(script => (
                  <script src={`/tomhazledine.${script}.js`}></script>
              ))
              .join("")
        : "";

    return (
        <html lang="en">
            <Head page={page} site={site} />
            <body className="body body--dark">
                <SiteWideAlert alert={site.alert} />
                <HeaderAnimation />
                <a className="skip-link screen-reader-text" href="#content">
                    Skip to content
                </a>
                <Header page={page} site={site} />
                {children}
                <footer>
                    <TweetWidget />
                    <script src="/tomhazledine.app.js"></script>
                    {scripts}
                    <Analytics />
                </footer>
            </body>
        </html>
    );
};

export default Main;
