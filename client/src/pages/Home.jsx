import React from "react";
import AnimatedSVG from "./components/AnimatedSVG";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";
import Banner from "./Banner";

function Home() {
  return (
    <div className="h-screen w-full">
      <section className="bg-white flex flex-col justify-center items-center h-full align-middle dark:bg-gray-900">
        <AnimatedSVG />
        <motion.div
          className="py-8 px-4 mx-auto max-w-screen-l text-center lg:py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Welcome to BugBuster
          </motion.h1>
          <motion.p
            className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            BugBuster is your reliable partner in software issue tracking. With
            BugBuster, identify, manage, and resolve issues effortlessly,
            ensuring a smooth and efficient development process.
          </motion.p>

          <motion.div
            className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <motion.a
              href="/banner"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Get Started
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

export default Home;
