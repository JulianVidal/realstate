import React, { Component } from "react";
import QueryString from "query-string";
import "./PropertyCards.scss";
import PropertyCard from "./PropertyCard";
import { withRouter } from "react-router-dom";
import { gsap, Power3 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

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
    if (document.body.scrollHeight - window.innerHeight === window.scrollY) {
      console.log("load more");
      this.setState({ page: this.state.page + 1 });
      //window.scrollTo(0, 0);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      console.log("refresh");
      window.scrollTo(0, 10);
      //gsap.to(window, {
      //scrollTo: 0,
      //onComplete: () => ScrollTrigger.refresh(),
      //});
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
          if (
            this.state.data ||
            this.props.data ||
            !document.querySelector(".PropertyCard")
          ) {
            tl.kill();
            this.setState({ loadedAnim: true });
            ScrollTrigger.batch(".PropertyCard", {
              onEnter: (batch) => {
                //gsap.to(batch, { autoAlpha: 1, stagger: 0.1 });
                gsap.from(batch, { scaleX: 0.88, scaleY: 0.94, stagger: 0.1 });
              },
              onEnterBack: (batch) => {
                //gsap.to(batch, { autoAlpha: 1, stagger: 0.1 });
                gsap.from(batch, { scaleX: 0.88, scaleY: 0.94, stagger: 0.1 });
              },
              onLeave: (batch) => {
                //gsap.to(batch, { autoAlpha: 0, stagger: 0.1 });
              },
              onLeaveBack: (batch) => {
                //gsap.to(batch, { autoAlpha: 0, stagger: 0.1 });
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

  //async componentDidUpdate() {
  //this.getData();
  //}

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
    const properties = [];
    for (
      let i = Math.min(this.state.page * 6, 190);
      i < Math.min(12 + this.state.page * 6, 200);
      i++
    ) {
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

        const image = property.photos[0].href;
        const propertyData = {
          propertyID,
          adress,
          price,
          beds,
          baths,
          sqft,
          image,
        };
        properties.push(<PropertyCard data={propertyData} key={i} />);
      } else if (this.props.data) {
        properties.push(<PropertyCard data={data[i]} key={i} />);
      }
    }

    return <div id="PropertyCards">{properties}</div>;
  }
}

export default withRouter(PropertyCards);
