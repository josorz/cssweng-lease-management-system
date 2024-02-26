import React from "react";
import { Link } from "react-router-dom";
import Properties from "../../properties";

const Sidebar = () => {
  return (
    <>
      <Link to="/properties">Manage Properties</Link>
      <br />
      <Link to="">Manage Contracts</Link>
    </>
  );
};

export default Sidebar;
