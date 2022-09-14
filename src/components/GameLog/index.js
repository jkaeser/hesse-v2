import React, { useState, useRef } from "react"

import Datum from "components/Datum"
import Details from "components/Details"
import FilterRow from "components/FilterRow"

import formatDate from "utils/js/formatters/date"
import { Games } from "utils/js/game-utils"

import "./game-log.scss"

const GameLog = ({ games: allGames, decks: allDecks }) => {
  const container = useRef(null);
  let filteredGames = new Games(allGames.games)
  const DEFAULT_FILTER_VALUE = 'default';
  const DEFAULT_PAGE_INDEX = 0;
  const PAGE_LENGTH = 10;
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_INDEX);

  // Respect filter options.
  const [ filterDeckActive, setFilterDeckActive ] = useState(DEFAULT_FILTER_VALUE);
  const [ filterDeckOpponent, setFilterDeckOpponent ] = useState(DEFAULT_FILTER_VALUE);
  const [ filterPlayerCount, setFilterPlayerCount ] = useState(DEFAULT_FILTER_VALUE);
  const [ filterWinner, setFilterWinner ] = useState(DEFAULT_FILTER_VALUE);

  const filterByDeck = deckId => {
    filteredGames.setGames(filteredGames.games.filter(game =>
      game.decks.map(deck => deck.id).includes(deckId)
    ));
  }
  [filterDeckActive, filterDeckOpponent].forEach(filter => {
    if (filter !== DEFAULT_FILTER_VALUE) filterByDeck(filter);
  });

  if (filterPlayerCount !== DEFAULT_FILTER_VALUE) {
    filteredGames.setGames(filteredGames.games.filter(game =>
      game.decks.length === Number(filterPlayerCount)
    ));
  }
  if (filterWinner !== DEFAULT_FILTER_VALUE) {
    filteredGames.setGames(filteredGames.games.filter(game =>
      game.winner.id === filterWinner
    ));
  }

  // Handle filter updates.
  const handleFilterDeckActive = (target) => {
    setFilterDeckActive(target);
    if (target === DEFAULT_FILTER_VALUE) {
      setFilterDeckOpponent(DEFAULT_FILTER_VALUE);
    }
    setCurrentPage(DEFAULT_PAGE_INDEX);
  }
  const handleFilterDeckOpponent = (target) => {
    setFilterDeckOpponent(target);
    setCurrentPage(DEFAULT_PAGE_INDEX);
  }

  const handleFilterPlayerCount = (target) => {
    setFilterPlayerCount(target);
    setCurrentPage(DEFAULT_PAGE_INDEX);
  }

  const handleFilterWinner = (target) => {
    setFilterWinner(target);
    setCurrentPage(DEFAULT_PAGE_INDEX);
  }

  const handleFilterReset = () => {
    setFilterDeckActive(DEFAULT_FILTER_VALUE);
    setFilterDeckOpponent(DEFAULT_FILTER_VALUE);
    setFilterPlayerCount(DEFAULT_FILTER_VALUE);
    setFilterWinner(DEFAULT_FILTER_VALUE);
    setCurrentPage(DEFAULT_PAGE_INDEX);
  }

  let deckOptions = new Games(allGames.games).decks;
  let opponentOptions = new Games(allGames.games).decks;
  let playerCounts = allGames.playerCounts;
  let winnerOptions = new Games(allGames.games).winners;

  // Assemble data based on active deck.
  let deckActive = null;
  if (filterDeckActive !== DEFAULT_FILTER_VALUE) {
    deckActive = allDecks.decks.find(deck => deck.id === filterDeckActive);
    deckActive.Games.setGames(filteredGames.games);

    // Tailor opponent options.
    opponentOptions = allGames.games
      .filter(game => {
        const deckIds = game.decks.map(deck => deck.id);
        return deckIds.includes(deckActive.id);
      })
      .reduce((opponents, game) => {
        const opponentIds = game.decks.filter(deck => deck.id !== deckActive.id);
        opponentIds.forEach(opponent => {
          if (!opponents.find(inList => opponent.id === inList.id)) {
            opponents.push(opponent);
          }
        })
        return opponents;
      }, []);

    // Tailor player counts.
    playerCounts = new Games(allGames.games
      .filter(game => {
        const deckIds = game.decks.map(deck => deck.id);
        return deckIds.includes(deckActive.id);
      })
    ).playerCounts;

    // Tailor winner options.
    winnerOptions = new Games(allGames.games
      .filter(game => {
        const deckIds = game.decks.map(deck => deck.id);
        return deckIds.includes(deckActive.id);
      })
    ).winners;
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

  const handlePagerClick = (index) => {
    if (currentPage !== index) {
      setCurrentPage(index);
      window.scrollTo(0, window.scrollY + container.current.getBoundingClientRect().top);
    }
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
      key={`tbody-${index}`}
    >
      {games.map(game => (
        <tr id={game.id} key={game.id}>
          <td className="date">{formatDate(game.date)}</td>
          <td className="players">
            <ul>
              {game.decks.map(deck => (
                <li key={`${deck.commander}-${deck.id}`}>
                  {deck.commander}
                </li>
              ))}
            </ul>
          </td>
          <td className="winner">{game.winner.commander}</td>
          <td className="summary">{game.summary}</td>
        </tr>
      ))}
    </tbody>
  )

  const renderPageMobile = (games, index) => (
    <div
      data-page-index={`${index}`}
      className={`game-log__mobile-page ${index === currentPage ? 'active' : 'inactive'}`}
      key={`mobile-page-${index}`}
    >
      {games.map(game => (
        <div className="mobile-game" key={`mobile-game-${game.id}`}>
          <div className="mobile-game__datum">
            <span className="mobile-game__datum-label">
              Date:
            </span>
            <span className="mobile-game__datum-value">
              {formatDate(game.date)}
            </span>
          </div>
          <div className="mobile-game__datum">
            <span className="mobile-game__datum-label">Decks:</span>
            <div className="mobile-game__datum-value">
              <ul>
                {game.decks.map(deck => (
                  <li key={`${deck.commander}-${deck.id}`}>
                    {deck.commander}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mobile-game__datum">
            <span className="mobile-game__datum-label">
              Winner:
            </span>
            <span className="mobile-game__datum-value">
              {game.winner.commander}
            </span>
          </div>
          <div className="mobile-game__datum">
            <span className="mobile-game__datum-label">
              Summary:
            </span>
            <span className="mobile-game__datum-value">
              {game.summary}
            </span>
          </div>
        </div>
      ))}
    </div>
  )

  const renderPager = () => (
    <div className="game-log__pagination">
      <button type="button" aria-label="Previous page" onClick={() => handlePagerClick(Math.max(currentPage - 1, DEFAULT_PAGE_INDEX))}>
        {`< Previous`}
      </button>

      <select
        className="game-log__pagination-mobile-pager"
        onChange={(event) => handlePagerClick(Number(event.target.value))}
        value={currentPage}
      >
        {filteredGamesPaginated.map((games, index) => (
          <option value={index} key={`pagination-mobile-page-${index}`}>
            {index + 1}
          </option>
        ))}
      </select>

      {filteredGamesPaginated.length > 10 &&
        <div className="game-log__pagination-page-identifier">
          Page {currentPage + 1} of {filteredGamesPaginated.length}
        </div>
      }
      {filteredGamesPaginated.length <= 10 &&
        <ol className="game-log__pagination-list">
          {filteredGamesPaginated.map((games, index) => (
            <li className={`game-log__pagination-list-item ${index === currentPage ? 'active' : ''}`} key={`pagination-page-${index}`}>
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

  const renderTable = () => (
    <div className="game-log__table-wrapper">
      <table>
        <thead>
          <tr>
            <th className="date">Date</th>
            <th className="decks">Decks</th>
            <th className="winner">Winner</th>
            <th className="summary">Summary</th>
          </tr>
        </thead>
        {needsPagination
          ? filteredGamesPaginated.map(renderPage)
          : renderPage(filteredGames.games, DEFAULT_PAGE_INDEX)
        }
      </table>
    </div>
  )

  const renderTableMobile = () => (
    <div className="game-log__mobile">
      {needsPagination
        ? filteredGamesPaginated.map(renderPageMobile)
        : renderPageMobile(filteredGames.games, DEFAULT_PAGE_INDEX)
      }
    </div>
  )

  return (
    <Details className="game-log" summary={renderSummary()} open={true}>
      <div className="game-log__content" ref={container}>
        <FilterRow className="game-log__filters">

          <div className="game-log__filter-item">
            <select
              value={filterDeckActive}
              onChange={(e) => handleFilterDeckActive(e.target.value)}
            >
              <option value="default" key="deckfilter-default">
                - Select a deck -
              </option>
              {deckOptions.map(deck => (
                <option value={deck.id} key={`deckfilter-${deck.id}`}>
                  {`${deck.commander} (${deck.owner.nameFirst} ${deck.owner.nameLast})`}
                </option>
              ))}
            </select>
          </div>

          {filterDeckActive !== DEFAULT_FILTER_VALUE &&
            <div className="game-log__filter-item">
              <select
                value={filterDeckOpponent}
                onChange={(e) => handleFilterDeckOpponent(e.target.value)}
              >
                <option value="default" key="opponentfilter-default">
                  - Select an opponent -
                </option>
                {opponentOptions.map(opponent => (
                  <option value={opponent.id} key={`opponentfilter-${opponent.id}`}>
                    {`${opponent.commander} (${opponent.owner.nameFirst} ${opponent.owner.nameLast})`}
                  </option>
                ))}
              </select>
            </div>
          }

          <div className="game-log__filter-item">
            <select
              value={filterPlayerCount}
              onChange={(e) => handleFilterPlayerCount(e.target.value)}
            >
              <option value="default" key="playercountfilter-default">
                - Filter by Player Count -
              </option>
              {playerCounts.map(count => (
                <option value={count} key={`playercountfilter-${count}`}>
                  {count}
                </option>
              ))}
            </select>
          </div>

          <div className="game-log__filter-item">
            <select
              value={filterWinner}
              onChange={(e) => handleFilterWinner(e.target.value)}
            >
              <option value="default" key="winnerfilter-default">
                - Filter by Winner -
              </option>
              {winnerOptions.map(deck => (
                <option value={deck.id} key={`winnerfilter-${deck.id}`}>
                  {`${deck.commander} (${deck.owner.nameFirst} ${deck.owner.nameLast})`}
                </option>
              ))}
            </select>
          </div>

          <div className="game-log__filter-item">
            <button type="button" aria-label="Reset all filters" onClick={() => handleFilterReset()}>Reset</button>
          </div>

        </FilterRow>
        {deckActive &&
          <div className="game-log__data-rollup">
            <Datum number={deckActive.gamesPlayed} label="total games" />
            <Datum number={deckActive.wins.length} label="total wins" />
            <Datum number={deckActive.losses.length} label="total losses" />
            <Datum number={deckActive.winLossRatio} label="win/loss ratio" />
          </div>
        }
        {needsPagination && renderPager()}
        {renderTableMobile()}
        {renderTable()}
        {needsPagination && renderPager()}
      </div>
    </Details>
  )
}

export default GameLog
