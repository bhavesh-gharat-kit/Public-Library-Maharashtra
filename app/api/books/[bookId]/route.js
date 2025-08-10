// Fetching book data from database
import prisma from "@/lib/prisma"; // adjust path to your prisma instance

export async function GET(request, context) {
  try {
    const { bookId } = await context.params;

    const pdfLink = Buffer.from(bookId, "base64").toString("utf-8");

    // Fetch book
    const book = await prisma.book.findFirst({
      where: { pdfLink },
      include: { iBook: true },
    });

    if (!book) {
      return new Response(JSON.stringify({ error: "Book not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check if bookType is iBook and iBook relation missing
    if (book.bookType === "iBook" && !book.iBook) {
      await prisma.iBook.create({
        data: {
          bookId: book.id,
        },
      });

      // Refetch book with iBook after creation
      const updatedBook = await prisma.book.findFirst({
        where: { id: book.id },
        include: { iBook: true },
      });

      return new Response(JSON.stringify({ data: updatedBook }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ data: book }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching/creating iBook:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
