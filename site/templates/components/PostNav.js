const PostNav = pagination => {
    const next = pagination.next
        ? ` <div class="postNavigation postNavigation--newer">
                <p>Newer post:</p>
                <a href="${pagination.next.url}" rel="bookmark">${pagination.next.frontmatter.title}</a>
            </div>`
        : `<div class="postNavigation postNavigation--placeholder"></div>`;
    const prev = pagination.prev
        ? ` <div class="postNavigation postNavigation--newer">
                <p>Newer post:</p>
                <a href="${pagination.prev.url}" rel="bookmark">${pagination.prev.frontmatter.title}</a>
            </div>`
        : `<div class="postNavigation postNavigation--placeholder"></div>`;

    return `
<div class="clearfix singleNavigation">
    ${next}
    ${prev}
</div>`;
};

export default PostNav;
