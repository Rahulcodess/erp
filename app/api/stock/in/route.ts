import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/client";
import { verifyToken } from "@/lib/auth";
export async function POST(req: NextRequest) {
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
      !body.productId ||
      body.quantity == null 
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: {
        id: body.productId,
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    await prisma.product.update({
      where: {
        id: body.productId,
      },
      data: {
        stock: product.stock + body.quantity,
      },
    });

    const movement = await prisma.stockMovement.create({
      data: {
        productId: body.productId,
        quantity: body.quantity,
        reason:body.reason,
        movementType: "IN",
      },
    });

    return NextResponse.json(movement);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to add stock" },
      { status: 500 }
    );
  }
}
