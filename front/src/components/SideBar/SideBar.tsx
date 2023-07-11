import DarkMode from "../theme/DarkMode";
import { useNavigate } from "react-router-dom";
import "./SideBar.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  AttachMoneyRounded,
  BarChartRounded,
  ContactPhone,
  DashboardRounded,
  QueryStats,
  Settings,
  SettingsAccessibility,
  TocRounded,
} from "@mui/icons-material";
import Item from "./Item";
import { useState } from "react";
import logo from "../../assets/images/LeafWitheRbg.png";
function App() {
  const [open, setOpen] = useState(true);

  // for collpsing sidebar
  const handleToggle = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();

  const sideContainerVariants = {
    true: {
      width: "15rem",
    },
    false: {
      width: "9rem",
      transition: {
        delay: 0.3,
        duration: 0.5,
        type: "spring",
        damping: 13,
      },
    },
  };

  const sidebarVariants = {
    true: {},
    false: {
      width: "90px",
      transition: {
        delay: 0.3,
        duration: 0.5,
        type: "spring",
        damping: 13,
      },
    },
  };

  const profileVariants = {
    true: {
      alignSelf: "center",
      width: "4rem",
    },
    false: {
      alignSelf: "flex-start",
      marginTop: "2rem",
      width: "3rem",
      padding: "9px",
    },
  };
  return (
    <motion.div
      data-open={open}
      variants={sideContainerVariants}
      initial={`${open}`}
      animate={`${open}`}
      className="sidebar_container"
    >
      {/* sidebar div */}
      <motion.div
        className="sidebar"
        initial={`${open}`}
        animate={`${open}`}
        variants={sidebarVariants}
      >
        {/* lines_icon */}
        <motion.div
          whileHover={{
            scale: 1.2,
            rotate: 180,
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(3.5px)",
            WebkitBackdropFilter: "blur(3.5px)",
            // border: "1px solid rgba( 255, 255, 255, 0.18 )",
            transition: {
              delay: 0.3,
              duration: 0.3,
            },
          }}
          onClick={handleToggle}
          className="lines_icon"
        >
          <TocRounded />
        </motion.div>
        {/* profile */}
        <motion.div
          layout
          initial={`${open}`}
          animate={`${open}`}
          variants={profileVariants}
          className="profile"
          transition={{ duration: 0.6 }}
          whileHover={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            backdropFilter: "blur(5.5px)",
            WebkitBackdropFilter: "blur(5.5px)",
            cursor: "pointer",
          }}
        >
          <img src={logo} alt="profile_img" />
        </motion.div>
        {/* groups */}
        <div className="groups">
          <div className="group">
            <motion.h3
              animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0 }}
            ></motion.h3>{" "}
            <Item
              icon={<DashboardRounded />}
              name="Dashboard"
              to="/dashboard"
            />
            <Item
              icon={<QueryStats />}
              name="Statistiques"
              to="/statistic"
            />
            <Item icon={<BarChartRounded />} name="Communauté" to="/community" />
          </div>
        </div>
        <div className="group">
          <motion.h3
            animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0 }}
          ></motion.h3>
          <Item
            icon={<SettingsAccessibility />}
            name="Profile"
            onClick={() => {
              navigate("/profile");
            }}
          />
          <Item
            icon={<AttachMoneyRounded />}
            name="Donations"
            to="/Donations"
          />
          <Item icon={<Settings />} name="Settings" to="/Settings" />
        </div>
        <div className="group">
          <motion.h3
            animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0 }}
          ></motion.h3>
          <Item
            icon={<ContactPhone />}
            name="Contact"
            onClick={() => {
              navigate("/Contact");
            }}
          />
          <DarkMode />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default App;
