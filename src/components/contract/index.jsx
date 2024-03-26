import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import BillsTable from "./BillsTable";

const Contract = () => {
  const [contractData, setContractData] = useState({});

  const [rentData, setRentData] = useState({});
  const [utilData, setUtilData] = useState({});
  const [penaltyData, setPenaltyData] = useState({});

  const { contractId } = useParams();
  useEffect(() => {
    fetch(`/api/contracts/get-contract/${contractId}`)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setContractData(response);
        const bills = response.bills;
        setRentData(bills.filter((data) => data.bill_type === "Rent"));
        setUtilData(bills.filter((data) => data.bill_type === "Utility"));
        setPenaltyData(bills.filter((data) => data.bill_type === "Penalty"));
      })
      .catch((err) => {
        console.error("Cannot GET contract data");
        console.error(err);
      });
  }, []);
  return (
    <div>
      <div>301 Green Residences {">"} Contract</div>
      <div>Print Info</div>
      <div>Terminate Contract</div>
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
      <div>Billing Info / Rent</div>
      <BillsTable data={rentData} />
      {/* <BillsTable data={utilData} />
      <BillsTable data={penaltyData} /> */}
      <div></div>
      <div>Add New Expense</div>
    </div>
  );
};

export default Contract;
