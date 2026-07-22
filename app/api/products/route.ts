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
      const products = await prisma.product.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
  
      return NextResponse.json(products);
    } catch (error) {
      return NextResponse.json(
        { message: "Failed to fetch products" },
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

  if (user.role !== "ADMIN" && user.role !== "WAREHOUSE") {
    return NextResponse.json(
      { message: "Access Denied" },
      { status: 403 }
    );
  }
      const body = await req.json();
      if (
        !body.productName ||
        !body.sku ||
        body.stock == null ||
        body.unitPrice == null
      ) {
        return NextResponse.json(
          { message: "Missing required fields" },
          { status: 400 }
        );
      }
  
      const product = await prisma.product.create({
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
  
      return NextResponse.json(product, { status: 201 });
    } catch (error) {
      return NextResponse.json(
        { message: "Failed to create product" },
        { status: 500 }
      );
    }
  }