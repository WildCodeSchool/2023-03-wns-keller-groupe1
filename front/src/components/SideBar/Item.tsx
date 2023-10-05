import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Item.css";

function Item({ icon, name, to, iconColor }: any) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  const subheading = {
    true: {
      opacity: 1,
    },
    false: {
      opacity: 0,
      display: "none",
    },
  };

  return (
    <motion.div
      className="item"
      onClick={handleClick}
      whileHover={{
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        backdropFilter: "blur(5.5px)",
        WebkitBackdropFilter: "blur(5.5px)",
        // border: "1px solid rgba( 255, 255, 255, 0.18 )",
        cursor: "pointer",
      }}
      transition={{
        type: "none",
        duration: 0.1,
      }}
    >
      <motion.div className="icon" style={{ color: iconColor }}>
        {icon}
      </motion.div>
      <motion.span className="name" variants={subheading}>
        {name}
      </motion.span>
    </motion.div>
  );
}

export default Item;
