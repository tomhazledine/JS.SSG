import Wrapper from "./Wrapper.js";

export default ({ content, page = {}, site = {} }) => {
    return (
        <Wrapper page={page} site={site}>
            <h1>{page.title}</h1>
            <div
                className="stack"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </Wrapper>
    );
};
