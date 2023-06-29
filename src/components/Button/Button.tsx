import React from "react";
import useButtonStyle from "../../hooks/useButtonStyle";
import Spinner from "../Spinner";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: Function;
  full?: boolean;
  color?: "primary" | "accent" | "error";
  text?: "xs" | "sm" | "lg" | "xl";
  disabled?: boolean;
  loading?: boolean;
};

const Button = ({
  children,
  onClick,
  full,
  color,
  text,
  disabled,
  loading,
}: ButtonProps) => {
  const btnStyles = useButtonStyle({ full, color, text });

  return (
    <button
      onClick={() => onClick && onClick()}
      disabled={disabled}
      className={btnStyles}
    >
      {loading ? <Spinner size="small" color="body" /> : children}
    </button>
  );
};

export default Button;
