
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
export default function DashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-2  gap-4">
        <Link href="/dashboard/customers">
        <Card className="cursor-pointer transition hover:shadow-lg hover:border-black">
          <CardHeader>
            <CardTitle className="font-bold">Customers</CardTitle>
          </CardHeader>
          <CardContent>Manage Customers</CardContent>
        </Card>
        </Link>

        <Link href="/dashboard/products">
        <Card className="cursor-pointer transition hover:shadow-lg hover:border-black">
          <CardHeader>
            <CardTitle className="font-bold">Products</CardTitle>
          </CardHeader>
          <CardContent>Manage Products</CardContent>
        </Card>
        </Link>

        <Link href="/dashboard/inventory/in">
         <Card className="cursor-pointer transition hover:shadow-lg hover:border-black">
           <CardHeader>
            <CardTitle className="font-bold">Inventory</CardTitle>
          </CardHeader>
          <CardContent>Manage Stock</CardContent>
        </Card>
        </Link>

        <Link href="/dashboard/challans">
         <Card className="cursor-pointer transition hover:shadow-lg hover:border-black">
          <CardHeader>
            <CardTitle className="font-bold">Sales Challans</CardTitle>
          </CardHeader>
          <CardContent>Create Challans</CardContent>
        </Card>
        </Link>
      </div>
    </div>
  );
}