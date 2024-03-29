import React from "react";
import { useState, useEffect } from "react";
import { convertDateToString, compareTwoDates } from "../../../utils/dateUtil";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CreateBillModal from "../BillsTracker/CreateBillModal";
import BillsTrackerTable from "../BillsTracker/BillsTrackerTable";

const PenaltyTracker = () => {
  const [overdueBills, setOverdueBills] = useState([]);

  const [penaltyTableData, setPenaltyData] = useState([]);

  const addBillsToTable = (newData) => {
    setPenaltyData([...penaltyTableData, newData]);
  };

  useEffect(() => {
    fetch("/api/bills/get-bills/")
      .then((res) => res.json())
      .then((data) => {
        setOverdueBills(
          data.filter(
            (bill) =>
              !bill.date_received &&
              new Date(bill.date_due) < new Date() &&
              !bill.isWaived
          )
        );
      });
  }, []);

  useEffect(() => {
    fetch("/api/bills/get-bills/")
      .then((res) => res.json())
      .then((data) => {
        setPenaltyData(data.filter((bill) => bill.bill_type === "Penalty"));
      });
  }, []);

  const deletePenalty = (id) => {
    fetch("/api/bills/delete-bill/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }).then(setPenaltyData(penaltyTableData.filter((data) => data._id != id)));
  };

  return (
    <div>
      <h1>Penalty Tracker</h1>
      <h2>Overdue Bills</h2>
      <table>
        <tbody>
          <tr>
            <th>Date</th>
            <th>Property</th>
            <th>Tenant Name</th>
            <th>Description</th>
          </tr>
          {overdueBills.map((data, index) => (
            <tr key={data.id}>
              <td>{convertDateToString(data.date_due)}</td>
              <td>
                {data.tenant_contract.property.loc_number}{" "}
                {data.tenant_contract.property.loc_street}
              </td>
              <td>{data.tenant_contract.tenant.last_name}</td>
              <td>{data.information}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1>Add Penalty</h1>
      <CreateBillModal billType={"Penalty"} setData={addBillsToTable} />
      <BillsTrackerTable data={penaltyTableData} />{" "}
    </div>
  );
};

export default PenaltyTracker;
