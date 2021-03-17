import React, { Component } from "react";

class ProperyFeature extends Component {
  render() {
    return (
      <div className="ProperyFeature">
        <h1 className="category"> {this.props.category} </h1>
        {this.props.text.map((detail) => {
          return <p className="detail">{detail}</p>;
        })}
      </div>
    );
  }
}

export default ProperyFeature;
