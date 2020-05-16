import React from 'react'
import { formDisplay } from './Form'
import './NavItem.scss'

function NavItem ({text, id, type = '', DropDown, icon}) {
  const className = 'NavItem ' + type + (DropDown ? ' NavDropDown' : '')

  const handleClick = () => {
    if (id === 'NavLogIn') {
      formDisplay('LogIn')
    } else if (id === 'NavSignUp') {
      formDisplay('SignUp')
    }
  }

  return (
      <li id={id} className={className} onClick={handleClick} > {text} { icon } { DropDown } </li>
  )
}

export default NavItem
