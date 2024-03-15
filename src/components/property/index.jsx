import React from "react";
import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";

const deleteProperty = () => {
  fetch(`/api/properties/delete-property`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(propertyId),
  }).then(<Navigate to="/login" />);
};

const Property = () => {
  const [propertyInfo, setPropertyInfo] = useState([]);
  const { propertyId } = useParams();
  useEffect(() => {
    const url = `/api/properties/get-property/${propertyId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setPropertyInfo(data));
  }, []);

  return (
    <div>
      <div>{propertyInfo.loc_street}</div>
      <div>{propertyInfo.loc_barangay}</div>
      <div>{propertyInfo.loc_city}</div>
      <a>Delete Property</a>
      <a>Add Tenant</a>
    </div>
  );
};

export default Property;
