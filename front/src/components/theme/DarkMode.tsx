import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import { useMemo, useState } from "react";
import "./DarkMode.css";

export default function DarkMode() {
  const [mode, setMode] = useState(true);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode ? "dark" : "light",
        },
      }),
    [mode]
  );
  const handelClick = () => {
    return setMode(!mode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="btn-2">
        <button onClick={handelClick} color="inherit" className="btn-1">
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </button>
      </div>
    </ThemeProvider>
  );
}
