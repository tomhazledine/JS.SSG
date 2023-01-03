import Header from "./Header.js";
import Footer from "./Footer.js";
import Menu from "./Menu.js";

const Wrapper = ({ page = {}, site = {}, children }) => (
    <html lang="en">
        <head>
            <meta charSet="UTF-8" />
            <title>{site.title}</title>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
            <link href="/app.css" rel="stylesheet" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin="true"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,100..900;1,100..900&display=swap"
                rel="stylesheet"
            />
            <link href="/hljs.github-dark-dimmed.css" rel="stylesheet" />
            <link rel="shortcut icon" href="/favicon.png" />
            <link rel="shortcut icon" href="/favicon.ico" />
        </head>
        <body className="outer">
            <aside className="sidebar">
                <a href="/" className="sidebar__home-link">
                    <span className="hidden--visually">{site.title}</span>
                </a>
                <input
                    className="sidebar__menu-checkbox"
                    type="checkbox"
                    id="show-menu"
                />
                <label className="sidebar__toggle" htmlFor="show-menu">
                    <span className="hidden--visually">Show Menu</span>
                </label>
                <label className="sidebar__mask" htmlFor="show-menu">
                    <span className="hidden--visually">Hide Menu</span>
                </label>
                <div className="sidebar__inner stack">
                    <Header title={site.title} />
                    <Menu pages={site.allPages} current={page.url} />
                    <label
                        className="sidebar__toggle--inner"
                        htmlFor="show-menu"
                    >
                        <span className="hidden--visually">Hide Menu</span>
                    </label>
                </div>
            </aside>
            <main className="main">
                <div className="container stack">{children}</div>
            </main>
            <Footer />
        </body>
    </html>
);

export default Wrapper;
