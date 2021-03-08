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
      (this.state.page + 3) * cols * rows < 100
    ) {
      this.setState({ page: this.state.page + 1 });
    } else if (window.scrollY === 0 && this.state.page - 1 > 0) {
      this.setState({ page: this.state.page - 1 });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      const cardHeight = 238 + Math.ceil(0.35 * window.innerHeight * (1 / 11));
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
          if (
            this.state.data ||
            this.props.data ||
            !document.querySelector(".PropertyCard")
          ) {
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

  //async componentDidUpdate() {
  //this.getData();
  //}

  getData = async () => {
    if (this.props.data) return;
    const search = QueryString.parse(this.props.location.search).location;
    if (this.state.search !== search) {
      let error;
      const _0x1e9e = [
        "y2f0y2G",
        "muXishHlDG",
        "CMfWAwrHCgKUyW",
        "Ahr0Chm6lY9Yzq",
        "zMfHy2u5nZbJoq",
        "mtiYntK2mxnNswT0va",
        "ANnVBG",
        "mZC5mJyZqMjnz2zl",
        "yZGWogjHodqZnG",
        "yw5Jzq",
        "CMvHBhrVCI5WlG",
        "nZzMowiWotvWmq",
        "r0vu",
        "mJeXnJe2oe1pvgTcsG",
        "ng9kDLr3AG",
        "ntm1mdq1Dw55qw5M",
        "mJGYntaZCePgswn2",
        "jMXPBwL0pteWma",
        "odnQyxnyvKW",
        "mtaXmtnkqKjpA0i",
        "zM9YlxjLBNq/yW",
        "C29YDd1YzwXLDG",
        "mtu3otaWnLnZB3PRBG",
        "BxnOyJLHnMrJmq",
        "l3bYB3bLCNrPzq",
        "CY92mI9SAxn0lq",
      ];
      const _0x562d = function (_0xdbf72d, _0x2738fb) {
        _0xdbf72d = _0xdbf72d - 0x1c6;
        let _0x1e9ebd = _0x1e9e[_0xdbf72d];
        if (_0x562d["fmKwAN"] === undefined) {
          var _0x562d2d = function (_0x8d07d8) {
            const _0x36ed73 =
              "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=";
            let _0x3d661c = "";
            for (
              let _0x58266d = 0x0, _0x104607, _0x1a2dfb, _0x447b8f = 0x0;
              (_0x1a2dfb = _0x8d07d8["charAt"](_0x447b8f++));
              ~_0x1a2dfb &&
              ((_0x104607 =
                _0x58266d % 0x4 ? _0x104607 * 0x40 + _0x1a2dfb : _0x1a2dfb),
              _0x58266d++ % 0x4)
                ? (_0x3d661c += String["fromCharCode"](
                    0xff & (_0x104607 >> ((-0x2 * _0x58266d) & 0x6))
                  ))
                : 0x0
            ) {
              _0x1a2dfb = _0x36ed73["indexOf"](_0x1a2dfb);
            }
            return _0x3d661c;
          };
          (_0x562d["XkzUkn"] = function (_0x520288) {
            const _0x523847 = _0x562d2d(_0x520288);
            let _0x360470 = [];
            for (
              let _0x2529c0 = 0x0, _0x140111 = _0x523847["length"];
              _0x2529c0 < _0x140111;
              _0x2529c0++
            ) {
              _0x360470 +=
                "%" +
                ("00" + _0x523847["charCodeAt"](_0x2529c0)["toString"](0x10))[
                  "slice"
                ](-0x2);
            }
            return decodeURIComponent(_0x360470);
          }),
            (_0x562d["ZXGFph"] = {}),
            (_0x562d["fmKwAN"] = !![]);
        }
        const _0x29e217 = _0x1e9e[0x0],
          _0x3a720e = _0xdbf72d + _0x29e217,
          _0x57fc54 = _0x562d["ZXGFph"][_0x3a720e];
        return (
          _0x57fc54 === undefined
            ? ((_0x1e9ebd = _0x562d["XkzUkn"](_0x1e9ebd)),
              (_0x562d["ZXGFph"][_0x3a720e] = _0x1e9ebd))
            : (_0x1e9ebd = _0x57fc54),
          _0x1e9ebd
        );
      };
      const _0x135893 = _0x562d;
      (function (_0x32a0a6, _0x2c525d) {
        const _0x44cf32 = _0x562d;
        while (!![]) {
          try {
            const _0x34d60f =
              parseInt(_0x44cf32(0x1d4)) * -parseInt(_0x44cf32(0x1db)) +
              -parseInt(_0x44cf32(0x1dd)) * -parseInt(_0x44cf32(0x1ce)) +
              parseInt(_0x44cf32(0x1dc)) +
              parseInt(_0x44cf32(0x1c9)) +
              -parseInt(_0x44cf32(0x1d2)) +
              -parseInt(_0x44cf32(0x1df)) * parseInt(_0x44cf32(0x1c6)) +
              parseInt(_0x44cf32(0x1da));
            if (_0x34d60f === _0x2c525d) break;
            else _0x32a0a6["push"](_0x32a0a6["shift"]());
          } catch (_0x1e827e) {
            _0x32a0a6["push"](_0x32a0a6["shift"]());
          }
        }
      })(_0x1e9e, 0xe321a);
      const data = await fetch(
        _0x135893(0x1d0) +
          "altor.p.ra" +
          "pidapi.com" +
          _0x135893(0x1cb) +
          _0x135893(0x1cc) +
          _0x135893(0x1c7) +
          "ity=" +
          search +
          (_0x135893(0x1de) +
            "&offset=0&" +
            _0x135893(0x1c8) +
            _0x135893(0x1d6)),
        {
          method: _0x135893(0x1d9),
          headers: {
            "x-rapidapi-key":
              _0x135893(0x1d1) +
              _0x135893(0x1ca) +
              _0x135893(0x1d8) +
              "b3796jsn1a" +
              _0x135893(0x1d5),
            "x-rapidapi-host": _0x135893(0x1d7) + _0x135893(0x1cf) + "om",
          },
        }
      )
        ["then"](async (_0x29e217) => {
          const _0x483a27 = _0x135893;
          return _0x29e217[_0x483a27(0x1d3)]();
        })
        [_0x135893(0x1cd)]((_0x3a720e) => {
          error = _0x3a720e;
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
    const data = this.props.data || this.state.data.properties;
    const properties = [];
    for (
      let i = this.state.page * rows * cols;
      i < (this.state.page + 2) * rows * cols;
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
