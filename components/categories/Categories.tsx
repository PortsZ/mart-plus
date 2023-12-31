"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CategoriesCard from "./CategoriesCard";
import CategoriesTable from "./CategoriesTable";
import CategoriesModal from "./CategoriesModal";
import SearchBar from "../search/SearchBar";
import { getCategories } from "./getCategories";

interface Category {
  id: number;
  name: string;
  tax: number;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [updateCategoyArr, setUpdateCategoryArr] = useState(false);
  //
  //
  //
  //
  //USE EFFECTS================================================

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
      setUpdateCategoryArr(false);
    });
  }, [updateCategoyArr]);

  useEffect(() => {
    const result = categories.filter((product) =>
      product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id?.toString().includes(searchQuery.toLowerCase())
    );
    setFilteredCategories(result);
  }, [searchQuery, categories]);

  //USE EFFECTS================================================
  //
  //
  //
  //

  const handleAddCategoryClick = () => {
    setModalOpen(true);
  };




  if (categories)
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="w-full"
          layout
        >
          <CategoriesCard>
            <div className="flex flex-col w-full overflow-auto">
              <AnimatePresence>
                {isModalOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CategoriesModal
                      setModalOpen={setModalOpen}
                      setUpdateCategoryArr={setUpdateCategoryArr}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex w-full justify-between items-center p-4 ">
                <div className="w-1/2">
                  <SearchBar
                    setSearchQuery={setSearchQuery}
                    placeholder="Search Categories by Name"
                  />
                </div>
                <motion.button
                  whileTap={{ scale: 0.94 }}
                  whileHover={{ scale: 1.06 }}
                  onClick={handleAddCategoryClick}
                  className="bg-highlight text-black rounded-md px-4 py-2 font-sleek font-normal"
                >
                  Add Category
                </motion.button>
              </div>

              <CategoriesTable
                categories={filteredCategories}
                setUpdateCategoryArr={setUpdateCategoryArr}
              />
            </div>
          </CategoriesCard>
        </motion.div>
      </AnimatePresence>
    );
};

export default Categories;
