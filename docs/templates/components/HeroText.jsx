import { markdown } from "jsssg";

import { slugify } from "../utils/helpers.js";

const HeroText = ({ text }) => {
    return (
        <div
            className="hero-text"
            id={slugify(text)}
            dangerouslySetInnerHTML={{ __html: markdown(text) }}
        />
    );
};

export default HeroText;
