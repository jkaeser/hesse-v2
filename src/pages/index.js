import React from "react"

import Layout from "components/Layout"
import Button from "components/Button"
import SEO from "components/Seo"

import resume from "files/JohnKaeser-Resume.pdf"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi, I'm John.</h1>
    <p>
      I'm a web developer in Philadelphia, PA, currently working at <a href="https://www.zivtech.com/">Zivtech</a>.
    </p>
    <p>
      Lately I've been rebuilding <a href="https://www.ias.edu/">The Institute for Advanced Studies'</a> website in Drupal 8 after supporting their current site for over two and a half years. Previously, I led the front end development of <a href="https://us.fertility.com/">Fertility.com</a>. Some other sites I've worked on include <a href="https://vaccinemakers.org/">The Vaccine Makers Project</a>, <a href="https://www.lsac.org/">The Law School Admissions Council</a>, and <a href="https://clarifi.org/">Clarifi</a>.
    </p>
    <p>
      When I'm not building websites, you can find me playing the drums in a band called <a href="https://dwellermusic.bandcamp.com/">Dweller</a>. I might also be playing <a href="https://mtg.gamepedia.com/Commander_(format)">Commander</a>. Or eating ice cream.
    </p>
    <ul class="contact-links">
      <li class="contact-link">
        <span class="contact-link__label">Email:</span>
        <a href="mailto:jakaeser44@gmail.com">jakaeser44@gmail.com</a>
      </li>
      <li class="contact-link">
        <span class="contact-link__label">GitHub:</span>
        <a href="https://github.com/jkaeser">jkaeser</a>
      </li>
      <li class="contact-link">
        <span class="contact-link__label">CodePen:</span>
        <a href="https://codepen.io/jakaeser">jkaeser</a>
      </li>
    </ul>
    <br />
    <Button path={ resume }>Resume</Button>
  </Layout>
)

export default IndexPage
