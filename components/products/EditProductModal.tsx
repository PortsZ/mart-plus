"use client"
import React, {useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { getCategories } from "../categories/getCategories";
import { deleteProduct, getProducts, updateProduct } from "./getProducts";





interface EditProductModalProps {
  setModalOpen: (isOpen: boolean) => void;
  setUpdateProduct: (updateProduct: boolean) => void;
  product: Product;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  setModalOpen,
  setUpdateProduct,
  product,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: {
      name: product.name,
      price: product.price,
      categoryId: product.category?.id,
    },
  });
  const [categories, setCategories] = useState<Category[]>([]);
  

  useEffect(() => {
    console.log(product)
    getCategories().then((data) => {
      setValue("categoryId", product.categoryId)
      setCategories(data);
    });
  }, []);

  const handleRemoveProduct = async(id: number) => {
    console.log("removing product with id: ", id);
    await deleteProduct(id).then(()=>{setUpdateProduct(true);})
    await getProducts().then(()=>{
      setUpdateProduct(true);
    })
    setModalOpen(false);
  }


  const onSubmit = (data: Product) => {
    const updatedProduct: Product = {
      ...product,
      name: data.name,
      price: data.price,
      category: data.category,
    };
    // updateProduct(updatedProduct);
    setModalOpen(false);
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <form
        className="bg-background p-6 rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="mb-4 text-lg font-sleek text-dark">Edit Product</h2>

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
          {...register("categoryId", {
            required: "Product category is required",
          })}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
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
          type="submit"
        >
          Update Product
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.94 }}
          whileHover={{ scale: 1.06 }}
          className="px-4 py-2 ml-2 bg-red-500 bg-opacity-90 text-dark rounded"
          type="button"
          onClick={() => {
           product.id &&  handleRemoveProduct(product.id);
          }} // Add the onClick event for the Remove button
        >
          Remove Product
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

export default EditProductModal;
