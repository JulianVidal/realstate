import React from 'react'
import { TimelineLite, Power3 } from 'gsap'
import './NavItem.scss'

function NavItem ({text}) {
  const className = text.split(' ')[0]

  const handleClick = () => {
    if (className === 'Log') {
      formDisplay('LogIn')
    } else if (className === 'Sign') {
      formDisplay('SignUp')
    }
  }

  return (
    <li className={className} onClick={handleClick}> {text} </li>
  )
}

function formDisplay (formId) {  
  
  const Form = document.getElementById(formId)
  const Overlay = document.getElementById('Overlay')

  if (Overlay.style.display === 'block') return

  Form.style.display = 'block'
  Overlay.style.display = 'block'

  const tl = new TimelineLite()
  tl.from(Form, 0.5, { width: '0', height: '10px', ease: Power3.easeOut})
    .to(Form, 0.5, {opacity: 1, ease:Power3.easeOut}, 0)
    .to(Overlay, 0.5, { opacity:1, ease: Power3.easeOut }, 0)
}

export default NavItem
