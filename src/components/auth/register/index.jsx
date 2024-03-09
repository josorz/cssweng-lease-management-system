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
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false); //for confirmation of reg

  const { userLoggedIn } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) { // check if passwords match
      setErrorMessage("Passwords do not match");
      return;
    }
    if (!isRegistering) {
      setIsRegistering(true);
      try {
        await doCreateUserWithEmailAndPassword(email, password);
        setRegistrationSuccessful(true); // set registrationSuccessful to true if registration is successful
        navigate('/dashboard');
      } catch (err) {
        setErrorMessage(err.message);
        setIsRegistering(false);
      }
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
        onChange={(e) => setconfirmPassword(e.target.value)}
      />
      <div className="twenty25-o5y">TWENTY25.</div>
      <p className="already-have-an-account-sign-in-655">
        <span className="already-have-an-account-sign-in-655-sub-0">
          Already have an account?{" "}
        </span>
        <Link to="/login" className="already-have-an-account-sign-in-655-sub-1">
          Sign in
        </Link>
      </p>
      {registrationSuccessful && <p>Registration successful!</p>} {/* display a message if registration is successful */}
      {errorMessage && <p>{errorMessage}</p>}
      <button type="submit" className="register-button">Register</button>
    </form>
  );
};

export default Register;
