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
    const challan = await prisma.challan.findUnique({
      where: {
        id,
      },
      include: {
        customer: true,
        items: true,
      },
    });

    if (!challan) {
      return NextResponse.json(
        { message: "Challan not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(challan);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch challan" },
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
  
      const challan = await prisma.challan.update({
        where: {
          id,
        },
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
        { message: "Failed to update challan" },
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
      
        if (user.role !== "ADMIN" && user.role !== "SALES") {
          return NextResponse.json(
            { message: "Access Denied" },
            { status: 403 }
          );
        }
      await prisma.challan.delete({
        where: {
          id,
        },
      });
  
      return NextResponse.json({
        message: "Challan deleted successfully",
      });
    } catch (error) {
      console.error(error);
  
      return NextResponse.json(
        { message: "Failed to delete challan" },
        { status: 500 }
      );
    }
  }