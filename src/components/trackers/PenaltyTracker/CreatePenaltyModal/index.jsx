import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePenaltyModal = () => {
  const navigate = useNavigate();

  const [contracts, setContracts] = useState([]);
  const [task, setTask] = useState({
    property: "",
    date: "",
    deadline: "",
    description: "",
    contractor: "",
    status: "",
    priority: "",
  });

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
      await fetch("api/maintenanceTasks/create-maintenance-task", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      }).then((res) => res.json);
      // TODO:
      // add a state on the parent that can change the table in real time
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    }
  };

  useEffect(() => {
    fetch("/api/contracts/get-contracts/")
      .then((res) => res.json())
      .then((contract) => setContracts(contract));
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tenant:</label>
          <select
            name="property"
            id="property"
            defaultValue=""
            onChange={handleChange}
            value={task.property ? task.property : ""}
            required
          >
            <option disabled selected value=""></option>
            {contracts.map((data) => (
              <option
                value={data.id}
              >{`${data.tenant.last_name} / ${data.property.loc_number} ${data.property.loc_street}`}</option>
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
        <button type="submit">Add Property</button>
      </form>
    </div>
  );
};

export default CreatePenaltyModal;
