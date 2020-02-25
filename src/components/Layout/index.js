import React from "react"
import PropTypes from "prop-types"

import "./layout.css"

const Layout = ({ children, cols, attribute }) => {
  return (
    <>
      <main className={`cols cols--${cols ? cols : '1'} ${ attribute ? attribute : ''}`}>
        {children}
      </main>
      <footer>© {new Date().getFullYear()}</footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
