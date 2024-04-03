import React from "react";
import "./status.css";

const Status = ({ status }) => {
  const colors = {
    Terminated: "#8B0000",
    Occupied: "green",
    Vacant: "green",
    Expiring: "yellow",
    Paid: "green",
    Unpaid: "#8B0000",
    Waived: "yellow",
    Complete: "green",
    Active: "#ADD8E6",
  };

  return (
    <div className="status">
      <span
        className="shape"
        style={{ backgroundColor: colors[status] }}
      ></span>
      <div className="text">{status}</div>
    </div>
  );
};

export default Status;
