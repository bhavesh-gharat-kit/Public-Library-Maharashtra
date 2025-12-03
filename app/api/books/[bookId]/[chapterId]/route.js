// app/api/books/[bookId]/i-book/[chapterId]/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(req, context) {
  try {
    let { bookId, chapterId } = await context.params;
    bookId = Number(bookId);
    chapterId = Number(chapterId);

    if (!bookId || !chapterId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const availableChapters = await prisma.BookChapter.findMany({
      where: {
        bookId
      },
      select: {
        id: true,
        chapterNumber: true,
        title: true
      }
    })

    const chapter = await prisma.bookChapter.findUnique({
      where: { id: chapterId },
      select: {
        summary: true,
        chapterOverview: true,
        keyConcepts: true,
        commonMistakes: true,
        detailedNotes: true,
        commonErrors: true,
        studyTips: true,
        practiceQuestions: true,
        sampleQuestionPaper: true,
        mcqPracticeBank: true,
        thumbnailLink: true,
        pdfLink: true,
        videoLink: true,
        audioLink: true
      }
    })

    const availableStudyTools = Object.fromEntries(
      Object.entries(chapter).map(([key, value]) => [
        key,
        Boolean(value && value.trim() !== "")
      ])
    )
    return NextResponse.json({ chapters: availableChapters, studyTools: availableStudyTools });

  } catch (error) {
    console.error("Error fetching iBook data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req, context) {
  try {
    let { bookId, chapterId } = await context.params;
    bookId = Number(bookId);

    const { tool } = await req.json();

    if (!bookId || !chapterId || !tool) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Fetch the matching iBook record for this book and tool
    const chapterRecord = await prisma.BookChapter.findUnique({
      where: {
        id: Number(chapterId)
      }
    })

    // If the tool's data is missing, generate and save it
    if (!chapterRecord[tool]) {
      return NextResponse.json({ reply: "Something went wrong, Unable to generate content!" });
    }

    return NextResponse.json({ reply: chapterRecord[tool] });
  } catch (error) {
    console.error("Error fetching iBook data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
