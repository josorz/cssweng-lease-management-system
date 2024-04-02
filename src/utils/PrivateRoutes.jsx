import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const PrivateRoutes = () => {
  let { user } = useAuth();
  return user ? <Outlet context={user} /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
