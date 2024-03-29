import React from "react";
import { useState, useEffect } from "react";
import { convertDateToString, compareTwoDates } from "../../../utils/dateUtil";
import BillsTrackerTable from "./BillsTrackerTable";

import CreateBillModal from "./CreateBillModal";

const MarkPaid = (item) => {
  fetch("/api/bills/edit-bill/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: item._id, date_received: new Date() }),
  }).then(() => {
    setMaintenanceTableData((data) => data.filter((item) => item._id !== id));
  });
};

const Waive = (item) => {
  fetch("/api/bills/edit-bill/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: item._id,
      date_received: new Date(),
      isWaived: true,
    }),
  }).then(() => {
    item.isWaived = true;
  });
};

const BillsTracker = () => {
  const [billsTableData, setBillsData] = useState([]);

  useEffect(() => {
    fetch("/api/bills/get-bills/")
      .then((res) => res.json())
      .then((data) => {
        setBillsData(data.filter((bill) => bill.bill_type === "Utility"));
      });
  }, []);

  const addBillsToTable = (newData) => {
    setBillsData([...billsTableData, newData]);
  };

  return (
    <div>
      <h1>Utility Bills Tracker</h1>
      <p>Add Bill</p>
      <CreateBillModal billType={"Utility"} setData={addBillsToTable} />
      <BillsTrackerTable
        data={billsTableData}
        MarkPaid={MarkPaid}
        Waive={Waive}
      />
    </div>
  );
};

export default BillsTracker;
