const AllCategories = ({ categories }) =>
    Object.keys(categories).map(category => (
        <a href={`/archive/${category}`} className="categories__category">
            {category} ({categories[category].length})
        </a>
    ));

export default AllCategories;
