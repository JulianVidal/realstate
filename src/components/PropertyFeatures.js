import React, { Component } from "react";
import SearchOptions from "./SearchOptions";
import data from "../assets/data3.json";
import ProperyFeature from "./PropertyFeature";
import "./PropertyFeatures.scss";

class PropertyFeatures extends Component {
  render() {
    const property = data.properties[0];
    const agent = property.agents[0];
    const agentName = "Name: " + agent.name;
    const agentEmail = "Email: " + agent.email;

    const office = property.office;
    const officeName = "Name: " + office.name;
    const officeCity =
      "City: " + office.address.city + ", " + office.address.state_code;

    const listing = property.mls;
    const listingName = "Name: " + listing.name;
    const listingID = "Source's Property ID: " + listing.id;
    const listingDisclaimer =
      "Data Source Copyright: " + listing.disclaimer.text;

    return (
      <div id="PropertyFeatures">
        <div className="image"></div>

        <div className="header">
          <div className="valuation"> </div>
          <div className="adress"> </div>
          <div className="attribute"> </div>
        </div>

        <div className="map"> </div>

        <SearchOptions type="dark" options={["Property Details", "Contact"]} />
        <div className="featuresList">
          {property.features.map((feature) => {
            return (
              <ProperyFeature category={feature.category} text={feature.text} />
            );
          })}
          <ProperyFeature category={"Agent"} text={[agentName, agentEmail]} />
          <ProperyFeature
            category={"Broker Office"}
            text={[officeName, officeCity]}
          />
          <ProperyFeature
            category={"Listing"}
            text={[listingName, listingID, listingDisclaimer]}
          />
        </div>
      </div>
    );
  }
}

export default PropertyFeatures;
