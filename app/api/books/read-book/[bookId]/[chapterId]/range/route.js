// import { decodeBase64UrlSafe } from '@/utils/base64';
// import  prisma  from '@/lib/prisma';
// import { downloadPdfBytes, extractRange } from '@/lib/pdf-utils';
// import { rangeCache, RANGE_CACHE_DURATION } from '@/lib/pdf-cache';


// export async function GET(req, { params }) {
// try {
// const urlObj = new URL(req.url);
// const startPage = parseInt(urlObj.searchParams.get('startPage') || '1', 10);
// const endPage = parseInt(urlObj.searchParams.get('endPage') || '10', 10);


// const encoded = params.bookId;
// const pdfLink = decodeBase64UrlSafe(encoded);


// let book = await prisma.book.findUnique({ where: { pdfLink } }).catch(() => null);
// if (!book) book = await prisma.book.create({ data: { pdfLink, title: 'Imported' } });


// const cacheKey = `${pdfLink}::${startPage}-${endPage}`;
// const cached = rangeCache.get(cacheKey);
// if (cached && (Date.now() - cached.timestamp) < RANGE_CACHE_DURATION) {
// return new Response(cached.bytes, {
// status: 200,
// headers: {
// 'Content-Type': 'application/pdf',
// 'Content-Disposition': `inline; filename="${book.publicId ?? book.id}-pages-${startPage}-${endPage}.pdf"`,
// 'X-Extracted-Pages': `${startPage}-${endPage}`,
// 'X-Total-Pages': String(cached.totalPages),
// 'X-Extracted-Count': String(cached.extractedCount),
// 'Content-Length': String(cached.bytes.length)
// }
// });
// }


// const pdfBytes = await downloadPdfBytes(pdfLink);
// const { bytes, totalPages, extractedCount } = await extractRange(pdfBytes, startPage, endPage);


// rangeCache.set(cacheKey, { bytes, timestamp: Date.now(), totalPages, extractedCount });


// return new Response(bytes, {
// status: 200,
// headers: {
// 'Content-Type': 'application/pdf',
// 'Content-Disposition': `inline; filename="${book.publicId ?? book.id}-pages-${startPage}-${endPage}.pdf"`,
// 'X-Extracted-Pages': `${startPage}-${endPage}`,
// 'X-Total-Pages': String(totalPages),
// 'X-Extracted-Count': String(extractedCount),
// 'Content-Length': String(bytes.length)
// }
// });
// } catch (err) {
// console.error('range error', err);
// return new Response(JSON.stringify({ success: false, message: err instanceof Error ? err.message : 'Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
// }
// }








import { decodeBase64UrlSafe } from '@/utils/base64';
import prisma from '@/lib/prisma';
// import { downloadPdfBytes, extractRange } from '@/lib/pdf-utils';
// import { rangeCache, RANGE_CACHE_DURATION } from '@/lib/pdf-cache';

import { rangeCache, RANGE_CACHE_DURATION } from "@/lib/pdf-cache";
import { downloadPdfBytes, extractRange } from "@/lib/pdf-utils";

export async function GET(req, ctx) {
  try {
    // ✅ Fix #1 → MUST await params
    const { bookId } = await ctx.params;

    const urlObj = new URL(req.url);
    const startPage = parseInt(urlObj.searchParams.get("startPage") || "1", 10);
    const endPage = parseInt(urlObj.searchParams.get("endPage") || "10", 10);

    const pdfLink = decodeBase64UrlSafe(bookId);

    console.log("Decoded PDF:", pdfLink);

    // 🔥 Use correct field name
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

    const cacheKey = `${pdfLink}::${startPage}-${endPage}`;

    // ⚠️ Fix #2 → ensure cache is valid
    const cached = rangeCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < RANGE_CACHE_DURATION) {
      return new Response(cached.bytes, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `inline; filename="${book.id}-${startPage}-${endPage}.pdf"`,
          "X-Extracted-Pages": `${startPage}-${endPage}`,
          "X-Total-Pages": String(cached.totalPages),
          "Content-Length": String(cached.bytes.length),
        },
      });
    }

    const pdfBytes = await downloadPdfBytes(pdfLink);
    const { bytes, totalPages, extractedCount } = await extractRange(
      pdfBytes,
      startPage,
      endPage
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
        "Content-Disposition": `inline; filename="${book.id}-${startPage}-${endPage}.pdf"`,
        "X-Extracted-Pages": `${startPage}-${endPage}`,
        "X-Total-Pages": String(totalPages),
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

