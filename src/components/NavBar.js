import React from 'react'
import './NavBar.scss'
import NavItem from './NavItem'

function NavBar () {
  return(
    <nav>
      <ul>
          <NavItem text="Rentify" />

          <NavItem text="Sign Up" />

          <NavItem text="Log In" />
      </ul>
    </nav>
  )
}

export default NavBar
