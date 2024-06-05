import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";


const icon = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "rgba(255, 255, 255, 0)"
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "rgba(255, 255, 255, 1)"
  }
};

const Example = () => (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from--200 to-blue-200">
    <div className="container">
      <AnimatePresence>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="w-24 h-24 text-white"
        >
          <motion.path
            d="M0 100V0l50 50 50-50v100L75 75l-25 25-25-25z"
            variants={icon}
            initial="hidden"
            animate="visible"
            transition={{
              default: { duration: 2, ease: "easeInOut" },
              fill: { duration: 2, ease: [1, 0, 0.8, 1] }
            }}
          />
        </motion.svg>
      </AnimatePresence>
    </div>
</div>
);

export default Example;
