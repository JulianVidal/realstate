import React from 'react'
import './NavBar.scss'
import NavItem from './NavItem'

function NavBar () {
  return(
    <nav>
      <ul>
          <NavItem text="Rentify" id="NavRentify"/>

          <NavItem text="Sign Up" id="NavSignUp"/>

          <NavItem text="Log In" id="NavLogIn" />

          <NavItem text="My Account" id="NavMyAccount" />
      </ul>
    </nav>
  )
}

export default NavBar
