import React from 'react'
import handleSubmit from './Form'
import './Form.scss'
import FormTextInput from './FormTextInput'
import FormButtonInput from './FormButtonInput'

function LogInForm () {
  return (
    <form id='LogInForm' className='Form' onSubmit={ event => handleSubmit(event, 'LogIn')}>
      <FormTextInput text='Email' isLoggingIn={true} />
      <FormTextInput text='Password' isLoggingIn={true} />
      <FormButtonInput text='Log In' isLoggingIn={true} />

      <div className='Question'>
        <p>Don't have an account?</p>
        <p>Sign Up</p>
      </div>
    </form>
  )
}

export default LogInForm
