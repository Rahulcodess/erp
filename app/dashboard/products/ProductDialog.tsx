"use client";

import { useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

interface ProductDialogProps {
  fetchProducts: () => void;
  product?: Product;
}

export default function ProductDialog({
  fetchProducts,
  product,
}: ProductDialogProps) {
  const [open, setOpen] = useState(false);

  async function saveProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData(form);
      const body = Object.fromEntries(formData.entries());

      if (product) {
        await axios.put(`/api/products/${product.id}`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post("/api/products", body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      fetchProducts();

      form.reset();
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert(
        product
          ? "Failed to update product"
          : "Failed to add product"
      );
    }
  }

  return (    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger
      render={
        product ? (
          <Button className="bg-yellow-500 hover:bg-yellow-600">
            Edit
          </Button>
        ) : (
          <Button>Add Product</Button>
        )
      }
    />

    <DialogContent className="sm:max-w-lg">
      <form onSubmit={saveProduct}>
        <DialogHeader>
          <DialogTitle>
            {product ? "Edit Product" : "Add Product"}
          </DialogTitle>

          <DialogDescription>
            Fill the product details.
          </DialogDescription>
        </DialogHeader>

        <FieldGroup>
          <Field>
            <Label>Product Name</Label>
            <Input
              name="productName"
              required
              defaultValue={product?.productName}
            />
          </Field>

          <Field>
            <Label>SKU</Label>
            <Input
              name="sku"
              required
              defaultValue={product?.sku}
            />
          </Field>

          <Field>
            <Label>Category</Label>
            <Input
              name="category"
              required
              defaultValue={product?.category}
            />
          </Field>

          <Field>
            <Label>Warehouse</Label>
            <Input
              name="warehouse"
              required
              defaultValue={product?.warehouse}
            />
          </Field>

          <Field>
            <Label>Stock</Label>
            <Input
              type="number"
              name="stock"
              required
              defaultValue={product?.stock}
            />
          </Field>

          <Field>
            <Label>Minimum Stock</Label>
            <Input
              type="number"
              name="minimumStock"
              required
              defaultValue={product?.minimumStock}
            />
          </Field>

          <Field>
            <Label>Unit Price</Label>
            <Input
              type="numeric"
              name="unitPrice"
              required
              defaultValue={product?.unitPrice}
            />
          </Field>
        </FieldGroup>

        <DialogFooter className="mt-6">
          <Button type="submit">
            {product ? "Update Product" : "Save Product"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
);
}