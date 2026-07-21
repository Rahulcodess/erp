import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/client";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
  
    try {
      const customer = await prisma.customer.findUnique({
        where: {
          id,
        },
      });
  
      if (!customer) {
        return NextResponse.json(
          { message: "Customer not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(customer);
    } catch (error) {
      console.error(error);
  
      return NextResponse.json(
        { message: "Failed to fetch customer" },
        { status: 500 }
      );
    }
  }
  export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    const body = await req.json();
  
    try {
      const customer = await prisma.customer.update({
        where: {
          id,
        },
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
  
      return NextResponse.json(customer);
    } catch (error) {
      console.error(error);
  
      return NextResponse.json(
        { message: "Failed to update customer" },
        { status: 500 }
      );
    }
  }
  export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
  
    try {
      await prisma.customer.delete({
        where: {
          id,
        },
      });
  
      return NextResponse.json({
        message: "Customer deleted successfully",
      });
    } catch (error) {
      console.error(error);
  
      return NextResponse.json(
        { message: "Failed to delete customer" },
        { status: 500 }
      );
    }
  }