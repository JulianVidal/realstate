import React, { Component, Fragment } from "react";
import SearchBox from "../components/SearchBox";
import NavItem from "../components/NavItem";
import PropertyCards from "../components/PropertyCards";
import Page from "../components/Page";
import PropertyFeatures from "../components/PropertyFeatures";
import "./Favorites.scss";

class Favorites extends Component {
  state = {
    properties: null,
  };

  setData = (data) => {
    this.setState({ data });
  };

  render() {
    const navItems = (
      <Fragment>
        <NavItem text="Rentify" id="NavRentify" type="logo" color="dark" />
        <NavItem id="NavSearchBox">
          <SearchBox />
        </NavItem>
      </Fragment>
    );

    return (
      <Page navItems={navItems} color="dark" id="Favorites">
        <PropertyCards fav={true} setData={this.setData} />
        <PropertyFeatures data={this.state.data} />
      </Page>
    );
  }
}

export default Favorites;
