import React from "react"
import Link from "gatsby-link"

import Layout from "components/Layout"
import Seo from "components/Seo"

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <h1>Not Found</h1>
    <p>There's nothing here, but don't worry – <Link to="/">the path home is clear.</Link></p>
  </Layout>
)

export default NotFoundPage
