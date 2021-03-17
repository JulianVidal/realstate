import React, { Component } from "react";
import "./PropertyFeature.scss";

class ProperyFeature extends Component {
  render() {
    return (
      <div className="PropertyFeature">
        <h1 className="category"> {this.props.category} </h1>
        <div className="textContainer">
          {this.props.text.map((text) => {
            return <p className="text">{text}</p>;
          })}
        </div>
      </div>
    );
  }
}

export default ProperyFeature;
