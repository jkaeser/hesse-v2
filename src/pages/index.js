import React from "react"

import Layout from "components/Layout"
import Button from "components/Button"
import Section from "components/Section"
import SEO from "components/Seo"

import InViewport from "components/InViewport"

import resume from "files/JohnKaeser-Resume.pdf"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Section>
      <h1>Hi, I'm John.</h1>
      <InViewport>
        <p>
          I'm a web developer in Philadelphia, PA, currently working at <a href="https://www.lullabot.com/">Lullabot</a>.
        </p>
        <p>
          Recently I built <a href="https://www.pgpf.org/understanding-the-coronavirus-crisis/coronavirus-funding-state-by-state#funding-map">an interactive heat map</a> for the Peter G. Peterson Foundation. Before that I was heavily involved in rebuilding <a href="https://www.ias.edu/">The Institute for Advanced Studies'</a> website in Drupal 8. A few other sites I've contributed to include <a href="https://us.fertility.com/">Fertility.com</a>, <a href="https://vaccinemakers.org/">The Vaccine Makers Project</a>, and <a href="https://www.lsac.org/">The Law School Admissions Council</a>.
        </p>
        <p>
          When I'm not building for the web, you can find me playing the drums in a band called <a href="https://dwellermusic.com/">Dweller</a>. I might also be playing <a href="https://mtg.gamepedia.com/Commander_(format)">Commander</a>. Or eating ice cream.
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
