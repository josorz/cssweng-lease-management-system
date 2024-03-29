import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import BillsTable from "./BillsTable";
import { dateToWordDate } from "../../utils/dateUtil";
import "./PrintContract.css";

const Contract = () => {
  const [contractData, setContractData] = useState({});

  const [rentData, setRentData] = useState([]);
  const [utilData, setUtilData] = useState([]);
  const [penaltyData, setPenaltyData] = useState([]);

  const { contractId } = useParams();
  useEffect(() => {
    fetch(`/api/contracts/get-contract/${contractId}`)
      .then((res) => res.json())
      .then((response) => {
        setContractData(response.contract);
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

  const terminateContract = async () => {
    const navigate = useNavigate();

    const data = {
      id: contractId,
    };
    await fetch(`/api/contracts/delete-contract/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Indicate that the request body contains JSON data
      },
      body: JSON.stringify(data),
    }).then(() => {
      navigate(-1);
    });
  };

  return (
    contractData &&
    contractData.property &&
    contractData.tenant && (
      <div>
        <div>
          {contractData.property.loc_number} {contractData.property.loc_street}{" "}
          {">"} Contract
        </div>
        <div>Print Info</div>
        <Link onClick={terminateContract} to="">
          <div>Terminate Contract</div>
        </Link>
        <div>Property Info</div>
        <div>Type: Apartment</div>
        <div>
          Address: {contractData.property.loc_number},{" "}
          {contractData.property.loc_street},{" "}
          {contractData.property.loc_barangay}, {contractData.property.loc_city}
        </div>
        <div>Contract Info</div>
        <div>
          Name: {contractData.tenant.first_name} {contractData.tenant.last_name}
        </div>
        <Link
          to={`/api/images/${contractData.tenant.id_picture}`}
          target="_blank"
        >
          <div>View Identification</div>
        </Link>
        <div>Start Date: {dateToWordDate(contractData.date_start)}</div>
        <div>End Date: {dateToWordDate(contractData.date_end)}</div>
        <div></div>
        <div></div>
        <div></div>
        <div>Billing Info / Rent</div>
        <BillsTable data={rentData} />

        <div>Billing Info / Rent</div>
        <BillsTable data={utilData} />

        <div>Penalties</div>
        <BillsTable data={penaltyData} />
        <div></div>
        <div>Add New Expense</div>
      </div>
    )
  );
};

export default Contract;
