import React from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";
import { doSignOut } from "../../../firebase/auth";
import "./home.css";
import "./home.scss";

import xyMimage from "/src/assets/mask-group-xyM.png";
import SHmimage from "/src/assets/mask-group-SHm.png";
import ew1image from "/src/assets/mask-group-ew1.png";
import Zhimage from "/src/assets/mask-group-5Zh.png";
import Pf5image from "/src/assets/mask-group-Pf5.png";
import ixFimage from "/src/assets/mask-group-ixF.png";
import icon from "/src/assets/icon-plus-ygT.png";
const Home = () => {
  const navigate = useNavigate();
  const { setUserLoggedIn } = useAuth(); // Assuming your auth context provides a way to update the user's logged-in state

  const handleSignOut = async () => {
    try {
      await doSignOut(); // Sign out the user
      setUserLoggedIn(false); // Update the context state
      navigate("/login"); // Programmatically navigate to the login page
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };
  return (
    <div>
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <title>Property Dashboard</title>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins%3A400%2C600%2C700" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro%3A400%2C600%2C700" />
      <link rel="stylesheet" href="./home.css" />
      
      <div className="property-dashboard-fLB">
        <div className="navigation-bar-signed-in-ai3">
          <div className="twenty25-fzP">TWENTY25.</div>
          <div>
            <button className="button-4 properties-ihm">PROPERTIES</button>
            <button className="button-4 trackers-qnP ">TRACKERS</button>
            <button className="button-4 sign-out-NGX" onClick={handleSignOut}>SIGN OUT</button>
          </div>
        </div>
        <div className="property-9-H8b">
          <div className="rectangle-43-bf5">
          </div>
          <p className="green-residences-gwR">301 Green Residences</p>
          <p className="taft-ave-malate-manila-BNP">Taft Ave., Malate, Manila</p>
          <p className="occupied-5if">Occupied</p>
          <img className="mask-group-CHV" src={xyMimage} />
          <div className="rectangle-64-uhh">
          </div>
        </div>
        <div className="property-10-cc7">
          <div className="rectangle-43-LgX">
          </div>
          <p className="green-residences-PPu">301 Green Residences</p>
          <p className="taft-ave-malate-manila-gP1">Taft Ave., Malate, Manila</p>
          <p className="occupied-Nmd">Occupied</p>
          <img className="mask-group-Htb" src={SHmimage} />
          <div className="rectangle-64-E39">
          </div>
        </div>
        <div className="property-13-KKV">
          <div className="rectangle-43-Suu">
          </div>
          <p className="green-residences-wbm">301 Green Residences</p>
          <p className="taft-ave-malate-manila-SoR">Taft Ave., Malate, Manila</p>
          <p className="occupied-kJK">Occupied</p>
          <img className="mask-group-r6T" src={ew1image} />
          <div className="rectangle-64-ygs">
          </div>
        </div>
        <div className="property-14-h75">
          <div className="rectangle-43-phV">
          </div>
          <p className="green-residences-K8T">301 Green Residences</p>
          <p className="taft-ave-malate-manila-RhH">Taft Ave., Malate, Manila</p>
          <p className="occupied-vtw">Occupied</p>
          <img className="mask-group-3yZ" src={Zhimage} />
          <div className="rectangle-64-z87">
          </div>
        </div>
        <div className="property-11-HN7">
          <div className="rectangle-43-1Z1">
          </div>
          <p className="green-residences-hRq">301 Green Residences</p>
          <p className="taft-ave-malate-manila-QLF">Taft Ave., Malate, Manila</p>
          <p className="occupied-VsV">Occupied</p>
          <img className="mask-group-bvX" src={Pf5image} />
          <div className="rectangle-64-wUb">
          </div>
        </div>
        <div className="property-12-edu">
          <div className="rectangle-43-nEK">
          </div>
          <p className="green-residences-t2T">301 Green Residences</p>
          <p className="taft-ave-malate-manila-z5V">Taft Ave., Malate, Manila</p>
          <p className="occupied-6eK">Occupied</p>
          <img className="mask-group-ccf" src={ixFimage} />
          <div className="rectangle-64-9sV">
          </div>
        </div>
        <img className="icon-plus-4Uf" src={icon} />
        <div className="icon-minus-CKy">
          <div className="rectangle-1-uEP">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
