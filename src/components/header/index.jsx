import React from "react";
import { Link, useNavigate, useMatch } from "react-router-dom";
import { doSignOut } from "../../firebase/auth";

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
      <>
        {trackerMatch ? <Link to="/">View All Properties</Link> : ""}
        {homeMatch ? <Link to="trackers">View Trackers</Link> : ""}
        <br />
        <Link onClick={handleSignOut}>Sign Out</Link>
      </>
    </nav>
  );
};

export default Header;
