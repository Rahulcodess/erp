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

interface Customer {
  id: string;
  customerName: string;
  mobile: string;
  email?: string;
  businessName: string;
  gstNumber?: string;
  customerType: "RETAIL" | "WHOLESALE" | "DISTRIBUTOR";
  address: string;
  status: "LEAD" | "ACTIVE" | "INACTIVE";
}

interface CustomerDialogProps {
  fetchCustomers: () => void;
  customer?: Customer;
}

export default function CustomerDialog({
  fetchCustomers,
  customer,
}: CustomerDialogProps) {
  const [open, setOpen] = useState(false);

  async function saveCustomer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData(form);
      const body = Object.fromEntries(formData.entries());

      if (customer) {
        await axios.put(`/api/customer/${customer.id}`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post("/api/customer", body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      fetchCustomers();

      form.reset();
      setOpen(false);
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
      
      console.error(err);
      alert(
        customer
          ? "Failed to update customer"
          : "Failed to add customer"
      );
    }
  }

    return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          customer ? (
            <Button className="bg-yellow-500 hover:bg-yellow-600">
              Edit
            </Button>
          ) : (
            <Button>Add Customer</Button>
          )
        }
      />

      <DialogContent className="sm:max-w-lg">
        <form onSubmit={saveCustomer}>
          <DialogHeader>
            <DialogTitle>
              {customer ? "Edit Customer" : "Add Customer"}
            </DialogTitle>

            <DialogDescription>
              Fill the customer details.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label>Customer Name</Label>
              <Input
                name="customerName"
                required
                defaultValue={customer?.customerName}
              />
            </Field>

            <Field>
              <Label>Business Name</Label>
              <Input
                name="businessName"
                required
                defaultValue={customer?.businessName}
              />
            </Field>

            <Field>
              <Label>Mobile</Label>
              <Input
                name="mobile"
                required
                defaultValue={customer?.mobile}
              />
            </Field>

            <Field>
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                defaultValue={customer?.email}
              />
            </Field>

            <Field>
              <Label>GST Number</Label>
              <Input
                name="gstNumber"
                defaultValue={customer?.gstNumber}
              />
            </Field>

            <Field>
              <Label>Address</Label>
              <Input
                name="address"
                required
                defaultValue={customer?.address}
              />
            </Field>

            <Field>
              <Label>Customer Type</Label>
              <select
                name="customerType"
                required
                className="w-full rounded-md border px-3 py-2"
                defaultValue={customer?.customerType ?? "RETAIL"}
              >
                <option value="RETAIL">Retail</option>
                <option value="WHOLESALE">Wholesale</option>
                <option value="DISTRIBUTOR">Distributor</option>
              </select>
            </Field>

            <Field>
              <Label>Status</Label>
              <select
                name="status"
                required
                className="w-full rounded-md border px-3 py-2"
                defaultValue={customer?.status ?? "ACTIVE"}
              >
                <option value="ACTIVE">Active</option>
                <option value="LEAD">Lead</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-6">
            <Button type="submit">
              {customer ? "Update Customer" : "Save Customer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}