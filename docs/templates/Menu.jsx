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

const buildMenu = (items, title = false) => {
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
        <>
            {title && <h4>{title}</h4>}
            <ul>{itemsMarkup}</ul>
        </>
    );
};

const Menu = ({ pages, current }) => {
    const gettingStartedItems = parseMenu(
        pages,
        page => page.frontmatter.menuGroup === "getting_started",
        current
    );

    const advancedItems = parseMenu(
        pages,
        page => page.frontmatter.menuGroup === "advanced",
        current
    );

    const otherItems = parseMenu(
        pages,
        page =>
            page.frontmatter.menuGroup !== "getting_started" &&
            page.frontmatter.menuGroup !== "advanced",
        current
    );

    const gettingStartedMarkup = buildMenu(
        gettingStartedItems,
        "Getting Started"
    );

    const advancedMarkup = buildMenu(advancedItems, "Advanced");

    const itemsMarkup = buildMenu(otherItems);

    return (
        <nav className="menu" role="navigation">
            {itemsMarkup}
            {gettingStartedMarkup}
            {advancedMarkup}
        </nav>
    );
};

export default Menu;
