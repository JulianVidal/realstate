import React, { Component } from "react";
import firebase from "../firebase.js";
import Lottie from "react-lottie-wrapper";
import iconHeartStartData from "../assets/icons/heart.json";
import { formDisplay } from "./Form";

class LikeButton extends Component {
  handleLike = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      formDisplay("LogIn");
      return;
    }

    this.setState({ isHeartStartStopped: false });
    this.setState({ isHeartStartPaused: false });

    const userId = localStorage.getItem("user");
    const propertiesRef = firebase.database().ref(userId);

    const properties = await firebase
      .database()
      .ref(userId)
      .once("value")
      .then((snapshot) => snapshot.val());

    console.log(properties);
    let repeatID;

    for (const property in properties) {
      const adress = properties[property].adress;
      if (adress === this.props.data.adress) {
        repeatID = property;
      }
    }

    if (!repeatID) {
      console.log("Property liked:");
      propertiesRef.push(this.props.data);
    } else {
      console.log("Property unliked:");
      firebase
        .database()
        .ref(userId + "/" + repeatID)
        .remove();
    }
  };

  state = {
    isHeartStartStopped: true,
    isHeartStartPaused: false,
    isLiked: false,
  };

  async componentDidMount() {
    const user = localStorage.getItem("user");
    if (!user) return;
    const properties = await firebase
      .database()
      .ref(user)
      .once("value")
      .then((snapshot) => snapshot.val());

    let repeatID;

    for (const property in properties) {
      const adress = properties[property].adress;
      if (adress === this.props.data.adress) {
        repeatID = property;
      }
    }
    if (repeatID) {
      this.setState({ isHeartStartStopped: false });
    }
  }

  async componentDidUpdate() {
    const user = localStorage.getItem("user");
    if (!user) {
      if (this.state.isHeartStartPaused)
        this.setState({ isHeartStartPaused: false });
      return;
    }

    const properties = await firebase
      .database()
      .ref(user)
      .once("value")
      .then((snapshot) => snapshot.val());

    let repeatID;

    for (const property in properties) {
      const adress = properties[property].adress;
      if (adress === this.props.data.adress) {
        repeatID = property;
      }
    }
    if (repeatID) {
      this.setState({ isHeartStartStopped: false });
    }
  }
  render() {
    const defaultOptions = (data, loop = false) => {
      return {
        loop,
        autoplay: false,
        animationData: data,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };
    };
    return (
      <Lottie
        options={defaultOptions(iconHeartStartData)}
        isStopped={this.state.isHeartStartStopped}
        isPaused={this.state.isHeartStartPaused}
        height={this.props.size ? this.props.size : 26}
        width={this.props.size ? this.props.size : 26}
        isClickToPauseDisabled={true}
        onClick={this.handleLike}
        eventListeners={[
          {
            eventName: "enterFrame",
            callback: (frame) => {
              if (frame.currentTime > 12 && !this.state.isLiked) {
                this.setState({
                  isHeartStartPaused: true,
                  isLiked: true,
                });
              } else if (frame.currentTime >= 27 && this.state.isLiked) {
                this.setState({
                  isHeartStartStopped: true,
                  isHeartStartPaused: false,
                  isLiked: false,
                });
              }
            },
          },
        ]}
      />
    );
  }
}

export default LikeButton;
