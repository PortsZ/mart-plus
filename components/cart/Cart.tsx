"use client";
import React, { useState, useEffect } from "react";
import CartCard from "./CartCard";
import CartDeleteModal from "./CartDeleteModal";
import { AnimatePresence, motion } from "framer-motion";
import { getCategories } from "../categories/getCategories";
import Create from "./create/Create";
import { getProducts } from "../products/getProducts";
import { getCartById } from "./getCart";
import { useCartStore } from "@/stores/updateCartStore";

const Cart = () => {
  //
  //
  //
  // STATE ====================================
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Cart>();
  const updateCart = useCartStore((state) => state.updateCart);
  const setUpdateCart = useCartStore((state) => state.setUpdateCart);

  // STATE ====================================
  //
  //
  //
  // EFFECTS ==================================
  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  useEffect(() => {
    if (cart?.id) {
      getCartById(cart.id).then((data) => {
        setCart(data);
        setUpdateCart(false);
      });
    }

    setUpdateCart(false);
  }, [updateCart]);

  // EFFECTS ==================================
  //
  //
  //

  if (categories)
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
                      Cart {cart?.id}
                    </div>
                    {cart?.cartItems &&
                      cart.cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex font-text justify-between items-center bg-background rounded-md p-1 px-2 w-full"
                        >
                          <div className=" w-1/2 text-sm  text-secondary">
                            {item.quantity || 0} &times; {item.product?.name}
                          </div>

                          <div className="flex w-1/2 justify-end">
                            <div className="flex">
                              <div className=" text-secondary text-lg">
                                $
                                {item.product?.price &&
                                  (
                                    item.product.price * (item.quantity || 0)
                                  ).toFixed(2)}{" "}
                                <span className="text-slate-500 italic text-sm">
                                  {" "}
                                  + Tax: $
                                  {item?.quantity &&
                                    item.product?.price &&
                                    item.product?.category?.tax &&
                                    item.product.category.tax *
                                      item.quantity *
                                      item.product.price}
                                </span>
                              </div>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              type="button"
                              onClick={() => {
                                setCurrentProduct(item);
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
          <div className="w-1/4 h-full flex flex-col gap-1 justify-start items-end">
            <CartCard>
              <div className="flex flex-col gap-2">
                <div className="italic text-gray-800">
                  Subtotal: $ {cart?.subtotal?.toFixed(2)}
                </div>
                <div className="italic text-gray-700">
                  Tax: ${cart?.taxAmount?.toFixed(2)}
                </div>
                <div className="text-2xl text-dark font-bold">
                  Total: $ {cart?.total?.toFixed(2)}
                </div>
              </div>
            </CartCard>
            <motion.button>
              <motion.button
                whileTap={{ scale: 0.94 }}
                whileHover={{ scale: 1.06 }}
                className="px-8 py-4 text-2xl font-bold bg-highlight text-dark rounded"
                type="button"
                onClick={() => {
                  setCart({})
                  setUpdateCart(true);
                }}
              >
                Pay
              </motion.button>
            </motion.button>
          </div>

          {showDeleteModal && currentProduct && (
            <CartDeleteModal
              product={currentProduct}
              closeModal={() => setShowDeleteModal(false)}
            />
          )}
        </motion.div>
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 25 }}
          className="fixed bottom-0 right-0 z-50"
        >
          <Create cart={cart} setCart={setCart} products={products} />
        </motion.div>
      </AnimatePresence>
    );
};

export default Cart;
