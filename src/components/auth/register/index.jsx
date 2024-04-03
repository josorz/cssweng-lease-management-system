import React, { useState } from "react";
import { useAuth } from "../../../contexts/authContext";
import { Link, useNavigate } from "react-router-dom";
import "../auth.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false); //for confirmation of reg

  const auth = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // check if passwords match
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regex for email validation

    if (emailRegex.test(email) === false) {
      setErrorMessage("Please enter a valid email");
      return;
    } else if (password !== confirmPassword) { // check if passwords match
      setErrorMessage("Passwords do not match");
      return;
    }
    if (!isRegistering) {
      setIsRegistering(true);
      await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password, confirmPassword }),
      })
        .then(() => navigate("/login?register=true")) //commented out because confirmation msg not displaying figure out a way in sprint3 to display msg then redirect
        .catch((err) => {
          setErrorMessage(err.message);
          setIsRegistering(false);
        });
    }
  };

  return (
    <>
      <div className="auth-logo-holder">
        <div className="auth-logo">TWENTY25.</div>
      </div>
      <form onSubmit={onSubmit} className="input-form">
        <div className="auth-input-box">
          <input
            type="email"
            id="auth-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="auth-input-box">
          <input
            type="password"
            id="auth-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="auth-input-box">
          <input
            type="password"
            id="auth-input"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
          />
        </div>
        <p className="already-have-an-account-sign-in-655">
          <span className="already-have-an-account-sign-in-655-sub-0">
            Already have an account?{" "}
          </span>
          <Link
            to="/login"
            className="already-have-an-account-sign-in-655-sub-1"
          >
            Sign in
          </Link>
        </p>
        {registrationSuccessful && <p>Registration successful!</p>}{" "}
        {/* display a message if registration is successful */}
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit" id="auth-submit">
          Register
        </button>
      </form>
    </>
  );
};
};
export default Register;
