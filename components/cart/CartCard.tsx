"use client";
import React from "react";
import { motion } from "framer-motion";

const CartCard = ({ children }: any) => {
  return (
    <motion.div
      className="w-full h-full bg-secondary bg-opacity-10 rounded-md px-10 py-12 text-black font-text"
    >
      {children}
    </motion.div>
  );
};

export default CartCard;
