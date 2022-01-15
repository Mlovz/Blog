import React from "react";

interface IFormProps {
  onSubmit: () => void;
}

const Form: React.FC<IFormProps> = ({ children, onSubmit }) => {
  return (
    <form noValidate onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
