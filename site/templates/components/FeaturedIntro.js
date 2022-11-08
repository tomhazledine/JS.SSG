import { markdown } from "jsssg";

const FeaturedIntro = (page, collection) => {
    const featuredMarkup = collection
        .reverse()
        .map(
            article => `
            <article class="card post-snippet--featured">
                <a href=${article.url} rel="bookmark">${article.frontmatter.title}</a>
                <p>${article.frontmatter.excerpt}</p>
            </article>`
        )
        .join("");
    return `<div class="stack--small content-area">
    <h2>Where to start</h2>

    ${markdown(page.intro_posts)}

    <div class="stack--small">
        ${featuredMarkup}
    </div>
</div>`;
};

export default FeaturedIntro;
