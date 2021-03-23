import React, { Component } from "react";
import "./PropertyFeature.scss";

class ProperyFeature extends Component {
  render() {
    if (this.props.type === "table") {
      const schools = this.props.data.map((school, index) => {
        const name = school.name;
        const rating = `${
          school.ratings.great_schools_rating
            ? school.ratings.great_schools_rating
            : "N/A"
        } / ${school.ratings.parent_rating} `;
        const grades = `${school.grades.range.low} - ${school.grades.range.high}`;
        const funding = school.funding_type;
        //const students = school.student_count ? school.student_count : 'N/A'
        //const distance = `${school.distance_in_miles}m`
        //const ratio = `${school.student_teacher_ratio ? school.student_teacher_ratio : 'N/A'} : 1`
        const phone = `${school.phone}`;
        const street = school.location.street;
        const city = school.location.city;
        const state = school.location.state;
        const postal = school.location.postal_code;
        const address = `${street}, ${city}, ${state}, ${postal}`;
        const details = [
          name,
          rating,
          grades,
          funding,
          /*students, distance, ratio,*/ phone,
          address,
        ];
        const detailsElements = details.map((detail, i) => (
          <td
            key={i}
            className={i === details.length - 1 || i === 0 ? "expand" : ""}
          >
            {detail}
          </td>
        ));
        return <tr key={index}>{detailsElements}</tr>;
      });

      return (
        <table className="PropertyFeature">
          <thead>
            <tr colSpan="9">
              <td>
                <h1 className="category">Schools</h1>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="expand"> Name </th>
              <th> Rating Teacher / Parent </th>
              <th> Grade Levels </th>
              <th> Funding </th>
              {/* <th> Student Count </th>
            <th> Distance </th>
            <th> Teacher:Student</th>*/}
              <th> Telephone </th>
              <th className="expand"> Address </th>
            </tr>
            {schools}
          </tbody>
        </table>
      );
    }

    return (
      <div className="PropertyFeature">
        <h1 className="category"> {this.props.category} </h1>
        <div className="textContainer">
          {this.props.text.map((text, index) => {
            return (
              <p className="text" key={index}>
                {text}
              </p>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ProperyFeature;
