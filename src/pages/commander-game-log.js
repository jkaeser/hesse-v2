import React from "react"
import { graphql } from "gatsby"

import Layout from "components/Layout"
import Section from "components/Section"
import Seo from "components/Seo"

import { DeckInfos } from "components/DeckInfo"
import GameLog from "components/GameLog"

const pageTitle = "Commander Game Log";

const GameLogPage = ({ data }) => (
  <Layout>
    <Seo title={pageTitle} />
    <Section cols="0">
      <h1>{pageTitle}</h1>
      <DeckInfos
        decks={data.allSanityDeck.nodes.filter(deck => deck.type === 'player')}
        games={data.allSanityGame.nodes}
      />
    </Section>
    <Section cols="0">
      <GameLog
        decks={data.allSanityDeck.nodes}
        games={data.allSanityGame.nodes}
      />
    </Section>
  </Layout>
)

export const query = graphql`
  query GameLogPageQuery {
    allSanityGame {
      nodes {
        date
        deck {
          id
        }
        opponents {
          id
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
