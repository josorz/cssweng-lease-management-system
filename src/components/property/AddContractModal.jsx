import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { countMonths } from "../../utils/dateUtil";
import moment from "moment";

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await fetch("api/contracts/create-contract", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newContract),
    })
      .then((res) => res.json)
      .then((id) => navigate(`/contracts/${JSON.stringify(id)}`));
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
    tenant: {
      last_name: "",
      first_name: "",
      contact: "",
      email: "",
      id_picture: "",
    },
    isTerminated: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContract({
      ...newContract,
      [name]: value,
    });
  };

  const uploadImage = (e) => {
    const imageInput = e.target.files[0];
    if (imageInput) {
      const formData = new FormData();
      formData.append("image", imageInput);
      fetch("/api/images/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).catch((error) => {
        console.error("Error uploading image:", error);
      });
    }
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

  const calculateMonthly = () => {
    // Get Start and end Date and format it to comply with Moment.js standards
    const startDate = moment(newContract.date_start, "YYYY-MM-DD");
    const endDate = moment(newContract.date_end, "YYYY-MM-DD");
    // Count months
    const months = endDate.diff(startDate, "M");
    return parseFloat(newContract.totalAmount) / parseFloat(months);
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
          <i>
            This contract will generate the following bills: <br />
          </i>
          <i>
            Deposit for three months, worth {calculateMonthly() * 3}
            <br />
          </i>
          <i>
            Two months advance worth {calculateMonthly() * 2}
            <br />
          </i>
          <i>Both due at start date</i>
        </div>
        <div>
          <h2>Tenant Information</h2>
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            value={newContract.tenant.last_name}
            onChange={(e) =>
              setNewContract({
                ...newContract,
                tenant: { ...newContract.tenant, last_name: e.target.value },
              })
            }
            required
          />
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            value={newContract.tenant.first_name}
            onChange={(e) =>
              setNewContract({
                ...newContract,
                tenant: { ...newContract.tenant, first_name: e.target.value },
              })
            }
            required
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={newContract.tenant.email}
            onChange={(e) =>
              setNewContract({
                ...newContract,
                tenant: { ...newContract.tenant, email: e.target.value },
              })
            }
            required
          />
          <label>Contact</label>
          <input
            type="text"
            inputMode="numeric"
            pattern="(+)?[0-9]*"
            name="contact"
            value={newContract.tenant.contact}
            onChange={(e) =>
              setNewContract({
                ...newContract,
                tenant: { ...newContract.tenant, contact: e.target.value },
              })
            }
            required
          />
          <label>ID</label>
          <input type="file" onChange={uploadImage} required />
        </div>
        <button type="submit">Create New Contract</button>
      </form>
    </div>
  );
};

export default AddContract;
