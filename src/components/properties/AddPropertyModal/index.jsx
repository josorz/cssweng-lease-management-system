import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PropertyForm = () => {
  const navigate = useNavigate();
  const [property, setProperty] = useState({
    image_link: "",
    property_type: "",
    loc_number: "",
    loc_street: "",
    loc_propertyname: "",
    loc_barangay: "",
    loc_city: "",
    contract_history: "",
    maintenance_history: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({
      ...property,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("api/properties/create-property", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(property),
      })
        .then((res) => res.json())
        .then((id) => navigate(`/property/${id}`));
    } catch (error) {
      console.error("Error adding property:", error);
      alert("Failed to add property. Please try again.");
    }
  };

  return (
    <div>
      <h2>Add Property</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Image Link:</label>
          <input type="file" id="myFile" name="filename" />
        </div>
        <div>
          <label>Property Type:</label>
          <select
            name="property_type"
            id="property_type"
            defaultValue=""
            onChange={handleChange}
            value={property.property_type ? property.property_type : ""}
            required
          >
            <option disabled selected value=""></option>
            <option value="Apartment">Apartment</option>
            <option value="Condo">Condo</option>
            <option value="Single-Property">Single-Property</option>
          </select>
        </div>
        {property.property_type && (
          <div>
            <label>
              {property.property_type === "Single-Property"
                ? "House Number"
                : "Unit Number"}
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="loc_number"
              value={property.loc_number}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div>
          <label>Street:</label>
          <input
            type="text"
            name="loc_street"
            value={property.loc_street}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Property Name:</label>
          <input
            type="text"
            name="loc_propertyname"
            value={property.loc_propertyname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Barangay:</label>
          <input
            type="text"
            name="loc_barangay"
            value={property.loc_barangay}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="loc_city"
            value={property.loc_city}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Property</button>
      </form>
    </div>
  );
};

export default PropertyForm;
