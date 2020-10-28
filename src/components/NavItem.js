import React from 'react'
import { withRouter } from 'react-router-dom'
import { formDisplay } from './Form'
import './NavItem.scss'

function NavItem ({text, id, type = '', color, DropDown, icon, children, history}) {
  const className = 'NavItem ' + type + (DropDown ? ' NavDropDown' : '') + ( color === 'dark' ? ' dark' : '')

  const handleClick = () => {
    if (id === 'NavLogIn') {
      formDisplay('LogIn')
    } else if (id === 'NavSignUp') {
      formDisplay('SignUp')
    } else if (id === 'NavRentify' && history) {
      history.replace('/')
    }
  }

  return (
  <li id={id} className={className} onClick={handleClick} > {text} { icon } { DropDown }  {children}</li>
  )
}

export default withRouter(NavItem)
