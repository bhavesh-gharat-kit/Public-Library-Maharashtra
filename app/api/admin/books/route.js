import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/admin/books - List all books with pagination and filters
export async function GET(request) {
  try {

    const { searchParams } = new URL(request.url);

    // Pagination
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 20;
    const skip = (page - 1) * limit;

    // Filters 
    const search = searchParams.get("search");
    const bookType = searchParams.get("bookType");
    const contentType = searchParams.get("contentType");
    const medium = searchParams.get("medium");
    const standard = searchParams.get("standard");
    const subject = searchParams.get("subject");

    // Build where clause
    const where = {};

    // Search in multiple fields
    if (search) {
      const parsedId = parseInt(search, 10);

      // If search is a valid number → search by ID
      if (!isNaN(parsedId)) {
        where.OR = [
          { id: parsedId }, // Exact match for ID
          { title: { contains: search } },
          { author: { contains: search } },
          { publisher: { contains: search } },
          { issn: { contains: search } },
          { subject: { contains: search } },
        ];
      } else {
        // Otherwise search text fields only
        where.OR = [
          { title: { contains: search } },
          { author: { contains: search } },
          { publisher: { contains: search } },
          { issn: { contains: search } },
          { subject: { contains: search } },
        ];
      }
    }


    // Apply filters
    if (bookType) where.bookType = bookType;
    if (contentType) where.contentType = contentType;
    if (medium) where.medium = { contains: medium };
    if (standard) where.standard = standard;
    if (subject) where.subject = { contains: subject };

    // Execute queries
    const [books, totalBooks] = await Promise.all([
      prisma.book.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          author: true,
          publisher: true,
          yearOfPublication: true,
          medium: true,
          standard: true,
          issn: true,
          subject: true,
          syllabus: true,
          bookType: true,
          contentType: true,
          thumbnailLink: true,
          pdfLink: true,
          createdAt: true,
        },
      }),
      prisma.book.count({ where }),
    ]);

    const totalPages = Math.ceil(totalBooks / limit);

    return NextResponse.json({
      success: true,
      data: books,
      pagination: {
        page,
        limit,
        totalBooks,
        totalPages,
      },
      totalBooks,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch books", error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/admin/books - Create new book
export async function POST(request) {
  try {

    const body = await request.json();

    // Validate required fields
    if (!body.title || body.title.trim() === "") {
      return NextResponse.json(
        { success: false, message: "Title is required" },
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

    // Create book data object
    const bookData = {
      title: body.title.trim(),
      author: body.author?.trim() || null,
      publisher: body.publisher?.trim() || null,
      yearOfPublication: body.yearOfPublication ? parseInt(body.yearOfPublication) : null,
      medium: body.medium?.trim() || null,
      standard: body.standard?.trim() || null,
      issn: body.issn?.trim() || null,
      subject: body.subject?.trim() || null,
      syllabus: body.syllabus?.trim() || null,
      description: body.description?.trim() || null,
      contentType: body.contentType || "openAccess",
      bookType: body.bookType || "eBook",
      pdfLink: body.pdfLink?.trim() || null,
      thumbnailLink: body.thumbnailLink?.trim() || null,
    };

    // Create book
    const book = await prisma.book.create({
      data: bookData,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Book created successfully",
        data: book,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating book:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create book", error: error.message },
      { status: 500 }
    );
  }
}