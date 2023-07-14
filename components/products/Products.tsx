"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProductsCard from "./ProductsCard";
import ProductsTable from "./ProductsTable";
import ProductModal from "./ProductModal";

import { products as initialProducts } from "@/data/products";
import SearchBar from "../search/SearchBar";


interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  category_id: number;
}

const Products = () => {
  const [products, setProducts] = useState(initialProducts);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const handleAddProductClick = () => {
    setModalOpen(true);
  };


  const addProduct = (product:any) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };



  useEffect(() => {
    const result = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(result);
  }, [searchQuery, products]);


  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="w-full"
        layout
      >
        <ProductsCard>
          <div className="flex flex-col w-full overflow-auto">
            <AnimatePresence>
              {isModalOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductModal setModalOpen={setModalOpen} addProduct={addProduct} products={products}/>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex w-full justify-between items-center p-4 ">
              <div className="w-1/2">
                <SearchBar setSearchQuery={setSearchQuery} placeholder="Search Products by Name or Category"/>
                {/* <form className="flex flex-col ">
                  <label className="font-text">Search Products</label>
                  <input
                    className="bg-background rounded text-black px-2 py-1 w-full border-[1px] border-dark border-opacity-40
                focus:outline-none focus:ring-1 focus:ring-dark focus:border-transparent"
                    placeholder="Search Products by Name or Category"
                  />
                </form> */}
              </div>
              <motion.button
                whileTap={{ scale: 0.94 }}
                whileHover={{ scale: 1.06 }}
                onClick={handleAddProductClick}
                className="bg-highlight text-black rounded-md px-4 py-2 font-sleek font-normal"
              >
                Add Product
              </motion.button>
            </div>

            <ProductsTable products={filteredProducts}/>
          </div>
        </ProductsCard>
      </motion.div>
    </AnimatePresence>
  );
};

export default Products;
