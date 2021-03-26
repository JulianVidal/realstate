import React, { Component } from "react";
import emptyImage from "../assets/empty.png";
import { ReactComponent as ArrowIcon } from "../assets/icons/arrow.svg";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import "./ImageSlider.scss";

class ImageSlider extends Component {
  render() {
    if (!this.props.images) {
      return (
        <div className="ImageSlider">
          <img src={emptyImage} alt="Property" className="active" />
        </div>
      );
    }
    const images = this.props.images.map(({ href }, i) => {
      return (
        <img
          src={href}
          alt="Property"
          key={i}
          className={i === 0 ? "active" : ""}
        />
      );
    });
    const option = queryString.parse(this.props.history.location.search).type;
    return (
      <div className="ImageSlider">
        <div className="pageCount">
          <span className="count"> 1 </span> {" / " + images.length}
        </div>
        <ArrowIcon onClick={this.prevImage} className="prev" />
        {images}
        <ArrowIcon onClick={this.nextImage} className="next" />
        <p> For {option}</p>
      </div>
    );
  }
  prevImage = () => {
    this.changeImage(-1);
  };
  nextImage = () => {
    this.changeImage(1);
  };
  changeImage(change) {
    const images = document.querySelectorAll(".ImageSlider img");
    const counter = document.querySelector(".pageCount .count");

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (image.className.indexOf("active") > -1) {
        image.className = "";
        if (i + change < images.length && i + change >= 0) {
          images[i + change].className = "active";
          counter.innerHTML = i + change + 1;
        }
        if (i + change >= images.length) {
          images[i + change - images.length].className = "active";
          counter.innerHTML = i + change - images.length + 1;
        }
        if (i + change < 0) {
          images[i + change + images.length].className = "active";
          counter.innerHTML = i + change + images.length + 1;
        }
        return;
      }
    }

    images[0].className = "active";
  }
}

export default withRouter(ImageSlider);
