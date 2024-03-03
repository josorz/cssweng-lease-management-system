import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { doSignOut } from "../../firebase/auth";

const Header = () => {
  const navigate = useNavigate();
  return (
    <nav>
      <>
        <Link to="properties">Manage Properties</Link>
        <br />
        <Link to="">Manage Contracts</Link>
        <button
          onClick={() => {
            doSignOut().then(() => {
              navigate("/login");
            });
          }}
        >
          Logout
        </button>
      </>
    </nav>
  );
};

export default Header;
