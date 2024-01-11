import React from "react"

import Layout from "components/Layout"
import Button from "components/Button"
import Section from "components/Section"
import Seo from "components/Seo"

import InViewport from "components/InViewport"

import resume from "files/JohnKaeser-Resume.pdf"

import gritty from "images/gritty-clipart.svg";

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <Section>
      <h1>Hi, I'm John.</h1>
      <InViewport>
        <p>
          I'm a web developer in <span className="grittify">Philadelphia, PA<img src={gritty} /></span>, currently working at <a href="https://www.lullabot.com/">Lullabot</a>, an employee-owned web strategy, design, and development agency.
        </p>
        <p>
          Recently I've been building <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Components">Web Components</a> for IBM using their <a href="https://carbondesignsystem.com/">Carbon design system</a>.
        </p>
        <p>
          When I'm not building for the web, you can find me playing drums for the bands <a href="https://dwellermusic.com/">Dweller</a> and <a href="https://colemanrigg.com/">Coleman Rigg & The Ridge Runners</a>, tuning a <a href="https://magic.wizards.com/en/intro">Magic: The Gathering</a> deck, or eating chocolate ice cream.
        </p>
        <ul className="no-list">
          <li>
            <span className="label">Email:</span>
            <a href="mailto:jakaeser44@gmail.com">jakaeser44@gmail.com</a>
          </li>
          <li>
            <span className="label">GitHub:</span>
            <a href="https://github.com/jkaeser">jkaeser</a>
          </li>
          <li>
            <span className="label">CodePen:</span>
            <a href="https://codepen.io/jakaeser">jkaeser</a>
          </li>
        </ul>
        <Button path={ resume }>Resume</Button>
      </InViewport>
    </Section>
  </Layout>
)

export default IndexPage
