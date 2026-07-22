"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import CustomerDialog from "./CustomerDialog";
import { Button } from "@/components/ui/button";

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
  followUpDate?: string;
  notes?: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  async function fetchCustomers() {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("/api/customer", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCustomers(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteCustomer(id: string) {
    console.log("Deleting:", id);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`/api/customer/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCustomers();
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
      alert("Failed to delete customer");
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Customers</h1>

        <CustomerDialog fetchCustomers={fetchCustomers} />
      </div>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Business</th>
            <th className="border p-2">Mobile</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className="border p-2">{customer.customerName}</td>
              <td className="border p-2">{customer.businessName}</td>
              <td className="border p-2">{customer.mobile}</td>
              <td className="border p-2">{customer.status}</td>

              <td className="border p-2 align-middle">
              <div className="flex items-center justify-center gap-2">
                <CustomerDialog
                 customer={customer}
                 fetchCustomers={fetchCustomers}
                   />

                <Button
                  onClick={() => deleteCustomer(customer.id)}
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