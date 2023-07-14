"use client";
import React from "react";
import { LayoutGroup, motion } from "framer-motion";

const Card = ({ children }: any) => {
  return (
    <LayoutGroup>
      <motion.div layout className="w-full flex flex-col text-white justify-start items-center h-full">
        <motion.div layout className="w-full rounded-lg font-text text-white bg-background bg-opacity-70 backdrop-blur-sm
         p-2 flex flex-col gap-4 h-full">
          {children}
        </motion.div>
      </motion.div>
    </LayoutGroup>
  );
};

export default Card;
