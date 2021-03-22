import React, { Component } from "react";
import LikeButton from "./LikeButton";
//import emptyImage from "../assets/empty.png";
import ImageSlider from "./ImageSlider";
import data from "../assets/data3.json";
import L from "leaflet";
import ProperyFeature from "./PropertyFeature";
import "./PropertyFeatures.scss";

class PropertyFeatures extends Component {
  componentDidMount() {
    const lon = data.properties[0].address.lon;
    const lat = data.properties[0].address.lat;
    const mymap = L.map("map").setView([lat, lon], 15);
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v9",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoianVsaWFudmlkYWwiLCJhIjoiY2s1a3UwcDkyMGdoazNscm1lajBjYzd2ayJ9.wvqSaGbNgozAALmdWh3G_g",
      }
    ).addTo(mymap);
    mymap.scrollWheelZoom.disable();
    L.marker([lat, lon]).addTo(mymap);
  }
  render() {
    const property = data.properties[0];
    const propertyID = property.property_id;
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

    const photos = property.photos;
    const adress =
      property.address.line +
      ", " +
      property.address.city +
      ", " +
      property.address.state_code +
      ", " +
      property.address.postal_code;

    let price, beds, baths, sqft;

    if (property.community) {
      price = `$ ${property.community.price_min}-${property.community.price_max} `;
      beds = `${property.community.beds_min}-${property.community.beds_max} bds`;
      baths = `${property.community.baths_min}-${property.community.baths_max} bths`;
      sqft = `${property.community.sqft_min}-${property.community.sqft_max} sqft`;
    } else {
      price = "$" + property.price;
      beds = property.beds + " bds";
      baths = property.baths + " ba";
      sqft = property.building_size.size + " sqft";
    }
    const image = photos[0].href;
    const propertyData = {
      propertyID,
      adress,
      price,
      beds,
      baths,
      sqft,
      image,
    };
    return (
      <div id="PropertyFeatures">
        <ImageSlider images={photos} />
        <div className="header">
          <div className="valuation">
            <p className="price">{price}</p>
            <LikeButton data={propertyData} size={43} />
          </div>

          <div className="place">
            <p className="address">{adress}</p>
          </div>
          <div className="details">
            <p className="bed">{beds}</p>
            <p className="bath">{baths}</p>
            <p className="sqft">
              {sqft.indexOf("undefined") > -1 ? null : sqft}
            </p>
          </div>
        </div>
        <div id="map"></div>

        <div className="featuresList">
          {property.features.map((feature, index) => {
            return (
              <ProperyFeature
                category={feature.category}
                text={feature.text}
                key={index}
              />
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
