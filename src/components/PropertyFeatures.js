import React, { Component } from "react";
import LikeButton from "./LikeButton";
//import emptyImage from "../assets/empty.png";
import ImageSlider from "./ImageSlider";
import dataJS from "../assets/data3.json";
import L from "leaflet";
import ProperyFeature from "./PropertyFeature";
import "./PropertyFeatures.scss";

class PropertyFeatures extends Component {
  componentDidMount() {
    const data = this.props.data || dataJS.properties[0];
    console.log(data);
    const lon = data.address.lon;
    const lat = data.address.lat;
    const mymap = L.map("map").setView([lat, lon], 15);
    this.setState({ mymap });
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
    const marker = L.marker([lat, lon]).addTo(mymap);
    this.setState({ marker });
  }

  componentDidUpdate() {
    const data = this.props.data || dataJS.properties[0];
    const lat = data.address.lat;
    const lon = data.address.lon;
    this.state.mymap.panTo([lat, lon]);
    this.state.marker.setLatLng([lat, lon]);
  }

  render() {
    const data = this.props.data || dataJS.properties[0];
    const property = data;
    console.log(data);
    const propertyID = property.property_id;

    let agent, agentName, agentEmail;
    if (property.agents) {
      agent = property.agents[0];
      agentName = "Name: " + agent.name;
      agentEmail = "Email: " + agent.email;
    }
    const office = property.office;
    const officeName = "Name: " + office.name;
    let officeCity;
    if (office.address) {
      officeCity =
        "City: " + office.address.city + ", " + office.address.state_code;
    }
    let listing, listingName, listingID, listingDisclaimer;
    if (property.mls) {
      listing = property.mls;
      listingName = "Name: " + listing.name;
      listingID = "Source's Property ID: " + listing.id;
      listingDisclaimer = "Data Source Copyright: " + listing.disclaimer.text;
    }
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

          {agent ? (
            <ProperyFeature category={"Agent"} text={[agentName, agentEmail]} />
          ) : null}

          <ProperyFeature
            category={"Broker Office"}
            text={[officeName, officeCity || ""]}
          />
          {listing ? (
            <ProperyFeature
              category={"Listing"}
              text={[listingName, listingID, listingDisclaimer]}
            />
          ) : null}
          <ProperyFeature type="table" data={property.schools} />
        </div>
      </div>
    );
  }
}

export default PropertyFeatures;
