import React from "react";

const Card = ({ data }) => {
  return (
    <div className="card">
      <p>{data.loc_barangay}</p>
      <p>{data.loc_city}</p>
      <p>{data.loc_posx}</p>
      <p>{data.loc_posy}</p>
      <p>{data.loc_street}</p>
      <p>{data.property_type}</p>
      <p>{data.unit_number}</p>
    </div>
  );
};

export default Card;
