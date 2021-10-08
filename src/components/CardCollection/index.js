import React, {useState, useContext} from "react"
import PropTypes from "prop-types"
import { ModeContext } from "../Layout"

import ArtCode from "./ArtCode"

import "./card-collection.scss"

const CardCollection = ({title, dataCards, dataCollected}) => {
  const [ filtered, setFiltered ] = useState(dataCards.data);
  const [ hideCollected, setHideCollected ] = useState(false);
  const [ showArtIds, setShowArtIds ] = useState(false);

  const context = useContext(ModeContext);

  const collectionId = title.toLowerCase().replaceAll(' ', '-').trim();
  const totalCardCount = dataCards.data.length;
  const collectedCardCount = dataCollected.data.length;
  const collectedPercentage = Math.round((collectedCardCount / totalCardCount) * 100);
  const circumference = 125.66;

  const cardInCollection = (card) => {
    return dataCollected.data.find(collectedCard =>
      card.name === collectedCard.name &&
      card.illustration_id === collectedCard.illustration_id)
  };

  const handleDoubleSidedCard = (card) => {
    let output = card;
    if ([
      'transform',
      'modal_dfc',
      'double_faced_token',
      'double_sided'
    ].indexOf(card.layout) !== -1) {
      output = card.card_faces[0];
    };
    return output;
  }

  const toggleCollected = () => {
    if (!hideCollected) {
      setFiltered(
        dataCards.data.filter(
          card => !cardInCollection(handleDoubleSidedCard(card))
        )
      );
    }
    else {
      setFiltered(dataCards.data);
    }
    setHideCollected(!hideCollected);
  };

  return (
    <details className="card-collection">
      <summary>
        <svg
          aria-hidden="true"
          height="40"
          width="40"
          viewBox="0 0 100 100"
        >
          <circle r="48" cx="50" cy="50" fill="transparent" stroke={context.textColor} stroke-width="1" />
          <circle r="24" cx="50" cy="50" fill="transparent" stroke={context.textColor} stroke-width="50" stroke-dasharray={`${Math.round((collectedPercentage * circumference) / 100)} ${circumference}`} transform="rotate(-90) translate(-98)" />
        </svg>
        <div>
          <h2 className="card-collection__title">{title}</h2>
          <span className="card-collection__subtitle">
            {`${collectedCardCount}/${totalCardCount} collected`}
          </span>
        </div>
      </summary>
      <div className="card-collection__content">
        <form className="card-collection__filters">
          <div className="card-collection__filter">
            <input
              type="checkbox"
              id={`hide-collected--${collectionId}`}
              name={`hide-collected--${collectionId}`}
              value="hide-collected"
              onChange={() => toggleCollected()}
            />
            <label htmlFor={`hide-collected--${collectionId}`}>Hide Collected</label>
          </div>
          <div className="card-collection__filter">
            <input
              type="checkbox"
              id={`show-art-ids--${collectionId}`}
              name={`show-art-ids--${collectionId}`}
              value="show-art-ids"
              onChange={() => setShowArtIds(!showArtIds)}
            />
            <label htmlFor={`show-art-ids--${collectionId}`}>Show Art IDs</label>
          </div>
        </form>
        <div className="card-collection__count">
          Displaying {filtered.length} of {totalCardCount} cards
        </div>
        <ul className="card-collection__items">
          {filtered
            .filter(cardData => cardData.layout !== 'art_series')
            .map(cardData => {
              const card = handleDoubleSidedCard(cardData);
              const cardCollected = cardInCollection(card) ? true : false;
              const classes = [
                'card-collection__item',
                cardCollected ? 'card-collection__item--collected' : ''
              ];

              return (
                <li
                  id={`card-${cardData.id}`}
                  className={classes.join(' ').trim()}
                >
                  <a href={card.scryfall_uri} target="_blank" rel="noreferrer">
                    <span class="visually-hidden">{card.name}</span>
                    {cardCollected &&
                    <div className="collected-flag">
                      <span>Collected</span>
                    </div>
                    }
                    {card.image_status !== 'missing' &&
                    <img loading="lazy" src={card.image_uris.normal} alt="" />
                    }
                  </a>
                  {showArtIds &&
                  <ArtCode id={card.illustration_id} />
                  }
                </li>
              )
            })
          }
        </ul>
      </div>
    </details>
  )
}

CardCollection.propTypes = {
  title: PropTypes.string,
  dataCards: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
  }),
  dataCollected: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      illustration_id: PropTypes.string
    })),
  })
}

CardCollection.defaultProps = {
  title: '',
  dataCards: { data: [{}] },
  dataCollected: { data:
    [
      {
        name: '',
        illustration_id: ''
      }
    ]
  }
}

export default CardCollection
