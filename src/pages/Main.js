import React from 'react'
import { removeForm } from '../components/Form'
import {  ReactComponent as ArrowIcon } from '../assets/icons/arrow.svg'
import NavBar from '../components/NavBar'
import NavItem from '../components/NavItem'
import DropDown from '../components/DropDown'
import DropDownItem from '../components/DropDownItem'
// import SearchOptions from '../components/SearchOptions'
import SearchBox from '../components/SearchBox'
import LogIn from '../components/LogIn'
import SignUp from '../components/SignUp'
import './Main.scss'
import { TimelineLite, Power3 } from 'gsap'
//<div>Icon made from <a href="http://www.onlinewebfonts.com/icon">Icon Fonts</a> is licensed by CC BY 3.0</div> bath
//<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> area
import { Fragment } from 'react'

function Main ({history}) {

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
      <DropDownItem text='Log Out' type='logout' handleClick={logOut}/>
    </DropDown>

  let loggedIn

    if (localStorage.getItem('user')) {
      loggedIn = 
      <Fragment>
          <NavItem text="Log In" id="NavLogIn" type="hidden"/>
          <NavItem text="Sign Up" id="NavSignUp" type="fill hidden"/>
          <NavItem text="My Account" id="NavMyAccount" DropDown={dropDown} icon={<ArrowIcon/>}/>
      </Fragment>
    } else {
      loggedIn = 
      <Fragment>
        <NavItem text="Log In" id="NavLogIn" />
        <NavItem text="Sign Up" id="NavSignUp" type="fill"/>
        <NavItem text="My Account" id="NavMyAccount" DropDown={dropDown} type="hidden" icon={<ArrowIcon/>}/>
      </Fragment>
    }

  return (
    <div id="Main">
      <NavBar>
        <NavItem text="Rentify" id="NavRentify" type="logo"/>
        {loggedIn}
      </NavBar>

      <div id="MainText">
        <h3>Your Dream Home is a <u>Click Away</u>.</h3>
        <p>Using data from the most popular realstate websites</p>
      </div>

      <div id='MainSearch'>
        {/* <SearchOptions /> */}
        <SearchBox />
      </div>  
          
      <LogIn />
      <SignUp />
      <div id="Overlay" onClick={handleClick}></div>
    </div>
  )
}

const logOut = () => {
  localStorage.clear()

  const tl = new TimelineLite()

  tl.to('#NavMyAccount', 0.23, {opacity: 0, ease: Power3.easeOut})
  .set('#NavLogIn, #NavSignUp', {display: 'flex'})
  .set('#NavMyAccount', {display: 'none'})
  .to('#NavLogIn, #NavSignUp', 0.23, {opacity: 1, ease: Power3.easeOut})
}

export default Main
