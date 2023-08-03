"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import EditProductModal from "./EditProductModal";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  category_id: number;
}

const ProductsTable = ({ products, setUpdateProduct }: any) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleEditProduct = (id: number) => {
    const product = products.find((product: Product) => product.id === id);
    if (product) {
      setSelectedProduct(product);
      setEditModalOpen(true);
    }
  };

  

  return (
    <div className="p-4 rounded  w-full">
      <table className="w-full ">
        <thead className="w-full border-b-4 ">
          <tr className=" rounded">
            <th className="text-left text-black font-sleek font-normal">
              ID
            </th>
            <th className="text-left text-black font-sleek font-normal">
              Name
            </th>
            <th className="text-left text-black font-sleek font-normal">
              Price
            </th>
            <th className="text-left text-black font-sleek font-normal">
              Category
            </th>
            <th className="text-right text-black font-sleek font-normal">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="rounded">
          {products.map((product: any) => (
            <tr key={product.id} className="">
              <td
                className={`${
                  product.id % 2 === 0 ? "bg-white" : "bg-background"
                } p-2 text-black font-sleek font-normal `}
              >
                {product.id}
              </td>
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
                {product.category.name}
              </td>
              <td
                className={`${
                  product.id % 2 === 0 ? "bg-white" : "bg-background"
                } p-2 text-black font-sleek font-normal text-right`}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    handleEditProduct(product.id);
                  }}
                  className="bg-primary text-white rounded-md p-2"
                >
                  Edit
                </motion.button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditModalOpen && selectedProduct && (
        <EditProductModal
          setModalOpen={setEditModalOpen}
          product={selectedProduct}
          setUpdateProduct={setUpdateProduct} 
        />
      )}
    </div>
  );
};

export default ProductsTable;
