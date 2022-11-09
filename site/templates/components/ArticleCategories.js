const ArticleCategories = ({ categories }) =>
    categories
        .map(
            (category, i) => `
            <span class="categories__category-wrapper">${
                i === 0 ? "(" : ""
            }<a href="/archive/${category}" class="categories__category">${category}</a>${
                i < categories.length - 1 ? "," : ""
            }${i === categories.length - 1 ? ")" : ""}</span>`
        )
        .join("");

export default ArticleCategories;
