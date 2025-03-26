import React from "react"
import PropTypes from "prop-types"

import './columns.scss'
import './section.scss'

const Section = ({cols, children}) => {
  const classes = [
    cols !== '0' ? `cols cols--${cols}` : '',
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
  color: PropTypes.oneOf([null, 'white']),
  cols: PropTypes.oneOf(['0', '1', '2', '3']),
}
Section.defaultProps = {
  color: null,
  cols: '1'
}

export default Section
