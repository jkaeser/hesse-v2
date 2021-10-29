import React, { useState } from "react"

import Datum from "components/Datum"
import Details from "components/Details"
import FilterRow from "components/FilterRow"

import "./game-log.scss"

const GameLog = ({ games, decks }) => {
  const [ filterCommander, setFilterCommander ] = useState('default');
  const [ filterPlayerCount, setFilterPlayerCount ] = useState('default');

  const playerCounts = games.reduce(
    (previousValue, game) => {
      if (previousValue.indexOf(game.player_count) === -1) {
        previousValue.push(game.player_count);
      }
      return previousValue;
    }, []
  );

  games.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (filterCommander !== 'default') {
    games = games.filter(game => game.deck_id === Number(filterCommander));
  }
  if (filterPlayerCount !== 'default') {
    games = games.filter(game => game.player_count == Number(filterPlayerCount));
  }

  const wins = games.filter(game => game.result === "win");
  const losses = games.filter(game => game.result === "loss");
  const ratio = Number(wins.length / losses.length).toPrecision(2);

  const renderSummary = () => (
    <h2>Games Played from {games[games.length - 1].date} to {games[0].date}</h2>
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
                  <td className="date">{game.date}</td>
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
