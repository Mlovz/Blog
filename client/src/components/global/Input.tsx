import React, { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  id: string;
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: any) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      {...props}
      className="form-control"
      style={{
        background: "#1c1c24",
        color: "#fff",
        border: "none",
        borderRadius: "15px",
        padding: "15px",
      }}
      ref={ref}
    />
  );
});

export default Input;
