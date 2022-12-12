const Header = ({ title }) => (
    <header>
        <h2 className="header__title">
            <a href="/">
                {title} <span className="header__title__suffix">Docs</span>
            </a>
        </h2>
    </header>
);

export default Header;
