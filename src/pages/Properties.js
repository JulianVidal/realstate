import React, { Component, Fragment } from "react";
import NavItem from "../components/NavItem";
import PropertyCards from "../components/PropertyCards";
import SearchBox from "../components/SearchBox";
import Page from "../components/Page";
import "./Properties.scss";
import SearchOptions from "../components/SearchOptions";

class Properties extends Component {
  state = {
    reload: false,
  };

  render() {
    const navItems = (
      <Fragment>
        <NavItem text="Rentify" id="NavRentify" type="logo" color="dark" />
        <NavItem id="NavSearchOptions">
          <SearchOptions type="dark" />
        </NavItem>
        <NavItem id="NavSearchBox">
          <SearchBox />
        </NavItem>
      </Fragment>
    );
    const reload = () => {
      this.setState({ reload: !this.state.reload });
    };

    return (
      <Page navItems={navItems} color="dark" id="Properties" reload={reload}>
        <PropertyCards />
      </Page>
    );
  }
}

export default Properties;
