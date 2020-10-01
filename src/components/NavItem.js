import React from 'react'
import { formDisplay } from './Form'
import './NavItem.scss'

function NavItem ({text, id, type = '', color, DropDown, icon, children}) {
  const className = 'NavItem ' + type + (DropDown ? ' NavDropDown' : '') + ( color === 'dark' ? ' dark' : '')

  const handleClick = () => {
    if (id === 'NavLogIn') {
      formDisplay('LogIn')
    } else if (id === 'NavSignUp') {
      formDisplay('SignUp')
    }
  }

  return (
  <li id={id} className={className} onClick={handleClick} > {text} { icon } { DropDown }  {children}</li>
  )
}

export default NavItem
