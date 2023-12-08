import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import {
  ChartIcon,
  GroupIcon,
  DonationIcon,
  ProfileIcon,
  HomeIcon,
} from "../assets/index";
import Button from "../components/shared/Button";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../GlobalStateContext";
import greenLogo from "../assets/images/green-logo.png";

interface NavBarProps {
  activeTitle: string;
}

const NavBar: React.FC<NavBarProps> = ({ activeTitle }) => {
  const iconSize = "1.6vw";
  const getLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    opacity: isActive ? 1 : 0.7,
    color: isActive ? "#1c7b47" : "#e6e6e6",
  });

  const { logout } = useGlobalState();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <img src={greenLogo} alt="logo" className={styles.img0} />

      <div className={styles.midcontainer}>
        <nav className={styles.navcontainer}>
          <ul>
            <li>
              <li>
                <NavLink
                  to="/dashboard"
                  className={styles.navLink}
                  style={getLinkStyle}
                >
                  <HomeIcon
                    width={iconSize}
                    height={iconSize}
                    color={activeTitle === "Dashboard" ? "#1c7b47" : "#e6e6e6"}
                  />
                  <span>Dashboard</span>
                </NavLink>
              </li>
            </li>
            <li>
              <NavLink
                to="/statistic"
                className={styles.navLink}
                style={getLinkStyle}
              >
                <ChartIcon
                  width={iconSize}
                  height={iconSize}
                  color={activeTitle === "Statistiques" ? "#1c7b47" : "#e6e6e6"}
                />
                <span>Statistiques</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/social"
                className={styles.navLink}
                style={getLinkStyle}
              >
                <GroupIcon
                  width={iconSize}
                  height={iconSize}
                  color={activeTitle === "Communautés" ? "#1c7b47" : "#e6e6e6"}
                />
                <span>Communauté</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/donations"
                className={styles.navLink}
                style={getLinkStyle}
              >
                <DonationIcon
                  width={iconSize}
                  height={iconSize}
                  color={
                    activeTitle === "Soutenez Wild Carbon"
                      ? "#1c7b47"
                      : "#e6e6e6"
                  }
                />
                <span>Donations</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={styles.navLink}
                style={getLinkStyle}
              >
                <ProfileIcon
                  width={iconSize}
                  height={iconSize}
                  color={activeTitle === "Votre profil" ? "#1c7b47" : "#e6e6e6"}
                />
                <span>Profil</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.bottomcontainer}>
        <Button
          width="80%"
          height="40px"
          text="Se déconnecter"
          backgroundColor="#FF1B1C"
          onClick={() => {
            handleLogout();
          }}
        />
      </div>
    </div>
  );
};

export default NavBar;
