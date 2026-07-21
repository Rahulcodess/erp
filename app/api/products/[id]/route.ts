import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/client";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
  
    try {
      const product = await prisma.product.findUnique({
        where: {
          id,
        },
      });
  
      if (!product) {
        return NextResponse.json(
          { message: "product not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(product);
    } catch (error) {
      console.error(error);
  
      return NextResponse.json(
        { message: "Failed to fetch the product" },
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
      const product = await prisma.product.update({
        where: {
          id,
        },
        data: {
            productName: body.productName,
            sku: body.sku,
            stock: body.stock,
            unitPrice: body.unitPrice,
            warehouse: body.warehouse,
            category: body.category,
            minimumStock:body.minimumStock
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