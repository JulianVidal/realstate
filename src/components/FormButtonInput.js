import React, { Component } from 'react'
import { removeForm } from '../components/Form'
import { TimelineLite, Power3 } from 'gsap'
import Lottie from 'react-lottie-wrapper'
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
      <div className="FormButtonInput" onClick={ () => this.handleSubmit(this.props.submit)} >
        <input type='submit' value={this.props.text} ref={ button => this.submitButton = button}></input>

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

  handleSubmit = async submitFunc => {
    const formId = this.submitButton.parentNode.parentNode.parentNode.id
    const container = this.submitButton.parentNode
    const iconLoading = container.childNodes[1]
    const iconCheckMark = container.childNodes[2]
    const iconAlert = container.childNodes[3]
  
    if (iconCheckMark.style.opacity === '1' || iconAlert.style.opacity === '1' || iconLoading.style.opacity === '1') return
    if (iconCheckMark.style.display === 'block' || iconAlert.style.display === 'block' || iconLoading.style.display === 'block') return

    iconLoading.style.display = 'block'  
    iconCheckMark.style.display = 'block'
    iconAlert.style.display = 'block'

    let error
    const tl = new TimelineLite()

    if (await submitFunc() === 'empty') {
      console.error('empty field')
      tl.to(container, 0.35, {width:'45px', ease:Power3.easeOut}) // Width of input to 45px
      .to(this.submitButton, 0.15, {borderRadius: '45px', ease:Power3.easeOut}, 0.1) // Turns input into a circle
      .to(this.submitButton, 0.23, {color:'rgba(240, 240, 240, 0)', ease:Power3.easeOut}, 0) // Alpha 0 for Log In text
      
      .to(iconAlert, 0.23, {opacity: 1, ease:Power3.easeOut, onEnterFrame: () => {this.setState({alertIsStopped: false}); iconLoading.style.display = 'none'; this.setState({loadingIsStopped: true})}})
      .to(this.submitButton, 0.23, {backgroundColor: '#D8000C', ease:Power3.easeOut}, '-=0.23')
      
      .to([this.submitButton, iconAlert], 0.05, {x:'-=2'}, '-=0.06')
      .to([this.submitButton, iconAlert], 0.05, {x:'+=4', yoyo:true, repeat: 5}, '-=0.06')
      .to([this.submitButton, iconAlert], 0.05, {x:'+=2'}, '-=0.06')

      .to({}, 0.7, {}) // Waits one second
      .to(iconAlert, 0.23, {opacity: 0, ease:Power3.easeOut, onComplete: () => {this.setState({alertIsStopped: true}); iconAlert.style.display = 'none';}})
      .to(this.submitButton, 0.23, {backgroundColor: '#00B8D4', ease:Power3.easeOut}, '-=0.23')
      .to(container, 0.4, {width:'100%', ease:Power3.easeOut})
      .to(this.submitButton, 0.4, {borderRadius: '8px', ease:Power3.easeOut}, '-=0.4')
      .to(this.submitButton, 0.23, {color:'rgba(240, 240, 240, 1)', ease:Power3.easeOut}, '-=0.4')
      tl.set({}, {onComplete: () => {
        iconLoading.style.display = 'none'  
        iconCheckMark.style.display = 'none'
        iconAlert.style.display = 'none'}})
        return
    }

    await tl.to(container, 0.4, {width:'45px', ease:Power3.easeOut}) // Width of input to 45px
      .to(this.submitButton, 1, {borderRadius: '45px', ease:Power3.easeOut}, 0.1) // Turns input into a circle
      .to(this.submitButton, 0.23, {color:'rgba(240, 240, 240, 0)', ease:Power3.easeOut}, 0) // Alpha 0 for Log In text
      .to(iconLoading, 0.23, {opacity: 1, ease:Power3.easeOut, onEnterFrame: () => { this.setState({loadingIsStopped: false}) }}, 0.23) // Opacity 1 for Loading Icon
      .call(async () => {tl.pause(); error = await submitFunc(); console.log(error); tl.resume()}) // Waits until function is done
      .to(iconLoading, 0.23, {opacity: 0, ease:Power3.easeOut}) // Opacity 0 for Loading Icon

      if (error) {
        tl.call(() =>{console.log('1', error)})
        tl.to(iconAlert, 0.23, {opacity: 1, ease:Power3.easeOut, onEnterFrame: () => {this.setState({alertIsStopped: false}); iconLoading.style.display = 'none'; this.setState({loadingIsStopped: true})}})
        .to(this.submitButton, 0.23, {backgroundColor: '#D8000C', ease:Power3.easeOut}, '-=0.23')

        .to([this.submitButton, iconAlert], 0.05, {x:'-=2'})
        .to([this.submitButton, iconAlert], 0.05, {x:'+=4', yoyo:true, repeat: 5})
        .to([this.submitButton, iconAlert], 0.05, {x:'+=2'})

        .to({}, 0.7, {}) // Waits one second
        .to(iconAlert, 0.23, {opacity: 0, ease:Power3.easeOut, onComplete: () => {this.setState({alertIsStopped: true}); iconAlert.style.display = 'none';}})
        .to(this.submitButton, 0.23, {backgroundColor: '#00B8D4', ease:Power3.easeOut}, '-=0.23')
        .to(container, 0.4, {width:'100%', ease:Power3.easeOut})
        .to(this.submitButton, 0.4, {borderRadius: '8px', ease:Power3.easeOut}, '-=0.4')
        .to(this.submitButton, 0.23, {color:'rgba(240, 240, 240, 1)', ease:Power3.easeOut}, '-=0.4')
      } else {
        tl.call(() =>{console.log('2', error)})
        tl.to(iconCheckMark, 0.23, {opacity: 1, ease:Power3.easeOut, onEnterFrame: () => {this.setState({checkmarkIsStopped: false}); iconLoading.style.display = 'none'; this.setState({loadingIsStopped: true})}}) // opacity 1 for check mark and removes loading icon
        .to(this.submitButton, 0.23, {backgroundColor: '#00C853', ease:Power3.easeOut}, '-=0.23') // Changes background color to green
        .to('#NavLogIn, #NavSignUp', 0.23, {opacity: 0, ease: Power3.easeOut})
        .set('#NavMyAccount', {display: 'flex'})
        .set('#NavLogIn, #NavSignUp', {display: 'none'})
        .to('#NavMyAccount', 0.23, {opacity: 1, ease: Power3.easeOut})
        .to({}, 0.7, {onComplete: () => removeForm(formId)}) // Waits 0.7 seconds
        .to({}, 0.7, {})
        .set(iconCheckMark, {opacity: 0, onComplete: () => {this.setState({checkmarkIsStopped: true}); iconCheckMark.style.display = 'none';}})
        .set(this.submitButton, {backgroundColor: '#00B8D4', ease:Power3.easeOut})
        .set(container, {width:'100%', ease:Power3.easeOut})
        .set(this.submitButton, {borderRadius: '8px', ease:Power3.easeOut})
        .set(this.submitButton, {color:'rgba(240, 240, 240, 1)', ease:Power3.easeOut})
      }




      tl.set({}, {onComplete: () => {
        iconLoading.style.display = 'none'  
        iconCheckMark.style.display = 'none'
        iconAlert.style.display = 'none'}})
  }
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
