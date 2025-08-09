import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs"; // Not needed in this route

// GET: Get the settings
export async function GET(request) {
  try {
    const userIdHeader = request.headers.get("x-user-id");
    const systemIP = request.headers.get("x-forwarded-for");

    const userId = userIdHeader ? Number(userIdHeader) : null;

    if (!userId || isNaN(userId)) {
      return NextResponse.json(
        { success: false, message: "Unauthenticated user." },
        { status: 401 }
      );
    }

    const user = await prisma.User.findUnique({
      where: { id: userId },
      include: {
        Library: {
          include: {
            Setting: true,
            AllowedIP: true,
          },
        },
      },
    });

    if (!user || !user.Library) {
      return NextResponse.json(
        { success: false, message: "User or library not found." },
        { status: 404 }
      );
    }

    // Create setting if not exists
    if (!user.Library.Setting) {
      const setting = await prisma.Setting.create({
        data: { libraryId: user.Library.id },
      });
      user.Library.Setting = setting;
    }

    return NextResponse.json({
      success: true,
      Library: user.Library,
      systemIP
    });
  } catch (error) {
    console.error("API Error: ", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch settings." },
      { status: 500 }
    );
  }
}

// PUT: Toggle remoteAccess (public access)
export async function PUT(request) {
  try {
    const userIdHeader = request.headers.get("x-user-id");
    const userId = userIdHeader ? Number(userIdHeader) : null;

    if (!userId || isNaN(userId)) {
      return NextResponse.json(
        { success: false, message: "Unauthenticated user." },
        { status: 401 }
      );
    }

    // Find the user's library and its setting
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        Library: {
          include: {
            Setting: true,
          },
        },
      },
    });

    if (!user || !user.Library) {
      return NextResponse.json(
        { success: false, message: "User or Library not found." },
        { status: 404 }
      );
    }

    const libraryId = user.Library.id;

    // If no setting exists, create one
    if (!user.Library.Setting) {
      await prisma.setting.create({
        data: { libraryId },
      });
    }

    // Toggle remoteAccess
    const updatedSetting = await prisma.setting.update({
      where: { libraryId },
      data: {
        remoteAccess: !user.Library.Setting?.remoteAccess,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Remote access setting updated.",
      setting: updatedSetting,
    });
  } catch (error) {
    console.error("PUT /settings error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update setting." },
      { status: 500 }
    );
  }
}