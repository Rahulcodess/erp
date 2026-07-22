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

    const challans = await prisma.challan.findMany({
      include: {
        customer: true,
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(challans);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch challans" },
      { status: 500 }
    );
  }
}

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
  
    if (user.role !== "ADMIN" && user.role !== "SALES") {
      return NextResponse.json(
        { message: "Access Denied" },
        { status: 403 }
      );
    }
    if (
      !body.challanNumber ||
      !body.customerId ||
      !body.createdById ||
      body.totalQuantity == null
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const challan = await prisma.challan.create({
      data: {
        challanNumber: body.challanNumber,
        customerId: body.customerId,
        createdById: body.createdById,
        totalQuantity: body.totalQuantity,
        status: body.status,
      },
    });

    return NextResponse.json(challan);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create challan" },
      { status: 500 }
    );
  }
}