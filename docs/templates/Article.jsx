import Wrapper from "./Wrapper.js";
import Header from "./Header.js";

const Article = ({ content, page = {}, site = {} }) => (
    <Wrapper page={page} site={site}>
        <Header title={page.title} />
        <div dangerouslySetInnerHTML={{ __html: content }} />
    </Wrapper>
);

export default Article;
