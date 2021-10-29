import React, { useState } from "react"
// import PropTypes from "prop-types"

import "./deck-info.scss"

const DeckInfo = ({ deck, games }) => {
  const gamesPlayed = games
    .filter(game => game.deck_id === deck.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const wins = gamesPlayed.filter(game => game.result === 'win');
  const losses = gamesPlayed.filter(game => game.result === 'loss');
  const ratio = Number(wins.length / losses.length).toPrecision(2);

  const getStreakCount = (iterator = 0) => {
    if (gamesPlayed[iterator + 1]) {
      if (gamesPlayed[iterator].result === gamesPlayed[iterator + 1].result) {
        iterator++;
        getStreakCount(iterator);
      }
    }
    return iterator === 0 ? null : iterator + 1;
  }

  const getStreak = () => {
    let streak = null;
    if (gamesPlayed[0].result === gamesPlayed[1].result) {
      switch(gamesPlayed[0].result) {
        case 'win':
          streak = 'winning';
          break;
        case 'loss':
          streak = 'losing'
          break;
        default:
          break;
      }
    }
    return (
      <>
      {streak &&
        <span className={`streak streak--${streak}`}>
          {getStreakCount()} game {streak} streak
        </span>
      }
      </>
    )
  }

  const isRetired = () => (
    deck.status === 'retired'
  );
  const getLatestGame = () => (
    gamesPlayed.length > 0
      ? gamesPlayed[0].date
      : 'never played'
  )

  const renderDatum = (number, label, dataStyle = {}) => (
    <><span className="data" style={dataStyle}>{number}</span> <span className="label">{label}</span></>
  );

  const classes = [
    'deck',
    isRetired() ? 'deck--retired' : '',
  ];

  return (
    <article className={classes.join(' ').trim()}>
      <div className="deck__inner">
        <h3 className="deck__commander">
          {deck.commander}
          <span role="presentation">
            {Object.keys(deck.colors).map((color) => {
              if (deck.colors[color]) {
                return (
                  <svg height=".6em" width=".6em" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle
                      cx="50"
                      cy="50"
                      r="48"
                      fill={`var(--mtg-${color})`}
                      stroke-width="4px"
                      stroke="var(--text-color)"
                    />
                  </svg>
                )
              }
              return null
            })}
          </span>
        </h3>
        <div className="deck__metadata">
          <div className="deck__latest-game">
            Last played: {getLatestGame()}
          </div>
          <div className="deck__streak">
            {getStreak()}
          </div>
        </div>
        <div className="deck__games">
          <div className="deck__wins">
            {renderDatum(wins.length, 'wins')}
          </div>
          <div className="deck__losses">
            {renderDatum(losses.length, 'losses')}
          </div>
          <div className="deck__played">
            {renderDatum(gamesPlayed.length, 'games played')}
          </div>
          <div className="deck__ratio">
            {renderDatum(ratio, "win/loss ratio", {animationDelay: `-${ratio}s` })}
          </div>
        </div>
      </div>
      {deck.status !== 'active' &&
        <div className="deck__status">{deck.status}</div>
      }
    </article>
  )
}

export const DeckInfos = ({ decks, games }) => {
  const [ hideRetired, setHideRetired] = useState(true)

  const classes = [
    'decks',
    hideRetired ? 'hide-retired' : ''
  ];

  return (
    <div className={classes.join(' ').trim()}>
      <h2>Decks</h2>
      <div className="decks__filters">
        <input
          type="checkbox"
          name="hide-retired"
          id="hide-retired"
          onChange={() => setHideRetired(!hideRetired)}
        />
        <label htmlFor="hide-retired">Show Retired Decks</label>
      </div>
      <div className="decks__items">
        {decks.map(deck => (
          <DeckInfo deck={deck} games={games} />
        ))}
      </div>
    </div>
  )
}

export default DeckInfo
