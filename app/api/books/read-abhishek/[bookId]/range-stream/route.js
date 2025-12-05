import { decodeBase64UrlSafe } from '@/utils/base64';
import  prisma from '@/lib/prisma';
import { downloadPdfBytes, extractRange } from '@/lib/pdf-utils';
import { rangeCache, RANGE_CACHE_DURATION } from '@/lib/pdf-cache';

export async function GET(req, ctx) {
  try {
    const {bookId} = await ctx.params;
    const urlObj = new URL(req.url);
    const startPage = parseInt(urlObj.searchParams.get('startPage') || '1', 10);
    const endPage = parseInt(urlObj.searchParams.get('endPage') || '10', 10);

    // Proper param extraction
    const pdfLink = decodeBase64UrlSafe(bookId);

    // Create/find DB record
    let book = await prisma.book.findFirst({ where: { pdfLink } }).catch(() => null);
    if (!book) {
      book = await prisma.book.create({
        data: { pdfLink, title: 'Imported' }
      });
    }

    // Cache Key
    const cacheKey = `${pdfLink}::${startPage}-${endPage}`;
    const cached = rangeCache.get(cacheKey);

    // If cached, stream cached bytes
    if (cached && Date.now() - cached.timestamp < RANGE_CACHE_DURATION) {
      return streamPdfBytes(cached.bytes, startPage, endPage);
    }

    // Download + extract range
    const pdfBytes = await downloadPdfBytes(pdfLink);
    const { bytes } = await extractRange(pdfBytes, startPage, endPage);

    // Save in cache
    rangeCache.set(cacheKey, {
      bytes,
      timestamp: Date.now(),
    });

    // Stream results
    return streamPdfBytes(bytes, startPage, endPage);

  } catch (err) {
    console.error("range-stream error", err);
    return new Response(
      JSON.stringify({ success: false, message: err.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}

/**
 * Stream PDF bytes to the client
 */
function streamPdfBytes(bytes, startPage, endPage) {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(bytes);
      controller.close();
    }
  });

  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="pages_${startPage}-${endPage}.pdf"`,
      "Content-Length": bytes.length.toString()
    }
  });
}
