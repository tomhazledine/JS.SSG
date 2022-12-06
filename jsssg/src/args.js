import { mergeDeep } from "./utils.js";

const defaultArgs = {
    serve: false,
    watch: false,
    verbose: false,
    port: "8080",
    images: false
};

export const parseArgs = rawArgs => {
    const [a, b, ...relevant] = rawArgs;
    const args = relevant
        .map(arg => {
            const [key, value] = arg.split("=");
            return { [key.replace(/-/g, "")]: value || true };
        })
        .reduce((args, arg) => ({ ...args, ...arg }), {});
    return mergeDeep(defaultArgs, args);
};
