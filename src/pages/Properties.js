import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import NavItem from '../components/NavItem'
import PropertyCards from '../components/PropertyCards'
import { removeForm } from '../components/Form'
import SearchBox from '../components/SearchBox'
import LogIn from '../components/LogIn'
import SignUp from '../components/SignUp'
import DropDown from '../components/DropDown'
import DropDownItem from '../components/DropDownItem'
import {  ReactComponent as ArrowIcon } from '../assets/icons/arrow.svg'
import './Properties.scss'

class Properties extends Component {

  render() {
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
      <div id="Properties">
        <NavBar>
          {/* <NavItem text="Rentify" id="NavRentify" type="logo" color="dark"/> */}
          <NavItem id="NavSearchBox"><SearchBox /></NavItem>
          <NavItem text="Log In" id="NavLogIn" color="dark" />
          <NavItem text="Sign Up" id="NavSignUp" type="fill"/>
          <NavItem text="My Account" id="NavMyAccount" DropDown={dropDown} color="dark" type="hidden" icon={<ArrowIcon/>}/>
        </NavBar>
        <PropertyCards />
        <LogIn />
        <SignUp />
        <div id="Overlay" onClick={handleClick}></div>
      </div>
    )
  }
}
// {/* <NavItem id="NavSearchOptions"><SearchOptions type='dark' /></NavItem> */}

// function Properties({history, location}) {
//   const handleClick = () => {
//     const LogIn = document.getElementById('LogIn')
//     const SignUp = document.getElementById('SignUp')

//     if (LogIn.style.display === 'flex') {
//       removeForm('LogIn')
//     } else if (SignUp.style.display === 'flex') {
//       removeForm('SignUp')
//     }
//   }
//   const handleScroll= () => {
//     console.log('hhelo')
//   }

//   const dropDown = 
//   <DropDown>
//     <DropDownItem text='Log Out' type='logout'/>
//   </DropDown>

//   return (
//     <div id="Properties" onScroll={handleScroll}>
//       <NavBar>
//         <NavItem text="Rentify" id="NavRentify" type="logo" color="dark"/>
//         <NavItem text="Log In" id="NavLogIn" color="dark" />
//         <NavItem text="Sign Up" id="NavSignUp" type="fill" />
//         <NavItem text="My Account" id="NavMyAccount" DropDown={dropDown} color="dark" type="hidden" icon={<ArrowIcon/>}/>
//         <NavItem id="NavSearchBox"><SearchBox /></NavItem>
//         <NavItem id="NavSearchOptions"><SearchOptions type='dark' /></NavItem>
//       </NavBar>
//       <PropertyCards />
//       <LogIn />
//       <SignUp />
//       <div id="Overlay" onClick={handleClick}></div>
//     </div>
//   )
// }

export default Properties
