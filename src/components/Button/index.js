import React from 'react'
import PropTypes from "prop-types"
import Link from "gatsby-link"

const Button = ({ children, path, className }) => {
  const classes = [
    `button`,
    className
  ].join(' ');

  // The Link component does not work well for external resources or files.
  if (
    path.substring(0, 4) === 'http' ||
    path.substring(0, 7) === '/static'
  ) {
    return (
      <a href={ path } className={ classes }>
        { children }
      </a>
    )
  }
  else {
    return (
      <Link to={ path } className={ classes }>
        { children }
      </Link>
    )
  }
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired
}

export default Button
