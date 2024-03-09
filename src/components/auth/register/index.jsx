import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";
import { doCreateUserWithEmailAndPassword } from "../../../firebase/auth";
import "./register.css"

import bgImage from "../../../assets/bg-nRm.png";
import vectorImage from "../../../assets/vector.png";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { userLoggedIn } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      await doCreateUserWithEmailAndPassword(email, password).catch((err) => {
        setErrorMessage(err.message);
        setIsRegistering(false);
      });
    }
  };

  return (
    <form onSubmit={onSubmit} className="registration-R1Z">
      <div className="group-3-XKV">
        <img className="bg-Rvf" src={bgImage} alt="Background" />
        <img className="vector-mjd" src={vectorImage} alt="Vector" />
      </div>
      <input
        type="text"
        className="full-name-uaw"
        placeholder="Full Name"
      />
      <input
        type="email"
        className="email-vkw"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="password-97u"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        className="confirm-password-NWT"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <div className="twenty25-o5y">TWENTY25.</div>
      <p className="already-have-an-account-sign-in-655">
        <span className="already-have-an-account-sign-in-655-sub-0">
          Already have an account?{" "}
        </span>
        <span className="already-have-an-account-sign-in-655-sub-1">Sign in</span>
      </p>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
