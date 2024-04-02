import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBillModal = (props) => {
  const navigate = useNavigate();

  const [contracts, setContracts] = useState([]);
  const [bill, setBill] = useState({
    tenant_contract: "",
    date_due: "",
    date_received: "",
    information: "",
    amount: "",
    isWaived: "false",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBill({
      ...bill,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = { ...bill, bill_type: props.billType };

    try {
      await fetch("/api/bills/create-bill", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((res) => res.json())
        .then((data) => props.setData(data))
        .then(() => {
          setBill({
            tenant_contract: "",
            date_due: "",
            date_received: "",
            information: "",
            amount: "",
            isWaived: "false",
          });
        });
      // add a state on the parent that can change the table in real time
    } catch (error) {
      console.error("Failed to add utility bill, ", error);
    }
  };

  useEffect(() => {
    fetch("/api/contracts/get-active-contracts/")
      .then((res) => res.json())
      .then((contract) => setContracts(contract));
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tenant:</label>
          <select
            name="tenant_contract"
            id="tenant_contract"
            defaultValue=""
            onChange={handleChange}
            value={bill.tenant_contract ? bill.tenant_contract : ""}
            required
          >
            <option disabled selected value=""></option>
            {contracts.map((data) => (
              <option
                value={data._id}
              >{`${data.tenant.last_name} / ${data.property.loc_number} ${data.property.loc_street}`}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Due Date</label>
          <input type="date" name="date_due" onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="information"
            value={bill.information}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={bill.amount}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add {props.billType}</button>
      </form>
    </div>
  );
};

export default CreateBillModal;
