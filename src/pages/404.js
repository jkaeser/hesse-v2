import React from "react"

import Layout from "components/Layout"
import SEO from "components/Seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>There's nothing here, but don't worry – <a href="/">the path home is clear.</a></p>
  </Layout>
)

export default NotFoundPage
