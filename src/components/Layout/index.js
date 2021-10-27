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
    // {
    //   name: 'hue-rotate',
    //   title: 'Color Shift',
    //   svg: <svg role="presentation" viewBox="0 0 19 19">{/* Kindly provided by Silviu Runceanu (https://dribbble.com/shots/1511137--FREE-Flat-Icons-Set-2) */}<path fill="none" d="M11.015,11.009l5.063,1.191c0.288,0.068,0.579-0.088,0.682-0.364c0.35-0.931,0.528-1.909,0.528-2.91c0-4.559-3.71-8.269-8.27-8.269c-4.559,0-8.269,3.71-8.269,8.269c0,4.56,3.71,8.27,8.269,8.27c0.891,0,1.768-0.144,2.605-0.426c0.279-0.094,0.445-0.38,0.389-0.668L11.015,11.009z M9.018,16.024c-3.914,0-7.097-3.185-7.097-7.099s3.184-7.097,7.097-7.097s7.098,3.184,7.098,7.097c0,0.686-0.097,1.36-0.291,2.012l-5.427-1.276c-0.192-0.046-0.397,0.01-0.54,0.147c-0.144,0.138-0.207,0.339-0.169,0.534l1.07,5.461C10.193,15.951,9.61,16.024,9.018,16.024z"></path><path fill="none" d="M19.183,13.897c-0.08-0.149-0.22-0.256-0.384-0.295l-5.945-1.398c-0.191-0.046-0.397,0.01-0.54,0.147c-0.143,0.138-0.207,0.34-0.168,0.534l1.171,5.985c0.032,0.165,0.135,0.309,0.281,0.394c0.089,0.052,0.191,0.079,0.293,0.079c0.064,0,0.127-0.01,0.188-0.031c0.154-0.052,3.75-1.311,5.134-4.931C19.272,14.223,19.261,14.046,19.183,13.897z M14.325,17.928l-0.857-4.377l4.375,1.029C16.896,16.443,15.229,17.48,14.325,17.928z"></path></svg>
    // },
    {
      name: 'space',
      title: 'Space',
      svg: <svg role="presentation" title="R2D2" description="A simple illustration of R2D2, the droid character from the Star Wars film franchise." viewBox="0 0 20 20">{/* Kindly provided by Jory Rafael (https://dribbble.com/shots/1400124-More-Free-Star-Wars-Icons) */}<path fill="none" d="M18.21,16.157v-8.21c0-0.756-0.613-1.368-1.368-1.368h-1.368v1.368v1.368v6.841l-1.368,3.421h5.473L18.21,16.157z"></path><path fill="none" d="M4.527,9.316V7.948V6.579H3.159c-0.756,0-1.368,0.613-1.368,1.368v8.21l-1.368,3.421h5.473l-1.368-3.421V9.316z"></path><path fill="none" d="M14.766,5.895h0.023V5.21c0-2.644-2.145-4.788-4.789-4.788S5.211,2.566,5.211,5.21v0.685h0.023H14.766zM12.737,3.843c0.378,0,0.684,0.307,0.684,0.684s-0.306,0.684-0.684,0.684c-0.378,0-0.684-0.307-0.684-0.684S12.358,3.843,12.737,3.843z M10,1.448c0.755,0,1.368,0.613,1.368,1.368S10.755,4.185,10,4.185c-0.756,0-1.368-0.613-1.368-1.368S9.244,1.448,10,1.448z"></path><path fill="none" d="M14.789,6.579H5.211v9.578l1.368,1.368h6.841l1.368-1.368V6.579z M12.052,12.052H7.948c-0.378,0-0.684-0.306-0.684-0.684c0-0.378,0.306-0.684,0.684-0.684h4.105c0.378,0,0.684,0.306,0.684,0.684C12.737,11.746,12.431,12.052,12.052,12.052z M12.052,9.316H7.948c-0.378,0-0.684-0.307-0.684-0.684s0.306-0.684,0.684-0.684h4.105c0.378,0,0.684,0.307,0.684,0.684S12.431,9.316,12.052,9.316z"></path></svg>
    }
  ];

  componentDidMount() {
    this.setState(() => ({
      windowSize: {
        width: window.innerWidth,
        height: window.innerHeight
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
        <a class="skip-link" href="#main">Skip to main content</a>
        <main className={classes.join(' ').trim()}>
          <div className="modes">
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
