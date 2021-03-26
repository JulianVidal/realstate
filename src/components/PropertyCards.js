import React, { Component } from "react";
//import emptyImage from "../assets/empty.png";
//import LocalData from "../assets/data2.json";
import QueryString from "query-string";
import "./PropertyCards.scss";
import PropertyCard from "./PropertyCard";
import { withRouter } from "react-router-dom";
import { gsap, Power3 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import firebase from "../firebase.js";

class PropertyCards extends Component {
  constructor(props) {
    super(props);
    gsap.registerPlugin(ScrollToPlugin);
    gsap.registerPlugin(ScrollTrigger);
  }

  state = {
    data: null,
    search: null,
    error: null,
    loadedAnim: false,
    page: 0,
    rel: false,
  };

  handleScroll() {
    const width = window.innerWidth;
    const rows = Math.ceil((window.innerHeight - 126) / 238);

    let cols = 4;

    if (width <= 400) {
      cols = 1;
    } else if (width <= 1000) {
      cols = 2;
    } else if (width <= 1500) {
      cols = 3;
    }
    if (
      document.body.scrollHeight - window.innerHeight === window.scrollY &&
      (this.state.page + 3) * cols * rows < this.state.data.length
    ) {
      this.setState({ page: this.state.page + 1 });
    } else if (window.scrollY === 0 && this.state.page - 1 >= 0) {
      this.setState({ page: this.state.page - 1 });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      const cardHeight = 238; // + Math.ceil(0.35 * window.innerHeight * (1 / 11));
      const cardLeft =
        cardHeight * (((window.innerHeight - 70) / cardHeight) % 1);
      const scrollBy =
        prevState.page < this.state.page
          ? cardLeft
          : document.body.scrollHeight - window.innerHeight - cardLeft;
      window.scrollTo(0, scrollBy);
    }
  }
  async componentDidMount() {
    window.addEventListener("scroll", this.handleScroll.bind(this));
    const animation = (anim) => {
      tl.to(".PropertyCard", {
        autoAlpha: 1,
        ease: Power3.easeOut,
        stagger: 0.1,
        yoyo: true,
        repeat: 1,
        repeatDelay: 0.5,
        scaleX: 0.8,
        scaleY: 0.9,
        onComplete: () => {
          if (this.state.data || !document.querySelector(".PropertyCard")) {
            tl.kill();
            this.setState({ loadedAnim: true });
            //ScrollTrigger.batch(".PropertyCard", {
            //onEnter: (batch) => {
            ////gsap.to(batch, { autoAlpha: 1, stagger: 0.1 });
            //gsap.from(batch, { scaleX: 0.88, scaleY: 0.94, stagger: 0.1 });
            //},
            //onEnterBack: (batch) => {
            ////gsap.to(batch, { autoAlpha: 1, stagger: 0.1 });
            //gsap.from(batch, { scaleX: 0.88, scaleY: 0.94, stagger: 0.1 });
            //},
            //onLeave: (batch) => {
            ////gsap.to(batch, { autoAlpha: 0, stagger: 0.1 });
            //},
            //onLeaveBack: (batch) => {
            ////gsap.to(batch, { autoAlpha: 0, stagger: 0.1 });
            //},
            //});
          } else {
            anim(anim);
          }
        },
      });
    };

    const tl = gsap.timeline();

    animation(animation);
    this.getData();
  }

  getData = async () => {
    if (this.props.fav) {
      const user = localStorage.getItem("user");
      const data = await firebase
        .database()
        .ref(user)
        .once("value")
        .then((snapshot) => Object.values(snapshot.val() || {}));
      console.log("Got the data");
      this.setState({ data });
      return;
    }
    const search = QueryString.parse(this.props.location.search).location;
    const option = QueryString.parse(this.props.location.search).type;

    if (this.state.search !== search) {
      let error;
      //const data = LocalData;
      const data = await fetch(
        "https://realtor.p.rapidapi.com/properties/v2/list-for-" +
          option.toLowerCase() +
          "?city=" +
          search +
          "&limit=100&offset=0&sort=relevance",
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "faace970c9mshb9a6dc176f9b095p1b3796jsn1ac808ba8436",
            "x-rapidapi-host": "realtor.p.rapidapi.com",
          },
        }
      )
        .then(async (response) => {
          return response.json();
        })
        .catch((err) => {
          error = err;
        });
      console.log("Got the data", data);
      this.setState({ search, error });
      this.setState({ data: data.properties });
      return;
    }
  };

  render() {
    if (this.state.error) {
      return (
        <div id="PropertyCards">
          <div className="noData">
            Sorry! There has been an error getting your search results.
          </div>
        </div>
      );
    }

    if (this.state.data) {
      if (this.state.data.length === 0) {
        return (
          <div id="PropertyCards">
            <div className="noData">
              Sorry! There has been an error getting your search results.
            </div>
          </div>
        );
      }
      //}
    }

    window.onresize = () => {};
    if (!this.state.data || !this.state.loadedAnim) {
      window.onresize = () => {
        this.setState({ rel: !this.state.rel });
      };
      const width = window.innerWidth;
      const rows = Math.ceil((window.innerHeight - 126) / 238);

      let cols = 4;

      if (width <= 400) {
        cols = 1;
      } else if (width <= 1000) {
        cols = 2;
      } else if (width <= 1500) {
        cols = 3;
      }

      const properties = [];
      const emptyPropertyData = {
        adress: "",
        link: "",
        price: "",
        beds: "",
        baths: "",
        sqft: "",
        image: "",
      };
      for (let i = 0; i < cols * rows; i++) {
        properties.push(<PropertyCard data={emptyPropertyData} key={i} />);
      }

      return (
        <div id="PropertyCards" className="waitData">
          {properties}
        </div>
      );
    }

    const width = window.innerWidth;
    const rows = Math.ceil((window.innerHeight - 126) / 238);

    let cols = 4;

    if (width <= 400) {
      cols = 1;
    } else if (width <= 1000) {
      cols = 2;
    } else if (width <= 1500) {
      cols = 3;
    }
    const data = this.state.data;
    const properties = [];
    for (
      let i = this.state.page * rows * cols;
      i < Math.min((this.state.page + 2) * rows * cols, data.length);
      i++
    ) {
      if (!this.props.fav) {
        const property = data[i];
        const propertyID = property.property_id;
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

        const image = property.photos ? property.photos[0].href : "";
        const propertyData = {
          propertyID,
          adress,
          price,
          beds,
          baths,
          sqft,
          image,
        };
        properties.push(
          <PropertyCard
            data={propertyData}
            key={i}
            setData={this.props.setData}
          />
        );
      } else if (this.props.fav) {
        properties.push(
          <PropertyCard data={data[i]} key={i} setData={this.props.setData} />
        );
      }
    }

    return <div id="PropertyCards">{properties}</div>;
  }
}

export default withRouter(PropertyCards);
