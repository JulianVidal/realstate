import React from 'react'
import NavBar from '../components/NavBar'
import NavItem from '../components/NavItem'
import './Properties.scss'

function Properties () {
  return (
    <div id='Properties'>
    <NavBar>
        <NavItem text="Rentify" id="NavRentify" type="logo"/>
        <NavItem text="Log In" id="NavLogIn" />
        <NavItem text="Sign Up" id="NavSignUp" type="fill"/>
      </NavBar>
    </div>
  )
}

export default Properties
