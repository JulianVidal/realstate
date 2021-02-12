import React, { Fragment, Component } from 'react'
import { ReactComponent as EmailIcon } from '../assets/icons/mail.svg'
import { ReactComponent as PasswordIcon } from '../assets/icons/lock.svg'
import Form, { switchForm } from './Form'
import FormTextInput from './FormTextInput'
import FormButtonInput from './FormButtonInput'
import { GoogleLogin } from 'react-google-login'
import { removeForm } from '../components/Form'
import { TimelineLite, Power3 } from 'gsap'
import firebase from '../firebase.js'
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
    tl.to('#NavLogIn, #NavSignUp', { duration: 0.23, opacity: 0, ease: Power3.easeOut})
    .set('#NavMyAccount', {display: 'flex'})
    .set('#NavLogIn, #NavSignUp', {display: 'none'})
      .to('#NavMyAccount', {duration: 0.23, opacity: 1, ease: Power3.easeOut})

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
        <div className="error-message email"> This is an error message for the email </div>
        <FormTextInput
          text="Password"
          type="password"
          icon={<PasswordIcon className='test'/>}
          after={after}
          onChange={this.handleChange}
        />
        <div className="error-message password"> This is an error message for the password </div>
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
    console.log('Submitting following log in for user:')
    console.log('Email: ' + this.state.Email)
    console.log('Password: ' + this.state.Password)

  return await firebase.auth().signInWithEmailAndPassword(this.state.Email, this.state.Password)
    .then((userCredential) => {
      const userId = userCredential.user.uid;
      console.log('User ID', userId)
      localStorage.setItem('user', userId)
      !this.props.reload || this.props.reload()
      return false
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage)
      console.log(error)
      return error
    });
  }

  handleChange = ({ target }) => {
    const name = target.placeholder
    this.setState({ [name]: target.value })
  }
}

export default LogIn
