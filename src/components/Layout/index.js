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
        <ModeSwitch onModeChange={() => {this.switchMode('contrast')}}>High Contrast</ModeSwitch>
        <ModeSwitch onModeChange={() => {this.switchMode('hue-rotate')}}>Color Shift</ModeSwitch>
        <footer>© {new Date().getFullYear()}</footer>
      </div>
    )
  }
}

class ModeSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  static propTypes = {
    onModeChange: PropTypes.func,
  }

  handleChange(e) {
    this.props.onModeChange(e.target.value);
  }

  render() {
    return (
      <button onClick={this.handleChange}>
        {this.props.children}
      </button>
    )
  }
}

export default Layout
