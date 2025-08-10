import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const libraryId = Number(process.env.LIBRARY_ID);
    const settings = await prisma.Setting.findUnique({
      where: { libraryId },
    });

    const ips = await prisma.AllowedIP.findMany({
      select: { ipAddress: true }, // adjust if column name is different
      where: { libraryId },
    });

    return NextResponse.json({
      allowPublicAccess: settings?.remoteAccess ?? false,
      ips: ips.map((ip) => ip.ipAddress.trim()),
    });
  } catch (err) {
    console.error("Failed to fetch access settings:", err);
    return NextResponse.json(
      { error: "Failed to fetch access settings" },
      { status: 500 }
    );
  }
}
