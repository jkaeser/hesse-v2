import React from "react"
// import PropTypes from "prop-types"

import Datum from "components/Datum"
import Details from "components/Details"

import "./game-log.scss"

const GameLog = ({ games, decks }) => {
  games.sort((a, b) => new Date(b.date) - new Date(a.date));

  const wins = games.filter(game => game.result === "win");
  const losses = games.filter(game => game.result === "loss");
  const ratio = Number(wins.length / losses.length).toPrecision(2);

  const renderSummary = () => (
    <h2>Game Log</h2>
  )

  return (
    <Details className="game-log" summary={renderSummary()}>
      <div className="game-log__content">
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
            {games.map(game => {
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
