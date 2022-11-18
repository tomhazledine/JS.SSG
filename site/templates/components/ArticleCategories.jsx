const ArticleCategories = ({ categories }) =>
    categories.map((category, i) => (
        <span className="categories__category-wrapper">
            {i === 0 && "("}
            <a href={`/archive/${category}`} className="categories__category">
                {category}
            </a>
            {i < categories.length - 1 && ","}
            {i === categories.length - 1 && ")"}
        </span>
    ));

export default ArticleCategories;
