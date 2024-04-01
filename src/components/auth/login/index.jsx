import React, { useState } from "react";
import {Navigate, Link, useNavigate} from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../../../firebase/auth";
import { useAuth } from "../../../contexts/authContext";
import Header from "../../header";
import "./login.css";

import bgImage from "../../../assets/bg.png";
import vectorImage from "../../../assets/vector.png";

const Login = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
      console.log("hello")
      e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        navigate("/");
      } catch (err) {
        setErrorMessage(err.message);
        console.log(err);
        setIsSigningIn(false);

      }
    }
  };

  return (
      <>
        <meta charSet="utf-8"/>
        <link rel="icon" href="/favicon.ico"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="theme-color" content="#000000"/>
        <title>Login</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins%3A400%2C500%2C700"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro%3A400%2C500%2C700"/>
        <link rel="stylesheet" href="./styles/login.css"/>

        <form className="login-2-2" onSubmit={onSubmit}>
            <div className="login-3Cj">
                <div className="group-3-ys5">
                    <div className="twenty25-6s9">TWENTY25.</div>
                    
                </div>
                <input type={"text"} className={"username-PrF"} placeholder={"Email"}
                       onChange={(e) => setEmail(e.target.value)}/>
                <input type={"password"} className={"password-YBR"} placeholder={"Password"}
                       onChange={(e) => setPassword(e.target.value)}/>
                <p className="dont-have-an-account-yet-sign-up-hrw">
                    <span className="dont-have-an-account-yet-sign-up-hrw-sub-0">Don’t have an account yet? </span>
                    <Link to="/register" className="dont-have-an-account-yet-sign-up-hrw-sub-1">Sign up</Link>
                </p>
                <button type={"submit"} className={"Login"}>
                    {isSigningIn ? "Signing In..." : "Sign In"}
                </button>
            </div>
        </form>
      </>
  );
};

export default Login;
