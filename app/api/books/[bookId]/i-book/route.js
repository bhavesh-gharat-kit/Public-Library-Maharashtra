// app/api/books/[bookId]/i-book/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  generateFromPrompt,
  getIBookPrompt,
} from "@/lib/helperFunctionsServerSide";

export async function POST(req, context) {
  try {
    let { bookId } = await context.params;
    bookId = Number(bookId);

    const { tool } = await req.json();

    if (!bookId || !tool) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Fetch the matching iBook record for this book and tool
    const bookData = await prisma.Book.findFirst({
      where: {
        id: bookId,
      },
      include: {
        iBook: true,
      },
    });

    if (!bookData || bookData?.bookType !== "iBook") {
      return NextResponse.json(
        { error: "Unable to fetch data" },
        { status: 400 }
      );
    }
    // If iBook record doesn't exist, create it
    if (!bookData.iBook) {
      bookData.iBook = await prisma.iBook.create({
        data: { bookId: bookData.id },
      });
    }

    // If the tool's data is missing, generate and save it
    if (!bookData.iBook[tool]) {
      // if (true) {

      let prompt = getIBookPrompt(bookData, tool);

      const reply = await generateFromPrompt(prompt, {
        model: "gpt-4o-mini",
        temperature: 0.3,
        systemMessage:
          "You are a helpful assistant who always follows the prompt exactly.",
      });

      bookData.iBook = await prisma.iBook.update({
        where: { id: bookData.iBook.id },
        data: { [tool]: reply },
      });
    }

    return NextResponse.json({ reply: bookData.iBook[tool] });
  } catch (error) {
    console.error("Error fetching iBook data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
