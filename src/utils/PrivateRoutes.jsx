import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const PrivateRoutes = () => {
  let { userLoggedIn } = useAuth();
  return userLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
