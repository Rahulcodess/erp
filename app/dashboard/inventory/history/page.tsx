"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface StockHistory {
  id: string;
  quantity: number;
  movementType: string;
  reason: string | null;
  createdAt: string;
  product: {
    productName: string;
    sku: string;
  };
}

export default function StockHistoryPage() {
  const [history, setHistory] = useState<StockHistory[]>([]);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("/api/stock/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHistory(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch stock history");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Stock History</h1>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3 text-left">Product</th>
            <th className="border p-3 text-left">SKU</th>
            <th className="border p-3 text-left">Movement</th>
            <th className="border p-3 text-left">Quantity</th>
            <th className="border p-3 text-left">Reason</th>
            <th className="border p-3 text-left">Date</th>
          </tr>
        </thead>

        <tbody>
          {history.map((item) => (
            <tr key={item.id}>
              <td className="border p-3">
                {item.product.productName}
              </td>

              <td className="border p-3">
                {item.product.sku}
              </td>

              <td className="border p-3">
                {item.movementType}
              </td>

              <td className="border p-3">
                {item.quantity}
              </td>

              <td className="border p-3">
                {item.reason || "-"}
              </td>

              <td className="border p-3">
                {new Date(item.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}

          {history.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="text-center p-4"
              >
                No Stock History Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}