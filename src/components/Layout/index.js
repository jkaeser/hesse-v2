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

  switchMode() {
    if (this.state.colorMode === 'default') {
      this.setState(prevState => ({
        colorMode: 'contrast',
      }))
    }
    else {
      this.setState(prevState => ({
        colorMode: 'default',
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
        <button onClick={this.switchMode}>Switch Color Mode</button>
        <footer>© {new Date().getFullYear()}</footer>
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  cols: PropTypes.oneOf(['1', '2', '3']),
  attribute: PropTypes.string
}

Layout.defaultProps = {
  cols: '1'
}

export default Layout
