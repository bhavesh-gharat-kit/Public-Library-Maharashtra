import { decodeBase64UrlSafe } from '@/utils/base64';
import prisma from '@/lib/prisma';
import { rangeCache, RANGE_CACHE_DURATION } from "@/lib/pdf-cache";
import { downloadPdfBytes, extractRange, getPdfPageCount } from "@/lib/pdf-utils";

export async function GET(req, ctx) {
  try {
    const { id } = await ctx.params;

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

    const pdfLink = decodeBase64UrlSafe(id);
    console.log("Decoded PDF:", pdfLink);

    let manuscript = await prisma.manuscript.findFirst({
      where: { pdfLink }
    });

    if (!manuscript) {
      manuscript = await prisma.manuscript.create({
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
          "Content-Disposition": `inline; filename="${manuscript.id}-${startPage}-${adjustedEndPage}.pdf"`,
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
        "Content-Disposition": `inline; filename="${manuscript.id}-${startPage}-${adjustedEndPage}.pdf"`,
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
