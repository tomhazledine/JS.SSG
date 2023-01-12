const parseMenu = (pages, filter, current) =>
    pages
        .filter(filter)
        .map(page => ({
            title: page.frontmatter.menuTitle || page.frontmatter.title,
            priority: page.frontmatter.menuPriority || 99,
            url: page.url,
            current: page.url === current
        }))
        .sort((a, b) => a.priority - b.priority);

const MenuSection = ({ items, title = false, current }) => {
    const containsCurrent = items.map(item => item.url).includes(current);
    const currentClassName = containsCurrent ? "current" : "";
    const itemsMarkup = items.map(page => (
        <li
            key={`menu_${page.url}`}
            className={`menu-item ${page.current ? "menu-item__current" : ""}`}
        >
            {page.current && <span className="menu-item__indicator" />}
            <a href={page.url}>{page.title}</a>
        </li>
    ));
    return (
        <details className="menu-details" open={containsCurrent}>
            {title && (
                <summary className={`menu-details-summary ${currentClassName}`}>
                    {title}
                </summary>
            )}
            <ul>{itemsMarkup}</ul>
        </details>
    );
};

const Menu = ({ pages, sections, current }) => {
    const sectionMarkup = sections.map(section => {
        const items = parseMenu(
            pages,
            page => page.frontmatter.menuGroup === section.slug,
            current
        );
        return (
            <MenuSection
                key={`menu_section_${section.slug}`}
                items={items}
                title={section.label}
                current={current}
            />
        );
    });

    return (
        <nav className="menu stack--small" role="navigation">
            {sectionMarkup}
        </nav>
    );
};

export default Menu;
