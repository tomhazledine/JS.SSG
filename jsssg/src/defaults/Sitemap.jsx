import { dateSitemap } from "../sitemap.js";

const Sitemap = ({ site }) => {
    const pages = site.allPages.map(page => {
        if (page.frontmatter.excludeFromCollections) return;
        return (
            <url key={site.url + page.url}>
                <loc>{site.url + page.url}</loc>
                <lastmod>
                    {dateSitemap(page.frontmatter.date || new Date())}
                </lastmod>
            </url>
        );
    });

    return (
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            {pages}
        </urlset>
    );
};

export default Sitemap;
