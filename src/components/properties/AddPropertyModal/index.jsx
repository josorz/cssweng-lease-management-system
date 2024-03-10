import React, { useState } from "react";
import axios from "axios";

const PropertyForm = () => {
  const [property, setProperty] = useState({
    property_type: "",
    loc_street: "",
    loc_barangay: "",
    loc_city: "",
    loc_posx: "",
    loc_posy: "",
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
      await axios.post("/api/properties", property);
      alert("Property added successfully!");
      setProperty({
        property_type: "",
        loc_street: "",
        loc_barangay: "",
        loc_city: "",
        loc_posx: "",
        loc_posy: "",
      });
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
          <label>Property Type:</label>
          <input
            type="text"
            name="property_type"
            value={property.property_type}
            onChange={handleChange}
            required
          />
        </div>
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
        <div>
          <label>Position X:</label>
          <input
            type="number"
            name="loc_posx"
            value={property.loc_posx}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Position Y:</label>
          <input
            type="number"
            name="loc_posy"
            value={property.loc_posx}
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
