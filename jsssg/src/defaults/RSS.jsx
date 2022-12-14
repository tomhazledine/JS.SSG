import moment from "moment";
import { render } from "../markdown.js";
import { renderMdx } from "../handle-markdown.js";

const formatDate = date => moment(date, "YYYY-MM-DD").utc().format();
const convertHtmlToAbsoluteUrls = (content, url) =>
    content.replace(/href="\//gi, `href="${url}/`);
const sortByDate = (a, b) =>
    parseInt(b.frontmatter.date.replace(/-/gi, ""), 10) -
    parseInt(a.frontmatter.date.replace(/-/gi, ""), 10);

const RSS = ({ site }) => {
    const posts = site.posts
        // Only include pages with an explicit `date`
        .filter(page => page.frontmatter.date)
        // Ignore empty pages
        .filter(page => page.markdown !== "")
        // Ignore explicitly ignored pages
        .filter(page => !page.frontmatter.excludeFromCollections)
        .sort(sortByDate);

    const newestDate = posts.map(page => page.frontmatter.date)[0];
    const updatedDate = formatDate(newestDate);

    const postsMarkup = posts.map(page => {
        const scope = {
            page,
            site
        };
        const parsedContent =
            page.type === "mdx"
                ? renderMdx(page.markdown, site.templates, scope)
                : render(page.markdown);
        const content = convertHtmlToAbsoluteUrls(parsedContent, site.url);

        const pageUrl = new URL(page.url, site.url).href;
        const updatedDate = page.frontmatter.date
            ? formatDate(page.frontmatter.date)
            : moment().utc().format();

        return (
            <entry key={pageUrl}>
                <title>{page.frontmatter.title}</title>
                <link href={pageUrl} />
                <updated>{updatedDate}</updated>
                <id>{pageUrl}</id>
                <content
                    type="html"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </entry>
        );
    });

    return (
        <feed xmlns="http://www.w3.org/2005/Atom">
            <title>{site.title}</title>
            <subtitle>{site.summary}</subtitle>
            <link href={new URL("/feed.xml", site.url).href} rel="self" />
            <link href={site.url} />
            <updated>{updatedDate}</updated>
            <id>{site.url}/</id>
            <author>
                <name>{site.author}</name>
                <email>{site.authorEmail}</email>
            </author>
            {postsMarkup}
        </feed>
    );
};

export default RSS;
