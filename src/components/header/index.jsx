import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doSignOut } from "../../firebase/auth";

const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  return (
    <nav>
      {userLoggedIn ? (
        <>
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
      ) : (
        <>
          <Link to={"/login"}>Login</Link>
          <br />
          <Link to={"/register"}>Register</Link>
        </>
      )}
    </nav>
  );
};

export default Header;
