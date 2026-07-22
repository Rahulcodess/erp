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
  
    const history = await prisma.stockMovement.findMany({
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(history);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch stock history" },
      { status: 500 }
    );
  }
}