import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/admin/books/[id] - Get single book with chapters
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const bookId = parseInt(id);

    if (isNaN(bookId)) {
      return NextResponse.json(
        { success: false, message: "Invalid book ID" },
        { status: 400 }
      );
    }

    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        chapters: {
          orderBy: { chapterNumber: "asc" },
        },
      },
    });

    if (!book) {
      return NextResponse.json(
        { success: false, message: "Book not found" },
        { status: 404 }
      );
    }

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

    return NextResponse.json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.error("Error fetching book:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch book", error: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/admin/books/[id] - Update book
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const bookId = parseInt(id);

    if (isNaN(bookId)) {
      return NextResponse.json(
        { success: false, message: "Invalid book ID" },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Validate required fields
    if (body.title !== undefined && body.title.trim() === "") {
      return NextResponse.json(
        { success: false, message: "Title cannot be empty" },
        { status: 400 }
      );
    }

    // Validate year if provided
    if (body.yearOfPublication) {
      const year = parseInt(body.yearOfPublication);
      if (isNaN(year) || year < 1000 || year > new Date().getFullYear()) {
        return NextResponse.json(
          { success: false, message: "Invalid year of publication" },
          { status: 400 }
        );
      }
    }

    // Check if book exists
    const existingBook = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!existingBook) {
      return NextResponse.json(
        { success: false, message: "Book not found" },
        { status: 404 }
      );
    }

    // Create update data object
    const updateData = {};

    if (body.title !== undefined) updateData.title = body.title.trim();
    if (body.author !== undefined) updateData.author = body.author?.trim() || null;
    if (body.publisher !== undefined) updateData.publisher = body.publisher?.trim() || null;
    if (body.yearOfPublication !== undefined) {
      updateData.yearOfPublication = body.yearOfPublication ? parseInt(body.yearOfPublication) : null;
    }
    if (body.medium !== undefined) updateData.medium = body.medium?.trim() || null;
    if (body.standard !== undefined) updateData.standard = body.standard?.trim() || null;
    if (body.issn !== undefined) updateData.issn = body.issn?.trim() || null;
    if (body.subject !== undefined) updateData.subject = body.subject?.trim() || null;
    if (body.syllabus !== undefined) updateData.syllabus = body.syllabus?.trim() || null;
    if (body.description !== undefined) updateData.description = body.description?.trim() || null;
    if (body.contentType !== undefined) updateData.contentType = body.contentType;
    if (body.bookType !== undefined) updateData.bookType = body.bookType;
    if (body.pdfLink !== undefined) updateData.pdfLink = body.pdfLink?.trim() || null;
    if (body.thumbnailLink !== undefined) updateData.thumbnailLink = body.thumbnailLink?.trim() || null;

    // Update book
    const updatedBook = await prisma.book.update({
      where: { id: bookId },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    console.error("Error updating book:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update book", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/books/[id] - Delete book
export async function DELETE(request, context) {
  try {

    const { id } = await context.params;
    const bookId = parseInt(id);

    if (isNaN(bookId)) {
      return NextResponse.json(
        { success: false, message: "Invalid book ID" },
        { status: 400 }
      );
    }

    // Check if book exists
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        _count: {
          select: { chapters: true },
        },
      },
    });

    if (!book) {
      return NextResponse.json(
        { success: false, message: "Book not found" },
        { status: 404 }
      );
    }

    // Delete book (chapters will be cascade deleted due to onDelete: Cascade)
    await prisma.book.delete({
      where: { id: bookId },
    });

    return NextResponse.json({
      success: true,
      message: "Book deleted successfully",
      data: {
        id: bookId,
        chaptersDeleted: book._count.chapters,
      },
    });
  } catch (error) {
    console.error("Error deleting book:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete book", error: error.message },
      { status: 500 }
    );
  }
}