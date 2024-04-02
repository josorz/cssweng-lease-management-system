import React from "react";
import { useState, useEffect } from "react";
import { convertDateToString, compareTwoDates } from "../../../utils/dateUtil";
import BillsTrackerTable from "./BillsTrackerTable";

import CreateBillModal from "./CreateBillModal";

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
      <BillsTrackerTable data={billsTableData} />
    </div>
  );
};

export default BillsTracker;
