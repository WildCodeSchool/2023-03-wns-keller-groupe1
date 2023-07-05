import React from "react";
import { ColorModeContext, useMode } from "../components/theme/darkmode";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import HomePage from "../components/Dashboard/HomePage";
import Login from "../screens/UserConnexion/Login";
import { useGlobalState } from "../GlobalStateContext";
import Navbar from "../navigation/Navbar";

function App() {
  const [globalState, setGlobalState] = useGlobalState();
  const [theme, colorMode] = useMode();
  console.log(globalState.isLogged);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={{ theme }}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={<PrivateRoute element={<HomePage />} />}
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
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
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Navbar />
      {element}
    </div>
  );
}

export default App;
