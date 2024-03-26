import React from "react";
import { useState, useEffect } from "react";
import { convertDateToString, compareTwoDates } from "../../../utils/dateUtil";
import Status from "../Status";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CreateTaskModal from "./CreateTaskModal";

const MaintenanceTracker = () => {
  const [maintenanceTableData, setMaintenanceTableData] = useState([]);

  useEffect(() => {
    fetch("/api/maintenanceTasks/get-maintenance-tasks/")
      .then((res) => res.json())
      .then((data) => {
        setMaintenanceTableData(data);
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
      setMaintenanceTableData((data) => data.filter((item) => item._id !== id));
    });
  };

  return (
    <div>
      <h1>Maintenance Tracker</h1>
      <p>Create Task</p>
      <CreateTaskModal
        data={maintenanceTableData}
        setData={setMaintenanceTableData}
      />
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
          {maintenanceTableData.map((data, index) => (
            <tr>
              <td>{`${data.property.loc_number} ${data.property.loc_street}`}</td>
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

export default MaintenanceTracker;
