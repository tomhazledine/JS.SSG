const getCollectionKeys = (collection, pages) => [
    ...new Set(
        pages
            .flatMap(page => page.frontmatter[collection])
            .filter(collection => collection)
    )
];

const getCollectionsKeys = (collections, pages) => {
    const collectionKeys = collections.map(collection => ({
        [collection]: getCollectionKeys(collection, pages)
    }));
    const collectionsKeys = collectionKeys.reduce(
        (acc, col) => ({
            ...acc,
            ...col
        }),
        {}
    );
    return collectionsKeys;
};

const matchFrontmatterCollection = (page, key, slug) => {
    if (!page.frontmatter[key]) return false;

    if (Array.isArray(page.frontmatter[key])) {
        return page.frontmatter[key].includes(slug);
    }

    return page.frontmatter[key] == slug;
};

const sortPages = (a, b) =>
    parseInt(b.frontmatter.date.replace(/-/gi, ""), 10) -
    parseInt(a.frontmatter.date.replace(/-/gi, ""), 10);

export const parseSiteData = (config, pages) => {
    const collectionKeys = getCollectionsKeys(config.collections, pages);

    const collections = [...Object.keys(collectionKeys)].reduce((acc, key) => {
        return {
            ...acc,
            [key]: collectionKeys[key].reduce(
                (acc, slug) => ({
                    ...acc,
                    [slug]: pages
                        .filter(page =>
                            matchFrontmatterCollection(page, key, slug)
                        )
                        .sort(sortPages)
                }),
                {}
            )
        };
    }, {});

    return {
        ...config.data,
        pages,
        collections: { keys: collectionKeys, pages: collections }
    };
};
