import React, { useState } from "react"

import Datum from "components/Datum"
import Details from "components/Details"
import FilterRow from "components/FilterRow"

import formatDate from "utils/js/formatters/date"

import {
  getWins,
  getLosses,
  getWinLossRatio,
  getPlayerCounts,
  sortGamesByDate
} from "utils/js/game-utils"

import "./game-log.scss"

const GameLog = ({ games, decks }) => {
  // Set player counts before filtering.
  const playerCounts = getPlayerCounts(games);

  // Sort games before filtering.
  sortGamesByDate(games);

  // Respect filter options.
  const [ filterCommander, setFilterCommander ] = useState('default');
  const [ filterPlayerCount, setFilterPlayerCount ] = useState('default');
  if (filterCommander !== 'default') {
    games = games.filter(game => game.deck_id === Number(filterCommander));
  }
  if (filterPlayerCount !== 'default') {
    games = games.filter(game => game.player_count === Number(filterPlayerCount));
  }

  const wins = getWins(games);
  const losses = getLosses(games);
  const ratio = getWinLossRatio(games);

  const renderSummary = () => (
    <div>
      <h2>Games Played</h2>
      {games.length > 0 &&
        <div>{formatDate(games[games.length - 1].date)} to {formatDate(games[0].date)}</div>
      }
    </div>
  )

  return (
    <Details className="game-log" summary={renderSummary()}>
      <div className="game-log__content">
        <FilterRow className="game-log__filters">
          <div className="game-log__filter-item">
            <select onChange={(e) => setFilterCommander(e.target.value)}>
              <option id="default" value="default">- Filter by Commander -</option>
              {decks.map(deck => (
                <option id={deck.id} value={deck.id} key={deck.id}>
                  {deck.commander}
                </option>
              ))}
            </select>
          </div>
          <div className="game-log__filter-item">
            <select onChange={(e) => setFilterPlayerCount(e.target.value)}>
              <option id="default" value="default">- Filter by Player Count -</option>
              {playerCounts
                .map(count => (
                <option id={count} value={count} key={count}>
                  {count}
                </option>
              ))}
            </select>
          </div>
        </FilterRow>
        <div className="game-log__data-rollup">
          <Datum number={games.length} label="total games" />
          <Datum number={wins.length} label="total wins" />
          <Datum number={losses.length} label="total losses" />
          <Datum number={ratio} label="win/loss ratio" />
        </div>
        <table>
          <thead>
            <tr>
              <th className="date">Date</th>
              <th className="commander">Commander</th>
              <th className="player-count">Player Count</th>
              <th className="result">Result</th>
              <th className="summary">Summary</th>
            </tr>
          </thead>
          <tbody>
            {games.map(game => {
              const deck = decks.find(deck => deck.id === game.deck_id);

              return (
                <tr id={game.id} key={game.id}>
                  <td className="date">{formatDate(game.date)}</td>
                  <td className="commander">{deck.commander}</td>
                  <td className="player-count">{game.player_count}</td>
                  <td className={`result ${game.result}`}>{game.result}</td>
                  <td className="summary">{game.summary}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Details>
  )
}

export default GameLog
