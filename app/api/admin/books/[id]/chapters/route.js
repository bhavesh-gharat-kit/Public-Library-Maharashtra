import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


// GET /api/admin/books/[id]/chapters - Get all chapters for a book
export async function GET(request, context) {
  try {

    const { id } = await context.params;
    const bookId = parseInt(id);

    if (isNaN(bookId)) {
      return NextResponse.json(
        { success: false, message: "Invalid book ID" },
        { status: 400 }
      );
    }

    const chapters = await prisma.bookChapter.findMany({
      where: { bookId },
      orderBy: { chapterNumber: "asc" },
    });

    chapters.sort((a, b) => {
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

    return NextResponse.json({
      success: true,
      data: chapters,
      count: chapters.length,
    });
  } catch (error) {
    console.error("Error fetching chapters:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch chapters", error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/admin/books/[id]/chapters - Create new chapter
export async function POST(request, context) {
  try {

    const { id } = await context.params;
    const bookId = parseInt(id);

    if (isNaN(bookId)) {
      return NextResponse.json(
        { success: false, message: "Invalid book ID" },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Validate required fields
    if (!body.chapterNumber) {
      return NextResponse.json(
        { success: false, message: "Valid chapter number is required" },
        { status: 400 }
      );
    }

    // Check if book exists
    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      return NextResponse.json(
        { success: false, message: "Book not found" },
        { status: 404 }
      );
    }

    // Check if chapter number already exists for this book
    const existingChapter = await prisma.bookChapter.findFirst({
      where: {
        bookId,
        chapterNumber: String(body.chapterNumber),
      },
    });

    if (existingChapter) {
      return NextResponse.json(
        { success: false, message: "Chapter number already exists for this book" },
        { status: 400 }
      );
    }

    // Create chapter
    const chapterData = {
      bookId,
      chapterNumber: String(body.chapterNumber),
      title: body.title?.trim() || null,
      summary: body.summary?.trim() || null,
      chapterOverview: body.chapterOverview?.trim() || null,
      keyConcepts: body.keyConcepts?.trim() || null,
      commonMistakes: body.commonMistakes?.trim() || null,
      detailedNotes: body.detailedNotes?.trim() || null,
      commonErrors: body.commonErrors?.trim() || null,
      studyTips: body.studyTips?.trim() || null,
      practiceQuestions: body.practiceQuestions?.trim() || null,
      sampleQuestionPaper: body.sampleQuestionPaper?.trim() || null,
      mcqPracticeBank: body.mcqPracticeBank?.trim() || null,
      thumbnailLink: body.thumbnailLink?.trim() || null,
      pdfLink: body.pdfLink?.trim() || null,
      videoLink: body.videoLink?.trim() || null,
      audioLink: body.audioLink?.trim() || null,
    };

    const chapter = await prisma.bookChapter.create({
      data: chapterData,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Chapter created successfully",
        data: chapter,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating chapter:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create chapter", error: error.message },
      { status: 500 }
    );
  }
}