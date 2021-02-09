import React from 'react'
import { useGoogleLogout } from 'react-google-login'
import './DropDownItem.scss'
import { TimelineLite, Power3 } from 'gsap'
import { withRouter } from 'react-router-dom'
import firebase from '../firebase.js'

function DropDownItem ({ text, type, reload, history }) {
  const className = 'DropDownItem ' + type

  const { signOut } = useGoogleLogout({
    onFailure: res => {console.error(res)},
    clientId: '692802073731-cemhatu867drko0sr61h77700g780jbv.apps.googleusercontent.com',
    cookiePolicy: 'single_host_origin',
    onLogoutSuccess: () => {console.log('Logout Success')}
  })

  const handleClick = () => {
    if (type === 'logout') {
      localStorage.clear()
      firebase.auth().signOut()
      !reload || reload()

      if (window.location.pathname === '/favorites') window.location.pathname = '/'
      
      const tl = new TimelineLite()

      tl.to('#NavMyAccount', {duration: 0.23,opacity: 0, ease: Power3.easeOut})
      .set('#NavLogIn, #NavSignUp', {display: 'flex'})
      .set('#NavMyAccount', {display: 'none'})
      .to('#NavLogIn, #NavSignUp', {duration: 0.23, opacity: 1, ease: Power3.easeOut})
    
      signOut()
    } else if (type === 'favorites') {    
      history.push({
      pathname: '/favorites',
      })
    }
  }

  return (
    <p className={className} onClick={handleClick}>{text}</p>
  )
}

export default withRouter(DropDownItem)
