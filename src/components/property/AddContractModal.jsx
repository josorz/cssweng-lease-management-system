import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { countMonths } from "../../utils/dateUtil";
import moment from "moment";

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
      .then((res) => res.json)
      .then((id) => navigate(`/properties/${JSON.stringify(id)}`));
  } catch (error) {
    console.error("Error adding property:", error);
    alert("Failed to add property. Please try again.");
  }
};

const AddContract = ({ property }) => {
  const navigate = useNavigate();
  const [newContract, setNewContract] = useState({
    property,
    date_start: "",
    date_end: "",
    totalAmount: "",
    tenant: "",
    isTerminated: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContract({
      ...newContract,
      [name]: value,
    });
  };

  const changeEndDate = (e) => {
    // Get Start Date and format it to comply with Moment.js standards
    const startDate = moment(newContract.date_start, "YYYY-MM-DD");
    if (startDate) {
      // Get Occupancy Months
      const occupancyMonths = e.target.value;
      // Use moment.js to add occupancy months to current date
      const endDate = startDate.add(occupancyMonths, "M").format("YYYY-MM-DD");
      // Set date to end date
      setNewContract({
        ...newContract,
        date_end: endDate,
      });
    }
  };

  return (
    <div>
      <h1>Add New Contract</h1>
      <form onSubmit={handleSubmit}>
        <label>Start Date</label>
        <input type="date" name="date_start" onChange={handleChange} required />
        <br />
        <label>Number of Months</label>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          name="mon"
          onChange={changeEndDate}
          required
        />
        <label>End Date</label>
        <input
          type="date"
          name="date_end"
          onChange={handleChange}
          min={newContract.date_start}
          value={newContract.date_end}
          disabled
        />
        <label>Total Contract Amount</label>
        <input
          type="text"
          inputMode="numeric"
          pattern="^[0-9]+(\.[0-9]+)?$"
          name="totalAmount"
          value={newContract.totalAmount}
          onChange={handleChange}
          required
        />
        <div>
          <i>This contract will generate {newContract.totalAmount}</i>
        </div>
        <button type="submit">Create New Contract</button>
      </form>
    </div>
  );
};

export default AddContract;
