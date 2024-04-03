import React from "react";
import { useState, useEffect } from "react";
import { convertDateToString, compareTwoDates } from "../../../utils/dateUtil";
import BillsTrackerTable from "../BillsTracker/BillsTrackerTable";

import CreateBillModal from "../BillsTracker/CreateBillModal";

const BillsTracker = () => {
  const [billsTableData, setBillsData] = useState([]);

  useEffect(() => {
    fetch("/api/bills/get-bills")
      .then((res) => res.json())
      .then((data) => {
        setBillsData(data.filter((bill) => bill.bill_type === "Rent"));
      });
  }, []);

  const addBillsToTable = (newData) => {
    setBillsData([...billsTableData, newData]);
  };

  return (
    <div>
      <h1>Rent Tracker</h1>
      <BillsTrackerTable data={billsTableData} />
    </div>
  );
};

export default BillsTracker;
