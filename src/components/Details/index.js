import React from "react"

import "./details.scss"

const Details = ({ className, summary, mode = 'normal', open, children }) => {
  const classes = [
    className,
    mode === 'small' ? 'small' : '',
  ].filter(className => className);

  return (
    <details className={classes} open={open}>
      <summary>{summary}</summary>
      {children}
    </details>
  )
}

export default Details
