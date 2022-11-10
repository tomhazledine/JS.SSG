import { sortPages } from "./parse-site-data.js";

const getPagination = (url, collection) => {
    const allPages = collection
        .filter(page => page.frontmatter.date)
        .sort(sortPages);

    const allPageUrls = allPages.map(page => page.url);

    const position = allPageUrls.indexOf(url);
    const nextPosition = position - 1;
    const prevPosition = position + 1;
    const next = nextPosition < 0 ? false : allPages[nextPosition];
    const prev =
        prevPosition > allPages.length - 1 ? false : allPages[prevPosition];
    return {
        next,
        prev
    };
};

export const generatePagination = (page, site) => {
    // No pagination for pages without a date
    if (!page.frontmatter || !page.frontmatter.date) return false;

    const all = getPagination(page.url, site.pages);

    return {
        all
    };
};
