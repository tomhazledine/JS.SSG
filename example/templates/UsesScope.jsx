const UsesScope = ({ page, site }) => (
    <ul>
        <li><code>page.frontmatter.title</code>: {page.frontmatter.title}</li>
        <li><code>page.url</code>: {page.url}</li>
        <li><code>site.title</code>: {site.title}</li>
        <li><code>site.url</code>: {site.url}</li>
    </ul>
);

export default UsesScope;
