import { decodeBase64UrlSafe } from "@/utils/base64";
import prisma from "@/lib/prisma";
import { downloadPdfBytes, getTotalPages } from "@/lib/pdf-utils";

export async function GET(req, ctx) {
  try {
    const { bookId } = await ctx.params;

    const pdfUrl = decodeBase64UrlSafe(bookId);
    console.log("PDF URL decoded:", pdfUrl);

    // 1. Find existing book by pdfLink
    let book = await prisma.book.findFirst({
      where: { pdfLink: pdfUrl }
    });

    // 2. If not found → create
    if (!book) {
      book = await prisma.book.create({
        data: {
          pdfLink: pdfUrl,
          title: "Imported",
          author: "Unknown",
          description: "Processing..."
        }
      });
    }

    // 3. Download PDF
    const pdfBytes = await downloadPdfBytes(pdfUrl);
    const totalPages = await getTotalPages(pdfBytes);

    // 4. Update description to store page count (because you have no pageCount field)
    const newDescription = `Pages: ${totalPages}`;

    if (book.description !== newDescription) {
      book = await prisma.book.update({
        where: { id: book.id },
        data: {
          description: newDescription
        }
      });
    }

    return new Response(
      JSON.stringify({ success: true, book }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("info route error", err);

    return new Response(
      JSON.stringify({ success: false, message: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}












// import {decodeBase64UrlSafe} from '@/utils/base64';  // OR { decodeBase64UrlSafe }
// import prisma from '@/lib/prisma';
// import { downloadPdfBytes, getTotalPages } from '@/lib/pdf-utils';

// export async function GET(req, ctx) {
//   try {
//     const { bookId } = await ctx.params; // ✅ MUST AWAIT

//     const pdfUrl = decodeBase64UrlSafe(bookId); // 👈 FIX import
//     console.log("pdf, BookID :",bookId,pdfUrl);
    
//     // find existing by url
//     let book = await prisma.book.findUnique({
//       where: { pdfLink: pdfUrl }
//     }).catch(() => null);

//     // create if not exist
//     if (!book) {
//       book = await prisma.book.create({
//         data: {
//           pdfLink: pdfUrl,
//           title: 'Imported',
//           author: 'Unknown'
//         }
//       });
//     }

//     // Download & get page count
//     const pdfBytes = await downloadPdfBytes(pdfUrl);
//     const totalPages = await getTotalPages(pdfBytes);

//     // update DB if needed
//     if (!book.totalPages || book.totalPages !== totalPages) {
//       book = await prisma.book.update({
//         where: { id: book.id },
//         data: { pageCount: totalPages }
//       });
//     }

//     return new Response(JSON.stringify({
//       success: true,
//       book
//     }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' }
//     });

//   } catch (err) {
//     console.error("info route error", err);
//     return new Response(JSON.stringify({
//       success: false,
//       message: err.message ?? "Error"
//     }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   }
// }
