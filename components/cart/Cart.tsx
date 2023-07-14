import React, { useState } from "react";
import CartCard from "./CartCard";
import CartDeleteModal from "./CartDeleteModal";
import { AnimatePresence, motion } from "framer-motion";
import { categories } from "@/data/categories";

interface CartProps {
  cart: Product[];
  removeFromCart: (productId: number) => void;
  reduceFromCart: (productId: number, quantity: number) => void;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  category_id: number;
  quantity?: number;
}

interface Category {
  id: number;
  name: string;
  tax: number;
}

const Cart: React.FC<CartProps> = ({
  cart,
  removeFromCart,
  reduceFromCart,
}: CartProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const subtotal = cart.reduce(
    (total, product) => total + product.price * (product.quantity || 0),
    0
  );

  const totalCost = cart.reduce((total, product) => {
    const category = categories.find(
      (category: Category) => category.id === product.category_id
    );
    const productTax = category ? category.tax : 0;
    return total + product.price * (product.quantity || 0) * (1 + productTax);
  }, 0);

  const findTax = (product: Product) => {
    const category = categories.find(
      (category: Category) => category.id === product.category_id
    );
    const productTax = category ? category.tax : 0;
    return Number((productTax* product.price * (product.quantity || 0)));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="w-full h-full flex gap-6"
        layout
      >
        <div className="w-3/4 h-full">
          <CartCard>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-2 w-full">
                  <div className="text-2xl font-sleek text-dark font-bold">
                    Cart
                  </div>
                  {cart.map((product) => (
                    <div
                      key={product.id}
                      className="flex font-text justify-between items-center bg-background rounded-md p-1 px-2 w-full"
                    >
                      <div className=" w-1/2 text-sm  text-secondary">
                        {product.quantity || 0} &times; {product.name}
                      </div>
                      
                      <div className="flex w-1/2 justify-end">
                      <div className="flex">
                        <div className=" text-secondary text-lg">
                          $
                          {(product.price * (product.quantity || 0)).toFixed(2)}{" "}
                          <span className="text-slate-500 italic text-sm"> + Tax: ${findTax(product).toFixed(2) }</span>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => {
                          setCurrentProduct(product);
                          setShowDeleteModal(true);
                        }}
                        className="bg-red-500 opacity-90 text-sm text-dark font-text rounded-md p-1 px-2 ml-4"
                      >
                        Modify
                      </motion.button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CartCard>
        </div>
        <div className="w-1/4 h-full">
          <CartCard>
            <div className="flex flex-col gap-2">
              
              <div className="italic text-gray-800">
                Subtotal: $ {subtotal.toFixed(2)}
              </div>
              <div className="italic text-gray-700">
                Tax: ${(totalCost - subtotal).toFixed(2)}
              </div>
              <div className="text-2xl text-dark font-bold">Total: $ {totalCost.toFixed(2)}</div>
            </div>
          </CartCard>
        </div>

        {showDeleteModal && currentProduct && (
          <CartDeleteModal
            product={currentProduct}
            removeFromCart={removeFromCart}
            reduceFromCart={reduceFromCart}
            closeModal={() => setShowDeleteModal(false)}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Cart;
