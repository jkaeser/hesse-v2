import React from "react"

import Layout from "components/Layout"
import Button from "components/Button"
import Section from "components/Section"
import Seo from "components/Seo"

import InViewport from "components/InViewport"

import resume from "files/JohnKaeser-Resume.pdf"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <Section>
      <h1>Hi, I'm John.</h1>
      <InViewport>
        <p>
          I'm a web developer in Philadelphia, PA, currently working at <a href="https://www.lullabot.com/">Lullabot</a>.
        </p>
        <p>
          Recently I've been building <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Components">Web Components</a> for IBM using their <a href="https://carbondesignsystem.com/">Carbon design system</a>.
        </p>
        <p>
          When I'm not building for the web, you can find me playing the drums in a band called <a href="https://dwellermusic.com/">Dweller</a>, tuning a <a href="https://magic.wizards.com/en/intro">Magic: The Gathering deck</a>, or eating ice cream.
        </p>
        <ul className="contact-links no-list">
          <li className="contact-link">
            <span className="contact-link__label">Email:</span>
            <a href="mailto:jakaeser44@gmail.com">jakaeser44@gmail.com</a>
          </li>
          <li className="contact-link">
            <span className="contact-link__label">GitHub:</span>
            <a href="https://github.com/jkaeser">jkaeser</a>
          </li>
          <li className="contact-link">
            <span className="contact-link__label">CodePen:</span>
            <a href="https://codepen.io/jakaeser">jkaeser</a>
          </li>
        </ul>
        <br />
        <Button path={ resume }>Resume</Button>
      </InViewport>
    </Section>
  </Layout>
)

export default IndexPage
