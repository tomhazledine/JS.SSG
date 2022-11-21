import { markdown } from "jsssg";

const FeaturedPopular = ({ page, collection }) => {
    const featuredMarkup = collection.reverse().map(article => (
        <li key={article.url}>
            <article className="card post-snippet--featured">
                <a href={article.url} rel="bookmark">
                    {article.frontmatter.title}
                </a>
                <p>{article.frontmatter.excerpt}</p>
            </article>
        </li>
    ));
    return (
        <div className="stack--small content-area">
            <h2>Popular posts</h2>
            <div
                dangerouslySetInnerHTML={{
                    __html: markdown(page.popular_posts)
                }}
            />
            <ol className="stack">{featuredMarkup}</ol>
        </div>
    );
};

export default FeaturedPopular;
