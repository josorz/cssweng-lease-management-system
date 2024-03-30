import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPropertyForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [image, setImage] = useState(null);
  const [property, setProperty] = useState({
    image_link: "",
    property_type: "",
    loc_number: "",
    loc_street: "",
    loc_propertyname: "",
    loc_barangay: "",
    loc_city: "",
  });

  useEffect(() => {
    // Fetch property details using the provided ID and populate the form
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`api/properties/${id}`);
        const data = await response.json();
        setProperty(data); // Assuming data structure matches property state
      } catch (error) {
        console.error("Error fetching property details:", error);
        // Handle error accordingly
      }
    };

    fetchPropertyDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({
      ...property,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("property_type", property.property_type);
    formData.append("loc_number", property.loc_number);
    formData.append("loc_street", property.loc_street);
    formData.append("loc_propertyname", property.loc_propertyname);
    formData.append("loc_barangay", property.loc_barangay);
    formData.append("loc_city", property.loc_city);

    try {
      await fetch(`api/properties/${id}/update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      navigate(`/property/${id}`);
    } catch (error) {
      console.error("Error updating property:", error);
      alert("Failed to update property. Please try again.");
    }
  };

  return (
    <div>
      <h2>Edit Property</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Image Link:</label>
          <input
            type="file"
            id="myFile"
            name="filename"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div>
          <label>Property Type:</label>
          <select
            name="property_type"
            id="property_type"
            onChange={handleChange}
            value={property.property_type}
            required
          >
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
        <button type="submit">Update Property</button>
      </form>
    </div>
  );
};

export default EditPropertyForm;
