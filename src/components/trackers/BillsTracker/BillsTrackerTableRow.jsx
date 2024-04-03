import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Status from "../status";
import { convertDateToString, dateToWordDate } from "../../../utils/dateUtil";

const BillsTrackerTableRow = ({ item, MarkPaid, Waive }) => {
  const [row, setRow] = useState(item);

  const changeWaiveStatus = (item) => {
    Waive(item);
    setRow({ ...row, isWaived: true });
  };

  const changePayStatus = (item) => {
    MarkPaid(item);
    setRow({ ...row, date_received: Date.now() });
  };

  return (
    <tr key={row._id}>
      <td>{convertDateToString(row.date_due)}</td>
      <td>{row.tenant_contract.tenant.last_name}</td>
      <td>{row.information}</td>
      <td>₱ {row.amount.toFixed(2)}</td>
      <td>
        {/* <Status status={row.isTerminated} date={""} /> */}
        {row.date_received ? "Paid" : row.isWaived ? "Waived" : "Unpaid"}
      </td>

      {row.date_received || row.isWaived ? (
        ""
      ) : (
        <td
          style={{
            display: "flex",
            flexDirection: "row",
            margin: "0 !important",
          }}
        >
          <button style={{ margin: 0 }} onClick={() => changePayStatus(row)}>
            Mark as Paid
          </button>
          <button style={{ margin: 0 }} onClick={() => changeWaiveStatus(row)}>
            Waive
          </button>
          <button style={{ margin: 0 }}>Change Date</button>
        </td>
      )}
    </tr>
  );
};

export default BillsTrackerTableRow;
