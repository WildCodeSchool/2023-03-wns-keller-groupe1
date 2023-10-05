import "./SideBar.css";
import { motion } from "framer-motion";
import { TocRounded } from "@mui/icons-material";
import Item from "./Item";
import { useState } from "react";
import logo from "../../assets/images/LeafWitheRbg.png";
import {
  ChartIcon,
  GroupIcon,
  DonationIcon,
  ProfileIcon,
  MessageIcon,
} from "../../assets/index";
import { useNavigate, useLocation } from "react-router-dom";

function App() {
  const [open, setOpen] = useState(true);
  const location = useLocation();

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
      <motion.div
        className="sidebar"
        initial={`${open}`}
        animate={`${open}`}
        variants={sidebarVariants}
      >
        <motion.div
          whileHover={{
            scale: 1.2,
            rotate: 180,
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(3.5px)",
            WebkitBackdropFilter: "blur(3.5px)",
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
          onClick={() => navigate("/dashboard")}
        >
          <img src={logo} alt="profile_img" />
        </motion.div>

        <div className="groups">
          <div className="group">
            <motion.h3
              animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0 }}
            ></motion.h3>
            <Item
              icon={
                <ChartIcon
                  width={24}
                  height={24}
                  color={
                    location.pathname === "/statistic" ? "#1C7B47" : "#AAAAAA"
                  }
                />
              }
              name="Statistiques"
              to="/statistic"
            />
            <Item
              icon={
                <GroupIcon
                  width={24}
                  height={24}
                  color={
                    location.pathname === "/social" ? "#1C7B47" : "#AAAAAA"
                  }
                />
              }
              name="Communauté"
              to="/social"
            />
          </div>

          <motion.h3
            animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0 }}
          ></motion.h3>
          <Item
            icon={
              <DonationIcon
                width={24}
                height={24}
                color={
                  location.pathname === "/donations" ? "#1C7B47" : "#AAAAAA"
                }
              />
            }
            name="Donations"
            to="/donations"
          />

          <Item
            icon={
              <MessageIcon
                width={24}
                height={24}
                color={location.pathname === "/chat" ? "#1C7B47" : "#AAAAAA"}
              />
            }
            name="Chat"
            to="/chat"
          />
          <Item
            icon={
              <ProfileIcon
                width={24}
                height={24}
                color={location.pathname === "/profile" ? "#1C7B47" : "#AAAAAA"}
              />
            }
            name="Profile"
            to="/profile"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default App;
