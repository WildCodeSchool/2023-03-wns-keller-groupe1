import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import HomePage from "../screens/Dashboard/HomePage";
import Login from "../screens/UserConnexion/Login";
import Statistic from "../screens/Statistic/Statistic";
import { useGlobalState } from "../GlobalStateContext";
import Social from "../components/Social";
import { useEffect } from "react";
import SideBar from "../components/SideBar/SideBar";
import * as React from "react";

function App() {
  const [globalState, setGlobalState] = useGlobalState();
  console.log(globalState.isLogged);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/social"
          element={<PrivateRoute element={<Social />} />}
        />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<HomePage />} />}
        />
        <Route
          path="/statistic"
          element={<PrivateRoute element={<Statistic />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

function PrivateRoute({ element }: { element: React.ReactNode }) {
  const [globalState] = useGlobalState();
  const navigate = useNavigate();
  console.log(navigate);
  

  useEffect(() => {
    if (!globalState.isLogged) {
      navigate("/login");
    }
  }, [globalState.isLogged, navigate]);

  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      {element}
    </div>
  );
}

export default App;
