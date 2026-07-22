"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { error } from "console";

interface Product {
  id: string;
  productName: string;
  stock: number;
}

export default function StockInPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    productId: "",
    quantity: "",
    reason: "",
  });

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "/api/stock/in",
        {
          productId: form.productId,
          quantity: Number(form.quantity),
          reason: form.reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Stock added successfully!");

      setForm({
        productId: "",
        quantity: "",
        reason: "",
      });

      fetchProducts();
    } catch (error) {
    
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          alert("Access Denied. You do not have permission to update customers.");
        } else {
          alert(error.response?.data?.message || "Failed to update customer");
        }
      } else {
        alert("Something went wrong");
      }
      console.error(error);
      alert("Failed to add stock");
    }
  };

  return (
    <div className="flex justify-center pt-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Stock In</CardTitle>
        </CardHeader>
  
        <CardContent className="space-y-4">
          <div>
            <Label>Product</Label>
  
            <select
              className="mt-2 w-full rounded-md border p-2"
              value={form.productId}
              onChange={(e) =>
                setForm({
                  ...form,
                  productId: e.target.value,
                })
              }
            >
              <option value="">Select Product</option>
  
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.productName} (Stock: {product.stock})
                </option>
              ))}
            </select>
          </div>
  
          <div>
            <Label>Quantity</Label>
  
            <Input
              type="number"
              value={form.quantity}
              onChange={(e) =>
                setForm({
                  ...form,
                  quantity: e.target.value,
                })
              }
            />
          </div>
  
          <div>
            <Label>Reason</Label>
  
            <Input
              value={form.reason}
              onChange={(e) =>
                setForm({
                  ...form,
                  reason: e.target.value,
                })
              }
            />
          </div>
  
          <Button className="w-full" onClick={handleSubmit}>
            Add Stock
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}