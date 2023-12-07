import React from "react";

type ButtonProps = {
  type: "button" | "submit" | "reset";
  color:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "warning"
    | "info"
    | "light"
    | "dark";
  children?: React.ReactNode;
  onClick?: () => void;
};

const Button = ({ type, color, children, onClick }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`btn bg-${color} mx-1 flex items-center justify-between rounded-md bg-secondary px-4 py-2 text-txt hover:bg-txt hover:bg-opacity-10 active:ring-2 active:ring-primary`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
