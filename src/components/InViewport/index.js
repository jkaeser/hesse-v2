import React from "react"

import { InView } from "react-intersection-observer"

import './in-viewport.css'

const InViewport = ({children}) => (
  <InView threshold={.5} rootMargin={`-16px`}>
    {({ inView, ref, entry }) => (
      <div ref={ref} className={`observer ${inView ? `active` : ``}`}>
        {children}
      </div>
    )}
  </InView>
)

export default InViewport
