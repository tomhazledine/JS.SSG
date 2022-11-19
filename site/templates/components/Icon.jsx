import Code from "./icons/Code.js";
import PodcastsForNerds from "./icons/PodcastsForNerds.js";
import Audio from "./icons/Audio.js";
import Data from "./icons/Data.js";
import Envelope from "./icons/Envelope.js";
import Pages from "./icons/Pages.js";

const Icon = ({ slug, className = "" }) => {
    switch (slug) {
        case "code":
            return <Code />;
        case "pfn":
            return <PodcastsForNerds />;
        case "audio":
            return <Audio />;
        case "data":
            return <Data />;
        case "envelope":
            return <Envelope className={className} />;
        default:
            return <Pages />;
    }
};

export default Icon;
