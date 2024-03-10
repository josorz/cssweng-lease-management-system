import React from "react";
import handleSignOut from"../home/index";
import "./property-summary-dashboard.css";
import "./property-summary-dashboard.scss";

import town from "../../assets/town-1-rJ3.png";
import qCs from "../../assets/ellipse-1-qCs.png";
import duck from "../../assets/assets-1-dUK.png";
import house1 from "../../assets/house-1-1CT.png"
import house2 from "../../assets/house-1-Jyu.png"
import mask from "../../assets/mask-group-YJs.png"
const ViewTrackers = () => {
  return (
    <div>
  <meta charSet="utf-8" />s
  <link rel="icon" href="/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <title> Property Summary Dashboard</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins%3A400%2C500%2C600%2C700" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro%3A400%2C500%2C600%2C700" />
  <link rel="stylesheet" href="./styles/property-summary-dashboard.css" />
  <div className="property-summary-dashboard-4Qo">
    <div className="auto-group-uzsb-ZsM">
      <img className="bg-gBH" src="./assets/bg-SdM.png" />
      <div className="header-bJF">
      </div>
      <p className="twenty25-t2T">twenty25.</p>
      <p className="sign-out-Akf" onClick={handleSignOut}>Sign Out</p>
      <p className="view-all-properties-UWT">View All Properties</p>
      <div className="revenue-tracker-yCK">
        <div className="auto-group-tqbu-e3Z">
          <img className="town-1-7xj" src={town} />
        </div>
        <p className="revenue-cPh">Revenue</p>
        <p className="item-999999999-KJ7">$ 999999999</p>
      </div>
      <div className="net-profit-tracker-B5R">
        <div className="auto-group-pxax-pu5">
          <img className="ellipse-1-LsR" src={qCs} />
          <img className="assets-1-gwH" src={duck} />
        </div>
        <p className="net-profit-QcP">Net Profit </p>
        <p className="item-100000000-LW3">
          $ 100000000
          <br />
        </p>
      </div>
      <div className="maintenance-tracker-1cB">
        <div className="auto-group-eqek-JLP">
          <img className="house-1-bqH" src={house1} />
        </div>
        <p className="maintenance-tracker-KmH">Maintenance Tracker</p>
        <p className="description-add-here-T6o">description add here</p>
      </div>
      <div className="maintenance-tracker-k5u">
        <div className="auto-group-mwxf-F2f">
          <img className="house-1-KoD" src={house2} />
        </div>
        <p className="billing-tracker-3UK">Billing Tracker</p>
        <p className="description-add-here-NFh">description add here</p>
      </div>
      <div className="rectangle-88-rRm">
      </div>
      <div className="rectangle-89-PRh">
      </div>
    </div>
    <img className="mask-group-iD5" src={mask} />
  </div>
</div>

  );
};

export default ViewTrackers;
