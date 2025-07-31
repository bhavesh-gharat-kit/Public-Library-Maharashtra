import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // adjust path if needed
import bcrypt from "bcryptjs";

export async function GET(request, context) {
  let params = await context.params;
  const userId = parseInt(params.userId, 10);

  try {
    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("API Error: ", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch user." },
      { status: 500 }
    );
  }
}

export async function PUT(request, context) {
  try {
    let params = await context.params;
    const userId = parseInt(params.userId, 10);

    const body = await request.json();
    const { name, email, userId: userName, contactNo, password } = body;

    if (!name || !email || !userName) {
      return NextResponse.json(
        { success: false, message: "Name, User ID and Email are required." },
        { status: 400 }
      );
    }

    const dataToUpdate = {
      name,
      email,
      contactNo,
    };


    // If password is provided, hash it before updating
    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      dataToUpdate.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: dataToUpdate,
    });    

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("PUT /users/[userId] error:", err);

    if (err.code === "P2025") {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to update user." },
      { status: 500 }
    );
  }
}

export async function DELETE(request, context) {
  try {
    let params = await context.params;
    const userId = parseInt(params.userId, 10);

    if (isNaN(userId)) {
      return NextResponse.json(
        { success: false, message: "Invalid user ID." },
        { status: 400 }
      );
    }

    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json(
      {
        success: true,
        message: "User deleted successfully.",
        user: deletedUser,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE /users/[userId] error:", err);

    if (err.code === "P2025") {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to delete user." },
      { status: 500 }
    );
  }
}
