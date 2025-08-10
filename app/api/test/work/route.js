// BOOKS INSERTION LOGIC

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // your Prisma client instance
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Load the pre-cleaned JSON file from your project directory
    const filePath = path.join(process.cwd(),"data.json");
    const rawData = fs.readFileSync(filePath, "utf8");
    const booksData = JSON.parse(rawData);

    let insertedCount = 0;

    // Loop through books and insert
    // for (const book of booksData) {
    //   await prisma.book.create({
    //     data: {
    //       yearOfPublication: book.publicationYear
    //         ? parseInt(book.publicationYear, 10)
    //         : null,
    //       author: book.author || null,
    //       publisher: book.publisher || null,
    //       issn: book.issn || null,
    //       subject: book.subject || null,
    //       title: book.title || null,
    //       pdfLink: book.pdfLink || null,
    //       contentType: "openAccess",
    //       bookType: "iBook", // default
    //       medium: book.medium ||book.language || null,
    //       thumbnailLink: book.thumbnailLink || null,
    //       standard: book.standard || null,
    //     },
    //   });
    //   insertedCount++;
    // }

    return NextResponse.json({
      success: true,
      message: `${insertedCount} books inserted successfully.`,
    });

  } catch (error) {
    console.error("Error inserting books:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
