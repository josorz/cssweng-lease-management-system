import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const deleteProperty = (propertyId) => {
  fetch("/api/properties/delete-property", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: propertyId }),
  }).then(() => {
    const navigate = useNavigate();
    navigate("/");
  });
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
      <Link to="" onClick={() => deleteProperty(propertyId)}>
        Delete Property
      </Link>
      <a>Add Tenant</a>
    </div>
  );
};

export default Property;
