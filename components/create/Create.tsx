"use client";
import React from "react";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import CreateCartModal from "./CreateCartModal";

import Overlay from "./Overlay";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const Create = ({ addToCart, products }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [addProductModal, setAddProductModal] = useState(false);

  return (
    <motion.div layout className="overflow-clip">
      <div className="absolute right-0 bottom-0 z-0">
        
        <motion.div
          className="justify-center items-center flex p-1  m-8 z-20 relative"
          whileHover={{
            rotate: 90,
            scale: 1.1,
            transition: { type: "spring", duration: 1, repeat: Infinity },
          }}
          whileTap={{
            scale: 0.9,
          }}
        >
          <motion.button
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.05 }}
            onClick={() => setAddProductModal(!addProductModal)}
            className="relative rounded-full w-16 h-16 flex justify-center items-center bg-gradient-to-tl 
            from-primaryHighlight to-primary font-bold text-6xl text-white overflow-clip transition-all duration-600 "
          >
            <motion.div className="w-1/2 absolute bg-secondary h-1 rounded" />
            <motion.div className="w-1/2  rotate-90 bg-secondary h-1 rounded" />
          </motion.button>
        </motion.div>
      </div>
      {addProductModal && (
        <div className={" left-0 top-0  absolute z-0"}>
          <motion.div className="z-10 ">
            <CreateCartModal
              addToCart={addToCart}
              products={products}
              closeModal={() => setAddProductModal(false)}
            />
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Create;
