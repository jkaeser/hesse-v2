import React from "react"

import "./datum.scss"

const Datum = ({number, label, dataStyle = {}}) => (
  <div className="datum">
    <span className="datum__number" style={dataStyle}>{number}</span> <span className="datum__label">{label}</span>
  </div>
)

export default Datum
