import React from "react"
import PropTypes from "prop-types"

import Footer from "../Footer"

import "./layout.scss"

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMode: null,
      modes: [
        {
          name: 'contrast',
          title: 'High Contrast',
          svg: <svg viewBox="0 0 20 20"><path d="M10,0.469c-5.264,0-9.531,4.268-9.531,9.531c0,5.265,4.268,9.531,9.531,9.531c5.265,0,9.531-4.267,9.531-9.531C19.531,4.736,15.265,0.469,10,0.469 M10,18.665c-4.786,0-8.665-3.88-8.665-8.665c0-4.786,3.879-8.665,8.665-8.665V18.665z"></path></svg>
        },
        {
          name: 'hue-rotate',
          title: 'Color Shift',
          svg: <svg viewBox="0 0 19 19"><path d="M10.281,1.781C5.75,1.781,2.062,5.469,2.062,10s3.688,8.219,8.219,8.219S18.5,14.531,18.5,10S14.812,1.781,10.281,1.781M10.714,2.659c3.712,0.216,6.691,3.197,6.907,6.908h-6.907V2.659z M10.281,17.354c-4.055,0-7.354-3.298-7.354-7.354c0-3.911,3.067-7.116,6.921-7.341V10c0,0.115,0.045,0.225,0.127,0.305l5.186,5.189C13.863,16.648,12.154,17.354,10.281,17.354M15.775,14.882l-4.449-4.449h6.295C17.522,12.135,16.842,13.684,15.775,14.882"></path></svg>
        }
      ]
    };
    this.switchMode = this.switchMode.bind(this);
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    attribute: PropTypes.oneOf(['scroll'])
  }

  switchMode(mode) {
    this.setState(prevState => ({
      activeMode: prevState.activeMode === mode ? null : mode
    }));
  }

  render() {
    const classes = [
      this.props.attribute ? this.props.attribute : ''
    ]

    return (
      <div className={`site-wrapper ${this.state.activeMode}`}>
        <main className={classes.join(' ')}>
          <div className="modes">
          {this.state.modes.map((mode, index) => {
            const classes = [
              `button--${mode.name}`,
              this.state.activeMode === mode.name ? 'active' : ''
            ]
            return (
              <button
                key={index}
                className={classes.join(' ').trim()}
                onClick={() => this.switchMode(mode.name)}
              >
                <abbr title={`${mode.title}`}>
                  {mode.svg}
                </abbr>
              </button>
            )
          })}
          </div>
          {this.props.children}
        </main>
        <Footer />
      </div>
    )
  }
}

export default Layout
