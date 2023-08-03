import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import  { createCategory } from "./getCategories";

interface Category {
  name: string;
  tax: number;
  id: number;
}



const CategoriesModal = ({ setModalOpen, setUpdateCategoryArr }:any) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Category>();

  const onSubmit = async (data: Category) => {
    const newCategory = { name: data.name, tax:data.tax/100 };
    try {
      await createCategory(newCategory)
    }catch (err) {
      throw (err)
    }
    setUpdateCategoryArr(true)
    setModalOpen(false);
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <form
        className="bg-background p-6 rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="mb-4 text-lg font-sleek text-dark">Add Category</h2>

        <input
          className="bg-background rounded text-black px-2 py-1 w-full border-[1px] border-dark border-opacity-40
                focus:outline-none focus:ring-1 focus:ring-dark focus:border-transparent mb-4"
          placeholder="Name"
          {...register("name", { required: "Category name is required" })}
        />
        {errors.name && <p>{errors.name.message}</p>}

        <input
          className="bg-background rounded text-black px-2 py-1 w-full border-[1px] border-dark border-opacity-40
                focus:outline-none focus:ring-1 focus:ring-dark focus:border-transparent mb-4"
          placeholder="tax in %"
          type="number"
          {...register("tax", { required: "Category tax is required" })}
        />
        {errors.tax && <p>{errors.tax.message}</p>}

        

        <motion.button
          whileTap={{ scale: 0.94 }}
          whileHover={{ scale: 1.06 }}
          className="px-4 py-2 bg-highlight text-dark rounded"
          type="button"
            onClick={handleSubmit(onSubmit)}
        >
          Add Category
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.94 }}
          whileHover={{ scale: 1.06 }}
          className="px-4 py-2 ml-2 bg-red-500 bg-opacity-90 text-dark rounded"
          type="button"
          onClick={() => setModalOpen(false)}
        >
          Cancel
        </motion.button>
      </form>
    </div>
  );
};

export default CategoriesModal;
