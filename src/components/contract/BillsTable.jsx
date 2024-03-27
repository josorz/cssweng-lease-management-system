import React from "react";
import { Link } from "react-router-dom";
// import Status from "../status";
import { convertDateToString } from "../../utils/dateUtil";

const BillsTable = ({ data }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>Date Due</th>
          <th>Information</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
        {data.map((item) => (
          <tr key={item._id}>
            <td>{convertDateToString(item.date_due)}</td>
            <td>{item.information}</td>
            <td>₱ {item.amount.toFixed(2)}</td>
            <td>
              {/* <Status status={item.isTerminated} date={""} /> */}
              {item.date_received
                ? "Paid"
                : item.isWaived
                ? "Waived"
                : "Unpaid"}
            </td>
            <td>
              <button>Mark as Paid</button>
              <button>Waive</button>
              <button>Edit Date</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BillsTable;
