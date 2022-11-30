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
        </head>
        <body className="outer">
            <aside className="sidebar">
                <Header title={site.title} />
                <Menu pages={site.allPages} current={page.url} />
            </aside>
            <main className="main">
                <div className="container">{children}</div>
            </main>
        </body>
    </html>
);

export default Wrapper;
