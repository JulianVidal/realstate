import React from 'react'
import {  ReactComponent as ArrowIcon } from '../assets/icons/arrow.svg'
import { TimelineLite, Power3 } from 'gsap'
import './NavItem.scss'

function NavItem ({text, id}) {
  let icon

  const handleClick = () => {
    if (id === 'NavLogIn') {
      formDisplay('LogIn')
    } else if (id === 'NavSignUp') {
      formDisplay('SignUp')
    }
  }

  if (id === 'NavMyAccount') icon = <ArrowIcon height='18px' width='18px'/>

  return (
    <li id={id} onClick={handleClick} > {text} { icon } </li>
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
