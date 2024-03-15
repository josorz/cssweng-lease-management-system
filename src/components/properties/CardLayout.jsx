import React from "react";
import "./cardlayout.css";

const CardLayout = ({ children }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="card-layout">{children}</div>
    </div>
  );
};

export default CardLayout;
