import React, { useEffect } from "react"
import { Chart, registerables } from "chart.js"
import { v4 as uuidv4 } from 'uuid';

import { colors } from '../../utils/js/variables'

import './chart.scss'

const fontFamily = "'Lato', sans-serif";

Chart.register(...registerables);

Chart.defaults.color = colors.white;
Chart.defaults.backgroundColor = colors.white;
Chart.defaults.borderColor = colors.white;
Chart.defaults.plugins.legend.labels.font = {
  family: fontFamily,
  size: 14.4,
  weight: 300
}
Chart.defaults.plugins.tooltip.bodyFont = {
  family: fontFamily,
  weight: 300,
  size: 14.4,
}
Chart.defaults.plugins.tooltip.cornerRadius = 0;
Chart.defaults.borderColor = colors.translucent;

export const ChartBase = ({title, config}) => {
  const id = `chart-${uuidv4()}`;

  useEffect(() => {
    const chartEl = document.getElementById(id);
    const chart = new Chart(chartEl, config); // eslint-disable-line
  })

  return (
    <div className="chart">
      {title && <h3 className="chart__title">{title}</h3>}
      <div className="chart__canvas-wrapper">
        <canvas
          id={id}
          className="chart__canvas"
        />
      </div>
    </div>
  )
}

export const ChartsWrapper = ({ children }) => (
  <div className="charts-wrapper">
    { children }
  </div>
)
