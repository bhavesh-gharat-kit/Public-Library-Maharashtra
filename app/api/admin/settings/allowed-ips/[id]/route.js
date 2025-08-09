import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// PUT: Update IP address
export async function PUT(request, context) {
  try {
    let params = await context.params;
    const ipAddressId = parseInt(params.id, 10);

    const body = await request.json();
    const { ipAddress } = body;

    if (!ipAddress) {
      return NextResponse.json(
        { success: false, message: "IP address is required." },
        { status: 400 }
      );
    }

    const updatedIP = await prisma.allowedIP.update({
      where: { id: ipAddressId },
      data: {
        ipAddress,
      },
    });

    return NextResponse.json({
      success: true,
      message: "IP address updated successfully.",
      ip: updatedIP,
    });
  } catch (err) {
    console.error("PUT /allowed-ips/[ipId] error:", err);

    if (err.code === "P2025") {
      return NextResponse.json(
        { success: false, message: "IP address not found." },
        { status: 404 }
      );
    }

    if (err.code === "P2002") {
      return NextResponse.json(
        { success: false, message: "IP address already exists." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to update IP address." },
      { status: 500 }
    );
  }
}

// DELETE: Remove IP address
export async function DELETE(request, context) {
  try {
    let params = await context.params;
    const ipAddressId = parseInt(params.id, 10);

    if (isNaN(ipAddressId)) {
      return NextResponse.json(
        { success: false, message: "Invalid IP address ID." },
        { status: 400 }
      );
    }

    const deletedIP = await prisma.allowedIP.delete({
      where: { id: ipAddressId },
    });

    return NextResponse.json(
      {
        success: true,
        message: "IP address deleted successfully.",
        ip: deletedIP,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE /allowed-ips/[ipId] error:", err);

    if (err.code === "P2025") {
      return NextResponse.json(
        { success: false, message: "IP address not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to delete IP address." },
      { status: 500 }
    );
  }
}
