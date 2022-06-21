import React, { useState } from "react"
import { v4 as uuidv4 } from "uuid"

import Datum from "components/Datum"
import Details from "components/Details"
import FilterRow from "components/FilterRow"

import formatDate from "utils/js/formatters/date"

import { Games } from "utils/js/game-utils"
import { Decks } from "utils/js/deck-utils"

import "./game-log.scss"

const GameLog = ({ games: allGames, decks: allDecks }) => {
  let filteredGames = new Games(allGames.games);
  const opponentDecks = new Decks(allGames.opponentDecks);
  const playerDecks = new Decks(allDecks.decks.filter(deck =>
    deck.type === 'player'
  ));

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

  const renderSummary = () => (
    <div>
      <h2>Games Played</h2>
      {filteredGames.games.length > 0 &&
        <div>{formatDate(filteredGames.games[filteredGames.games.length - 1].date)} to {formatDate(filteredGames.games[0].date)}</div>
      }
    </div>
  )

  return (
    <Details className="game-log" summary={renderSummary()}>
      <div className="game-log__content">
        <FilterRow className="game-log__filters">
          <div className="game-log__filter-item">
            <select onChange={(e) => setFilterCommander(e.target.value)}>
              <option value="default">- Filter by Commander -</option>
              {playerDecks.decks.map(deck => (
                <option id={deck.id} value={deck.id} key={deck.id}>
                  {deck.commander}
                </option>
              ))}
            </select>
          </div>
          <div className="game-log__filter-item">
            <select onChange={(e) => setFilterPlayerCount(e.target.value)}>
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
            <select onChange={(e) => setFilterOpponent(e.target.value)}>
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
          <tbody>
            {filteredGames.games.map(game => {
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
        </table>
      </div>
    </Details>
  )
}

export default GameLog
