import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header";

const Dashboard = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Dashboard;
