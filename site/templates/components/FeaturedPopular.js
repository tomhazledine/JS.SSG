import { markdown } from "jsssg";

const FeaturedPopular = (page, collection) => {
    const featuredMarkup = collection
        .reverse()
        .map(
            article => `
            <li>
                <article class="card post-snippet--featured">
                    <a href=${article.url} rel="bookmark">${article.frontmatter.title}</a>
                    <p>${article.frontmatter.excerpt}</p>
                </article>
            </li>`
        )
        .join("");
    return `<div class="stack--small content-area">
    <h2>Popular posts</h2>

    ${markdown(page.popular_posts)}

    <ol class="stack">
        ${featuredMarkup}
    </ol>
</div>`;
};

export default FeaturedPopular;
