import React from "react"
import { graphql } from "gatsby"

import Layout from "components/Layout"
import Section from "components/Section"
import Seo from "components/Seo"

import { DeckInfos } from "components/DeckInfo"
import GameLog from "components/GameLog"
import { ChartBase, ChartsWrapper } from "components/Chart"

import { mtgColors } from "utils/js/variables"
import { Games} from "utils/js/game-utils"
import { Decks } from "utils/js/deck-utils"

const pageTitle = "Commander Game Log";

const GameLogPage = ({ data }) => {
  const allGames = new Games(data.allSanityGame.nodes);
  const allDecks = new Decks(data.allSanityDeck.nodes);
  const playerDecks = new Decks(allDecks.decks.filter(deck => deck.type === 'player'));

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

  const winPercentages = [];
  Object.entries(allGames.gamesByColor).forEach(entry => {
    const [color, games] = entry;
    const wins = games.filter(game => game.result === 'win');
    winPercentages.push({
      color: color,
      percentage: wins.length / games.length
    })
  });
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
          borderColor: 'white'
        }],
      },
      options: {
        indexAxis: 'y',
        scales: {
          xAxis: {
            max: 100,
            ticks: {
              callback: (value, index, ticks) => `${value}%`
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

  const winsByMonth = allGames.getResultsCountByMonth('win');
  const lossesByMonth = allGames.getResultsCountByMonth('loss');
  const chartWinLossLine = <ChartBase
    title="Win/Loss Trends"
    config={{
      type: 'line',
      data: {
        labels: winsByMonth.map(byMonth => (
          byMonth.month.toLocaleString('default', {
            month: 'long',
            year: 'numeric'
          })
        )),
        datasets: [
          {
            label: 'Wins',
            data: winsByMonth.map(byMonth => byMonth.count),
            borderColor: 'green',
            backgroundColor: 'green',
            borderWidth: 2,
            pointRadius: 3,
          },
          {
            label: 'Losses',
            data: lossesByMonth.map(byMonth => byMonth.count),
            borderColor: 'red',
            backgroundColor: 'red',
            borderWidth: 2,
            pointRadius: 3,
          }
        ],
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom',
          },
          tooltip: {
            displayColors: false,
          }
        }
      }
    }}
  />

  return (<Layout>
    <Seo title={pageTitle} />
    <Section cols="0">
      <h1>{pageTitle}</h1>
      <DeckInfos
        decks={playerDecks}
        games={allGames}
      />
    </Section>
    <Section cols="0">
      <GameLog
        decks={allDecks}
        games={allGames}
      />
    </Section>
    <Section cols="0">
      <h2>Charts</h2>
      <ChartsWrapper>
        {chartDeckColors}
        {chartWinPercentageByColor}
        {chartWinLossLine}
      </ChartsWrapper>
    </Section>
  </Layout>
)}

export const query = graphql`
  query GameLogPageQuery {
    allSanityGame {
      nodes {
        id
        date
        deck {
          id
          colors
          commander
        }
        opponents {
          id
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
        type
        status
        links {
          title
          url
        }
      }
    }
  }
`

export default GameLogPage
