import React from "react";
import { useAuth } from "../../contexts/authContext";
import Header from "../header";
import { Navigate } from "react-router-dom";
import Sidebar from "./sidebar";

const Home = () => {
  const { currentUser, userLoggedIn } = useAuth();
  console.log("current uesr is " + !currentUser);
  if (!userLoggedIn) {
    return <Navigate to="/login" />;
  }

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
