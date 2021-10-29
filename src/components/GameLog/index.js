import React, { useState } from "react"
// import PropTypes from "prop-types"

import Datum from "components/Datum"
import Details from "components/Details"
import FilterRow from "components/FilterRow"

import "./game-log.scss"

const GameLog = ({ games, decks }) => {
  const [ filteredCommander, setFilteredCommander ] = useState('default');

  games.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (filteredCommander !== 'default') {
    games = games.filter(game => game.deck_id === Number(filteredCommander));
  }

  const wins = games.filter(game => game.result === "win");
  const losses = games.filter(game => game.result === "loss");
  const ratio = Number(wins.length / losses.length).toPrecision(2);

  const renderSummary = () => (
    <h2>Game Log</h2>
  )

  return (
    <Details className="game-log" summary={renderSummary()}>
      <div className="game-log__content">
        <FilterRow className="game-log__filters">
          <div className="game-log__filter-item">
            <select onChange={(e) => setFilteredCommander(e.target.value)}>
              <option id="default" value="default">- Filter by Commander -</option>
              {decks.map(deck => (
                <option id={deck.id} value={deck.id} key={deck.id}>
                  {deck.commander}
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
              <th className="result">Result</th>
              <th className="summary">Summary</th>
            </tr>
          </thead>
          <tbody>
            {games
              .filter(game => (
                filteredCommander !== 'default'
                  ? game.deck_id === Number(filteredCommander)
                  : true

              ))
              .map(game => {
              const deck = decks.find(deck => deck.id === game.deck_id);

              return (
                <tr id={game.id} key={game.id}>
                  <td className="date">{game.date}</td>
                  <td className="commander">{deck.commander}</td>
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
