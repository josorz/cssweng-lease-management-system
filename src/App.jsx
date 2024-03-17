import Login from "./components/auth/login";
import Register from "./components/auth/register";

import Dashboard from "./components/dashboard";
import Properties from "./components/properties";
import Property from "./components/property";
import Contract from "./components/contract";

import ViewTrackers from "./components/viewTrackers";
import MaintenanceTracker from "./components/trackers/MaintenanceTracker";

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
            <Route element={<Dashboard />} path="/">
              <Route element={<Properties />} index />
              <Route path="/property/:propertyId" element={<Property />} />
              <Route path="/contract/:contractId" element={<Contract />} />
              <Route path="trackers">
                <Route element={<ViewTrackers />} index />
                <Route path="maintenance" element={<MaintenanceTracker />} />
                {/* <Route /> */}
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
