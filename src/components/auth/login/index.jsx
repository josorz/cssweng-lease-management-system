import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";
import "../auth.css";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { register } = useParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        auth.loginAction({ email, password });
        navigate("/");
      } catch (err) {
        setErrorMessage(err.message);
        setIsSigningIn(false);
      }
    }
  };

  return (
    <>
      <div className="auth-logo-holder">
        <span className="auth-logo">TWENTY25.</span>
      </div>
      <form className="input-form" onSubmit={onSubmit}>
        <div className="auth-input-box">
          <input
            type={"text"}
            id="auth-input"
            placeholder={"Email"}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="auth-input-box">
          <input
            type={"password"}
            id="auth-input"
            placeholder={"Password"}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className="">
          <span className="">Don’t have an account yet? </span>
          <Link to="/register">Sign up</Link>
        </p>
        <button type={"submit"} id="auth-submit">
          {isSigningIn ? "Signing In..." : "Sign In"}
        </button>
        {register && (
          <div className="post-registration">
            Thank you for your registration. Please wait for your account's
            manual approval.
          </div>
        )}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </>
  );
};

export default Login;
