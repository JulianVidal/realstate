import React, { Component } from "react";
import emptyImage from "../assets/empty.png";
import { formDisplay } from "./Form";
import "./PropertyCard.scss";
import LikeButton from "./LikeButton";
import LocalData from "../assets/backup.json";

class PropertyCard extends Component {
  state = {
    details: null,
  };

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

  handleClick = async () => {
    this.props.setData(null);
    formDisplay("PropertyFeatures");
    if (this.state.data) {
      this.props.setData(this.state.data);
      formDisplay("PropertyFeatures");
      return;
    }

    try {
      const response = await fetch(
        "https://real-state2003.herokuapp.com/property?property_id=" +
          this.props.data.propertyID
      ).then((res) => res.json());
      const data = response.data;
      const error = response.error;
      if (error) throw error;
      console.log("Got the detail data from API", data);
      this.setState({ error: null });
      this.setState({ data: data.properties[0] });
      this.props.setData(this.state.data);
    } catch (e) {
      console.error("API detail fetch failed, using fallback data", e);
      const propDetails = LocalData.find((prop) => prop.property_id === this.props.data.propertyID);

      if (propDetails) {
        console.log("Got the detail data from fallback", propDetails);
        this.setState({ error: null });
        this.setState({ data: propDetails });
        this.props.setData(propDetails);
      } else {
        this.setState({ error: new Error("Property not found") });
      }
    }
  };
}

export default PropertyCard;
