import React, { Component } from "react";
import { ReactComponent as ArrowIcon } from "../assets/icons/arrow.svg";
import "./ImageSlider.scss";

class ImageSlider extends Component {
  render() {
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
    return (
      <div className="ImageSlider">
        <ArrowIcon onClick={this.prevImage} className='prev'/>
        {images}
        <ArrowIcon onClick={this.nextImage} className='next'/>
        <p> For Rent </p>
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

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (image.className.indexOf("active") > -1) {
        image.className = "";
        if (i + change < images.length && i + change >= 0) {
          images[i + change].className = "active";
        }
        if (i + change >= images.length) {
          images[i + change - images.length].className = "active";
        }
        if (i + change < 0) {
          images[i + change + images.length].className = "active";
        }
        break;
      }
    }
  }
}

export default ImageSlider;
