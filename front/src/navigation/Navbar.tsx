import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import leaf from "../assets/images/LeafWitheRbg.png";
import logOut from "../assets/icons/logOut.svg";
import { ReactComponent as DashboardIcon } from "../assets/icons/dashboard.svg";
import { ReactComponent as ChartIcon } from "../assets/icons/chart.svg";
import { ReactComponent as SocialIcon } from "../assets/icons/social.svg";
import { ReactComponent as PuzzleIcon } from "../assets/icons/puzzle.svg";
import { ReactComponent as ProfilIcon } from "../assets/icons/profil.svg";
import { useGlobalState } from "../GlobalStateContext";

const Navbar = () => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>("dashboard");
  const [globalState, setGlobalState] = useGlobalState();

  const navigate = useNavigate();

  const handleIconClick = (iconName: string) => {
    setSelectedIcon(iconName);
    navigate(`/${iconName}`);
  };

  return (
    <div
      style={{
        width: "10vw",
        height: "100vh",
        backgroundColor: "#25A55F",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "20%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={leaf}
          alt="checkRegister"
          style={{ width: "60%", height: "70%", fill: "red" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "60%",
          justifyContent: "center",
          alignItems: "space-around",
        }}
      >
        <DashboardIcon
          className={`icon ${selectedIcon === "dashboard" ? "selected" : ""}`}
          style={{
            fill: selectedIcon === "dashboard" ? "white" : "#B5C2C9",
            width: "30%",
            height: "50%",
            margin: "auto",
            cursor: "pointer",
          }}
          onClick={() => handleIconClick("dashboard")}
        />

        <ChartIcon
          className={`icon ${selectedIcon === "chart" ? "selected" : ""}`}
          style={{
            fill: selectedIcon === "chart" ? "white" : "#B5C2C9",
            width: "30%",
            height: "50%",
            margin: "auto",
            cursor: "pointer",
          }}
          onClick={() => handleIconClick("chart")}
        />

        <SocialIcon
          className={`icon ${selectedIcon === "social" ? "selected" : ""}`}
          style={{
            fill: selectedIcon === "social" ? "white" : "#B5C2C9",
            width: "30%",
            height: "50%",
            margin: "auto",
            cursor: "pointer",
          }}
          onClick={() => handleIconClick("social")}
        />

        <PuzzleIcon
          className={`icon ${selectedIcon === "puzzle" ? "selected" : ""}`}
          style={{
            fill: selectedIcon === "puzzle" ? "white" : "#B5C2C9",
            width: "30%",
            height: "50%",
            margin: "auto",
            cursor: "pointer",
          }}
          onClick={() => handleIconClick("puzzle")}
        />

        <ProfilIcon
          className={`icon ${selectedIcon === "profil" ? "selected" : ""}`}
          style={{
            fill: selectedIcon === "profil" ? "white" : "#B5C2C9",
            width: "30%",
            height: "50%",
            margin: "auto",
            cursor: "pointer",
          }}
          onClick={() => handleIconClick("profil")}
        />
      </div>
      <div
        style={{
          height: "20%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={logOut}
          alt="checkRegister"
          style={{
            width: "40%",
            height: "50%",
            cursor: "pointer",
          }}
          onClick={() => (
            sessionStorage.removeItem("token"),
            setGlobalState({...globalState, isLogged: false })
          )}
        />                                          
      </div>
    </div>
  );
};

export default Navbar;
