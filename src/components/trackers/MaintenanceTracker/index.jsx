import React, { useState, useEffect } from "react";
import { convertDateToString } from "../../../utils/dateUtil";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CreateTaskModal from "./CreateTaskModal"; // Assuming you already have this component
import EditTaskModal from "./EditTaskModal";
import "./style.css";

const MaintenanceTracker = () => {
  const [maintenanceTableData, setMaintenanceTableData] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  const handleEditClick = (id) => {
    setEditTaskId(id);
    setIsEditModalOpen(true);
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
            <th>Actions</th>
          </tr>
          {maintenanceTableData.map((data) => (
            <tr key={data._id}>
              <td>{`${data.property.loc_number} ${data.property.loc_street}`}</td>
              <td>{convertDateToString(data.date)}</td>
              <td>{convertDateToString(data.deadline)}</td>
              <td>
                <button onClick={() => handleEditClick(data._id)}>
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
      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsEditModalOpen(false)}>
              &times;
            </span>
            <EditTaskModal taskId={editTaskId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintenanceTracker;
