import Wrapper from "./Wrapper.js";
import Header from "./Header.js";
import Menu from "./Menu.js";

const Article = ({ content, page = {}, site = {} }) => (
    <Wrapper page={page} site={site}>
        <Menu pages={site.allPages} current={page.url} />
        <Header title={page.title} />
        <div dangerouslySetInnerHTML={{ __html: content }} />
    </Wrapper>
);

export default Article;
