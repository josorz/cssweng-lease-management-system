import React from "react";
import { useOutletContext, Outlet } from "react-router-dom";
import Header from "../header";

const Home = () => {
  const currentUser = useOutletContext();
  console.log("current uesr is " + currentUser);

  return (
    <>
      <Header />
      <div>
        Hello{" "}
        {currentUser.displayName ? currentUser.displayName : currentUser.email},
        you are now logged in.
      </div>
      <Outlet />
    </>
  );
};

export default Home;
