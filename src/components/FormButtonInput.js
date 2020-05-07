import React, { Component } from 'react'
import {removeForm} from '../pages/Main'
import { TimelineLite, Power3 } from 'gsap'
import Lottie from 'react-lottie'
import iconLoadingData from '../assets/icons/loading.json'
import iconCheckmarkData from '../assets/icons/checkmark.json'
import iconAlertData from '../assets/icons/alert.json'

import './FormButtonInput.scss'

class FormButtonInput extends Component {

  state = {
    loadingIsStopped: true,
    checkmarkIsStopped: true,
    alertIsStopped: true
  }

  render () {
    return (
      <div className="FormButtonInput" onClick={ event => Submit(event, this)} >
        <input type='submit' value={this.props.text}></input>

        <Lottie options={IconData('loading')}
                height={30}
                width={30}
                isStopped={this.state.loadingIsStopped}
                isClickToPauseDisabled={true}
        />

        <Lottie options={IconData('checkmark')}
                height={30}
                width={30}
                isStopped={this.state.checkmarkIsStopped}
                isClickToPauseDisabled={true}
        />

        <Lottie options={IconData('alert')}
                height={30}
                width={30}
                isStopped={this.state.alertIsStopped}
                isClickToPauseDisabled={true}
        />

      </div>
    )
  }
}

function Submit ({ target }, component) {
  if (target.tagName !== 'INPUT') return
  const formId = target.parentNode.parentNode.parentNode.id
  const container = target.parentNode
  const iconLoading = target.parentNode.childNodes[1]
  const iconCheckMark = target.parentNode.childNodes[2]
  const iconAlert = target.parentNode.childNodes[3]

  if (iconCheckMark.style.opacity === '1' || iconAlert.style.opacity === '1') return

  iconLoading.style.display = 'block'  
  iconCheckMark.style.display = 'block'
  iconAlert.style.display = 'block'


  const tl = new TimelineLite()

  tl.to(container, 0.4, {width:'45px', ease:Power3.easeOut}) // Width of input to 45px
    .to(target, 1, {borderRadius: '100%', color:'rgba(240, 240, 240, 0)', ease:Power3.easeOut}, 0.1) // Turns input into a circle
    .to(target, 0.23, {color:'rgba(240, 240, 240, 0)', ease:Power3.easeOut}, 0) // Alpha 0 for Log In text
    .to(iconLoading, 0.23, {opacity: 1, ease:Power3.easeOut, onComplete: () => { component.setState({loadingIsStopped: false}) }}, 0.23) // Opacity 1 for Loading Icon
    .to({}, 1, {}) // Waits one second
    .to(iconLoading, 0.23, {opacity: 0, ease:Power3.easeOut}) // Opacity 0 for Loading Icon
    // .to(iconAlert, 0.23, {opacity: 1, ease:Power3.easeOut, onEnterFrame: () => {component.setState({alertIsStopped: false}); iconLoading.style.display = 'none'; component.setState({loadingIsStopped: true})}})
    // .to(target, 0.23, {backgroundColor: '#D8000C', ease:Power3.easeOut}, '-=0.23')
    .to(iconCheckMark, 0.23, {opacity: 1, ease:Power3.easeOut, onEnterFrame: () => {component.setState({checkmarkIsStopped: false}); iconLoading.style.display = 'none'; component.setState({loadingIsStopped: true})}}) // opacity 1 for check mark and removes loading icon
    .to(target, 0.23, {backgroundColor: '#00C853', ease:Power3.easeOut}, '-=0.23') // Changes background color to green
    .to({}, 0.7, {onComplete: () => removeForm(formId)}) // Waits one second
}

function IconData (dataName) {
  let loop, animationData

  if (dataName === 'loading') {
    loop = true
    animationData = iconLoadingData
  } else if (dataName === 'checkmark') {
    loop = false
    animationData = iconCheckmarkData
  } else if (dataName === 'alert') {
    loop = false
    animationData = iconAlertData
  }

  return {
    loop,
    render: 'svg',
    animationData,
    autoplay: true,
    renderSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
}

export default FormButtonInput
