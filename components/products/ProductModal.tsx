"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { createProduct, getProducts } from "./getProducts";
import { getCategories } from "../categories/getCategories";

interface Category {
  id?: number;
  name: string;
  tax: number;
}

interface Product {
  name: string;
  price: number;
  category: Category;
}

const ProductModal = ({ setModalOpen, setUpdateProduct }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const onSubmit = async (data: Product) => {
    const newProduct = {
      name: data.name,
      price: Number(data.price),
      categoryId: data.category,
    };

    await createProduct(newProduct).then(() => {      
      setModalOpen(false);
    });
    await getProducts().then(() => {
      setUpdateProduct(true);
    })
    
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <form
        className="bg-background p-6 rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="mb-4 text-lg font-sleek text-dark">Add Product</h2>

        <input
          className="bg-background rounded text-black px-2 py-1 w-full border-[1px] border-dark border-opacity-40
                focus:outline-none focus:ring-1 focus:ring-dark focus:border-transparent mb-4"
          placeholder="Name"
          {...register("name", { required: "Product name is required" })}
        />
        {errors.name && <p>{errors.name.message}</p>}

        <input
          className="bg-background rounded text-black px-2 py-1 w-full border-[1px] border-dark border-opacity-40
                focus:outline-none focus:ring-1 focus:ring-dark focus:border-transparent mb-4"
          placeholder="Price"
          type="number"
          {...register("price", { required: "Product price is required" })}
        />
        {errors.price && <p>{errors.price.message}</p>}

        <select
          className="bg-background rounded text-black px-2 py-1 w-full border-[1px] border-dark border-opacity-40
              focus:outline-none focus:ring-1 focus:ring-dark focus:border-transparent mb-4"
          {...register("category", {
            required: "Product category is required",
          })}
        >
          <option value="">Select category</option>
          {categories &&
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
        {errors.category && <p>{errors.category.message}</p>}

        <motion.button
          whileTap={{ scale: 0.94 }}
          whileHover={{ scale: 1.06 }}
          className="px-4 py-2 bg-highlight text-dark rounded"
          type="button"
          onClick={handleSubmit(onSubmit)}
        >
          Add Product
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

export default ProductModal;
