import moment from "moment";
import path from "path";
import { render as markdown } from "../markdown.js";
import { escapeHTML } from "../utils.js";

const formatDate = date => moment(date, "YYYY-MM-DD").utc().format();
const convertHtmlToAbsoluteUrls = (content, url) =>
    content.replace(/href="\//gi, `href="${url}/`);

const RSS = ({ site }) => {
    const newestDate = site.pages
        .map(page => page.frontmatter.date)
        .filter(date => date)
        .sort(
            (a, b) =>
                parseInt(b.replace(/-/gi, ""), 10) -
                parseInt(a.replace(/-/gi, ""), 10)
        )[0];
    const updatedDate = formatDate(newestDate);

    const posts = site.pages.reverse().map(page => {
        // Don't include pages without any content
        if (page.markdown === "") return;

        // Ignore excluded pages
        if (page.frontmatter.excludeFromRss) return;

        const parsedContent = markdown(page.markdown);
        const content = convertHtmlToAbsoluteUrls(parsedContent, site.url);

        const pageUrl = path.join(site.url, page.url);
        const updatedDate = page.frontmatter.date
            ? moment(page.frontmatter.date, "YYYY-MM-DD").utc().format()
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
