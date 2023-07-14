import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  category_id: number;
  quantity?: number;
}

interface CartModalProps {
  product: Product;
  removeFromCart: (productID: number) => void;
  reduceFromCart: (productID: number, quantity: number) => void;
  closeModal: () => void;
}

interface IFormInput {
  quantity: number;
}

const CartDeleteModal: React.FC<CartModalProps> = ({
  product,
  removeFromCart,
  reduceFromCart,
  closeModal,
}) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const [error, setError] = useState("");

  const onSubmit = (data: IFormInput) => {
    

    if (data.quantity >= (product.quantity || 0)) {
      removeFromCart(product.id);
      closeModal();
    } else {
      reduceFromCart(product.id, data.quantity);
      closeModal();
    }
  };

  const quantity = watch("quantity");


  useEffect(() => {
    if (
      Number(quantity) <= 0 ||
      quantity === undefined ||
      quantity === null
    ) {
      setError(
        "Quantity must be at least 1"
      );
    } else setError("");
  
    
  }, [quantity])
  

  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
        onClick={closeModal}
      />
      <div
        className="bg-background p-6 rounded flex gap-4  z-20 absolute top-1/2 left-1/2
        transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-lg font-sleek text-dark">Remove from Cart</h2>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label className="text-dark" htmlFor="quantity">
                Quantity to remove:
              </label>
              <div
                className="bg-background flex rounded text-black px-2 py-1 w-full border-[1px] border-dark border-opacity-40
            focus:outline-none focus:ring-1 focus:ring-dark focus:border-transparent"
              >
                <input
                  className="bg-background rounded text-black w-full "
                  placeholder="Quantity"
                  {...register("quantity", {
                    min: 1,
                    max: product.quantity,
                    required: true,
                  })}
                  type="number"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => {
                    removeFromCart(product.id);
                    closeModal();
                  }}
                  className="bg-highlight text-black rounded-md p-1 w-1/2"
                >
                  Remove All
                </motion.button>
              </div>
              {error && (
                <p className="text-red-500 text-xs text-left">
                  {error}
                </p>
              )}
            </div>
            <div className="flex px-5 justify-end w-full">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-highlight text-black rounded-md p-2"
              >
                Confirm
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={closeModal}
                className="bg-red-500 opacity-90 text-dark font-text rounded-md p-2 ml-4"
              >
                Cancel
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CartDeleteModal;
