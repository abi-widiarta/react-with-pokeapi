import React from "react";
import { motion } from "framer-motion";

const Backdrop = (props) => {
  const { children, onClick } = props;
  return (
    <motion.div onClick={onClick} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed top-0 left-0 w-full h-screen bg-black/20 grid place-items-center z-[999]">
      {children}
    </motion.div>
  );
};

export default Backdrop;
