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
import { useEffect, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
function App() {
  const [globalState, setGlobalState] = useGlobalState();
  console.log(globalState.isLogged);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
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
