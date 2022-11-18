const Wrapper = ({ page = {}, site = {}, children }) => (
    <html lang="en">
        <head>
            <meta charSet="UTF-8" />
            <title>{site.title}</title>
        </head>
        <body>{children}</body>
    </html>
);

export default Wrapper;
