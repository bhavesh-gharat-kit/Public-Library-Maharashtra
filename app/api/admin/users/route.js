import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // adjust path if needed
import bcrypt from "bcryptjs";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    // Pagination + Search Parameters
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const searchTerm = searchParams.get("searchTerm")?.trim() || "";

    const skip = (page - 1) * limit;

    // Prisma query filter
    const where = searchTerm
      ? {
          OR: [
            { name: { contains: searchTerm } },
            { email: { contains: searchTerm } },
            { userId: { contains: searchTerm } },
            { contactNo: { contains: searchTerm } },
          ],
        }
      : {};

    // Fetch total user count for pagination
    const totalUsers = await prisma.user.count({ where });

    // Fetch paginated users
    const users = await prisma.User.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      users,
      pagination: {
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.error("API Error: ", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch users." },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, contactNo, userId, password } = body;
    const libraryId = process.env.LIBRARY_ID;

    console.log(body);

    if (!name || !email || !password || !libraryId) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        userId,
        contactNo,
        password: hashedPassword,
        role: "user",
        libraryId: parseInt(libraryId),
      },
    });

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (err) {
    if (err.code === "P2002") {
      return NextResponse.json(
        { success: false, message: "Email or User ID already exists." },
        { status: 409 }
      );
    }

    console.error("POST /users error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to create user." },
      { status: 500 }
    );
  }
}
