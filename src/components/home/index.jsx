import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header";

const Home = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Home;
