import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const Contract = () => {
  const [contractData, setContractData] = useState({});

  const { contractId } = useParams();
  useEffect(() => {
    fetch(`/api/contracts/get-contract/${contractId}`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
  return (
    <div>
      <div>301 Green Residences {">"} Contract</div>
      <div>Print Button</div>
      <div>Property Info</div>
      <div>Type: Apartment</div>
      <div>Address: 301 Green Residences, Taft. Ave, Malate, Manila</div>
      <div>Contract Info</div>
      <div>Name: John Angelo Soriano</div>
      <div>View Identification</div>
      <div>Start Date: March 15, 2024</div>
      <div>End Date: March 15, 2025</div>
      <div></div>
      <div></div>
      <div></div>
      <div>Billing Info</div>
      <div>Rent</div>
      <div>Edit Billing Schedule</div>
      <div></div>
      <div></div>
      <div>Misc</div>
      <div></div>
      <div>Add New Expense</div>
    </div>
  );
};

export default Contract;
