"use client";
import React, {useState} from "react";
import { motion } from "framer-motion";
import EditCategoryModal from "./EditCategoryModal";

interface Category {
  id: number;
  name: string;
  tax: number;
}

const CategoriesTable = ({setUpdateCategoryArr, categories }: any) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleEditCategory = (id: number) => {
    const category = categories.find((category: Category) => category.id === id);
    if (category) {
      setSelectedCategory(category);
      setEditModalOpen(true);
    }
  };



  return (
    <div className="p-4 rounded  w-full">
      <table className="w-full ">
        <thead className="w-full border-b-4 ">
          <tr className=" rounded">
            <th className="text-left text-black font-sleek font-normal">
              ID
            </th>
            <th className="text-left text-black font-sleek font-normal">
              Category Name
            </th>

            <th className="text-left text-black font-sleek font-normal">
              Tax
            </th>
            <th className="text-right text-black font-sleek font-normal">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="rounded">
          {categories.map((category: any) => (
            <tr key={category.id} className="">
              <td
                className={`${
                  category.id % 2 === 0 ? "bg-white" : "bg-background"
                } p-2 text-black font-sleek font-normal `}
              >
                {category.id}
              </td>
              <td
                className={`${
                  category.id % 2 === 0 ? "bg-white" : "bg-background"
                } p-2 text-black font-sleek font-normal `}
              >
                {category.name}
              </td>

              <td
                className={`${
                  category.id % 2 === 0 ? "bg-white" : "bg-background"
                } p-2 text-black font-sleek font-normal `}
              >
                {Number(category.tax * 100).toFixed(1)}%
              </td>
              <td
                className={`${
                  category.id % 2 === 0 ? "bg-white" : "bg-background"
                } p-2 text-black font-sleek font-normal text-right`}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    handleEditCategory(category.id);
                  }}
                  className="bg-primary text-white rounded-md p-2"
                >
                  Edit
                </motion.button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditModalOpen && selectedCategory && (
        <EditCategoryModal
          setModalOpen={setEditModalOpen}
          category={selectedCategory}
          setUpdateCategoryArr={setUpdateCategoryArr} 
        />
      )}
    </div>
  );
};

export default CategoriesTable;
