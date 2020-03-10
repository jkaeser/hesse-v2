import React from "react"
import PropTypes from "prop-types"

import "./layout.css"

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorMode: 'default'
    };
    this.switchMode = this.switchMode.bind(this);
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    cols: PropTypes.oneOf(['1', '2', '3']),
    attribute: PropTypes.string
  }

  static defaultProps = {
    cols: '1'
  }

  switchMode(mode) {
    if (this.state.colorMode === 'default') {
      this.setState(prevState => ({
        colorMode: mode,
      }))
    }
    else {
      this.setState(prevState => ({
        colorMode: prevState.colorMode === mode ? 'default' : mode,
      }))
    }
  }

  render() {
    const classes = [
      'cols cols--' + this.props.cols,
      this.props.attribute ? this.props.attribute : '',
    ]

    return (
      <div className={`site-wrapper ${this.state.colorMode}`}>
        <main className={classes.join(' ')}>
          {this.props.children}
        </main>
        <button onClick={() => {this.switchMode('contrast')}}>Contrast Mode</button>
        <button onClick={() => {this.switchMode('hue-rotate')}}>Hue-rotate Mode</button>
        <footer>© {new Date().getFullYear()}</footer>
      </div>
    )
  }
}

export default Layout
