import React from "react";
import { TimelineLite, Power3 } from "gsap";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import "./SearchOptions.scss";

function SearchOptions({ options, type, history }) {
  const dark = type === "dark" ? " dark" : "";
  const className = "SearchOption" + dark;

  let active = false;
  const optionR = queryString.parse(history.location.search).type;
  const optionsElement = options.map((option, index) => {
    let underline;
    if (optionR === option) {
      active = true;
      underline = (
        <span className="underline active" style={{ width: "100%" }}></span>
      );
    } else {
      underline = <span className="underline"> </span>;
    }
    if (!active && index === options.length - 1) {
      underline = (
        <span className="underline active" style={{ width: "100%" }}></span>
      );
    }
    return (
      <p className={className} onClick={changeActive} key={index}>
        {option}
        {underline}
      </p>
    );
  });

  return (
    <div className="SearchOptions">
      {optionsElement}
      {/*      <p className={className} onClick={changeActive}>
        Buy
        <span className="underline active" style={{ width: "100%" }}></span>
      </p>
      <p className={className} onClick={changeActive}>
        Rent
        <span className="underline"> </span>
      </p>
      <p className={className} onClick={changeActive}>Sold <span className="underline"> </span></p>*/}
    </div>
  );
}

export default withRouter(SearchOptions);

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
