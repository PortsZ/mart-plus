"use client";

import Create from "@/components/create/Create";
import Header from "@/components/header/Header";
import React, { useState } from "react";
import Cart from "@/components/cart/Cart";
import { useSession } from "next-auth/react";
import Products from "@/components/products/Products";
import Categories from "@/components/categories/Categories";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "@/data/products";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  category_id: number;
  quantity?: number;
}

export default function Home() {
  const { data: session, status } = useSession({ required: true });

  const [cart, setCart] = useState<Product[]>([]);
  const tabs = ["home", "products", "categories"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  //FUNCTIONS==============================================================================

  const addToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const productInCart = prevCart.find((item) => item.id === product.id);
      if (productInCart) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity! + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
    console.log(cart);
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) =>
      prevCart.filter((product) => product.id !== productId)
    );
  };

  const reduceFromCart = (productId: number, quantity: number) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((product) => {
            if (product.id === productId) {
              if (product.quantity && product.quantity > quantity) {
                return { ...product, quantity: product.quantity - quantity };
              } else {
                return null;
              }
            } else {
              return product;
            }
          })
          .filter((product) => product !== null) as Product[]
    ); 
  };

  //FUNCTIONS==============================================================================

  if (status === "loading") return <></>;

  if (status === "authenticated")
    return (
      <main className="flex gap-6 min-h-screen flex-col items-center justify-start px-10 p-8 bg-background antialiased">
        <nav className="w-full">
          <Header
            user={session.user}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </nav>

        {selectedTab === "home" && (
          <Cart
            cart={cart}
            removeFromCart={removeFromCart}
            reduceFromCart={reduceFromCart}
          />
        )}
        {selectedTab === "products" && <Products />}
        {selectedTab === "categories" && <Categories />}

        <AnimatePresence>
          {selectedTab === "home" && (
            <motion.div
              key="modal"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 25 }}
              className="fixed bottom-0 right-0 z-50"
            >
              <Create addToCart={addToCart} products={products} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    );
}
