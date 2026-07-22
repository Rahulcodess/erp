import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/client";
import { verifyToken } from "@/lib/auth";
export async function GET(req:NextRequest) {
    try {
      const user = verifyToken(req);

      if (!user) {
        return NextResponse.json(
          { message: "Unauthorized" },
          { status: 401 }
        );
      }
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
      const user = verifyToken(req);

      if (!user) {
        return NextResponse.json(
          { message: "Unauthorized" },
          { status: 401 }
        );
      }
    
      if (user.role !== "ADMIN" && user.role !== "SALES") {
        return NextResponse.json(
          { message: "Access Denied" },
          { status: 403 }
        );
      }
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
      console.error("POST /api/customer error:", error);
    
      return NextResponse.json(
        {
          message: "Failed to create customer",
          error: String(error),
        },
        { status: 500 }
      );
    }
  }