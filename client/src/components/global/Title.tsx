import React, { ReactChild, ReactChildren } from "react";

interface ITitleProps {
  component: string;
  fz: number;
  fw: number;
  color?: string;
  margin?: string;
  htmlFor?: string;
  children: ReactChild | ReactChildren;
}

const Title = ({
  children,
  component,
  fz,
  fw,
  color,
  margin,
  htmlFor,
}: ITitleProps) => {
  const style = {
    fontSize: fz,
    fontWeight: fw,
    color: color,
    margin: margin,
  };

  return (
    <>
      {component === "h3" && <h3 style={style}>{children}</h3>}
      {component === "p" && <p style={style}>{children}</p>}
      {component === "span" && <span style={style}>{children}</span>}
      {component === "h1" && <h1 style={style}>{children}</h1>}
      {component === "label" && (
        <label htmlFor={htmlFor} style={style}>
          {children}
        </label>
      )}
    </>
  );
};

export default Title;
