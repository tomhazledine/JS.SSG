const Header = ({ site, page }) => {
    return (
        <header id="masthead" className="site-header" role="banner">
            <div className="header-inner">
                <nav
                    id="site-navigation"
                    className="main-navigation"
                    role="navigation"
                >
                    <ul className="menu">
                        <li className="menu-item menu-item--title">
                            <h3 className="site-title">
                                <a href="/">{site.title}</a>
                            </h3>
                        </li>
                        <div className="menu__block">
                            <li
                                className={`menu-item cluster ${
                                    page.title === "Search"
                                        ? `current-menu-item`
                                        : ""
                                }`}
                            >
                                <form
                                    action="/search"
                                    className="integrated-search__form js__integrated-search__form"
                                >
                                    <button
                                        type="button"
                                        className="integrated-search__icon js__integrated-search__toggle"
                                    >
                                        <svg
                                            className="menu-item__icon"
                                            width="16px"
                                            height="16px"
                                            viewBox="0 0 178 178"
                                            version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                        >
                                            <path d="M74.5 0C115.645 0 149 33.355 149 74.5c0 15.751-4.888 30.361-13.23 42.395l42.23 42.23L159.126 178l-42.231-42.23C104.861 144.111 90.251 149 74.5 149 33.355 149 0 115.645 0 74.5S33.355 0 74.5 0Zm.5 20c-30.376 0-55 24.624-55 55s24.624 55 55 55 55-24.624 55-55-24.624-55-55-55Z" />
                                        </svg>
                                    </button>
                                    <div className="integrated-search__form-body js__integrated-search__form-body hidden">
                                        <label
                                            className="hidden--visually"
                                            className="menu-item__text"
                                        >
                                            Search
                                        </label>
                                        <input
                                            name="q"
                                            className="js__integrated-search__input"
                                            type="text"
                                            id="header-search"
                                            placeholder="Search"
                                        />
                                    </div>
                                </form>
                            </li>
                            <li
                                className={`menu-item ${
                                    page.title === "Home"
                                        ? `current-menu-item`
                                        : ``
                                }`}
                            >
                                <a href="/">About</a>
                            </li>
                            <li
                                className={`menu-item ${
                                    page.title === "Archive"
                                        ? `current-menu-item`
                                        : ``
                                }`}
                            >
                                <a href="/archive">Archive</a>
                            </li>
                            <li className="menu-item menu-item--has-icon">
                                <a
                                    className="header__feed-link"
                                    title="RSS feed"
                                    href="/feed.xml"
                                >
                                    <span className="menu-item__text">
                                        Feed
                                    </span>
                                    <svg
                                        className="menu-item__icon"
                                        width="16px"
                                        height="16px"
                                        viewBox="0 0 200 200"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                    >
                                        <path d="M25,0 C121.649831,0 200,78.3501688 200,175 C200,183.488783 199.395594,191.836399 198.227469,200.002162 L157.689416,200.001612 C159.206581,191.899503 160,183.542408 160,175 C160,100.441559 99.5584412,40 25,40 C16.4574314,40 8.10018278,40.7934489 -0.00206928878,42.31067 L-0.00216211842,1.77253074 C8.16360111,0.604405726 16.5112173,0 25,0 Z"></path>
                                        <path d="M25,76.5 C79.4000479,76.5 123.5,120.599952 123.5,175 C123.5,183.638526 122.387964,192.017322 120.299235,200.001046 L77.9036137,200.001325 C81.4925528,192.420384 83.5,183.944624 83.5,175 C83.5,142.691342 57.3086579,116.5 25,116.5 C16.0553756,116.5 7.57961559,118.507447 -0.00132463956,122.096386 L-0.000925358147,79.7007336 C7.98276176,77.6120249 16.3615172,76.5 25,76.5 Z"></path>
                                        <circle
                                            cx="25"
                                            cy="175"
                                            r="25"
                                        ></circle>
                                    </svg>
                                </a>
                            </li>
                            <li className="menu-item menu-item--has-icon">
                                <button
                                    className="js__dark-mode-toggle dark-mode-toggle dark-mode-toggle--off"
                                    type="button"
                                >
                                    <span className="dark-mode-toggle__icon"></span>
                                    <span className="dark-mode-toggle__text hidden--visually">
                                        dark mode
                                    </span>
                                </button>
                            </li>
                        </div>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
