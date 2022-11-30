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
        <li
            key={`menu_${page.url}`}
            className={`menu-item ${page.current ? "menu-item__current" : ""}`}
        >
            {page.current && (
                <span className="menu-item__indicator">{">"}</span>
            )}
            <a href={page.url}>{page.title}</a>
        </li>
    ));
    return (
        <nav className="menu">
            <ul>{itemsMarkup}</ul>
        </nav>
    );
};

export default Menu;
