import React from "react";

interface IAvatarProps {
  src: string;
  size: string;
}

const Avatar = ({ src, size }: IAvatarProps) => {
  return (
    <div className={`avatar ${size}`}>
      <img src={src} alt="" />
    </div>
  );
};

export default Avatar;
