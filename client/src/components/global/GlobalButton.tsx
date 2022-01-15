import React, { ReactChild, ReactChildren } from "react";

interface GlobalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  bg: string;
  fullwidth?: boolean;
  border?: string;
  margin?: string;
  w: string;
  h: string;
  disabled?: any;
  children: ReactChild | ReactChildren;
  onSubmit?: () => void;
}

const GlobalButton: React.FC<GlobalButtonProps> = ({
  bg,
  fullwidth,
  onSubmit,
  border,
  margin,
  children,
  w,
  h,
  disabled,
  ...props
}) => {
  const style = {
    background: bg,
    border: border ? border : "none",
    margin: margin,
    width: fullwidth ? "100%" : w,
    height: h,
  };

  return (
    <button disabled={disabled} {...props} style={style} className={`button`}>
      {children}
    </button>
  );
};

export default GlobalButton;
