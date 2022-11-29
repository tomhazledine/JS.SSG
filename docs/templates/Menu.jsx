const Menu = ({ pages, current }) => {
    const items = pages
        .map(page => ({
            title: page.frontmatter.menuTitle || page.frontmatter.title,
            priority: page.frontmatter.menuPriority || 99,
            url: page.url,
            current: page.url === current
        }))
        .sort((a, b) => a.priority - b.priority);

    const itemsMarkup = items.map(page => (
        <li key={`menu_${page.url}`} className={page.current ? "current" : ""}>
            {page.current && <span>{">"}</span>}
            <a href={page.url}>{page.title}</a>
        </li>
    ));
    return (
        <nav>
            <ul>{itemsMarkup}</ul>
        </nav>
    );
};

export default Menu;
