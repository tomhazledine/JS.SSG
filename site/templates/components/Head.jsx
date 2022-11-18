const Head = ({ page = {}, site = {} }) => {
    const title = page.title && page.title != "Home" ? page.title : site.title;
    const description = page.excerpt ? page.excerpt : site.summary;

    const card = {
        type:
            page.title != "Home" || page.image
                ? "summary_large_image"
                : "summary",
        title,
        image: page.image
            ? `${site.url}/images${page.image}`
            : page.title && page.title != "Home"
            ? `${site.url}/images/pages_stack_bg.jpg`
            : `${site.url}/images/home_graph.png`
    };

    return (
        <head>
            <meta charset="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
            {page.naked && (
                <link
                    href="/tomhazledine.naked.css"
                    rel="stylesheet"
                    dataNaked="1"
                />
            )}
            {!page.naked && (
                <link href="/tomhazledine.app.css" rel="stylesheet" />
            )}
            {page.custom_stylesheet && (
                <link href={page.custom_stylesheet} rel="stylesheet" />
            )}
            <link rel="profile" href="//gmpg.org/xfn/11" />
            <title>{title}</title>
            <link rel="canonical" href={site.url + page.url} />
            <link rel="shortcut icon" href="/images/favicon.png" />
            <link rel="shortcut icon" href="/images/favicon.ico" />
            <meta name="twitter:card" content={card.type} />
            <meta name="twitter:creator" content={site.authorTwitterUrl} />
            <meta name="twitter:image" content={card.image} />
            <meta property="og:url" content={site.url + page.url} />
            <meta property="og:title" content={card.title} />
            <meta property="og:image" content={card.image} />
            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
            {page.custom_css && (
                <style type="text/css">{page.custom_css}</style>
            )}
        </head>
    );
};
export default Head;
