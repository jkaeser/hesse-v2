import React from "react"

import Layout from "components/Layout"
import Section from "components/Section"
import Seo from "components/Seo"
import CardCollection from "components/CardCollection"

import cardsMckinnon from "data/cards-mckinnon.json"
import cardsMckinnonCollected from "data/cards-collected-mckinnon.json"

import cardsMarkov from "data/cards-markov.json"
import cardsMarkovCollected from "data/cards-markov-collected.json"

const pageTitle = "Magic: The Gathering™ Card Collections";

const CardPage = () => (
  <Layout>
    <Seo title={pageTitle} />
    <Section cols="0">
      <h1>{pageTitle}</h1>
      <CardCollection
        title="Seb McKinnon Illustrations"
        dataCards={cardsMckinnon}
        dataCollected={cardsMckinnonCollected}
      />
      <CardCollection
        title="Sorin Markov Cards"
        dataCards={cardsMarkov}
        dataCollected={cardsMarkovCollected}
      />
    </Section>
  </Layout>
)

export default CardPage
