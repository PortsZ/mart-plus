import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

interface Category {
    id: number;
    name: string;
    tax: number;
  }

interface EditProductModalProps {
  setModalOpen: (isOpen: boolean) => void;
  updateCategory: (category: Category) => void;
  removeCategory:(id:number)=>void;
  category: Category;
}

const EditCategoryModal: React.FC<EditProductModalProps> = ({
  setModalOpen,
  removeCategory,
  updateCategory,
  category,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Category>({
    defaultValues: {
      name: category.name,
      id: category.id,
      tax: category.tax*100,
    },
  });


  const handleRemoveCategory = (id:number) => {
    removeCategory(id)
    setModalOpen(false); 
  };


  const onSubmit = (data: Category) => {
    const updatedCategory: Category = {
      ...category,
      name: data.name,
      tax: data.tax/100,
    };
    updateCategory(updatedCategory);
    setModalOpen(false);
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <form
        className="bg-background p-6 rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="mb-4 text-lg font-sleek text-dark">Edit Category</h2>
        <label>Category Name</label>
        <input
          className="bg-background rounded text-black px-2 py-1 w-full border-[1px] border-dark border-opacity-40
                focus:outline-none focus:ring-1 focus:ring-dark focus:border-transparent mb-4"
          placeholder="Name"
          {...register("name", { required: "Product name is required" })}
        />
        {errors.name && <p>{errors.name.message}</p>}
        <label>Tax Value (%)</label>
        <input
          className="bg-background rounded text-black px-2 py-1 w-full border-[1px] border-dark border-opacity-40
                focus:outline-none focus:ring-1 focus:ring-dark focus:border-transparent mb-4"
          placeholder="Tax"
          type="number"
          {...register("tax", {
            required: "Tax is required",
            
          })}
        />
        {errors.tax && <p>{errors.tax.message}</p>}

        
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
          onClick={()=>{handleRemoveCategory(category.id)}} // Add the onClick event for the Remove button
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

export default EditCategoryModal;
