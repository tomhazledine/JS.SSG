import { markdown } from "jsssg";

const Card = ({ title, body, url = false }) => (
    <li className="card">
        {url && (
            <a href={url}>
                <h3>{title}</h3>
            </a>
        )}
        {!url && <h3>{title}</h3>}
        <div dangerouslySetInnerHTML={{ __html: markdown(body) }} />
    </li>
);

const Cards = ({ cards }) => {
    const cardMarkup = cards.map(card => (
        <Card key={`card_${card.title}`} {...card} />
    ));
    return <ul className="cards cluster">{cardMarkup}</ul>;
};

export default Cards;
