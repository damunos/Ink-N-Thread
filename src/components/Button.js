import React from "react";

const Button = ({ children, onClick, className = "", variant = "primary", ...props }) => {
  // Define button styles
  const baseStyles = "px-4 py-2 rounded-lg font-semibold focus:outline-none transition";
  const variants = {
    primary: "bg-gray-700 text-white hover:bg-gray-800",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    ghost: "bg-transparent text-gray-700 hover:text-gray-900",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
