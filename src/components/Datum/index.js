import React from "react"

import "./datum.scss"

const Datum = ({number, label, dataStyle = {}}) => (
  <div className="datum">
    <div className="datum__number" style={dataStyle}>{number}</div>
    <div className="datum__label">{label}</div>
  </div>
)

export default Datum
