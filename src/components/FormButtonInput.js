import React, { Component } from 'react'
import { TimelineLite, Power3 } from 'gsap'
// import Lottie from 'react-lottie'
import './FormButtonInput.scss'

class FormButtonInput extends Component {

  render () {
    return (
      <div className="FormButtonInput" onClick={Submit}>
        <input type='button' value={this.props.text}></input>
      </div>
    )
  }
}

function Submit (event) {
  const container = event.target.parentNode
  const tl = new TimelineLite()

  tl.to(container, 0.3, {width: '45px', borderRadius: '100% 100% 100% 100%', ease:Power3.easeOut})
}

export default FormButtonInput
