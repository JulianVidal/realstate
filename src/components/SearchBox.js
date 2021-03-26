import React, { Component } from "react";
import Lottie from "react-lottie-wrapper";
import queryString from "query-string";
import iconSearchStartData from "../assets/icons/searchStart.json";
import iconSearchLoadingData from "../assets/icons/searchLoading.json";
import iconSearchEndData from "../assets/icons/searchEnd.json";
import { withRouter } from "react-router-dom";
import "./SearchBox.scss";

class SearchBox extends Component {
  state = {
    isSearchStartStopped: true,
    isSearchLoadingStopped: true,
    isSearchEndStopped: true,
    search: "",
    doSearch: false,
    type: "",
  };

  componentDidMount() {
    this.setState({
      search: queryString.parse(this.props.history.location.search).location,
      type: queryString.parse(this.props.history.location.search).type,
    });
    if (this.state.doSearch) this.setState({ doSearch: false });
  }

  getSearch() {
    return this.searchBox.value;
  }

  render() {
    const defaultOptions = (data, loop = false) => {
      return {
        loop,
        autoplay: false,
        animationData: data,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };
    };

    return (
      <form id="SearchBox" onSubmit={this.handleSubmit}>
        <button
          type="submit"
          ref={(button) => {
            this.submitButton = button;
          }}
          onClick={() => {
            if (this.state.isSearchEndStopped === false) return;
            if (this.state.isSearchLoadingStopped === false) return;
            this.setState({ isSearchStartStopped: false });
          }}
        >
          <Lottie
            options={defaultOptions(iconSearchStartData)}
            height={20}
            width={20}
            isStopped={this.state.isSearchStartStopped}
            isClickToPauseDisabled={true}
            eventListeners={[
              {
                eventName: "complete",
                callback: () => this.searching(this),
              },
            ]}
          />

          <Lottie
            options={defaultOptions(iconSearchLoadingData, true)}
            height={20}
            width={20}
            isStopped={this.state.isSearchLoadingStopped}
            isClickToPauseDisabled={true}
            eventListeners={[
              {
                eventName: "loopComplete",
                callback: () => this.isDoneSearching(this),
              },
            ]}
          />

          <Lottie
            options={defaultOptions(iconSearchEndData)}
            height={20}
            width={20}
            isStopped={this.state.isSearchEndStopped}
            isClickToPauseDisabled={true}
            eventListeners={[
              {
                eventName: "complete",
                callback: () => this.restartSearch(this),
              },
            ]}
          />
        </button>
        <input
          type="text"
          placeholder="Search..."
          ref={(input) => {
            this.searchBox = input;
          }}
          onChange={(event) => {
            this.setState({ search: event.target.value });
            event.preventDefault();
          }}
          value={this.state.search || ""}
        ></input>
      </form>
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.submitButton.click();
  };

  searching = (component) => {
    const button = document.getElementById("SearchBox").childNodes[0];
    const iconSearchStart = button.childNodes[0];
    const iconSearchLoading = button.childNodes[1];

    iconSearchLoading.style.display = "flex";
    iconSearchStart.style.display = "none";

    component.setState({
      isSearchStartStopped: true,
      isSearchLoadingStopped: false,
    });
  };

  isDoneSearching = (component) => {
    const button = document.getElementById("SearchBox").childNodes[0];
    const iconSearchLoading = button.childNodes[1];
    const iconSearchEnd = button.childNodes[2];

    iconSearchEnd.style.display = "flex";
    iconSearchLoading.style.display = "none";

    component.setState({
      isSearchLoadingStopped: true,
      isSearchEndStopped: false,
    });
  };

  restartSearch = (component) => {
    const button = document.getElementById("SearchBox").childNodes[0];
    const iconSearchStart = button.childNodes[0];
    const iconSearchEnd = button.childNodes[2];
    const option = document.querySelector(".SearchOptions .active").parentNode
      .innerText;

    iconSearchEnd.style.display = "none";
    iconSearchStart.style.display = "flex";

    component.setState({ isSearchEndStopped: true });
    if (this.searchBox.value) {
      this.props.history.push({
        pathname: "/properties",
        search: `?location=${this.searchBox.value}&type=${option}`,
      });
      window.location.reload();
    } else {
      this.searchBox.placeholder = "Please enter a state or city";
      this.searchBox.className = "error";
    }
  };
}

export default withRouter(SearchBox);
