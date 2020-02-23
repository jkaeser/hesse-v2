import React from 'react'
import './button.css'

const Button = ({ children, path }) => (
  <a href={ path } className="button">
    { children }
  </a>
)

export default Button
