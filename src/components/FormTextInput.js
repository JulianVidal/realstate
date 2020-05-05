import React from 'react'
import './FormTextInput.scss'
import { ReactComponent as EmailIcon } from '../assets/icons/mail.svg'
import { ReactComponent as PasswordIcon } from '../assets/icons/lock.svg'

function FormTextInput (props) {

    return(
      <div className="FormTextInput">
        { props.text === 'Email' ? <EmailIcon height='17px'/> : <PasswordIcon height='22px' /> }
        <input type='text' placeholder={props.text}></input>
        { props.text === 'Password' ? <p id="forgot"> Forgot? </p> : null }
      </div>
    )
}

export default FormTextInput
