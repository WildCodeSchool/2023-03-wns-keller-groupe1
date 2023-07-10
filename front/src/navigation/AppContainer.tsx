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
import { useEffect } from "react";
import SideBar from "../components/SideBar/SideBar";
import * as React from "react";
import Success from "../screens/Payment/Success";


function App() {
  const [globalState, setGlobalState] = useGlobalState();
  console.log(globalState.isLogged);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<HomePage />} />}
        />
        <Route
          path="/statistic"
          element={<PrivateRoute element={<Statistic />} />}
        />
        <Route
          path="/payment/success"
          element={<PrivateRoute element={<Success />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

function PrivateRoute({ element }: { element: React.ReactNode }) {
  const [globalState] = useGlobalState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
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
