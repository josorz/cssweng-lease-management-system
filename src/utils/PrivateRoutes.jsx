import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const PrivateRoutes = () => {
  let { currentUser, userLoggedIn } = useAuth();
  return userLoggedIn ? (
    <Outlet context={currentUser} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
