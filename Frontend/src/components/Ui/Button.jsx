import React from "react";

const Button = ({ children, onClick, variant = "primary", disabled }) => {
  const base = "px-4 py-2 rounded-xl font-semibold transition w-full";

  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    warning: "bg-yellow-400 text-black hover:bg-yellow-500",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;