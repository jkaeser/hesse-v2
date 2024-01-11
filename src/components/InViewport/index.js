import React from "react"
import PropTypes from "prop-types"

import { InView } from "react-intersection-observer"

import './in-viewport.scss'

const InViewport = ({children, threshold}) => (
  <InView threshold={threshold} rootMargin={`0px`}>
    {({ inView, ref, entry }) => (
      <div ref={ref} className={`observer ${inView ? `active` : ``}`}>
        {children}
      </div>
    )}
  </InView>
)

InViewport.propTypes = {
  threshold: PropTypes.number
}

InViewport.defaultProps = {
  threshold: .05
}

export default InViewport
