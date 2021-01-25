import React, { Fragment, Component } from 'react'
import { ReactComponent as EmailIcon } from '../assets/icons/mail.svg'
import { ReactComponent as PasswordIcon } from '../assets/icons/lock.svg'
import Form, { switchForm } from './Form'
import FormTextInput from './FormTextInput'
import FormButtonInput from './FormButtonInput'
import './Form.scss'

class LogIn extends Component {
  state = {
    Email: '',
    Password: '',
  }

  render() {
    const footer = (
      <Fragment>
        <p>Don't have an account?</p>
        <p onClick={() => switchForm('LogIn', 'SignUp')}>Sign Up</p>
      </Fragment>
    )

    const after = (
      <Fragment>
        <p id="forgot"> Forgot? </p>
      </Fragment>
    )

    return (
      <Form title="Login" id="LogIn" footer={footer}>
        <FormTextInput text="Email" type="email" icon={<EmailIcon />} onChange={this.handleChange}/>
        <FormTextInput
          text="Password"
          type="password"
          icon={<PasswordIcon />}
          after={after}
          onChange={this.handleChange}
        />
        <FormButtonInput text="Log In" submit={this.handleSubmit}/>
      </Form>
    )
  }

  handleSubmit = async () => {
    if (!this.state.Email || !this.state.Password) return 'empty'

    console.log('submit Log In')
    console.log('Email: ' + this.state.Email)
    console.log('Password: ' + this.state.Password)

    const user = {
      email: this.state.Email,
      password: this.state.Password,
    }

    return await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(async (res) => {
        if (!res.ok) throw await res.json()
        return false
      })
      .catch((error) => {
        console.error(error.message)
        return true
      })
  }

  handleChange = ({ target }) => {
    const name = target.placeholder
    this.setState({ [name]: target.value })
  }
}

export default LogIn
