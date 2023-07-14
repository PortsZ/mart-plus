import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { categories } from "@/data/categories";

interface IProduct {
  name: string;
  price: number;
  category: string;
}



const CategoriesModal = ({ setModalOpen, addProduct, products }:any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>();

  const onSubmit = (data: IProduct) => {
    console.log(data);
    const newProduct = { ...data, id: products.length + 1 };
    addProduct(newProduct);
    // after successfully adding the product, you might want to close the modal:
    setModalOpen(false);
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
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
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

export default CategoriesModal;
