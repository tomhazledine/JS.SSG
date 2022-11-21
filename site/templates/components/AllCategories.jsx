const AllCategories = ({ categories }) =>
    Object.keys(categories).map(category => (
        <a
            href={`/archive/${category}`}
            key={`cat-link-${category}`}
            className="categories__category"
        >
            {category} ({categories[category].length})
        </a>
    ));

export default AllCategories;
