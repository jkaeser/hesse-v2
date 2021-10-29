import React from "react"
// import PropTypes from "prop-types"

import "./game-log.scss"

const GameLog = ({ games, decks }) => {
  games.sort((a, b) => new Date(b.date) - new Date(a.date));

  const wins = games.filter(game => game.result === "win");
  const losses = games.filter(game => game.result === "loss");
  const ratio = Number(wins.length / losses.length).toPrecision(2);

  return (
    <details className="game-log">
      <summary><h2>Game Log</h2></summary>
      <div>
        <div>Total Games: {games.length}</div>
        <div>Total Wins: {wins.length}</div>
        <div>Total Losses: {losses.length}</div>
        <div>Win/Loss Ratio: {ratio}</div>
        <table>
          <tr>
            <th className="date">Date</th>
            <th className="commander">Commander</th>
            <th className="result">Result</th>
            <th className="summary">Summary</th>
          </tr>
          {games.map(game => {
            const deck = decks.find(deck => deck.id === game.deck_id);

            return (
              <tr id={game.id}>
                <td className="date">{game.date}</td>
                <td className="commander">{deck.commander}</td>
                <td className={`result ${game.result}`}>{game.result}</td>
                <td className="summary">{game.summary}</td>
              </tr>
            )
          })}
        </table>
      </div>
    </details>
  )
}

export default GameLog
