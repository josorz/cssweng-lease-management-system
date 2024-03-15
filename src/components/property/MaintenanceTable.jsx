import React, { useState } from "react";

const MaintenanceTable = ({ data, deleteMaintenanceRow }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
        {data.map((info, index) => (
          <tr key={index}>
            <td>{info.date}</td>
            <td>{info.description}</td>
            <td>
              <div>
                <button onClick={() => deleteMaintenanceRow(index, data)}>
                  Remove
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MaintenanceTable;
