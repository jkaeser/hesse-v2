import React from "react"

import Layout from "components/Layout"
import Section from "components/Section"
import Seo from "components/Seo"

import {DeckInfo, GameDataSheet} from "components/GameLog"

import gameData from "data/game-log.json"
const { decks, games } = gameData.data;

const pageTitle = "Commander Game Log";

const CardPage = () => (
  <Layout>
    <Seo title={pageTitle} />
    <Section cols="0">
      <h1>{pageTitle}</h1>
      {decks.map(deck => (
        <DeckInfo
          deck={deck}
          games={games}
        />
      ))}
      <GameDataSheet
        decks={decks}
        games={games}
      />
    </Section>
  </Layout>
)

export default CardPage
