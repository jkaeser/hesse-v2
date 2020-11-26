import React from "react"
import PropTypes from "prop-types"

import './columns.css'
import './section.css'

const Section = ({cols, color, children}) => {
  const classes = [
    cols !== '1' ? 'cols cols--' + cols : '',
    'color--' + color,
  ]

  return (
    <section className={classes.join(' ')}>
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
