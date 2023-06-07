import React from "react";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import HomePage from "../components/HomePage";
import Login from "../screens/UserConnexion/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
