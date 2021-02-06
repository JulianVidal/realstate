import React from 'react'
import { useGoogleLogout } from 'react-google-login'
import './DropDownItem.scss'
import { TimelineLite, Power3 } from 'gsap'


function DropDownItem ({ text, type, reload }) {
  const className = 'DropDownItem ' + type

  const { signOut } = useGoogleLogout({
    onFailure: res => {console.error(res)},
    clientId: '692802073731-cemhatu867drko0sr61h77700g780jbv.apps.googleusercontent.com',
    cookiePolicy: 'single_host_origin',
    onLogoutSuccess: () => {console.log('Logout Success')}
  })

  const hc = () => {
    localStorage.clear()
    reload()
    const tl = new TimelineLite()

    tl.to('#NavMyAccount', {duration: 0.23,opacity: 0, ease: Power3.easeOut})
    .set('#NavLogIn, #NavSignUp', {display: 'flex'})
    .set('#NavMyAccount', {display: 'none'})
    .to('#NavLogIn, #NavSignUp', {duration: 0.23, opacity: 1, ease: Power3.easeOut})
    
    signOut()
  }
  return (
    <p className={className} onClick={hc}>{text}</p>
  )
}

export default DropDownItem
