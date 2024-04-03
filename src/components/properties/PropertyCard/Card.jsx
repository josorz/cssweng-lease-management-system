import React from "react";
import Status from "../../status";
import "./cardlayout.css";

const Card = ({ key, data }) => {
  return (
    <div className="card">
      {/* <p>{data.loc_barangay}</p>
      <p>{data.loc_city}</p>
      <p>{data.loc_posx}</p>
      <p>{data.loc_posy}</p>
      <p>{data.loc_street}</p>
      <p>{data.property_type}</p>
      <p>{data.unit_number}</p> */}
      <div className="property-image">
        <img src={`/api/images/${data.image_link}`} alt="" />
      </div>
      <div className="property-info">
        {data.loc_number} {data.loc_street}, {data.loc_barangay},{" "}
        {data.loc_city}
      </div>
    </div>
  );
};

export default Card;
