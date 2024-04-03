// https://dev.to/miracool/how-to-manage-user-authentication-with-react-js-3ic5

import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(sessionStorage.getItem("email"));
  const navigate = useNavigate();
  const loginAction = async (data) => {
    const response = await fetch("/api/users/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 201) {
      const res = await response.json();
      setUser(res.email);
      sessionStorage.setItem("email", res.email);
      navigate("/");
      return;
    }
  };

  const logOut = () => {
    setUser(null);
    sessionStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
