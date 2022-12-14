import Wrapper from "./Wrapper.js";

const Article = ({ content, page = {}, site = {} }) => (
    <Wrapper page={page} site={site}>
        <h1>{page.title}</h1>
        <h2>(Using the "Article" layout)</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
    </Wrapper>
);

export default Article;
