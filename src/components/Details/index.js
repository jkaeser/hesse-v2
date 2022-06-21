import React from "react"

import "./details.scss"

const Details = ({ className, summary, children }) => {
  const classes = [
    className
  ];

  return (
    <details className={classes}>
      <summary>{summary}</summary>
      {children}
    </details>
  )
}

export default Details
