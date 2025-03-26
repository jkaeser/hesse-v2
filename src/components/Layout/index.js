import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import Footer from "../Footer"

import "./styles/all.scss"

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    attribute: PropTypes.oneOf(['scroll'])
  }

  render() {
    const classes = [
      this.props.attribute ? this.props.attribute : ''
    ]

    return (
      <div className='site-wrapper'>
        <Helmet />
        <a className="skip-link" href="#main">Skip to main content</a>
        <main className={classes.join(' ').trim()}>
          <span id="main"></span>
          {this.props.children}
        </main>
        <Footer />
      </div>
    )
  }
}

export default Layout
