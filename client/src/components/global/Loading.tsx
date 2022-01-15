import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <motion.div
      exit={{
        opacity: 0,
      }}
      className="splash"
    >
      <motion.div
        className="splash__load"
        animate={{
          scale: [1, 2, 1],
          borderRadius: ["20%", "50%", "20%"],
          background: ["#fff", "#ff5715"],
          transition: {
            duration: 0.6,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
          },
        }}
        exit={{
          scale: 20,
          opacity: 0,
          borderRadius: "50%",
          transition: {
            duration: 0.2,
          },
        }}
      />
    </motion.div>
  );
};

export default Loading;
