"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { watch } from "fs";
import SearchBar from "../search/SearchBar";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  category_id: number;
}

interface CartModalProps {
  products: Product[];
  addToCart: (product: Product, quantity: number) => void;
  closeModal: () => void;
}

interface IFormInput {
  productId: string;
  [key: string]: any; // This allows for any string as a key.
}

const CreateCartModal: React.FC<CartModalProps> = ({
  products,
  addToCart,
  closeModal,
}) => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [productsArray, setProductsArray] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [error, setError] = useState<Record<string, string>>({});

  const handleAddButton = (product: Product) => {
    const quantity = watch(`quantity_${product.id}`);
    if (
      Number(quantity) <= 0 ||
      quantity === undefined ||
      quantity === "" ||
      quantity === null
    ) {
      setError({
        ...error,
        [product.id]: "Quantity must be at least 1",
      });
    } else {
      setError({});
      addToCart(product, Number(quantity));
    }
  };

  const handlePlusButton = (product: Product) => {
    const quantity = watch(`quantity_${product.id}`);
    let currentQuantity = Number(quantity);

    setValue(`quantity_${product.id}`, currentQuantity + 1);
  };

  const handleMinusButton = (product: Product) => {
    const quantity = watch(`quantity_${product.id}`);
    let currentQuantity = Number(quantity);
    if (currentQuantity > 0) {
      setValue(`quantity_${product.id}`, currentQuantity - 1);
    }
  };

  //useEffects=================================================================

  useEffect(() => {
    setProductsArray(products);
  }, [products]);

  useEffect(() => {
    const result = productsArray.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(result);
  }, [searchQuery, productsArray]);

  //useEffects=================================================================

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
        className="bg-background p-6 rounded flex gap-4 min-w-[60%] z-20 absolute top-1/2 left-1/2
        transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-lg font-sleek text-dark">Add to Cart</h2>

          <SearchBar setSearchQuery={setSearchQuery} placeholder="Search Products by Name or Category"/>

          <div className="p-4 rounded  w-full">
            <table className="w-full ">
              <thead className="w-full border-b-2 border-secondary">
                <tr className=" rounded">
                  <th className="text-left text-black font-sleek font-normal">
                    Name
                  </th>
                  <th className="text-left text-black font-sleek font-normal">
                    Price
                  </th>
                  <th className="text-left text-black font-sleek font-normal">
                    Category
                  </th>
                  <th className="text-center text-black font-sleek font-normal">
                    Quantity
                  </th>
                  <th className="text-right text-black font-sleek font-normal">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="rounded">
                {filteredProducts.map((product: any) => (
                  <tr key={product.id} className="">
                    <td
                      className={`${
                        product.id % 2 === 0 ? "bg-white" : "bg-background"
                      } p-2 text-black font-sleek font-normal `}
                    >
                      {product.name}
                    </td>
                    <td
                      className={`${
                        product.id % 2 === 0 ? "bg-white" : "bg-background"
                      } p-2 text-black font-sleek font-normal `}
                    >
                      {product.price}
                    </td>
                    <td
                      className={`${
                        product.id % 2 === 0 ? "bg-white" : "bg-background"
                      } p-2 text-black font-sleek font-normal `}
                    >
                      {product.category}
                    </td>
                    <td
                      className={`${
                        product.id % 2 === 0 ? "bg-white" : "bg-background"
                      } p-2 text-black font-sleek font-normal text-right
                
                `}
                    >
                      <div className="flex justify-center gap-1">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => handleMinusButton(product)}
                          className="bg-secondaryHighlight text-black rounded-md px-2"
                        >
                          -
                        </motion.button>
                        <input
                          key={product.id}
                          {...register(`quantity_${product.id}`, {
                            min: {
                              value: 1,
                              message: "Quantity must be at least 1",
                            },
                          })}
                          className="w-12 text-center border-[1px] border-dark border-opacity-40
                          focus:outline-none focus:ring-1 focus:ring-dark focus:border-transparent rounded appearance-none"
                        />

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => handlePlusButton(product)}
                          className="bg-secondaryHighlight text-black rounded-md px-2"
                        >
                          +
                        </motion.button>
                      </div>
                      {error[product.id] && (
                        <p className="text-red-500 text-xs text-center">
                          {error[product.id]}
                        </p>
                      )}
                    </td>
                    <td
                      className={`${
                        product.id % 2 === 0 ? "bg-white" : "bg-background"
                      } p-2 text-black font-sleek font-normal text-right`}
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        className="bg-highlight text-black rounded-md p-2"
                        onClick={() => handleAddButton(product)}
                      >
                        Add
                      </motion.button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex px-5 justify-end w-full">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={closeModal}
              className="bg-red-500 opacity-90 text-dark font-text rounded-md p-2"
            >
              Close
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCartModal;
