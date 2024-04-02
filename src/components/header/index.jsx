import React from "react";
import { Link, useNavigate, useMatch } from "react-router-dom";
import "./header.css";
import { useAuth } from "../../contexts/authContext";

const Header = () => {
  const homeMatch = useMatch("/");
  const trackerMatch = useMatch("/trackers");
  const auth = useAuth();

  const handleSignOut = () => {
    auth.logOut();
  };

  return (
    <nav className="no-print">
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
