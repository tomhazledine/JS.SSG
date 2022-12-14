const Header = ({ title }) => (
    <header>
        <h2 className="header__title">
            <a href="/">
                <span className="header__title--gradient">{title}</span>{" "}
                <span className="header__title__suffix">Docs</span>
            </a>
        </h2>
    </header>
);

export default Header;
