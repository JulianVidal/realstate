import React, { Component } from 'react'
import { TimelineLite, Power3 } from 'gsap'

class Form extends Component {

  render() {
    const { title, children, id, footer } = this.props

    return (
      <div className='Form' id={id}>
        <h2> {title} </h2>
        <form onSubmit={this.handleSubmit} ref={ form => this.formRef = form }>
          { children }
        </form>

        <div className='footer'>
          { footer }
        </div>
      </div>
    )
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.formRef.querySelector('input[type=submit]').click()
  }
}

export function formDisplay (formId) {  
  const Form = document.getElementById(formId)
  const Overlay = document.getElementById('Overlay')

  if (Overlay.style.display === 'block') return

  Form.style.display = 'flex'
  Overlay.style.display = 'block'

  const tl = new TimelineLite()
  tl.from(Form, 0.5, { width: '0', height: '10px', ease: Power3.easeOut})
    .to(Form, 0.5, {opacity: 1, ease:Power3.easeOut}, 0)
    .to(Overlay, 0.5, { opacity:1, ease: Power3.easeOut }, 0)
}

export function removeForm (formId, otherFormId) {
  const Form = document.getElementById(formId)
  const Overlay = document.getElementById('Overlay')
  
  const loadingIcon = Form.getElementsByClassName('FormButtonInput')[0].childNodes[1]

  if (loadingIcon.style.display === 'block') return

  const tl = new TimelineLite()


  const finishtl = () => {
    Overlay.style.pointerEvents = ''
    Form.style.pointerEvents = ''
    Overlay.style.display = 'none'
    Form.style.display = 'none'
    Form.style.width = ''
    Form.style.height = ''
  }
  
  Overlay.style.pointerEvents = 'none'
  Form.style.pointerEvents = 'none'

  tl.to(Form, 0.5, { width: '0', height: '0', ease: Power3.easeOut})
    .to(Form, 0.5, {opacity: 0, ease:Power3.easeOut}, 0)
    .to(Overlay, 0.5, { opacity: 0, ease: Power3.easeOut, onComplete: finishtl }, 0)
  
  if (otherFormId) {
    tl.to({}, 0, {onComplete: () => formDisplay(otherFormId)})
  }
}

export function switchForm(currentFormId, otherFormId) {
  removeForm(currentFormId, otherFormId)
}

export default Form
