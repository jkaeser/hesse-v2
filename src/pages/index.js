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
          I'm a web developer in <span className="grittify">Philadelphia, PA<img src={gritty} alt="Gritty, Philadelphia's hockey team's mascot."/></span> with { new Date().getFullYear() - 2015 || '10+' } years of experience writing maintainable, resilient front end code for organizations such as IBM, The Institute for Advanced Study, and Appalachian State University.
        </p>
        <p>
          When I'm not building for the web, you can find me playing drums for <a href="https://ridgerunners.band/">Ridge Runners</a> and <a href="https://dwellermusic.com/">Dweller</a> or eating plain chocolate ice cream.
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
