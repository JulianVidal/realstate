import React from 'react'
import './Form.scss'
import FormTextInput from './FormTextInput'
import FormButtonInput from './FormButtonInput'

function Form () {
  return (
    <div id='Form'>
      <FormTextInput text='Email' />
      <FormTextInput text='Password' />
      <FormButtonInput text='Log In' />

      <div className='CreateAcc'>
        <p>Don't have an account?</p>
        <p>Sign Up</p>
      </div>
    </div>
  )
}

export default Form
