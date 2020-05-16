import React, { Fragment } from 'react'
import { ReactComponent as EmailIcon } from '../assets/icons/mail.svg'
import { ReactComponent as PasswordIcon } from '../assets/icons/lock.svg'
import Form, { switchForm } from './Form'
import FormTextInput from './FormTextInput'
import FormButtonInput from './FormButtonInput'
import './Form.scss'

function LogIn () {
  const footer = <Fragment>
    <p>Don't have an account?</p>
    <p onClick={() => switchForm('LogIn', 'SignUp')}>Sign Up</p>
    </Fragment>

  const after = <Fragment>
    <p id="forgot"> Forgot? </p>
  </Fragment>

  return(
    <Form title="Login" id='LogIn' footer={footer}>
      <FormTextInput text='Email' type='email' icon={<EmailIcon/>} />
      <FormTextInput text='Password' type='password' icon={<PasswordIcon/>} after={after}/>
      <FormButtonInput text='Log In' />
    </Form>
  )
}

export default LogIn
