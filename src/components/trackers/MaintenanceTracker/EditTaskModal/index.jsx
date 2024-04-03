import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditTaskModal = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState({
    _id: "",
    property: "",
    date: "",
    deadline: "",
    description: "",
    contractor: "",
    status: "",
    priority: "",
  });
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Fetch task details based on taskId when component mounts
    fetch(`/api/maintenanceTasks/get-maintenance-task/${taskId}`)
      .then((res) => res.json())
      .then((taskData) => {
        setTask(taskData);
      })
      .catch((error) => console.error("Error fetching task:", error));

    // Fetch properties to populate the select options
    fetch("/api/properties/get-properties")
      .then((res) => res.json())
      .then((propertyData) => setProperties(propertyData))
      .catch((error) => console.error("Error fetching properties:", error));
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`/api/maintenanceTasks/update-maintenance-task/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      });
      // Redirect to task list page after successful update
      //window.location.href = ""; // Change this to URL
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Property Type:</label>
          <select
            name="property"
            id="property"
            defaultValue=""
            onChange={handleChange}
            value={task.property ? task.property : ""}
            required
          >
            <option disabled selected value=""></option>
            {properties.map((data) => (
              <option
                value={data.id}
                key={data.id} // Add a unique key prop
              >{`${data.loc_number} ${data.loc_street}`}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={task.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Deadline:</label>
          <input
            type="date"
            name="deadline"
            value={task.deadline}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={task.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contractor:</label>
          <input
            type="text"
            name="contractor"
            value={task.contractor}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Priority:</label>
          <select
            name="priority"
            id="priority"
            defaultValue=""
            onChange={handleChange}
            value={task.priority ? task.priority : ""}
            required
          >
            <option disabled selected value=""></option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button type="submit">Edit Maintenance Task</button>
      </form>
    </div>
  );
};

export default EditTaskModal;
