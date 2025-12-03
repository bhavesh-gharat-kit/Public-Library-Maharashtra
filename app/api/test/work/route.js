// BOOKS INSERTION LOGIC

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // your Prisma client instance
import fs from "fs";
import path from "path";

export async function POST() {
  try {
    const filePath = path.join(process.cwd(), "data", "suggestedBooks.json");

    const jsonData = fs.readFileSync(filePath, "utf8");
    const categories = JSON.parse(jsonData);

    console.log(categories)
    let insertedCount = 0;

    for (const category of categories) {
      const examCategoryId = Number(category.id);

      for (const book of category.bookUrls) {
        await prisma.suggestedBooks.create({
          data: {
            examCategoryId,
            title: book.name || null,
            thumbnailLink: book.thumbnailUrl || null,
            url: book.url || null,
            price: book.price
              ? Number(book.price.replace(/,/g, "")) // convert "2,545" → 2545
              : null,
          },
        });

        insertedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: "Suggested books imported successfully!",
      inserted: insertedCount,
    });
  } catch (error) {
    console.error("Import error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to import suggested books.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
