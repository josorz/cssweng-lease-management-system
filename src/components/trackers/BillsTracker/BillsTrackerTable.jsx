import React from "react";
import { Link } from "react-router-dom";
// import Status from "../status";
import { convertDateToString, dateToWordDate } from "../../../utils/dateUtil";
import BillsTrackerTableRow from "./BillsTrackerTableRow";

const MarkPaid = (item) => {
  fetch("/api/bills/edit-bill/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: item._id, date_received: new Date() }),
  }).then(() => {
    item.date_received = new Date();
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

const BillsTrackerTable = ({ data }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>Date Due</th>
          <th>Tenant</th>
          <th>Information</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
        {data.map((item) => (
          <BillsTrackerTableRow item={item} MarkPaid={MarkPaid} Waive={Waive} />
        ))}
      </tbody>
    </table>
  );
};

export default BillsTrackerTable;
