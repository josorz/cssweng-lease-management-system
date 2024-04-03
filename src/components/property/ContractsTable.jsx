import React from "react";
import { Link } from "react-router-dom";
import Status from "../status";
import { convertDateToString } from "../../utils/dateUtil";

const validateStatus = (date_end, isTerminated) => {
  if (isTerminated) {
    return "Terminated";
  } else {
    console.log(date_end);
    console.log(new Date());
    if (new Date(date_end) < new Date()) {
      return "Complete";
    } else {
      return "Active";
    }
  }
};

const ContractsTable = ({ data }) => {
  return (
    <table className="contracts-table">
      <tr>
        <th>Contract Start</th>
        <th>Contract End</th>
        <th>Tenant Name</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
      {data &&
        data.map((item) => (
          <tr key={item._id}>
            <td>{convertDateToString(item.date_start)}</td>
            <td>{convertDateToString(item.date_end)}</td>
            <td>{item.tenant.last_name}</td>
            <td>
              <Status
                status={validateStatus(item.date_end, item.isTerminated)}
              />
            </td>
            <td>
              <Link to={`/contract/${item._id}`}>
                <button id="property-buttons">View Contract</button>
              </Link>
            </td>
          </tr>
        ))}
    </table>
  );
};

export default ContractsTable;
