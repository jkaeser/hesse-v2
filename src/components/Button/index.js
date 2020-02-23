import React from 'react'
import Link from 'gatsby-link'
import './button.css'

const Button = ({ children, path }) => (
  <Link to={ path } className="button">
    { children }
  </Link>
)

export default Button
