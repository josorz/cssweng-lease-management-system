import Login from "./components/auth/login";
import Register from "./components/auth/register";

import Home from "./components/home";
import Properties from "./components/properties";
import ViewTrackers from "./components/viewTrackers";

import { AuthProvider } from "./contexts/authContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<PrivateRoutes />} path="/">
            <Route element={<Home />} path="/" />
            <Route element={<Properties />} path="properties" />
            <Route element={<ViewTrackers />} path="trackers" />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;