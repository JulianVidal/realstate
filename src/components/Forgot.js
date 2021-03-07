import React, { Component } from 'react'
import { ReactComponent as EmailIcon } from '../assets/icons/mail.svg'
import Form from './Form'
import FormTextInput from './FormTextInput'
import FormButtonInput from './FormButtonInput'
import firebase from '../firebase.js'
import './Form.scss'



class Forgot extends Component {
  state = {
    Email: '',   
  }

  render() {
    return (
        <Form title="Reset password" id="Forgot" >
          <FormTextInput text="Email" type="email" icon={<EmailIcon />} onChange={this.handleChange} />
          <div className="error-message email"> This is an error message for the email </div>
          <FormButtonInput text="Send email" submit={this.handleSubmit} />
        </Form>
      )
  }

  handleSubmit = async () => {
    console.log('Email: ' + this.state.Email)
    return await firebase.auth().sendPasswordResetEmail(this.state.Email)
      .then(() => {
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

  handleChange = ({target}) => {
    const name = target.placeholder
    this.setState({[name]: target.value})
  }

}

export default Forgot 
