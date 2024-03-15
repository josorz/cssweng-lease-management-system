import React from "react";
import { Link, useNavigate, useMatch } from "react-router-dom";
import { doSignOut } from "../../firebase/auth";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const homeMatch = useMatch("/");
  const trackerMatch = useMatch("/trackers");

  const handleSignOut = () => {
    doSignOut().then(() => {
      navigate("/login");
    });
  };

  return (
    <nav>
      <Link to="/">
        <span className="logo-text">TWENTY25.</span>
      </Link>
      <div>
        <div className="nav-links">
          {trackerMatch ? <Link to="/">Properties</Link> : ""}
          {homeMatch ? <Link to="trackers">Trackers</Link> : ""}
          <Link onClick={handleSignOut}>Sign Out</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
