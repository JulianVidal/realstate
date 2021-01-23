import React, { Fragment, Component } from 'react'
import * as fs from 'fs'
import { ReactComponent as UserIcon } from '../assets/icons/user.svg'
import { ReactComponent as EmailIcon } from '../assets/icons/mail.svg'
import { ReactComponent as PasswordIcon } from '../assets/icons/lock.svg'
import { ReactComponent as CheckPasswordIcon } from '../assets/icons/checkLock.svg'
import Form, { switchForm } from './Form'
import FormTextInput from './FormTextInput'
import FormButtonInput from './FormButtonInput'
import './Form.scss'



class SignUp extends Component {
  state = {
    Username: '',
    Email: '',   
    Password: '',
    "Confirm Password": '',
  }

  render() {
    const footer = (
      <Fragment>
        <p>Already own an account?</p>
        <p onClick={() => switchForm('SignUp', 'LogIn')}>Log In</p>
      </Fragment>
    )
    return (
      <Form title="Create Account" id="SignUp" footer={footer}>
        <FormTextInput text="Username" type="text" icon={<UserIcon />} onChange={this.handleChange} />
        <FormTextInput text="Email" type="email" icon={<EmailIcon />} onChange={this.handleChange} />
        <FormTextInput
          text="Password"
          type="password"
          icon={<PasswordIcon />}
          onChange={this.handleChange}
        />
        <FormTextInput
          text="Confirm Password"
          type="password"
          icon={<CheckPasswordIcon />}
          onChange={this.handleChange}
        />
        <FormButtonInput text="Sign Up" submit={this.handleSubmit} />
      </Form>
    )
  }

  handleSubmit = () => {
    console.log('submit')
    console.log('Username: ' + this.state.Username)
    console.log('Email: ' + this.state.Email)
    console.log('Password: ' + this.state.Password)
    console.log('Confirm Password: ' + this.state["Confirm Password"])

    const user = {
      username: this.state.Username,
      email: this.state.Email,
      password: this.state.Password,
      "confirm password": this.state["Confirm Password"],
    }

    fetch('http://localhost:5000/post', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .catch(error => {
    console.error(error.body)
    return true
  })

    return false
  }

  handleChange = ({target}) => {
    const name = target.placeholder
    this.setState({[name]: target.value})
  }

}

export default SignUp
