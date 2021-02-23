import React, { Fragment, Component } from 'react'
import { ReactComponent as EmailIcon } from '../assets/icons/mail.svg'
import { ReactComponent as PasswordIcon } from '../assets/icons/lock.svg'
import { ReactComponent as GoogleIcon } from '../assets/icons/google.svg'
import Form, { switchForm } from './Form'
import FormTextInput from './FormTextInput'
import FormButtonInput from './FormButtonInput'
import firebase, { googleProvider } from '../firebase.js'
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
        <p id="forgot" onClick={this.handleForget}> Forgot? </p>
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
        <FormButtonInput icon={ <GoogleIcon class='googleIcon' />} text="Google Login" submit={this.handleSubmitGoogle}/>
     </Form>
    )
  }

  handleSubmitGoogle = async () => {
      console.log('Google log in')

//      await firebase.auth().signInWithRedirect(googleProvider)

      return await firebase.auth().signInWithPopup(googleProvider)
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

  handleForget = () => {
    switchForm('LogIn', 'Forgot')
 }

  handleChange = ({ target }) => {
    const name = target.placeholder
    this.setState({ [name]: target.value })
  }
}

export default LogIn
