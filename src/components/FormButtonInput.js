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

    await tl.to(container, { duration: 0.4, width:'45px', ease:Power3.easeOut}) // Width of input to 45px
      .to(this.submitButton, { duration: 0.1, borderRadius: '45px', ease:Power3.easeOut}, 0.1) // Turns input into a circle
      .to(this.submitButton, { duration: 0.23, color:'rgba(240, 240, 240, 0)', ease:Power3.easeOut}, 0) // Alpha 0 for Log In text
      .to(iconLoading, { duration: 0.23, opacity: 1, ease:Power3.easeOut, onEnterFrame: () => { this.setState({loadingIsStopped: false}) }}, 0.23) // Opacity 1 for Loading Icon
      .call(async () => {tl.pause(); error = await submitFunc(); tl.resume()}) // Waits until function is done
      .to(iconLoading, { duration: 0.23, opacity: 0, ease:Power3.easeOut}) // Opacity 0 for Loading Icon

//      if (error === 'empty') {
//       console.error('empty field')
//        tl.to(container, { duration: 0.35, width:'45px', ease:Power3.easeOut}) // Width of input to 45px
//          .to(this.submitButton, { duration: 0.15, borderRadius: '45px', ease:Power3.easeOut}, 0.1) // Turns input into a circle
//          .to(this.submitButton, { duration: 0.23, color:'rgba(240, 240, 240, 0)', ease:Power3.easeOut}, 0) // Alpha 0 for Log In text
//        
//         .to(iconAlert, { duration: 0.23, opacity: 1, ease:Power3.easeOut, onEnterFrame: () => {this.setState({alertIsStopped: false}); iconLoading.style.display = 'none'; this.setState({loadingIsStopped: true})}})
//          .to(this.submitButton, { duration: 0.23, backgroundColor: '#D8000C', ease:Power3.easeOut}, '-=0.23')
//        
//        // .to([this.submitButton, iconAlert], 0.05, {x:'-=2'}, '-=0.06')
//        // .to([this.submitButton, iconAlert], 0.05, {x:'+=4', yoyo:true, repeat: 5}, '-=0.06')
//        // .to([this.submitButton, iconAlert], 0.05, {x:'+=2'}, '-=0.06')
//  
//          .to({}, { duration: 0.7 }) // Waits one second
//          .to(iconAlert, { duration: 0.23, opacity: 0, ease:Power3.easeOut, onComplete: () => {this.setState({alertIsStopped: true}); iconAlert.style.display = 'none';}})
//          .to(this.submitButton, { duration: 0.23, backgroundColor: '#00B8D4', ease:Power3.easeOut}, '-=0.23')
//        .to(container, { duration: 0.4, width:'100%', ease:Power3.easeOut})
//          .to(this.submitButton, { duration: 0.4, borderRadius: '8px', ease:Power3.easeOut}, '-=0.4')
//          .to(this.submitButton, { duration: 0.23, color:'rgba(240, 240, 240, 1)', ease:Power3.easeOut}, '-=0.4')
//        tl.set({}, {onComplete: () => {
//          iconLoading.style.display = 'none'  
//          iconCheckMark.style.display = 'none'
//          iconAlert.style.display = 'none'}})
//          return
//     }

    const type = error.code.includes('email') ? '.email' : error.code.includes('password') ? '.password' : '.general'
    
      const elements = document.querySelectorAll('div' + type)
    
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i]
      let message

      switch (error.code) {
        case 'auth/invalid-email':
        message = 'Email is poorly formatted'
        break;
        case 'auth/user-not-found':
        message = 'No record of user'
        break;
        case 'auth/wrong-password':
        message = 'Password or email are wrong'
        break;
        default:
          message = 'Invalid input'
      }

      element.innerHTML = message
    }


    if (error) {
        tl.call(() =>{console.log('Unsuccesful request for sign up or log into server')})
        tl.to(iconAlert, { duration: 0.23, opacity: 1, ease:Power3.easeOut, onEnterFrame: () => {this.setState({alertIsStopped: false}); iconLoading.style.display = 'none'; this.setState({loadingIsStopped: true})}})
          .to('.error-message', {duration: 0.23, height:'0', ease:Power3.easeOut}, '-=0.23')
          .to(this.submitButton, { duration: 0.23, backgroundColor: '#D8000C', ease:Power3.easeOut}, '-=0.23')
          .to('.error-block' + type, {duration: 0.23, height: '100%', ease:Power3.easeOut, color:'#F0F0F0'}, '-=0.23')
          .to('.icon' + type, {duration: 0.1, fill: '#FAFAFA'}, '-=0.23')
        // .to([this.submitButton, iconAlert], 0.05, {x:'-=2'})
        // .to([this.submitButton, iconAlert], 0.05, {x:'+=4', yoyo:true, repeat: 5})
        // .to([this.submitButton, iconAlert], 0.05, {x:'+=2'})

          .to({}, { duration: 0.7 }) // Waits one second
          .to(iconAlert, { duration: 0.23, opacity: 0, ease:Power3.easeOut, onComplete: () => {this.setState({alertIsStopped: true}); iconAlert.style.display = 'none';}})
          .to(this.submitButton, { duration: 0.23, backgroundColor: '#00B8D4', ease:Power3.easeOut}, '-=0.23')
          .to(container, { duration: 0.4, width:'100%', ease:Power3.easeOut})
          .to(this.submitButton, { duration: 0.4, borderRadius: '8px', ease:Power3.easeOut}, '-=0.4')
          .to(this.submitButton, { duration: 0.23, color:'rgba(240, 240, 240, 1)', ease:Power3.easeOut}, '-=0.4')
          .to('.error-block', {duration: 0.23, height: '0%', ease:Power3.easeOut, color:'#D8000C'})
          .to('.icon', {duration: 0.1, fill: '#2D2D2D'}, '-=0.23')
          .to('.error-message' + type, {duration: 0.23, height:'13px', ease:Power3.easeOut}, '-=0.22')
      } else {
        tl.call(() =>{console.log('Succesful request for sign up or login into server')})
        tl.to(iconCheckMark, { duration: 0.23, opacity: 1, ease:Power3.easeOut, onEnterFrame: () => {this.setState({checkmarkIsStopped: false}); iconLoading.style.display = 'none'; this.setState({loadingIsStopped: true})}}) // opacity 1 for check mark and removes loading icon
        .to(this.submitButton, { duration: 0.23, backgroundColor: '#00C853', ease:Power3.easeOut}, '-=0.23') // Changes background color to green
        .to('#NavLogIn, #NavSignUp', { duration: 0.23, opacity: 0, ease: Power3.easeOut})
        .set('#NavMyAccount', {display: 'inline-block'})
        .set('#NavLogIn, #NavSignUp', {display: 'none'})
        .to('#NavMyAccount', { duration: 0.23, opacity: 1, ease: Power3.easeOut})
        .to({}, { duration: 0.7, onComplete: () => removeForm(formId)}) // Waits 0.7 seconds
        .to({}, { duration: 0.7 })
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
