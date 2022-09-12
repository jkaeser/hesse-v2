import React, { useState } from "react"
import { graphql } from "gatsby"

import Layout from "components/Layout"
import Section from "components/Section"
import Seo from "components/Seo"

import { DeckInfos } from "components/DeckInfo"
import GameLog from "components/GameLog"
import { ChartBase, ChartsWrapper } from "components/Chart"
import FilterRow from "../components/FilterRow";

import { mtgColors, colors } from "utils/js/variables"
import { Games} from "utils/js/game-utils"
import { Decks } from "utils/js/deck-utils"

const pageTitle = "Commander Game Log";

const GameLogPage = ({ data }) => {
  // Create filterable versions of node lists
  let baseAllGames = data.allSanityGame.nodes;
  let baseAllDecks = data.allSanityDeck.nodes;

  // Handle legacy data
  const [showLegacyData, setShowLegacyData] = useState(false);
  if (!showLegacyData) {
    baseAllGames = baseAllGames.filter(game => {
      const targetDate = new Date('2021-10-12');
      const compareDate = new Date(game.date);
      return targetDate.valueOf() < compareDate.valueOf();
    })
  }

  // Preserve lists of all nodes.
  const allGames = new Games(baseAllGames);
  const allDecks = new Decks(baseAllDecks, baseAllGames);
  const allPlayers = data.allSanityPlayer.nodes;

  /**
   * Handle setting player context.
   *
   * Only show data for Deck nodes the player owns, and only include Game nodes
   * the player's decks have been played in.
   */
  const JohnKaeser = allPlayers.find(player => player.nameLast === 'Kaeser');
  const [playerContext, setPlayerContext] = useState(JohnKaeser.id);
  const handlePlayerContextChange = event => {
    setPlayerContext(event.target.value);
  }
  const playerDecks = new Decks(
    playerContext !== 'none'
      ? baseAllDecks.filter(deck => deck.owner.id === playerContext)
      : baseAllDecks,
    playerContext !== 'none'
      ? baseAllGames.filter(game => {
        const playerIds = game.decks.map(deck => deck.owner.id);
        return playerIds.includes(playerContext);
      })
      : baseAllGames
  );

  // Build chart configurations.
  const chartDeckColors = <ChartBase
    title='Deck Colors'
    config={{
      type: 'pie',
      data: {
        labels: Object.values(mtgColors).map(color => color.label),
        datasets: [{
          data: Object.values(playerDecks.decks
            .map(deck => deck.colors)
            .reduce((colorCounts, colors) => {
              colors.forEach(color => { colorCounts[color]++ });
              return colorCounts;
            }, {white: 0, blue: 0, black: 0, red: 0, green: 0})
          ),
          backgroundColor: Object.values(mtgColors).map(color => color.foreground),
          borderWidth: .5
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'left',
          }
        }
      }
    }}
  />

  const winPercentages = playerDecks.winPercentagesByColor;
  const chartWinPercentageByColor = <ChartBase
    title="Win Percentage by Color"
    config={{
      type: 'bar',
      data: {
        labels: winPercentages.map(group => mtgColors[group.color].label),
        datasets: [{
          data: winPercentages.map(group =>
            `${Math.floor(group.percentage * 100)}`
          ),
          backgroundColor: winPercentages.map(group => mtgColors[group.color].foreground),
          borderWidth: 1,
          borderColor: colors.white,
        }],
      },
      options: {
        indexAxis: 'y',
        scales: {
          xAxis: {
            max: 100,
            ticks: {
              callback: (value) => `${value}%`
            }
          }
        },
        plugins: {
          legend: false,
          tooltip: {
            displayColors: false,
            callbacks: {
              label: (context) => `${context.formattedValue}%`
            }
          }
        }
      }
    }}
  />

  const lineChartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        displayColors: false,
      }
    }
  };

  // const winsByMonth = allGames.getResultsCountByMonth('win');
  // const lossesByMonth = allGames.getResultsCountByMonth('loss');
  // const chartWinLossLine = <ChartBase
  //   title="Win/Loss Trends"
  //   config={{
  //     type: 'line',
  //     data: {
  //       labels: winsByMonth.map(byMonth => (
  //         byMonth.month.toLocaleString('default', {
  //           month: 'long',
  //           year: 'numeric'
  //         })
  //       )),
  //       datasets: [
  //         {
  //           label: 'Wins',
  //           data: winsByMonth.map(byMonth => byMonth.count),
  //           borderColor: colors.green,
  //           backgroundColor: colors.green,
  //           borderWidth: 2,
  //           pointRadius: 3,
  //         },
  //         {
  //           label: 'Losses',
  //           data: lossesByMonth.map(byMonth => byMonth.count),
  //           borderColor: colors.red,
  //           backgroundColor: colors.red,
  //           borderWidth: 2,
  //           pointRadius: 3,
  //         }
  //       ],
  //     },
  //     options: lineChartOptions,
  //   }}
  // />

  const gamesByMonth = new Games(baseAllGames.filter(game => {
    const playerIds = game.decks.map(deck => deck.owner.id);
    return playerIds.includes(playerContext);
  })).gamesByMonth;
  const chartGamesPlayedLine = <ChartBase
    title="Games Played by Month"
    config={{
      type: 'line',
      data: {
        labels: gamesByMonth.map(byMonth => (
          byMonth.month.toLocaleString('default', {
            month: 'long',
            year: 'numeric'
          })
        )),
        datasets: [
          {
            label: 'Games',
            data: gamesByMonth.map(byMonth => byMonth.count),
            borderColor: colors.white,
            backgroundColor: colors.white,
            borderWidth: 2,
            pointRadius: 3,
          },
        ],
      },
      options: lineChartOptions,
    }}
  />

  return (
    <Layout>
      <Seo title={pageTitle} />
      <h1>{pageTitle}</h1>
      <FilterRow>
        <div>
          <input
            type="checkbox"
            id="show-legacy"
            onChange={() => setShowLegacyData(!showLegacyData)}
          />
          <label htmlFor="show-legacy">Show legacy data</label>
        </div>
      </FilterRow >
      <Section cols="0">
        <GameLog
          decks={allDecks}
          games={allGames}
        />
      </Section>
      <Section cols="0">
        <h2>Player Info</h2>
        <FilterRow>
          <label htmlFor="playerContext">Player:</label>
          <select id="playerContext" onChange={(event) => handlePlayerContextChange(event)} value={playerContext}>
            <option value="none">- Select a Player -</option>
            {data.allSanityPlayer.nodes.map(player => (
              <option value={player.id}>
                {player.nameFirst} {player.nameLast}
              </option>
            ))}
          </select>
        </FilterRow>
        <DeckInfos
          decks={playerDecks}
        />
      </Section>
      <Section cols="0">
        <ChartsWrapper>
          {chartDeckColors}
          {chartWinPercentageByColor}
        </ChartsWrapper>
        <ChartsWrapper>
          {/* {chartWinLossLine} */}
          {chartGamesPlayedLine}
        </ChartsWrapper>
      </Section>
    </Layout>
  )
}

export const query = graphql`
  query GameLogPageQuery {
    allSanityGame {
      nodes {
        id
        date
        decks {
          id
          colors
          commander
          owner {
            id
            nameFirst
            nameLast
          }
        }
        winner {
          id
          colors
          commander
        }
        result
        summary
      }
    }
    allSanityDeck(sort: {fields: [_updatedAt], order: DESC}) {
      nodes {
        id
        colors
        commander
        owner {
          id
          nameFirst
          nameLast
        }
        type
        status
        links {
          title
          url
        }
      }
    }
    allSanityPlayer(sort: {fields: [nameFirst], order: ASC}) {
      nodes {
        id
        nameFirst
        nameLast
      }
    }
  }
`

export default GameLogPage
