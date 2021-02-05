import React, { Fragment, Component } from 'react'
import { ReactComponent as EmailIcon } from '../assets/icons/mail.svg'
import { ReactComponent as PasswordIcon } from '../assets/icons/lock.svg'
import Form, { switchForm } from './Form'
import FormTextInput from './FormTextInput'
import FormButtonInput from './FormButtonInput'
import { GoogleLogin } from 'react-google-login'
import { removeForm } from '../components/Form'
import { TimelineLite, Power3 } from 'gsap'
import './Form.scss'

class LogIn extends Component {
  state = {
    Email: '',
    Password: '',
  }

  onSuccess = async response => {
    console.log('Google log in succesful from user:', response.profileObj, response)
    localStorage.clear()
    removeForm('LogIn')

    const tl = new TimelineLite()
    tl.to('#NavLogIn, #NavSignUp', 0.23, {opacity: 0, ease: Power3.easeOut})
    .set('#NavMyAccount', {display: 'flex'})
    .set('#NavLogIn, #NavSignUp', {display: 'none'})
    .to('#NavMyAccount', 0.23, {opacity: 1, ease: Power3.easeOut})

    const user = {
      email: response.profileObj.email,
    }

    await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(async (res) => {
        if (!res.ok) throw await res.json()
        localStorage.setItem('user', JSON.stringify(await res.json()))
        this.props.reload()
        return false
      })
      .catch(async (error) => {
        console.error(error.message)
        user.properties = []
          await fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
          })
          .then( async res => {
            if (!res.ok) throw await res.json()
            localStorage.setItem('user', JSON.stringify(await res.json()))
            this.props.reload()
            return false
          })
          .catch(error => {
            console.error(error.message)
            return true
          })
        return true
      })
  }

  onFailure = res => {
    console.log('Google log in unsuccessful, error:', res)
  }

  render() {

    const clientId = '692802073731-cemhatu867drko0sr61h77700g780jbv.apps.googleusercontent.com'

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
        <FormButtonInput text="Login" submit={this.handleSubmit}/>
        <GoogleLogin 
        clientId = {clientId}
        buttonText = 'Login'
        onSuccess = {this.onSuccess}
        onFailure = {this.onFailure}
        cookiePolicy = {'single_host_origin'}
        className='FormButtonInput google'
        isSignedIn={true}
        />
      </Form>
    )
  }

  handleSubmit = async () => {
    // if (!this.state.Email || !this.state.Password) return 'empty'

    console.log('Submitting following log in for user:')
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
        localStorage.setItem('user', JSON.stringify(await res.json()))
        this.props.reload()
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
