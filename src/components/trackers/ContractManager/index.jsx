import React from "react";
import { useState, useEffect } from "react";
import { convertDateToString } from "../../../utils/dateUtil";
const ContractManager = () => {
  const [overdueBills, setOverdueBills] = useState([]);
  const [upcomingBills, setUpcomingBills] = useState([]);

  useEffect(() => {
    fetch("/api/bills/get-bills/")
      .then((res) => res.json())
      .then((data) => {
        setOverdueBills(
          data.filter((bill) => new Date(bill.date_due) < new Date())
        );
        setUpcomingBills(
          data.filter((bill) => new Date(bill.date_due) > new Date())
        );
      });
  }, []);

  return (
    <div>
      <h1>Rent Tracker</h1>
      <h2>Overdue Payments</h2>
      <table>
        <tbody>
          {overdueBills.map((data, index) => (
            <tr key={data.id}>
              <td>{convertDateToString(data.date_due)}</td>
              <td>{data.tenant_contract.tenant.last_name}</td>
              <td>{data.information}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Current Rent Status</h2>
      <h2>Upcoming Due Dates</h2>
    </div>
  );
};

export default ContractManager;
