import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/client";
export async function GET() {
    try {
      const customers = await prisma.customer.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
  
      return NextResponse.json(customers);
    } catch (error) {
      return NextResponse.json(
        { message: "Failed to fetch customers" },
        { status: 500 }
      );
    }
  }
  export async function POST(req: NextRequest) {
    try {
      const body = await req.json();
  
      const customer = await prisma.customer.create({
        data: {
          customerName: body.customerName,
          mobile: body.mobile,
          email: body.email,
          businessName: body.businessName,
          gstNumber: body.gstNumber,
          customerType: body.customerType,
          address: body.address,
          status: body.status,
          followUpDate: body.followUpDate
            ? new Date(body.followUpDate)
            : null,
          notes: body.notes,
        },
      });
  
      return NextResponse.json(customer, { status: 201 });
    } catch (error) {
      return NextResponse.json(
        { message: "Failed to create customer" },
        { status: 500 }
      );
    }
  }