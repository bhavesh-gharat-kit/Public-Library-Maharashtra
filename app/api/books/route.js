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
    const contentTypes = searchParams.get("contentTypes");

    const parseArray = (val) => (val ? val.split(",") : undefined);

    const where = {
      ...(yearOfPublication && {
        yearOfPublication: {
          in: parseArray(yearOfPublication).map((strYear) => Number(strYear)),
        },
      }),
      ...(languages && {
        medium: { in: parseArray(languages) },
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
    });

    return NextResponse.json({ success: true, data: books });
  } catch (err) {
    console.error("Error fetching books:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
