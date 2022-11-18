import { markdown } from "jsssg";

const FeaturedIntro = ({ page, collection }) => {
    const featuredMarkup = collection.reverse().map(article => (
        <article className="card post-snippet--featured">
            <a href={article.url} rel="bookmark">
                {article.frontmatter.title}
            </a>
            <p>{article.frontmatter.excerpt}</p>
        </article>
    ));
    return (
        <div className="stack--small content-area">
            <h2>Where to start</h2>
            <div
                dangerouslySetInnerHTML={{ __html: markdown(page.intro_posts) }}
            />
            <div className="stack--small">{featuredMarkup}</div>
        </div>
    );
};

export default FeaturedIntro;
