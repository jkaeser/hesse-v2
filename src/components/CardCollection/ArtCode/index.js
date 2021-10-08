import React, {useState} from "react"
import PropTypes from "prop-types"

import "./art-code.scss"

const ArtCode = ({id}) => {
  const [clicked, setClicked] = useState(false);

  const handleInteraction = (e, id) => {
    const validKeys = [
      13, // enter/return
      32, // spacebar
    ];
    if (
      (e.type === "keydown" && validKeys.indexOf(e.keyCode) !== -1) ||
      e.type === "click"
    ) {
      e.preventDefault();
      navigator.clipboard.writeText(id);
      setClicked(true);
      setTimeout(() => {
        setClicked(false);
      }, 2500)
    }
  }

  const popupClasses = [
    'art-code__popup',
    clicked ? 'active' : '',
  ];

  return (
    <div className="art-code">
      <p>Scryfall Art ID:</p>
      <code
        className="art-code__code"
        role="button"
        tabIndex="0"
        ariaLabel="Copy art ID to clipboard"
        onClick={(e) => handleInteraction(e, id)}
        onKeyDown={(e) => handleInteraction(e, id)}
      >
        {id}
      </code>
      <span
        className={popupClasses.join(' ').trim()}
        aria-hidden={!clicked}
      >
        Copied to clipboard
      </span>
    </div>
  )
}

ArtCode.propTypes = {
  id: PropTypes.string
}

ArtCode.defaultProps = {
  id: ''
}

export default ArtCode
