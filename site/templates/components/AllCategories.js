const AllCategories = categories =>
    Object.keys(categories)
        .map(
            category =>
                `<a href="/archive/${category}" class="categories__category">${category} (${categories[category].length})</a>`
        )
        .join("");

export default AllCategories;
