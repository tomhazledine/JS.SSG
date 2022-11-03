import { config } from "../site/config.js";
import { mergeDeep } from "./utils.js";

const defaults = {
    in: "TEST_IN",
    out: "TEST_OUT",
    quiet: true
};

const options = mergeDeep(defaults, config);

export { options as config };
