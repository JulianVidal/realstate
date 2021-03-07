import React from "react";
import { TimelineLite, Power3 } from "gsap";
import "./SearchOptions.scss";

function SearchOptions({ type }) {
  const dark = type === "dark" ? " dark" : "";
  const className = "SearchOption" + dark;
  return (
    <div className="SearchOptions">
      <p className={className} onClick={changeActive}>
        Buy
        <span className="underline active" style={{ width: "100%" }}></span>
      </p>
      <p className={className} onClick={changeActive}>
        Rent <span className="underline"> </span>
      </p>
      {/*<p className={className} onClick={changeActive}>Sold <span className="underline"> </span></p>*/}
    </div>
  );
}

export default SearchOptions;

function changeActive(event) {
  const active = event.target.parentNode.getElementsByClassName("active")[0];
  const newActive = event.target.childNodes[1];

  if (active === newActive) return;

  active.classList.remove("active");
  newActive.classList.add("active");

  const tl = new TimelineLite();
  tl.to(active, {
    duration: 0.4,
    opacity: 0,
    width: 0,
    ease: Power3.easeOut,
  }).to(
    newActive,
    { duration: 0.4, width: "100%", opacity: 1, ease: Power3.easeOut },
    0.1
  );
}
