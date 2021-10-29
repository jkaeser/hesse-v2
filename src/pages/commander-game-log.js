import React from "react"

import Layout from "components/Layout"
import Section from "components/Section"
import Seo from "components/Seo"

import { DeckInfos } from "components/DeckInfo"
import GameLog from "components/GameLog"

import deckData from "data/decks.json"
import gameData from "data/games-played.json"

const pageTitle = "Commander Game Log";

const CardPage = () => (
  <Layout>
    <Seo title={pageTitle} />
    <Section cols="0">
      <h1>{pageTitle}</h1>
      <DeckInfos
        decks={deckData.decks}
        games={gameData.games}
      />
      <GameLog
        decks={deckData.decks}
        games={gameData.games}
      />
    </Section>
  </Layout>
)

export default CardPage
