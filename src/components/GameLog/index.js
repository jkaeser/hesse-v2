import React, { useState, useRef } from "react"
import { v4 as uuidv4 } from "uuid"

import Datum from "components/Datum"
import Details from "components/Details"
import FilterRow from "components/FilterRow"

import formatDate from "utils/js/formatters/date"

import { Games } from "utils/js/game-utils"
import { Decks } from "utils/js/deck-utils"

import "./game-log.scss"

const GameLog = ({ games: allGames, decks: allDecks }) => {
  const container = useRef(null);
  let filteredGames = new Games(allGames.games);
  const opponentDecks = new Decks(allGames.opponentDecks, allGames.games);
  const playerDecks = new Decks(allDecks.decks.filter(deck =>
    deck.type === 'player'
  ), allGames.games);

  const DEFAULT_PAGE_INDEX = 0;
  const PAGE_LENGTH = 10;
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_INDEX);

  // Set player counts before filtering.
  const playerCounts = allGames.playerCounts;

  // Respect filter options.
  const [ filterCommander, setFilterCommander ] = useState('default');
  const [ filterPlayerCount, setFilterPlayerCount ] = useState('default');
  const [ filterOpponent, setFilterOpponent ] = useState('default');
  if (filterCommander !== 'default') {
    filteredGames.setGames(filteredGames.games.filter(game =>
      game.deck.id === filterCommander
    ));
  }
  if (filterPlayerCount !== 'default') {
    filteredGames.setGames(filteredGames.games.filter(game =>
      game.opponents.length + 1 === Number(filterPlayerCount)
    ));
  }
  if (filterOpponent !== 'default') {
    filteredGames.setGames(filteredGames.games.filter(game =>
      game.opponents.map(opponent => opponent.id).indexOf(filterOpponent) !== -1
    ));
  }

  // Paginate if necessary.
  let filteredGamesPaginated = [];
  const needsPagination = filteredGames.games.length > PAGE_LENGTH

  if (needsPagination) {
    const gamesCopy = [...filteredGames.games];
    let stop = false;

    while (!stop) {
      filteredGamesPaginated.push(gamesCopy.splice(0, PAGE_LENGTH));
      stop = gamesCopy.length <= 0;
    }
  }

  const handleFilterCommander = (target) => {
    setFilterCommander(target);
    setCurrentPage(DEFAULT_PAGE_INDEX);
  }

  const handleFilterPlayerCount = (target) => {
    setFilterPlayerCount(target);
    setCurrentPage(DEFAULT_PAGE_INDEX);
  }

  const handleFilterOpponent = (target) => {
    setFilterOpponent(target);
    setCurrentPage(DEFAULT_PAGE_INDEX);
  }

  const handlePagerClick = (index) => {
    setCurrentPage(index);
    window.scrollTo(0, window.scrollY + container.current.getBoundingClientRect().top);
  }

  const renderSummary = () => (
    <div>
      <h2>Games Played</h2>
      {filteredGames.games.length > 0 &&
        <div>{formatDate(filteredGames.games[filteredGames.games.length - 1].date)} to {formatDate(filteredGames.games[0].date)}</div>
      }
    </div>
  )

  const renderPage = (games, index) => (
    <tbody
      data-page-index={`${index}`}
      className={`${index === currentPage ? 'active' : 'inactive'}`}
    >
      {games.map(game => {
        const deck = playerDecks.decks.find(deck => deck.id === game.deck.id);

        return (
          <tr id={game.id} key={game.id}>
            <td className="date">{formatDate(game.date)}</td>
            <td className="commander">{deck.commander}</td>
            <td className="opponents">
              <ul>
                {game.opponents.map(opponent => (
                  <li key={`${opponent.commander}-${uuidv4()}`}>
                    {opponent.commander}
                  </li>
                ))}
              </ul>
            </td>
            <td className={`result ${game.result}`}>{game.result}</td>
            <td className="summary">{game.summary}</td>
          </tr>
        )
      })}
    </tbody>
  )

  const renderPager = () => (
    <div className="game-log__pagination">
      <button type="button" aria-label="Previous page" onClick={() => handlePagerClick(Math.max(currentPage - 1, DEFAULT_PAGE_INDEX))}>
        {`< Previous`}
      </button>
      {filteredGamesPaginated.length > 10 &&
        <div className="game-log__pagination-page-identifier">
          Page {currentPage + 1} of {filteredGamesPaginated.length}
        </div>
      }
      {filteredGamesPaginated.length <= 10 &&
        <ol className="game-log__pagination-list">
          {filteredGamesPaginated.map((games, index) => (
            <li className={`game-log__pagination-list-item ${index === currentPage ? 'active' : ''}`}>
              <button type="button" aria-label={`Go to page ${index + 1}`} onClick={() => handlePagerClick(index)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ol>
      }
      <button type="button" aria-label="Next page" onClick={() => handlePagerClick(Math.min(currentPage + 1, filteredGamesPaginated.length - 1))}>
        {`Next >`}
      </button>
    </div>
  )

  return (
    <Details className="game-log" summary={renderSummary()}>
      <div className="game-log__content" ref={container}>
        <FilterRow className="game-log__filters">
          <div className="game-log__filter-item">
            <select onChange={(e) => handleFilterCommander(e.target.value)}>
              <option value="default">- Filter by Commander -</option>
              {playerDecks.decks.map(deck => (
                <option id={deck.id} value={deck.id} key={deck.id}>
                  {deck.commander}
                </option>
              ))}
            </select>
          </div>
          <div className="game-log__filter-item">
            <select onChange={(e) => handleFilterPlayerCount(e.target.value)}>
              <option value="default">- Filter by Player Count -</option>
              {playerCounts
                .map(count => (
                <option value={count} key={`playersfilter-${count}`}>
                  {count}
                </option>
              ))}
            </select>
          </div>
          <div className="game-log__filter-item">
            <select onChange={(e) => handleFilterOpponent(e.target.value)}>
              <option value="default">- Filter by Opponent -</option>
              {opponentDecks.decks.map(opponent => (
                <option id={opponent.id} value={opponent.id} key={opponent.id}>
                  {opponent.commander}
                </option>
              ))}
            </select>
          </div>
        </FilterRow>
        <div className="game-log__data-rollup">
          <Datum number={filteredGames.games.length} label="total games" />
          <Datum number={filteredGames.wins.length} label="total wins" />
          <Datum number={filteredGames.losses.length} label="total losses" />
          <Datum number={filteredGames.winLossRatio} label="win/loss ratio" />
        </div>
        {needsPagination && renderPager()}
        <div className="game-log__table-wrapper">
          <table>
            <thead>
              <tr>
                <th className="date">Date</th>
                <th className="commander">Commander</th>
                <th className="player-count">Opponents</th>
                <th className="result">Result</th>
                <th className="summary">Summary</th>
              </tr>
            </thead>
            {needsPagination
              ? filteredGamesPaginated.map(renderPage)
              : renderPage(filteredGames.games, DEFAULT_PAGE_INDEX)
            }
          </table>
        </div>
        {needsPagination && renderPager()}
      </div>
    </Details>
  )
}

export default GameLog
