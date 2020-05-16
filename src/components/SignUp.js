import React, { Fragment } from 'react'
import { ReactComponent as UserIcon } from '../assets/icons/user.svg'
import { ReactComponent as EmailIcon } from '../assets/icons/mail.svg'
import { ReactComponent as PasswordIcon } from '../assets/icons/lock.svg'
import { ReactComponent as CheckPasswordIcon } from '../assets/icons/checkLock.svg'
import Form, {switchForm} from './Form'
import FormTextInput from './FormTextInput'
import FormButtonInput from './FormButtonInput'
import './Form.scss'

function SignUp () {
  const footer = <Fragment>
    <p>Already own an account?</p>
    <p onClick={() => switchForm('SignUp', 'LogIn')}>Log In</p>
  </Fragment>

  return(
    <Form title="Create Account" id='SignUp' footer={footer}>
      <FormTextInput text='Username' type='text' icon={<UserIcon/>}/>
      <FormTextInput text='Email' type='email' icon={<EmailIcon/>} />
      <FormTextInput text='Password' type='password' icon={<PasswordIcon/>}/>
      <FormTextInput text='Confirm Password' type='password' icon={<CheckPasswordIcon/>} />
      <FormButtonInput text='Sign Up' />
    </Form>
  )
}

export default SignUp
