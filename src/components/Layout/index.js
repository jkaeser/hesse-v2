import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import Starfield from "../Starfield"
import Footer from "../Footer"

import "./styles/all.scss"

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMode: 'default',
      windowSize: {
        width: 0,
        height: 0
      }
    }
    this.switchMode = this.switchMode.bind(this);
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    attribute: PropTypes.oneOf(['scroll'])
  }

  modes = [
    {
      name: 'contrast',
      title: 'High Contrast',
      svg: <svg role="presentation" viewBox="0 0 20 20">{/* Kindly provided by Matthew Skilles (https://dribbble.com/shots/1925069-Lynny-Icon-Set-Free) */}<path d="M10,0.469c-5.264,0-9.531,4.268-9.531,9.531c0,5.265,4.268,9.531,9.531,9.531c5.265,0,9.531-4.267,9.531-9.531C19.531,4.736,15.265,0.469,10,0.469 M10,18.665c-4.786,0-8.665-3.88-8.665-8.665c0-4.786,3.879-8.665,8.665-8.665V18.665z"></path></svg>
    },
    {
      name: 'space',
      title: 'Space',
      svg: <svg role="presentation" title="R2D2" description="A simple illustration of R2D2, the droid character from the Star Wars film franchise." viewBox="0 0 20 20">{/* Kindly provided by Jory Rafael (https://dribbble.com/shots/1400124-More-Free-Star-Wars-Icons) */}<path fill="none" d="M18.21,16.157v-8.21c0-0.756-0.613-1.368-1.368-1.368h-1.368v1.368v1.368v6.841l-1.368,3.421h5.473L18.21,16.157z"></path><path fill="none" d="M4.527,9.316V7.948V6.579H3.159c-0.756,0-1.368,0.613-1.368,1.368v8.21l-1.368,3.421h5.473l-1.368-3.421V9.316z"></path><path fill="none" d="M14.766,5.895h0.023V5.21c0-2.644-2.145-4.788-4.789-4.788S5.211,2.566,5.211,5.21v0.685h0.023H14.766zM12.737,3.843c0.378,0,0.684,0.307,0.684,0.684s-0.306,0.684-0.684,0.684c-0.378,0-0.684-0.307-0.684-0.684S12.358,3.843,12.737,3.843z M10,1.448c0.755,0,1.368,0.613,1.368,1.368S10.755,4.185,10,4.185c-0.756,0-1.368-0.613-1.368-1.368S9.244,1.448,10,1.448z"></path><path fill="none" d="M14.789,6.579H5.211v9.578l1.368,1.368h6.841l1.368-1.368V6.579z M12.052,12.052H7.948c-0.378,0-0.684-0.306-0.684-0.684c0-0.378,0.306-0.684,0.684-0.684h4.105c0.378,0,0.684,0.306,0.684,0.684C12.737,11.746,12.431,12.052,12.052,12.052z M12.052,9.316H7.948c-0.378,0-0.684-0.307-0.684-0.684s0.306-0.684,0.684-0.684h4.105c0.378,0,0.684,0.307,0.684,0.684S12.431,9.316,12.052,9.316z"></path></svg>
    }
  ];

  componentDidMount() {
    this.setState(() => ({
      windowSize: {
        width: window.outerWidth,
        height: window.outerHeight
      },
      activeMode: window.sessionStorage.getItem('jkSiteMode'),
    }));
  }

  switchMode(mode) {
    const newMode = this.state.activeMode === mode ? 'default' : mode;
    this.setState(() => ({
      activeMode: newMode,
    }));
    window.sessionStorage.setItem('jkSiteMode', newMode);
  }

  render() {
    const classes = [
      this.props.attribute ? this.props.attribute : ''
    ]

    return (
      <div className='site-wrapper'>
        <Helmet bodyAttributes={{ class: this.state.activeMode }} />
        <Starfield
          width={this.state.windowSize.width}
          height={this.state.windowSize.height}
        />
        <a className="skip-link" href="#main">Skip to main content</a>
        <main className={classes.join(' ').trim()}>
          <div className="mode-switcher">
          {this.modes.map((mode, index) => {
            const classes = [
              `button--${mode.name}`,
              this.state.activeMode === mode.name ? 'active' : ''
            ]
            return (
              <button
                key={index}
                className={classes.join(' ').trim()}
                title={`${mode.name} mode`}
                onClick={() => this.switchMode(mode.name)}
                aria-pressed={this.state.activeMode === mode.name ? 'true' : 'false'}
              >
                <span className="visually-hidden">
                  {`Toggle ${mode.name} mode.`}
                </span>
                {mode.svg}
              </button>
            )
          })}
          </div>
          <span id="main"></span>
          {this.props.children}
        </main>
        <Footer />
      </div>
    )
  }
}

export default Layout
