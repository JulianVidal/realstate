import React, { Component } from "react";
import emptyImage from "../assets/empty.png";
import "./PropertyCard.scss";
import LikeButton from "./LikeButton";

class PropertyCard extends Component {
  render() {
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
}

export default PropertyCard;
