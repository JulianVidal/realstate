import React from 'react'
import './FormTextInput.scss'
import { ReactComponent as UserIcon } from '../assets/icons/user.svg'
import { ReactComponent as EmailIcon } from '../assets/icons/mail.svg'
import { ReactComponent as PasswordIcon } from '../assets/icons/lock.svg'
import { ReactComponent as CheckPasswordIcon } from '../assets/icons/checkLock.svg'

function FormTextInput (props) {

  const {text, type, Icon, ForgotText} = getAtributes(props)

    return(
      <div className="FormTextInput">
        { Icon }
        <input type={type} placeholder={text}></input>
        { ForgotText }
      </div>
    )
}

function getAtributes ({text, isLoggingIn}) {
  let type, Icon, ForgotText

  switch (text) {
    case 'Username':
      text = 'Username'
      type = 'text'
      Icon = <UserIcon />
      break

    case 'Email':
      text = 'Email'
      type = 'email'
      Icon = <EmailIcon height='17px' />
      break

    case 'Password':
      text = 'Password'
      type = 'password'
      Icon = <PasswordIcon height='22px' />
      ForgotText = isLoggingIn ?  <p id="forgot"> Forgot? </p> : null
      break

    case 'Confirm Password':
      text = 'Confirm Password'
      type = 'password'
      Icon = <CheckPasswordIcon />
      isLoggingIn = false
      break

    default:
      text = 'Default'
      type = 'text'
      break
  }

  return {
    text,
    type,
    Icon,
    ForgotText
  }

}

export default FormTextInput
