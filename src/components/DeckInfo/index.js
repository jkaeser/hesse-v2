import React, { useState } from "react"

import Datum from "components/Datum"
import FilterRow from "components/FilterRow"

import formatDate from "utils/js/formatters/date"

import "./deck-info.scss"

const DeckInfo = ({ deck }) => {
  const {count: streakCount, type: streakType} = deck.streak;
  const streakTypeMap = {
    win: 'winning',
    loss: 'losing'
  };
  const latestGame = deck.latestGame ? formatDate(deck.latestGame.date) : null;

  const renderColorSvg = (color) => (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      key={`${color}`}
    >
      <circle
        cx="50"
        cy="50"
        r="48"
        fill={`var(--mtg-${color})`}
        strokeWidth="4px"
        stroke="var(--text-color)"
      />
    </svg>
  )

  const classes = [
    'deck',
    `deck--${deck.status}`,
  ];

  return (
    <article className={classes.join(' ').trim()}>
      <div className="deck__inner">
        <div className="deck__color-identity">
          <div className="visually-hidden">{deck.color_identity}</div>
          <div role="presentation">
            {deck.colors.map((color) => renderColorSvg(color))}
          </div>
        </div>
        <h3 className="deck__commander">
          {deck.commander}
        </h3>
        <div className="deck__metadata">
          {latestGame &&
            <div className="deck__latest-game">
              <svg viewBox="0 0 80 75" xmlns="http://www.w3.org/2000/svg"><g id="Layer_2"><g id="Layer_3"><path d="M53.4,10.4V4.7h-3v5.7h-8.5V4.7h-3v5.7h-9.1V4.7h-3v5.7H5.4v59.9h69.1V10.4H53.4z M26.8,13.4V19h3v-5.7H39V19h3v-5.7h8.5 V19h3v-5.7h18.1v44.2H8.4V13.4H26.8z M8.4,67.3v-6.7h63.1v6.7L8.4,67.3z"/><rect height="5.7" width="5.7" x="22.6" y="30"/><rect height="5.7" width="5.7" x="37.1" y="30"/><rect height="5.7" width="5.7" x="51.7" y="30"/><rect height="5.7" width="5.7" x="22.6" y="44.6"/><rect height="5.7" width="5.7" x="37.1" y="44.6"/><rect height="5.7" width="5.7" x="51.7" y="44.6"/></g></g></svg>
              <span className="deck__latest-game-label">
                Last played on {latestGame}
                </span>
            </div>
          }
          {streakType &&
            <div className="deck__streak">
              <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><polygon points="22.5,10 16.8,10 20.8,0.1 10.9,0.1 7.5,16.7 11.4,16.7   9.2,29.9 "/></svg>
              <span className="deck__streak-label">
                {streakCount} game {streakTypeMap[streakType]} streak
              </span>
            </div>
          }
          {deck.links.map(link => (
            <a
              className="deck__url"
              href={link.url}
              target="_blank"
              rel="noreferrer"
              key={link.url}
            >
              <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><g id="Layer_1"><polygon points="36,3 45.586,3 28.293,20.293 29.707,21.707 47,4.414 47,14 49,14 49,1 36,1  "/><polygon points="42,16 40,16 40,47 3,47 3,10 34,10 34,8 1,8 1,49 42,49  "/></g><g/></svg>
              {link.title}
            </a>
          ))}
        </div>
        <div className="deck__games">
          <div className="deck__wins">
            <Datum number={deck.wins.length} label='wins' />
          </div>
          <div className="deck__losses">
            <Datum number={deck.losses.length} label='losses' />
          </div>
          <div className="deck__played">
            <Datum number={deck.gamesPlayed} label='games played' />
          </div>
          <div className="deck__ratio">
            <Datum
              number={deck.winLossRatio}
              label='win/loss ratio'
              dataStyle={{ animationDelay: `-${deck.winLossRatio}s` }}
            />
          </div>
        </div>
      </div>
      {deck.status !== 'active' &&
        <div className="deck__status">{deck.status}</div>
      }
    </article>
  )
}

export const DeckInfos = ({ decks: allDecks }) => {
  const [ hideRetired, setHideRetired] = useState(true);
  const [ sorting, setSorting] = useState(null); // this is hacky

  const classes = [
    'decks',
    hideRetired ? 'hide-retired' : ''
  ];

  const handleSort = event => {
    switch (event.target.value) {
      case 'games-played':
        allDecks.sortByGamesPlayed();
        break;
      default:
        allDecks.sortByAlphabetical();
        break;
    }
    setSorting(event.target.value);
  }

  return (
    <div className={classes.join(' ').trim()}>
      <h2 className="decks__title">Decks</h2>
      <FilterRow className="decks__filters">
        <div className="decks__filter-item">
          <input
            type="checkbox"
            id="hide-retired"
            name="hide-retired"
            value="hide-retired"
            onChange={() => setHideRetired(!hideRetired)}
          />
          <label htmlFor="hide-retired">Show Retired Decks</label>
        </div>
        <div className="decks__filter-item">
          <label htmlFor="sort">Sort by:</label>
          <select
            type="checkbox"
            id="sort"
            name="sort"
            onChange={(event) => handleSort(event)}
          >
            <option value="alphabetical">Name</option>
            <option value="games-played">Games Played</option>
          </select>
        </div>
      </FilterRow>
      <div className="decks__items">
        {allDecks.decks.map(deck => {
          return (
            <DeckInfo
              deck={deck}
              key={deck.id}
            />
          )
        })}
      </div>
    </div>
  )
}

export default DeckInfo
