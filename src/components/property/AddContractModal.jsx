import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import moment from "moment";

const AddContract = ({ property }) => {
  const navigate = useNavigate();

  const [newContract, setNewContract] = useState({
    property,
    date_start: "",
    date_end: "",
    monthly_due: "",
    tenant: {
      last_name: "",
      first_name: "",
      contact: "",
      email: "",
      id_picture: "",
    },
  });

  const [tenantImage, setTenantImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", tenantImage);
      formData.append("property", newContract.property);
      formData.append("date_start", newContract.date_start);
      formData.append("date_end", newContract.date_end);
      formData.append("monthly_due", newContract.monthly_due);
      formData.append("tenant[last_name]", newContract.tenant.last_name);
      formData.append("tenant[first_name]", newContract.tenant.first_name);
      formData.append("tenant[contact]", newContract.tenant.contact);
      formData.append("tenant[email]", newContract.tenant.email);
      formData.append("isTerminated", false);

      await fetch("/api/contracts/create-contract", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((id) => navigate(`/contract/${id}`));
    } catch (error) {
      console.error("Error adding property:", error);
      alert("Failed to add property. Please try again.");
    }
  };

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
      const occupancyMonths = parseInt(e.target.value);
      // Use moment.js to add occupancy months to current date
      const endDate = startDate.add(occupancyMonths, "M").format("YYYY-MM-DD");
      // Set date to end date
      setNewContract({
        ...newContract,
        date_end: endDate,
      });
    }
  };

  useEffect(() => {
    console.log(tenantImage);
  }, [tenantImage]);

  return (
    <div className="add-contract">
      <h1>Add New Contract</h1>
      <form onSubmit={handleSubmit}>
        <div className="add-contract-form-inputs">
          <div className="">
            <label>Start Date</label>
            <input
              type="date"
              name="date_start"
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <label>Number of Months</label>
            <select
              name=""
              id=""
              defaultValue=""
              onChange={changeEndDate}
              required
            >
              <option disabled selected value=""></option>
              <option value="3">3</option>
              <option value="6">6</option>
              <option value="12">12</option>
              <option value="12">24</option>
              <option value="12">36</option>
            </select>
            <label>End Date</label>
            <input
              type="date"
              name="date_end"
              onChange={handleChange}
              min={newContract.date_start}
              value={newContract.date_end}
              disabled
            />
            <label>Monthly Due</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="^[0-9]+(\.[0-9]+)?$"
              name="monthly_due"
              value={newContract.monthly_due}
              onChange={handleChange}
              required
            />
            <div>
              <i>
                This contract will generate the following bills: <br />
              </i>
              <i>
                Deposit for three months, worth {newContract.monthly_due * 3}
                <br />
              </i>
              <i>
                Two months advance worth {newContract.monthly_due * 2}
                <br />
              </i>
              <i>Both due at start date</i>
            </div>
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
            <input
              type="file"
              onChange={(e) => setTenantImage(e.target.files[0])}
              required
            />
          </div>
        </div>

        <button type="submit">Create New Contract</button>
      </form>
    </div>
  );
};

export default AddContract;
