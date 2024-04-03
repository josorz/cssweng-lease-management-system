import React, { useState, useEffect } from "react";
import { convertDateToString } from "../../../utils/dateUtil";
import { faCheck, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import CreateTaskModal from "./CreateTaskModal"; // Assuming you already have this component
import EditTaskModal from "./EditTaskModal";
import "./style.css";

const MaintenanceTracker = () => {
  const navigate = useNavigate();

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
    let verify = confirm("Delete task?");
    if (verify) {
      fetch("/api/maintenanceTasks/delete-maintenance-task/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }).then(() => {
        setMaintenanceTableData((data) =>
          data.filter((item) => item._id !== id)
        );
      });
    }
  };

  const markDone = (id) => {
    let verify = confirm("Mark task as done?");
    if (verify) {
      fetch("/api/maintenanceTasks/edit-maintenance-task/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status: "Complete" }),
      }).then(() => {
        navigate(0);
      });
    }
  };

  const handleEditClick = (id) => {
    setEditTaskId(id);
    setIsEditModalOpen(true);
  };

  return (
    <div className="main-page">
      <h1>Maintenance Tracker</h1>
      {maintenanceTableData && (
        <table>
          <tbody>
            <tr>
              <th>Property</th>
              <th>Date</th>
              <th>Description</th>
              <th>Deadline</th>
              <th>Contractor</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
            {maintenanceTableData.map((data, index) => (
              <tr key={data._id}>
                <td>{`${data.property.loc_number} ${data.property.loc_street}`}</td>
                <td>{convertDateToString(data.date)}</td>
                <td>{data.description}</td>
                <td>{convertDateToString(data.deadline)}</td>
                <td>{data.contractor}</td>
                <td>{data.status}</td>
                {data.status !== "Complete" ? (
                  <td>
                    <button onClick={() => markDone(data._id)}>
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button onClick={() => deleteTask(data._id)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </td>
                ) : (
                  ""
                )}
                {isEditModalOpen && (
                  <div className="modal">
                    <div className="modal-content">
                      <span
                        className="close"
                        onClick={() => setIsEditModalOpen(false)}
                      >
                        &times;
                      </span>
                      <EditTaskModal
                        index={index}
                        taskId={editTaskId}
                        taskInfo={data}
                      />
                    </div>
                  </div>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h1>Create Task</h1>
      <CreateTaskModal
        data={maintenanceTableData}
        setData={setMaintenanceTableData}
      />
    </div>
  );
};

export default MaintenanceTracker;
