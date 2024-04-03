import React from "react";
import PropertyInfoDashboard from "../propertyInfoDashboard/";
import "../viewTrackers/styles.css";
import mimage from "../../assets/house-1.png";
import pimage from "../../assets/house-1.png";
import bimage from "../../assets/assets-1.png";
import rimage from "../../assets/town-1.png";

const ViewTrackers = () => {
  return (
    <div className="tracker-container">
      <div className="Maintenance-card">
        <a href="/trackers/maintenance">
          <img src={mimage} alt="Maintenance" />
          <h3>Maintenance Tracker</h3>
        </a>
      </div>
      <div className="Penalty-card">
        <a href="/trackers/penalty">
          <img src={pimage} alt="Maintenance" />
          <h3>Penalty Tracker</h3>
        </a>
      </div>
      <div className="Bills-card">
        <a href="/trackers/bills">
          <img src={bimage} alt="Maintenance" />
          <h3>Bills Tracker</h3>
        </a>
      </div>
      <div className="Rent-card">
        <a href="/trackers/rent">
          <img src={rimage} alt="Maintenance" />
          <h3>Rent Tracker</h3>
        </a>
      </div>
      {/* Include other tracker cards as needed */}
      <div className="info">
        <PropertyInfoDashboard />
      </div>
    </div>
  );
};

export default ViewTrackers;
