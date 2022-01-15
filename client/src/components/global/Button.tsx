import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  bg: string;
  fullwidth: boolean;
  onSubmit?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  bg,
  fullwidth,
  onSubmit,
  children,
  ...props
}) => {
  return (
    <button {...props} className={`btn btn-${bg} ${fullwidth && "w-100"}`}>
      {children}
    </button>
  );
};

export default Button;
