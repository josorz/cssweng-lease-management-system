import React from "react";
import { useState, useEffect } from "react";
import { convertDateToString, compareTwoDates } from "../../../utils/dateUtil";
import Status from "../Status";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CreatePenaltyModal from "./CreatePenaltyModal";

const PenaltyTracker = () => {
  const [overdueBills, setOverdueBills] = useState([]);

  useEffect(() => {
    fetch("/api/bills/get-bills/")
      .then((res) => res.json())
      .then((data) => {
        setOverdueBills(
          data.filter((bill) => new Date(bill.date_due) < new Date())
        );
      });
  }, []);

  const deleteTask = (id) => {
    fetch("/api/maintenanceTasks/delete-maintenance-task/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }).then(() => {
      setOverdueBills(data);
    });
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
            <th>Actions</th>
          </tr>
          {overdueBills.map((data, index) => (
            <tr key={data.id}>
              <td>{convertDateToString(data.date_due)}</td>
              <td>{data.tenant_contract.property}</td>
              <td>{data.tenant_contract.tenant.last_name}</td>
              <td>{data.information}</td>
              <td>
                <button>
                  <FontAwesomeIcon icon={faPencil} />
                </button>
                <button onClick={() => deleteTask(data._id)}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>Add Penalty</p>
      <CreatePenaltyModal />
      <table>
        <tbody>
          <tr>
            <th>Property</th>
            <th>Date</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Description</th>
            <th>Contractor</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
          {overdueBills.map((data, index) => (
            <tr>
              <td>{data.property}</td>
              <td>{convertDateToString(data.date)}</td>
              <td>{convertDateToString(data.deadline)}</td>
              <td>
                {/* <Status message={compareTwoDates(data.date, data.deadline)} /> */}
              </td>
              <td>{data.description}</td>
              <td>{data.contractor}</td>
              <td>{data.priority}</td>
              <td>
                <button>
                  <FontAwesomeIcon icon={faPencil} />
                </button>
                <button onClick={() => deleteTask(data._id)}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PenaltyTracker;
