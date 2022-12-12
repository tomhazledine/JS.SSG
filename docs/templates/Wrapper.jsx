import Header from "./Header.js";
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
        </head>
        <body className="outer">
            <aside className="sidebar stack">
                <Header title={site.title} />
                <Menu pages={site.allPages} current={page.url} />
            </aside>
            <main className="main">
                <div className="container stack">{children}</div>
            </main>
        </body>
    </html>
);

export default Wrapper;
