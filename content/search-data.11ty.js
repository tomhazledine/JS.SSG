const chunk = (content, limit) => {
    const words = content
        .replace(/<\/?[^>]+>/gi, "")
        .replace(/\n/gi, " ")
        .split(" ");

    const lines = words.reduce((lines, word) => {
        if (lines.length <= 0) return [word];

        const [lastLine] = lines.slice(-1);
        const newLine = lastLine + " " + word;
        if (newLine.length <= limit) {
            const oldLines = lines.slice(0, -1);
            return [...oldLines, newLine];
        }
        return [...lines, word];
    }, []);

    return lines;
};

class GenerateSearchData {
    data() {
        return {
            permalink: "/search-data.json",
            eleventyExcludeFromCollections: true
        };
    }

    render(data) {
        const items = data.collections.all
            .filter(item => !item.eleventyExcludeFromCollections)
            .map(item => {
                const content = item.templateContent;

                const contentArray = chunk(content, 64);

                return {
                    title: item.data.title,
                    excerpt: item.data.excerpt,
                    url: item.url,
                    content: contentArray
                };
            });
        return JSON.stringify(items);
    }
}

module.exports = GenerateSearchData;
