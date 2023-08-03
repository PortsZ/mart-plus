import React from 'react'
import { motion } from 'framer-motion';

const Overlay = ({ isOpen, setIsOpen, children }: any) => {

    return(
    <motion.div
      initial={false}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      style={{ pointerEvents: isOpen ? "auto" : "none" }}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
      className={`transition-all duration-500 z-0 fixed top-0 bottom-0 left-0 w-full bg-black ${
        isOpen ? "bg-opacity-70" : "opacity-0"
      }`}
    >
      {children}
    </motion.div>
  )};
  

export default Overlay