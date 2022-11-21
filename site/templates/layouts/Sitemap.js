import { date_sitemap } from "../../tools/date.js";

const Sitemap = ({ site }) => {
    const pages = site.pages
        .map(page => {
            return `<url>
        <loc>${site.url + page.url}</loc>
        <lastmod>${date_sitemap(page.frontmatter.date || new Date())}</lastmod>
      </url>`;
        })
        .join("");

    return `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages}
</urlset>`;
};

export default Sitemap;
