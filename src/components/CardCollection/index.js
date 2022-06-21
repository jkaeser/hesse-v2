import React, {useState} from "react"
import PropTypes from "prop-types"

import ArtCode from "./ArtCode"
import Details from "components/Details"
import FilterRow from "components/FilterRow"

import "./card-collection.scss"

const CardCollection = ({title, dataCards, dataCollected}) => {
  const [ filtered, setFiltered ] = useState(dataCards.data);
  const [ hideCollected, setHideCollected ] = useState(false);
  const [ showArtIds, setShowArtIds ] = useState(false);

  const collectionId = title.toLowerCase().replaceAll(' ', '-').trim();
  const totalCardCount = dataCards.data.length;
  const collectedCardCount = dataCollected.data.length;

  const renderSummary = () => (
    <>
    { renderPieChart() }
    <div>
      <h2 className="card-collection__title">{title}</h2>
      <span className="card-collection__subtitle">
        {`${collectedCardCount}/${totalCardCount} collected`}
      </span>
    </div>
    </>
  )

  const renderPieChart = () => {
    const chart = {
      dimensionX: 50,
      dimensionY: 50,
      radius: 48,
      percentageFull: Math.round((collectedCardCount / totalCardCount) * 100),
    }
    chart.circumference = 2 * Math.PI * (chart.radius / 2);

    return (
      <svg
          aria-hidden="true"
          height="40"
          width="40"
          viewBox="0 0 100 100"
        >
          <circle
            r={chart.radius}
            cx={chart.dimensionX}
            cy={chart.dimensionY}
            fill="var(--translucent)"
            stroke="var(--text-color)"
            strokeWidth="1"
          />
          <circle
            r={chart.radius / 2}
            cx={chart.dimensionX}
            cy={chart.dimensionY}
            fill="transparent"
            stroke="var(--text-color)"
            strokeWidth="50"
            strokeDasharray={`${Math.round((chart.percentageFull * chart.circumference) / 100)} ${chart.circumference}`}
            transform="rotate(-90) translate(-98)"
          />
        </svg>
    )
  }

  const cardInCollection = (card) => {
    return dataCollected.data.find(collectedCard =>
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
    <Details className="card-collection" summary={renderSummary()}>
      <div className="card-collection__content">
        <FilterRow className="card-collection__filters">
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
        </FilterRow>
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
                  key={`card-${cardData.id}`}
                  id={`card-${cardData.id}`}
                  className={classes.join(' ').trim()}
                >
                  <a href={card.scryfall_uri} target="_blank" rel="noreferrer">
                    <span className="visually-hidden">{card.name}</span>
                    {cardCollected &&
                    <div className="collected-flag">
                      <span>Collected</span>
                    </div>
                    }
                    {card.image_status !== 'missing' &&
                    <img
                      loading="lazy"
                      srcset={`
                        ${card.image_uris.normal} 2x,
                        ${card.image_uris.small}
                      `}
                      alt=""
                    />
                    }
                  </a>
                  {showArtIds &&
                  <ArtCode
                    cardName={card.name}
                    id={card.illustration_id}
                  />
                  }
                </li>
              )
            })
          }
        </ul>
      </div>
    </Details>
  )
}

CardCollection.propTypes = {
  title: PropTypes.string,
  dataCards: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
  }),
  dataCollected: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
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
        illustration_id: ''
      }
    ]
  }
}

export default CardCollection
