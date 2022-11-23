import moment from "moment";
import path from "path";
import { render as markdown } from "../markdown.js";
import { escapeHTML } from "../utils.js";

const formatDate = date => moment(date, "YYYY-MM-DD").utc().format();
const convertHtmlToAbsoluteUrls = (content, url) =>
    content.replace(/href="\//gi, `href="${url}/`);
const sortByDate = (a, b) =>
    parseInt(b.frontmatter.date.replace(/-/gi, ""), 10) -
    parseInt(a.frontmatter.date.replace(/-/gi, ""), 10);

const RSS = ({ site }) => {
    const newestDate = site.posts
        .map(page => page.frontmatter.date)
        .filter(date => date)
        .sort(sortByDate)[0];
    const updatedDate = formatDate(newestDate);

    const posts = site.posts
        // Only include pages with an explicit `date`
        .filter(page => page.frontmatter.date)
        // Ignore empty pages
        .filter(page => page.markdown !== "")
        // Ignore explicitly ignored pages
        .filter(page => !page.frontmatter.excludeFromCollections)
        .sort(sortByDate)
        .map(page => {
            const parsedContent = markdown(page.markdown);
            const content = convertHtmlToAbsoluteUrls(parsedContent, site.url);

            const pageUrl = path.join(site.url, page.url);
            const updatedDate = page.frontmatter.date
                ? formatDate(page.frontmatter.date)
                : moment().utc().format();

            return (
                <entry key={pageUrl}>
                    <title>{page.frontmatter.title}</title>
                    <link href={pageUrl} />
                    <updated>{updatedDate}</updated>
                    <id>{pageUrl}</id>
                    <content type="html">{escapeHTML(content)}</content>
                </entry>
            );
        });
    return (
        <feed xmlns="http://www.w3.org/2005/Atom">
            <title>{site.title}</title>
            <subtitle>{site.summary}</subtitle>
            <link href={path.join(site.url, "/feed.xml")} rel="self" />
            <link href={site.url} />
            <updated>{updatedDate}</updated>
            <id>{site.url}/</id>
            <author>
                <name>{site.author}</name>
                <email>{site.authorEmail}</email>
            </author>
            {posts}
        </feed>
    );
};

export default RSS;
