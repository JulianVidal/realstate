import React, { Fragment, Component } from "react";
import { ReactComponent as EmailIcon } from "../assets/icons/mail.svg";
import { ReactComponent as PasswordIcon } from "../assets/icons/lock.svg";
import { ReactComponent as GoogleIcon } from "../assets/icons/google.svg";
import Form, { switchForm } from "./Form";
import FormTextInput from "./FormTextInput";
import FormButtonInput from "./FormButtonInput";
import firebase, { googleProvider } from "../firebase.js";
import "./Form.scss";

class SignUp extends Component {
  state = {
    Username: "",
    Email: "",
    Password: "",
    "Confirm Password": "",
  };

  render() {
    const footer = (
      <Fragment>
        <p>Already own an account?</p>
        <p onClick={() => switchForm("SignUp", "LogIn")}>Log In</p>
      </Fragment>
    );
    return (
      <Form title="Create Account" id="SignUp" footer={footer}>
        <FormTextInput
          text="Email"
          type="email"
          icon={<EmailIcon />}
          onChange={this.handleChange}
        />
        <div className="error-message email">
          {" "}
          This is an error message for the email{" "}
        </div>
        <FormTextInput
          text="Password"
          type="password"
          icon={<PasswordIcon />}
          onChange={this.handleChange}
        />
        <div className="error-message password">
          {" "}
          This is an error message for the password{" "}
        </div>
        <FormButtonInput text="Sign Up" submit={this.handleSubmit} />
        <FormButtonInput
          icon={<GoogleIcon className="googleIcon" />}
          text="Google Login"
          submit={this.handleSubmitGoogle}
        />
      </Form>
    );
  }

  handleSubmitGoogle = async () => {
    console.log("Google log in");

    //      await firebase.auth().signInWithRedirect(googleProvider)

    return await firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((userCredential) => {
        const userId = userCredential.user.uid;
        console.log("User ID", userId);
        localStorage.setItem("user", userId);
        !this.props.reload || this.props.reload();
        return false;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        console.log(error);
        return error;
      });
  };

  handleSubmit = async () => {
    console.log("Submitting following sign up form for user:");
    console.log("Email: " + this.state.Email);
    console.log("Password: " + this.state.Password);

    console.log("Posting data");
    return await firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.Email, this.state.Password)
      .then((userCredential) => {
        const userId = userCredential.user.uid;
        console.log("User ID", userId);
        localStorage.setItem("user", userId);
        return false;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        console.log(error);
        return error;
      });
  };

  handleChange = ({ target }) => {
    const name = target.placeholder;
    this.setState({ [name]: target.value });
  };
}

export default SignUp;
