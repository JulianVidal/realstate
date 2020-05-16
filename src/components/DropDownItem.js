import React from 'react'
import { TimelineLite, Power3 } from 'gsap'
import './DropDownItem.scss'

function DropDownItem ({ text, type }) {
  const className = 'DropDownItem ' + type

  const handleClick = () => {
    if (type === 'logout') {
      LogOut ()
    }

  }

  return (
    <p className={className} onClick={handleClick}>{text}</p>
  )
}

function LogOut () {
  const tl = new TimelineLite()

  tl.to('#NavMyAccount', 0.23, {opacity: 0, ease: Power3.easeOut})
  .set('#NavLogIn, #NavSignUp', {display: 'block'})
  .set('#NavMyAccount', {display: 'none'})
  .to('#NavLogIn, #NavSignUp', 0.23, {opacity: 1, ease: Power3.easeOut})
}

export default DropDownItem
