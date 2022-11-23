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
        <body>
            <div className="container">{children}</div>
        </body>
    </html>
);

export default Wrapper;
