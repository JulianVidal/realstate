import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import NavItem from '../components/NavItem'
import { removeForm } from '../components/Form'
import LogIn from '../components/LogIn'
import SignUp from '../components/SignUp'
import DropDown from '../components/DropDown'
import DropDownItem from '../components/DropDownItem'
import {  ReactComponent as ArrowIcon } from '../assets/icons/arrow.svg'
import { Fragment } from 'react'

class Properties extends Component {

  state = {
    reload: false
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

    const dropDown = 
    <DropDown>
      <DropDownItem text='Favorites' type='favorites' />
      <DropDownItem text='Log Out' type='logout' reload={this.reload} />
    </DropDown>

    let loggedIn

    if (localStorage.getItem('user')) {
      loggedIn = 
      <Fragment>
          <NavItem text="Log In" id="NavLogIn" type="hidden" color={this.props.color} />
          <NavItem text="Sign Up" id="NavSignUp" type="fill hidden"/>
          <NavItem text="My Account" id="NavMyAccount" DropDown={dropDown} color={this.props.color} type="" icon={<ArrowIcon/>}/>
      </Fragment>
    } else {
      loggedIn = 
      <Fragment>
        <NavItem text="Log In" id="NavLogIn" color={this.props.color} />
        <NavItem text="Sign Up" id="NavSignUp" type="fill"/>
        <NavItem text="My Account" id="NavMyAccount" DropDown={dropDown} color={this.props.color} type="hidden" icon={<ArrowIcon/>}/>
      </Fragment>
    }

    return (
      <div id={this.props.id}>
        <NavBar>
          {this.props.navItems}
          {loggedIn}
        </NavBar>

        {this.props.children}

        <LogIn reload={this.reload}/>
        <SignUp />
        <div id="Overlay" onClick={handleClick}></div>
      </div>
    )
  }

  reload = () => {
    this.setState({reload: !this.state.reload})
  }
}

export default Properties
