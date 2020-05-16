import React from 'react'
import { removeForm } from '../components/Form'
import NavBar from '../components/NavBar'
import {  ReactComponent as ArrowIcon } from '../assets/icons/arrow.svg'
import NavItem from '../components/NavItem'
import DropDown from '../components/DropDown'
import DropDownItem from '../components/DropDownItem'
import MainText from '../components/MainText'
import MainSearch from '../components/MainSearch'
import LogIn from '../components/LogIn'
import SignUp from '../components/SignUp'
import './Main.scss'

function Main () {

  const handleClick = () => {
    const LogIn = document.getElementById('LogIn')
    const SignUp = document.getElementById('SignUp')

    if (LogIn.style.display === 'flex') {
      removeForm('LogIn')
    } else if (SignUp.style.display === 'flex') {
      removeForm('SignUp')
    }
  }

  
  const dropDown = 
    <DropDown>
      <DropDownItem text='Log Out' type='logout'/>
    </DropDown>

  return (
    <div id="Main">
      <NavBar>
        <NavItem text="Rentify" id="NavRentify" type="logo"/>
        <NavItem text="Log In" id="NavLogIn" />
        <NavItem text="Sign Up" id="NavSignUp" type="fill"/>
        <NavItem text="My Account" id="NavMyAccount" DropDown={dropDown} type="hidden" icon={<ArrowIcon/>}/>
      </NavBar>
      <MainText />
      <MainSearch />
      <LogIn />
      <SignUp />
      <div id="Overlay" onClick={handleClick}></div>
    </div>
  )
}

export default Main
