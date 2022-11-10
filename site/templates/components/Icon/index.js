import code from "./icon-code.js";
import pfn from "./icon-podcasts-for-nerds.js";
import audio from "./icon-audio.js";
import data from "./icon-data.js";
import envelope from "./icon-envelope.js";
import pages from "./icon-pages.js";

const Icons = ({ slug, className = "" }) => {
    switch (slug) {
        case "code":
            return code;
        case "pfn":
            return pfn;
        case "audio":
            return audio;
        case "data":
            return data;
        case "envelope":
            return envelope(className);
        default:
            return pages;
    }
};

export default Icons;
