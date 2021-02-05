import React from 'react'
import { useGoogleLogout } from 'react-google-login'
import './DropDownItem.scss'


function DropDownItem ({ text, type, handleClick }) {
  const className = 'DropDownItem ' + type

  const { signOut } = useGoogleLogout({
    onFailure: res => {console.error(res)},
    clientId: '692802073731-cemhatu867drko0sr61h77700g780jbv.apps.googleusercontent.com',
    cookiePolicy: 'single_host_origin',
    onLogoutSuccess: () => {console.log('Logout Success')}
  })

  const hc = () => {
    handleClick()
    signOut()
  }
  return (
    <p className={className} onClick={hc}>{text}</p>
  )
}

export default DropDownItem
