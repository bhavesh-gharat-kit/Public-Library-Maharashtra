import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


// GET /api/admin/chapters/[chapterId] - Get single chapter
export async function GET(request, { params }) {
  try {
    const { chapterId } = params;
    const id = parseInt(chapterId);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid chapter ID" },
        { status: 400 }
      );
    }

    const chapter = await prisma.bookChapter.findUnique({
      where: { id },
      include: {
        book: {
          select: {
            id: true,
            title: true,
            author: true,
          },
        },
      },
    });

    if (!chapter) {
      return NextResponse.json(
        { success: false, message: "Chapter not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: chapter,
    });
  } catch (error) {
    console.error("Error fetching chapter:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch chapter", error: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/admin/chapters/[chapterId] - Update chapter
export async function PUT(request, { params }) {
  try {


    const { chapterId } = params;
    const id = parseInt(chapterId);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid chapter ID" },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Check if chapter exists
    const existingChapter = await prisma.bookChapter.findUnique({
      where: { id },
    });

    if (!existingChapter) {
      return NextResponse.json(
        { success: false, message: "Chapter not found" },
        { status: 404 }
      );
    }

    // If changing chapter number, check for duplicates
    if (body.chapterNumber !== undefined && body.chapterNumber !== existingChapter.chapterNumber) {
      const duplicate = await prisma.bookChapter.findFirst({
        where: {
          bookId: existingChapter.bookId,
          id: { not: id },
        },
      });

      if (duplicate) {
        return NextResponse.json(
          { success: false, message: "Chapter number already exists for this book" },
          { status: 400 }
        );
      }
    }

    // Create update data object
    const updateData = {};
    
    if (body.chapterNumber !== undefined) updateData.chapterNumber = String(body.chapterNumber);
    if (body.title !== undefined) updateData.title = body.title?.trim() || null;
    if (body.summary !== undefined) updateData.summary = body.summary?.trim() || null;
    if (body.chapterOverview !== undefined) updateData.chapterOverview = body.chapterOverview?.trim() || null;
    if (body.keyConcepts !== undefined) updateData.keyConcepts = body.keyConcepts?.trim() || null;
    if (body.commonMistakes !== undefined) updateData.commonMistakes = body.commonMistakes?.trim() || null;
    if (body.detailedNotes !== undefined) updateData.detailedNotes = body.detailedNotes?.trim() || null;
    if (body.commonErrors !== undefined) updateData.commonErrors = body.commonErrors?.trim() || null;
    if (body.studyTips !== undefined) updateData.studyTips = body.studyTips?.trim() || null;
    if (body.practiceQuestions !== undefined) updateData.practiceQuestions = body.practiceQuestions?.trim() || null;
    if (body.sampleQuestionPaper !== undefined) updateData.sampleQuestionPaper = body.sampleQuestionPaper?.trim() || null;
    if (body.mcqPracticeBank !== undefined) updateData.mcqPracticeBank = body.mcqPracticeBank?.trim() || null;
    if (body.thumbnailLink !== undefined) updateData.thumbnailLink = body.thumbnailLink?.trim() || null;
    if (body.pdfLink !== undefined) updateData.pdfLink = body.pdfLink?.trim() || null;
    if (body.videoLink !== undefined) updateData.videoLink = body.videoLink?.trim() || null;
    if (body.audioLink !== undefined) updateData.audioLink = body.audioLink?.trim() || null;

    // Update chapter
    const updatedChapter = await prisma.bookChapter.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: "Chapter updated successfully",
      data: updatedChapter,
    });
  } catch (error) {
    console.error("Error updating chapter:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update chapter", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/chapters/[chapterId] - Delete chapter
export async function DELETE(request, context ) {
  try {

    const { chapterId } = await context.params;
    const id = parseInt(chapterId);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid chapter ID" },
        { status: 400 }
      );
    }

    // Check if chapter exists
    const chapter = await prisma.bookChapter.findUnique({
      where: { id },
    });

    if (!chapter) {
      return NextResponse.json(
        { success: false, message: "Chapter not found" },
        { status: 404 }
      );
    }

    // Delete chapter
    await prisma.bookChapter.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Chapter deleted successfully",
      data: { id },
    });
  } catch (error) {
    console.error("Error deleting chapter:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete chapter", error: error.message },
      { status: 500 }
    );
  }
}