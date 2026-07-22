import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/client";
import { verifyToken } from "@/lib/auth";
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
  
    try {
        const user = verifyToken(req);

        if (!user) {
          return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
          );
        }
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
        const user = verifyToken(req);

        if (!user) {
          return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
          );
        }
      
        if (user.role !== "ADMIN" && user.role !== "WAREHOUSE") {
          return NextResponse.json(
            { message: "Access Denied" },
            { status: 403 }
          );
        }
        if (
            !body.productName ||
            !body.sku ||
            !body.category ||
            !body.warehouse ||
            body.stock == null ||
            body.unitPrice == null ||
            body.minimumStock == null
          ) {
            return NextResponse.json(
              { message: "Missing required fields" },
              { status: 400 }
            );
          }

      const product = await prisma.product.update({
        where: {
          id,
        },
        data: {
            productName: body.productName,
            sku: body.sku,
            stock: Number(body.stock),
            unitPrice: Number(body.unitPrice),
            minimumStock: Number(body.minimumStock),
            warehouse: body.warehouse,
            category: body.category,
          }
      });
  
      return NextResponse.json(product);
    } catch (error) {
      console.error(error);
  
      return NextResponse.json(
        { message: "Failed to update product" },
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
        const user = verifyToken(req);

        if (!user) {
          return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
          );
        }
      
        if (user.role !== "ADMIN" && user.role !== "WAREHOUSE") {
          return NextResponse.json(
            { message: "Access Denied" },
            { status: 403 }
          );
        }
      await prisma.product.delete({
        where: {
          id,
        },
      });
  
      return NextResponse.json({
        message: "product deleted successfully",
      });
    } catch (error) {
      console.error(error);
  
      return NextResponse.json(
        { message: "Failed to delete product" },
        { status: 500 }
      );
    }
  }