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
import Statistic from "../screens/Statistic/Statistic";
import { useGlobalState } from "../GlobalStateContext";
import Navbar from "../navigation/Navbar";
import FriendList from "../components/FriendList";

function App() {
  const [globalState, setGlobalState] = useGlobalState();

  console.log(globalState.isLogged);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/friend-list" element={<FriendList />} />

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

  React.useEffect(() => {
    if (!globalState.isLogged) {
      navigate("/login");
    }
  }, [globalState.isLogged, navigate]);

  return (
    <div style={{display:'flex',flexDirection:'row'}}>
      <Navbar />
      {element}
    </div>
  );
}

export default App;
