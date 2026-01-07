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
          },
        }
      }
    })

    book.chapters.sort((a, b) => {
      const parse = (v) =>
        v.split('.').map(Number)

      const pa = parse(a.chapterNumber)
      const pb = parse(b.chapterNumber)

      const len = Math.max(pa.length, pb.length)

      for (let i = 0; i < len; i++) {
        const diff = (pa[i] ?? 0) - (pb[i] ?? 0)
        if (diff !== 0) return diff
      }
      return 0
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