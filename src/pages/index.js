import React from "react"

import Layout from "components/Layout"
import SEO from "components/Seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hello, world.</h1>
    © {new Date().getFullYear()}
  </Layout>
)

export default IndexPage
