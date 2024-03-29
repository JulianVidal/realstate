import React, { Component } from "react";
import LikeButton from "./LikeButton";
import ImageSlider from "./ImageSlider";
import emptyImage from "../assets/empty.png";
//import dataJS from "../assets/data3.json";
import L from "leaflet";
import ProperyFeature from "./PropertyFeature";
import "./PropertyFeatures.scss";

class PropertyFeatures extends Component {
  state = {
    data: null,
  };
  componentDidMount() {
    if (!this.props.data && !this.state.data) return;
    const data = this.props.data;
    const lon = data.address.lon;
    const lat = data.address.lat;
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
    const marker = L.marker([lat, lon]).addTo(mymap);
    this.setState({ marker });
    this.setState({ mymap });
  }

  componentDidUpdate() {
    if (!this.props.data && !this.state.data) return;
    const data = this.props.data;
    const lat = data.address.lat;
    const lon = data.address.lon;
    if (!this.state.mymap) {
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
    } else {
      this.state.mymap.panTo([lat, lon]);
      this.state.marker.setLatLng([lat, lon]);
    }
  }

  render() {
    if (!this.props.data && !this.state.data) {
      if (this.state.mymap) this.setState({ mymap: null });
      return (
        <div id="PropertyFeatures">
          <ImageSlider images={null} />
        </div>
      );
    }
    const data = this.props.data;
    const property = data;
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
      listingDisclaimer =  listing.disclaimer ? "Data Source Copyright: " + listing.disclaimer.text : "";
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
      sqft = property.building_size ? property.building_size.size + " sqft" : ""
    }

    let image = emptyImage;
    if (photos !== undefined && photos[0] !== undefined) image = photos[0].href;
    
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
              {sqft ? sqft : null}
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
