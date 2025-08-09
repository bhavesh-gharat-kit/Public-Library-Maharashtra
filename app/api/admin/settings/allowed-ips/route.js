import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const { ipAddress } = body;
    const libraryId = process.env.LIBRARY_ID;

    if (!ipAddress || !libraryId) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    const ip = await prisma.allowedIP.create({
      data: {
        ipAddress, 
        libraryId: parseInt(libraryId),
      },
    });

    return NextResponse.json({
      success: true,
      message: "IP address added successfully.",
      ip,
    });
  } catch (err) {
    if (err.code === "P2002") {
      return NextResponse.json(
        { success: false, message: "This IP address already exists." },
        { status: 409 }
      );
    }

    console.error("POST api/admin/settings/allowed-ips error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to add IP address." },
      { status: 500 }
    );
  }
}
