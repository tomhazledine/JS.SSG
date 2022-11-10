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

const paginateCollection = (url, values, collections) =>
    values.reduce(
        (acc, value) => ({
            ...acc,
            [value]: getPagination(url, collections[value])
        }),
        {}
    );

export const generatePagination = (page, site) => {
    // No pagination for pages without a date
    if (!page.frontmatter || !page.frontmatter.date) return false;

    const collections = Object.keys(site.collections.keys);
    const collectionsToPaginate = collections
        .map(collection => {
            if (page.frontmatter[collection]) {
                return {
                    key: collection,
                    values: [page.frontmatter[collection]].flatMap(i => i)
                };
            }
            return false;
        })
        .filter(i => i);
    const collectionsPagination = collectionsToPaginate.reduce(
        (acc, collection) => ({
            ...acc,
            [collection.key]: paginateCollection(
                page.url,
                collection.values,
                site.collections.pages[collection.key]
            )
        }),
        {}
    );

    const all = getPagination(page.url, site.pages);
    return {
        all,
        ...collectionsPagination
    };
};
