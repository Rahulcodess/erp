"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import ProductDialog from "./ProductDialog";

interface Product {
  id: string;
  productName: string;
  sku: string;
  category: string;
  warehouse: string;
  stock: number;
  minimumStock: number;
  unitPrice: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  async function fetchProducts() {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteProduct(id: string) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProducts();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 403) {
          alert("Access Denied. You do not have permission to update customers.");
        } else {
          alert(err.response?.data?.message || "Failed to update customer");
        }
      } else {
        alert("Something went wrong");
      }
    }
    
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (    <div className="p-6">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Products</h1>

      <ProductDialog fetchProducts={fetchProducts} />
    </div>

    <table className="w-full border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2">Product</th>
          <th className="border p-2">SKU</th>
          <th className="border p-2">Category</th>
          <th className="border p-2">Warehouse</th>
          <th className="border p-2">Stock</th>
          <th className="border p-2">Min Stock</th>
          <th className="border p-2">Unit Price</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td className="border p-2">{product.productName}</td>
            <td className="border p-2">{product.sku}</td>
            <td className="border p-2">{product.category}</td>
            <td className="border p-2">{product.warehouse}</td>
            <td className="border p-2">{product.stock}</td>
            <td className="border p-2">{product.minimumStock}</td>
            <td className="border p-2">₹{product.unitPrice}</td>

            <td className="border p-2 align-middle">
            <div className="flex items-center justify-center gap-2">
              <ProductDialog
                product={product}
                fetchProducts={fetchProducts}
              />

              <Button
                onClick={() => deleteProduct(product.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}