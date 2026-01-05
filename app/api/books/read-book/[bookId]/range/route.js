import { decodeBase64UrlSafe } from '@/utils/base64';
import prisma from '@/lib/prisma';
import { rangeCache, RANGE_CACHE_DURATION } from "@/lib/pdf-cache";
import { downloadPdfBytes, extractRange, getPdfPageCount } from "@/lib/pdf-utils";

export async function GET(req, ctx) {
  try {
    const { bookId } = await ctx.params;

    const urlObj = new URL(req.url);
    let startPage = parseInt(urlObj.searchParams.get("startPage") || "1", 10);
    let endPage = parseInt(urlObj.searchParams.get("endPage") || "10", 10);

    // ✅ Basic validation - check for NaN or invalid numbers
    if (isNaN(startPage) || isNaN(endPage)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid page numbers provided",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // ✅ Ensure startPage is at least 1
    startPage = Math.max(1, startPage);

    // ✅ Ensure endPage is at least equal to startPage
    if (endPage < startPage) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "endPage cannot be less than startPage",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const pdfLink = decodeBase64UrlSafe(bookId);
    console.log("Decoded PDF:", pdfLink);

    let book = await prisma.book.findFirst({
      where: { pdfLink }
    });

    if (!book) {
      book = await prisma.book.create({
        data: {
          url: pdfLink,
          pdfLink,
          title: "Imported PDF",
        },
      });
    }

    // Download PDF bytes first to get total pages
    const pdfBytes = await downloadPdfBytes(pdfLink);
    
    // ✅ Get total page count before extraction
    const totalPages = await getPdfPageCount(pdfBytes);

    // ✅ Validate startPage against totalPages
    if (startPage > totalPages) {
      return new Response(
        JSON.stringify({
          success: false,
          message: `startPage (${startPage}) exceeds total pages (${totalPages})`,
          totalPages: totalPages,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // ✅ Clamp endPage to totalPages (don't error, just adjust)
    const adjustedEndPage = Math.min(endPage, totalPages);

    // Now use adjusted values for cache key
    const cacheKey = `${pdfLink}::${startPage}-${adjustedEndPage}`;

    const cached = rangeCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < RANGE_CACHE_DURATION) {
      return new Response(cached.bytes, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `inline; filename="${book.id}-${startPage}-${adjustedEndPage}.pdf"`,
          "X-Extracted-Pages": `${startPage}-${adjustedEndPage}`,
          "X-Total-Pages": String(totalPages),
          "X-Requested-End-Page": String(endPage), // Original requested
          "X-Adjusted-End-Page": String(adjustedEndPage), // Actual
          "Content-Length": String(cached.bytes.length),
        },
      });
    }

    // Extract with validated/adjusted page range
    const { bytes, extractedCount } = await extractRange(
      pdfBytes,
      startPage,
      adjustedEndPage
    );

    rangeCache.set(cacheKey, {
      bytes,
      timestamp: Date.now(),
      totalPages,
      extractedCount,
    });

    return new Response(bytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${book.id}-${startPage}-${adjustedEndPage}.pdf"`,
        "X-Extracted-Pages": `${startPage}-${adjustedEndPage}`,
        "X-Total-Pages": String(totalPages),
        "X-Requested-End-Page": String(endPage),
        "X-Adjusted-End-Page": String(adjustedEndPage),
        "X-Extracted-Count": String(extractedCount),
        "Content-Length": String(bytes.length),
      },
    });
  } catch (err) {
    console.error("range error", err);
    return new Response(
      JSON.stringify({
        success: false,
        message: err instanceof Error ? err.message : "Error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// import { decodeBase64UrlSafe } from '@/utils/base64';
// import prisma from '@/lib/prisma';
// // import { downloadPdfBytes, extractRange } from '@/lib/pdf-utils';
// // import { rangeCache, RANGE_CACHE_DURATION } from '@/lib/pdf-cache';

// import { rangeCache, RANGE_CACHE_DURATION } from "@/lib/pdf-cache";
// import { downloadPdfBytes, extractRange } from "@/lib/pdf-utils";

// export async function GET(req, ctx) {
//   try {
//     // ✅ Fix #1 → MUST await params
//     const { bookId } = await ctx.params;

//     const urlObj = new URL(req.url);
//     const startPage = parseInt(urlObj.searchParams.get("startPage") || "1", 10);
//     const endPage = parseInt(urlObj.searchParams.get("endPage") || "10", 10);

//     const pdfLink = decodeBase64UrlSafe(bookId);

//     console.log("Decoded PDF:", pdfLink);

//     // 🔥 Use correct field name
//     let book = await prisma.book.findFirst({
//       where: { pdfLink }
//     });

//     if (!book) {
//       book = await prisma.book.create({ 
//         data: {
//           url: pdfLink,
//           pdfLink,
//           title: "Imported PDF",
//         },
//       });
//     }

//     const cacheKey = `${pdfLink}::${startPage}-${endPage}`;

//     // ⚠️ Fix #2 → ensure cache is valid
//     const cached = rangeCache.get(cacheKey);

//     if (cached && Date.now() - cached.timestamp < RANGE_CACHE_DURATION) {
//       return new Response(cached.bytes, {
//         status: 200,
//         headers: {
//           "Content-Type": "application/pdf",
//           "Content-Disposition": `inline; filename="${book.id}-${startPage}-${endPage}.pdf"`,
//           "X-Extracted-Pages": `${startPage}-${endPage}`,
//           "X-Total-Pages": String(cached.totalPages),
//           "Content-Length": String(cached.bytes.length),
//         },
//       });
//     }

//     const pdfBytes = await downloadPdfBytes(pdfLink);
//     const { bytes, totalPages, extractedCount } = await extractRange(
//       pdfBytes,
//       startPage,
//       endPage
//     );

//     rangeCache.set(cacheKey, {
//       bytes,
//       timestamp: Date.now(),
//       totalPages,
//       extractedCount,
//     });

//     return new Response(bytes, {
//       status: 200,
//       headers: {
//         "Content-Type": "application/pdf",
//         "Content-Disposition": `inline; filename="${book.id}-${startPage}-${endPage}.pdf"`,
//         "X-Extracted-Pages": `${startPage}-${endPage}`,
//         "X-Total-Pages": String(totalPages),
//         "X-Extracted-Count": String(extractedCount),
//         "Content-Length": String(bytes.length),
//       },
//     });
//   } catch (err) {
//     console.error("range error", err);
//     return new Response(
//       JSON.stringify({
//         success: false,
//         message: err instanceof Error ? err.message : "Error",
//       }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }