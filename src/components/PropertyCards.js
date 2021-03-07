import React, { Component } from "react";
import QueryString from "query-string";
import "./PropertyCards.scss";
import PropertyCard from "./PropertyCard";
import { withRouter } from "react-router-dom";
import { gsap, Power3 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

class PropertyCards extends Component {
  constructor(props) {
    super(props);
    gsap.registerPlugin(ScrollTrigger);
  }

  state = {
    data: null,
    search: null,
    error: null,
    loadedAnim: false,
    rel: false,
  };

  async componentDidMount() {
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
          if (
            this.state.data ||
            this.props.data ||
            !document.querySelector(".PropertyCard")
          ) {
            tl.kill();
            this.setState({ loadedAnim: true });
            ScrollTrigger.batch(".PropertyCard", {
              onEnter: (batch) => {
                gsap.to(batch, { autoAlpha: 1, stagger: 0.1 });
                gsap.from(batch, { scaleX: 0.88, scaleY: 0.94, stagger: 0.1 });
              },
            });
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

  async componentDidUpdate() {
    this.getData();
  }

  getData = async () => {
    if (this.props.data) return;
    const search = QueryString.parse(this.props.location.search).location;
    if (this.state.search !== search) {
      let error;
      const data = await fetch(
        "https://realtor.p.rapidapi.com/properties/v2/list-for-rent?city=" +
          search +
          "&limit=200&offset=0&sort=relevance",
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
      console.log("Got the data");
      this.setState({ search, data, error });
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

    const data = this.props.data || this.state.data.properties;
    console.log(data);
    const properties = [];
    for (let i = 0; i < 2 /*data.length*/; i++) {
      if (this.state.data) {
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
        const price = property.price;
        const beds = property.beds;
        const baths = property.baths;
        const sqft = property.building_size;
        const image = property.photos[0];
        const propertyData = {
          propertyID,
          adress,
          price,
          beds,
          baths,
          sqft,
          image,
        };

        console.log(propertyData);
        properties.push(<PropertyCard data={{ propertyData }} key={i} />);
      } else if (this.props.data) {
        properties.push(<PropertyCard data={data[i]} key={i} />);
      }
    }

    return <div id="PropertyCards">{properties}</div>;
  }
}

export default withRouter(PropertyCards);
