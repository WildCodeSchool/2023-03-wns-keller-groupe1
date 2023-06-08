import React from "react";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import HomePage from "../components/Dashboard/HomePage";
import Login from "../screens/UserConnexion/Login";
import { useGlobalState } from "../GlobalStateContext";

function App() {
  const [globalState, setGlobalState] = useGlobalState();

  console.log(globalState.isLogged);
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
