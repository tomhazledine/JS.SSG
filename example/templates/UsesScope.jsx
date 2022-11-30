const UsesScope = ({ page, site }) => (
    <ul>
        <li>page.frontmatter.title: {page.frontmatter.title}</li>
        <li>page.url: {page.url}</li>
        <li>site.title: {site.title}</li>
        <li>site.url: {site.url}</li>
    </ul>
);

export default UsesScope;
