import React from "react"
import PropTypes from "prop-types"

import './columns.scss'
import './section.scss'

const Section = ({cols, color, children}) => {
  const classes = [
    'color--' + color,
    cols !== '1' ? 'cols cols--' + cols : '',
    'full-width',
  ]

  return (
    <section className={classes.join(' ').trim()}>
      <div>
        {children}
      </div>
    </section>
  )
}

Section.propTypes = {
  color: PropTypes.oneOf(['green', 'white']),
  cols: PropTypes.oneOf(['1', '2', '3']),
}
Section.defaultProps = {
  color: 'green',
  cols: '1'
}

export default Section
