import React from "react";
import PropertyInfoDashboard from "../propertyInfoDashboard/";

const ViewTrackers = () => {
  return (
    <div>
      <div className="trackers">
        <a href="/trackers/maintenance">Maintenance Tracker</a>
        <br />
        <a href="/trackers/penalty">Penalty Tracker</a>
        <br />
        <a href="/trackers/bills">Bills Tracker</a>
        <br />
        <a href="/trackers/rent">Rent Tracker</a>
      </div>
      <div className="info">
        <PropertyInfoDashboard />
      </div>
    </div>
  );
};

export default ViewTrackers;
