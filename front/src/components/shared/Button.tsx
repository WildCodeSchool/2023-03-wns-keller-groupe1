import React from "react";

type ButtonProps = {
  width?: string;
  height?: string;
  backgroundColor?: string;
  text: string;
  textColor?: string;
  borderRadius?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  width = "100px",
  height = "50px",
  backgroundColor = "#25A55F",
  text,
  textColor = "#D9D9D9",
  borderRadius = "20px",
  onClick = () => {},
  disabled = false,
}) => {
  const staticStyles = {
    display: "inline-block",
    cursor: "pointer",
    fontWeight: "bold",
    fontFamily: "'Noto Sans JP', sans-serif",
    border: "none",
    borderRadius,
  };

  const [hover, setHover] = React.useState(false);

  const dynamicStyles = {
    width,
    height,
    backgroundColor: disabled ? "#AAAAAA" : backgroundColor,
    color: textColor,
    opacity: hover ? 0.8 : 1,
  };

  return (
    <button
      style={{ ...staticStyles, ...dynamicStyles }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
