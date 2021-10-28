import React from "react"
// import PropTypes from "prop-types"

import "./game-log.scss"

export const DeckInfo = ({ deck, games }) => {
  const gamesPlayed = games
    .filter(game => game.deck_id === deck.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const wins = gamesPlayed.filter(game => game.result === 'win');
  const losses = gamesPlayed.filter(game => game.result === 'loss');
  const winLossRatio = wins.length / gamesPlayed.length;

  return (
    <div className="deck-info">
      <h2>
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
          })}
        </span>
      </h2>
      <div>Games Played: {gamesPlayed.length}</div>
      <div>Wins: {wins.length}</div>
      <div>Losses: {losses.length}</div>
      <div>Win/Loss ratio: {winLossRatio}</div>
      {gamesPlayed.length > 0 &&
        <div>Latest Game: {gamesPlayed[0].date}</div>
      }
      <div className="status">{deck.status}</div>
    </div>
  )
}

export const GameDataSheet = ({ games, decks }) => {
  return (
    <div className="game-log">
      <h2>Game Data</h2>
      <span>Total Games: {games.length}</span>
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
  )
}
