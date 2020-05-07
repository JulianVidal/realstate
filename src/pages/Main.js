import React from 'react'
import { TimelineLite, Power3 } from 'gsap'
import NavBar from '../components/NavBar'
import MainText from '../components/MainText'
import MainSearch from '../components/MainSearch'
import LogIn from '../components/LogIn'
import SignUp from '../components/SignUp'
import './Main.scss'

function Main () {

  const handleClick = () => {
    const LogIn = document.getElementById('LogIn')
    const SignUp = document.getElementById('SignUp')

    if (LogIn.style.display === 'block') {
      removeForm('LogIn')
    } else if (SignUp.style.display === 'block') {
      removeForm('SignUp')
    }
  }

  return (
    <div id="Main">
      <NavBar />
      <MainText />
      <MainSearch />
      <LogIn />
      <SignUp />
      <div id="Overlay" onClick={handleClick}></div>
    </div>
  )
}

export function removeForm (formId) {
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
}

export default Main
