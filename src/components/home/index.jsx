import React from "react";
import { useOutletContext } from "react-router-dom";
import Header from "../header";
import Sidebar from "./sidebar";

const Home = () => {
  const currentUser = useOutletContext();
  console.log("current uesr is " + currentUser);

  return (
    <>
      <Header />
      <Sidebar />
      <div>
        Hello{" "}
        {currentUser.displayName ? currentUser.displayName : currentUser.email},
        you are now logged in.
      </div>
    </>
  );
};

export default Home;
