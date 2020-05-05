import React from 'react'
import NavBar from '../components/NavBar'
import MainText from '../components/MainText'
import MainSearch from '../components/MainSearch'
import LogIn from '../components/LogIn'
import './Main.scss'

function Main () {
  return (
    <div id="Main">
      <NavBar />
      <MainText />
      <MainSearch />
      <LogIn />
      <div id="Temp"></div>
    </div>
  )
}

export default Main
