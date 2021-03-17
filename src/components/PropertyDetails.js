import React, { Component } from "react";
import SearchOptions from "./SearchOptions";
import PropertyFeature from "./PropertyFeature"
import data from "../assets/data3.json";

class PropertyDetails extends Component {
  render() {
    const property = data.properties[0];
    return (
      <div id="PropertyDetails">
        <div className="image"></div>
        <div className="header">
          <div className="valuation"> </div>
          <div className="adress"> </div>
          <div className="attribute"> </div>
        </div>
        <div className="map"> </div>
        <SearchOptions type="dark" options={["Property Details", "Contact"]} />
        {property.features.map(feature => {
          <PropertyFeature>
        })}
      </div>
    );
  }
}

export default PropertyDetails;
