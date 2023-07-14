"use client";
import React from "react";
import { motion } from "framer-motion";

const ProductsCard = ({ children }: any) => {
  return (
    <motion.div
      className="w-full bg-secondary bg-opacity-10 rounded-md text-black font-text"
    >
      {children}
    </motion.div>
  );
};

export default ProductsCard;
