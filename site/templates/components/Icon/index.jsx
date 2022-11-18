import Code from "./Code.jsx";
import PodcastsForNerds from "./PodcastsForNerds.jsx";
import Audio from "./Audio.jsx";
import Data from "./Data.jsx";
import Envelope from "./Envelope.jsx";
import Pages from "./Pages.jsx";

const Icons = ({ slug, className = "" }) => {
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

export default Icons;
