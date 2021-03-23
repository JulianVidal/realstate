import React, { Component } from "react";
import emptyImage from "../assets/empty.png";
import "./PropertyCard.scss";
import LikeButton from "./LikeButton";
import { formDisplay } from "./Form";

class PropertyCard extends Component {
  render() {
    const { adress, baths, beds, image, price, sqft } = this.props.data;

    return (
      <div onClick={this.handleClick} className={"PropertyCard"} ref={this.ref}>
        <img src={image || emptyImage} alt="Property" className="image" />

        <div className="valuation">
          <p className="price">{price}</p>
          {adress ? <LikeButton data={this.props.data} /> : null}
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

  handleClick = () => {
    formDisplay("PropertyFeatures");
  };
}

export default PropertyCard;
