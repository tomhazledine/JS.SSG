import Head from "../components/Head.js";
import SiteWideAlert from "../components/SiteWideAlert.js";
import HeaderAnimation from "../components/HeaderAnimation.js";
import Header from "../components/Header.js";
import TweetWidget from "../components/TweetWidget.js";
import Analytics from "../components/Analytics.js";

const Main = ({ page, site, children }) => {
    const hasScripts =
        typeof page.scripts !== "undefined" && page.scripts.length > 0;
    const scripts = hasScripts
        ? page.scripts.map(script => (
              <script
                  key={`script_${script}`}
                  src={`/tomhazledine.${script}.js`}
              ></script>
          ))
        : false;

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
                    {hasScripts && scripts}
                    <Analytics />
                </footer>
            </body>
        </html>
    );
};

export default Main;
