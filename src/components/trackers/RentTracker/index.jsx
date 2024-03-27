import React from "react";
import { useState, useEffect } from "react";
import { convertDateToString } from "../../../utils/dateUtil";
const RentTracker = () => {
  const [tableData, setData] = useState([]);

  useEffect(() => {
    fetch("/api/contracts/get-rent-tracker/")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div>
      <h1>Rent Tracker</h1>
      <h2>Overdue Payments</h2>
      {JSON.stringify(tableData)}
      <h2>Current Rent Status</h2>
      <h2>Upcoming Due Dates</h2>
    </div>
  );
};

export default RentTracker;
