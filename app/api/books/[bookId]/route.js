// app/api/books/[bookId]/i-book/[chapterId]/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(req, context) {
  try {
    let { bookId } = await context.params;
    bookId = Number(bookId);

    if (!bookId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const book = await prisma.Book.findUnique({
      where: {
        id: bookId
      },

      select: {
        title: true,
        thumbnailLink: true,
        chapters: {
          select: {
            id: true,
            chapterNumber: true,
            title: true
          }
        }
      }
    })

    return NextResponse.json({ book });

  } catch (error) {
    console.error("Error fetching iBook data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}