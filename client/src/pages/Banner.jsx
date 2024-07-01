import React, { useEffect } from "react";
import AnimatedSVG from "./components/AnimatedSVG";
import { motion } from "framer-motion";

const text = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

function Banner() {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/admin";
    }, 4000);
  });
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center h-screen gap-5">
      <div className="w-64 h-64">
        <AnimatedSVG />
      </div>
      <motion.div
        className="text-white font-extrabold text-4xl lg:text-9xl align-bottom border-l-0 lg:border-l-4 p-2 lg:p-10"
        variants={staggerChildren}
        initial="initial"
        animate="animate"
      >
        {Array.from("BugBuster").map((letter, index) => (
          <motion.span key={index} variants={text}>
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

export default Banner;
