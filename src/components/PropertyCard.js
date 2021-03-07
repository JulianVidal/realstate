import React, { Component } from "react";
import Lottie from "react-lottie-wrapper";
import { formDisplay } from "./Form";
import iconHeartStartData from "../assets/icons/heart.json";
import emptyImage from "../assets/empty.png";
import firebase from "../firebase.js";
import "./PropertyCard.scss";

class PropertyCard extends Component {
  ref = React.createRef();

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

    console.log(this.props.data);
  };

  state = {
    isHeartStartStopped: true,
    isHeartStartPaused: false,
    isLiked: false,
  };

  //shouldComponentUpdate(nextProps, nextState, nextContext) {
  //if (this.ref.current.className.includes("visibleProperty")) {
  //return true;
  //} else {
  //return false;
  //}
  //}

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

    const { adress, baths, beds, image, link, price, sqft } = this.props.data;

    return (
      <div className={"PropertyCard"} ref={this.ref}>
        <img
          src={image || emptyImage}
          alt="Property"
          className="image"
          onClick={() => {
            window.location.href = link;
          }}
        />

        <div className="valuation">
          <p className="price">{price}</p>
          {
            <Lottie
              options={defaultOptions(iconHeartStartData)}
              isStopped={this.state.isHeartStartStopped}
              isPaused={this.state.isHeartStartPaused}
              height={adress ? 26 : 0}
              width={adress ? 26 : 0}
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
          }
        </div>

        <div className="details font">
          <p className="bed font">{beds}</p>
          <p className="bath font">{baths}</p>
          <p className="sqft font">{sqft}</p>
        </div>

        <div className="place">
          <p className="address">{adress}</p>
          <p className="courtesy">{adress ? "Courtesy of: Zillow" : ""}</p>
        </div>
      </div>
    );
  }
}

export default PropertyCard;
