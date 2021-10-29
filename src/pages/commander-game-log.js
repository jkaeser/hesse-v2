import React from "react"

import Layout from "components/Layout"
import Section from "components/Section"
import Seo from "components/Seo"

import {DeckInfos} from "components/DeckInfo"
import GameLog from "components/GameLog"

import { games } from "data/games-played.json"
import { decks } from "data/decks.json"

const pageTitle = "Commander Game Log";

const CardPage = () => (
  <Layout>
    <Seo title={pageTitle} />
    <Section cols="0">
      <h1>{pageTitle}</h1>
      <DeckInfos
        decks={decks}
        games={games}
      />
      <GameLog
        decks={decks}
        games={games}
      />
    </Section>
  </Layout>
)

export default CardPage
