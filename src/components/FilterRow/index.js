import React from 'react'

import "./filter-row.scss"

const FilterRow = ({className, children}) => {
  const classes = [
    'filter-row',
    className
  ]

  return (
    <form className={classes.join(' ').trim()}>
      {children}
    </form>
  )
}

export default FilterRow
