import Login from "./components/auth/login";
import Register from "./components/auth/register";

import Home from "./components/home";
import Properties from "./components/properties";

import { AuthProvider } from "./contexts/authContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<Home />} path="/home" />
            <Route element={<Properties />} path="properties" />
          </Route>
          <Route element={<Login />} path="/" />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
