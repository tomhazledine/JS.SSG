export const isObject = item => {
    return item && typeof item === "object" && !Array.isArray(item);
};

export const mergeDeep = (target, ...sources) => {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
};

export const escapeHTML = string => {
    const lookup = {
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
        "<": "&lt;",
        ">": "&gt;"
    };
    return string.replace(/[&"'<>]/g, c => lookup[c]);
};

export const chunk = (content, limit) => {
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
