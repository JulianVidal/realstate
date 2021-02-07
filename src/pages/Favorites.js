import React, { Component } from 'react'
import { Fragment } from 'react'
import SearchBox from '../components/SearchBox'
import LogIn from '../components/LogIn'
import SignUp from '../components/SignUp'
import DropDown from '../components/DropDown'
import DropDownItem from '../components/DropDownItem'
import NavBar from '../components/NavBar'
import NavItem from '../components/NavItem'
import PropertyCards from '../components/PropertyCards'
import { removeForm } from '../components/Form'
import {  ReactComponent as ArrowIcon } from '../assets/icons/arrow.svg'
import './Favorites.scss'

class Favorites extends Component {
  state = {
    reload: false,
  }

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

    const dropDown = (
      <DropDown>
        <DropDownItem text="Favorites" type="favorites" />
        <DropDownItem text="Log Out" type="logout" reload={this.reload} />
      </DropDown>
    )

    let loggedIn

    if (localStorage.getItem('user')) {
      loggedIn = (
        <Fragment>
          <NavItem text="Log In" id="NavLogIn" type="hidden" color="dark" />
          <NavItem text="Sign Up" id="NavSignUp" type="fill hidden" />
          <NavItem
            text="My Account"
            id="NavMyAccount"
            DropDown={dropDown}
            color="dark"
            type=""
            icon={<ArrowIcon />}
          />
        </Fragment>
      )
    } else {
      loggedIn = 
        <Fragment>
          <NavItem text="Log In" id="NavLogIn" color="dark" />
          <NavItem text="Sign Up" id="NavSignUp" type="fill" />
          <NavItem
            text="My Account"
            id="NavMyAccount"
            DropDown={dropDown}
            color="dark"
            type="hidden"
            icon={<ArrowIcon />}
          />
        </Fragment>
    }

    const user = JSON.parse(localStorage.getItem('user'))
    return (
      <div id="Favorites">
        <NavBar>
          {/* <NavItem text="Rentify" id="NavRentify" type="logo" color="dark"/> */}
          <NavItem id="NavSearchBox">
            <SearchBox />
          </NavItem>
          {loggedIn}
        </NavBar>
        <PropertyCards data={user.properties} />
        <LogIn reload={this.reload} />
        <SignUp />
        <div id="Overlay" onClick={handleClick}></div>
      </div>
    )
  }

  reload = () => {
    this.setState({reload: !this.state.reload})
  }
}

export default Favorites
