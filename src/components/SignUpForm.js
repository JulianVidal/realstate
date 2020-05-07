import React from 'react'
import handleSubmit from './Form'
import './Form.scss'
import FormTextInput from './FormTextInput'
import FormButtonInput from './FormButtonInput'

function SignUpForm () {
  return (
    <form id='SignUpForm' className='Form' onSubmit={ event => handleSubmit(event, 'SignUp')}>
      <FormTextInput text='Username'  isLoggingIn={false} />
      <FormTextInput text='Email'  isLoggingIn={false} />
      <FormTextInput text='Password'  isLoggingIn={false} />
      <FormTextInput text='Confirm Password'  isLoggingIn={false} />
      <FormButtonInput text='Sign Up'  isLoggingIn={false} />

      <div className='Question'>
        <p>Already own an account?</p>
        <p>Log In</p>
      </div>
    </form>
  )
}

export default SignUpForm
