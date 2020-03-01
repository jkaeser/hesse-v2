import React from "react"
import PropTypes from "prop-types"

import "./layout.css"

const Layout = ({ children, cols, attribute }) => {
  const classes = [
    'cols cols--' + cols,
    attribute ? attribute : '',
  ]

  return (
    <>
      <main className={classes.join(' ')}>
        {children}
      </main>
      <footer>© {new Date().getFullYear()}</footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  cols: PropTypes.oneOf(['1', '2', '3']),
  attribute: PropTypes.string
}

Layout.defaultProps = {
  cols: '1'
}

export default Layout
