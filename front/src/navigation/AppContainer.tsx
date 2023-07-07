import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import HomePage from "../components/Dashboard/HomePage";
import Login from "../screens/UserConnexion/Login";
import Statistic from "../screens/Statistic/Statistic";
import { useGlobalState } from "../GlobalStateContext";
import { useEffect } from "react";

import * as React from "react";
import FriendList from "../components/FriendList";

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
      </Routes>
    </BrowserRouter>
  );
}

function PrivateRoute({ element }: { element: React.ReactNode }) {
  const [globalState] = useGlobalState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!globalState.isLogged) {
      navigate("/login");
    }
  }, [globalState.isLogged, navigate]);

  return (
    <div>
      <HomePage />
    </div>
  );
}

export default App;
