import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const yearOfPublication = searchParams.get("yearOfPublication");
    const languages = searchParams.get("languages");
    const subjects = searchParams.get("subjects");
    const publishers = searchParams.get("publishers");
    const authors = searchParams.get("authors");
    const syllabuses = searchParams.get("syllabuses");
    const standards = searchParams.get("standards");
    const contentTypes = searchParams.get("contentTypes");
    const search = searchParams.get("search");

    const page = parseInt(searchParams.get("page") || "1", 10);
    // const limit = parseInt(searchParams.get("limit") || "12", 10);
    const limit = 12;

    const skip = (page - 1) * limit;

    const parseArray = (val) => (val ? val.split(",") : undefined);

    const where = {
      ...(search && {
        OR: [
          { title: { contains: search } },
          { author: { contains: search } },
          { issn: { contains: search } },
          { publisher: { contains: search } },
        ],
      }),
      ...(yearOfPublication && {
        yearOfPublication: {
          in: parseArray(yearOfPublication).map((strYear) => Number(strYear)),
        },
      }),
      ...(languages && {
        medium: { in: parseArray(languages) },
      }),
      ...(standards && {
        standard: { in: parseArray(standards) },
      }),
      ...(syllabuses && {
        syllabus: { in: parseArray(syllabuses) },
      }),
      ...(subjects && {
        subject: { in: parseArray(subjects) },
      }),
      ...(publishers && {
        publisher: { in: parseArray(publishers) },
      }),
      ...(authors && {
        author: { in: parseArray(authors) },
      }),
      ...(contentTypes && {
        contentType: { in: parseArray(contentTypes) },
      }),
    };

    const books = await prisma.Book.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    });

    const totalBooks = await prisma.Book.count({
      where,
    });

    return NextResponse.json({
      success: true,
      data: books,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
    });
  } catch (err) {
    console.error("Error fetching books:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
