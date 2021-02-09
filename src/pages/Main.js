import React from 'react'
import NavItem from '../components/NavItem'
import SearchBox from '../components/SearchBox'
import Page from '../components/Page'
import './Main.scss'

function Main() {
  const navItems = <NavItem text="Rentify" id="NavRentify" type="logo"/>

  return (
    <Page navItems={navItems} id='Main'>
      <div id="MainText">
        <h3>Your Dream Home is a <u>Click Away</u>.</h3>
        <p>Using data from the most popular realstate websites</p>
      </div>

      <div id='MainSearch'>
        <SearchBox />
      </div>  
    </Page>
  )
}



export default Main
