import { decodeBase64UrlSafe } from '@/utils/base64';
import prisma from '@/lib/prisma';
import { downloadPdfBytes, extractRange } from '@/lib/pdf-utils';
import { rangeCache, RANGE_CACHE_DURATION } from '@/lib/pdf-cache';

const MAX_DATA_URL_SIZE = 5 * 1024 * 1024; // 5MB

function safeToString(v) {
  if (v == null) return "";
  if (Buffer.isBuffer(v)) return v.toString("utf8");
  if (Array.isArray(v)) return v.join("");
  return String(v);
}

export async function GET(req, ctx) {
  try {
    const urlObj = new URL(req.url);
    const startPage = parseInt(urlObj.searchParams.get('startPage') || '1', 10);
    const endPage = parseInt(urlObj.searchParams.get('endPage') || '2', 10);

    // ✅ FIX: extract id correctly
    const { id } = await ctx.params;


    // 🔥 Database sync
    let manuscript = await prisma.manuscript.findFirst({ where: { id: Number(id) } }).catch(() => null);
    if (!manuscript) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'manuscript not found!.'
        }),
        { status: 404 }
      );
    }

    const pdfLink = manuscript.pdfLink

    // 🔥 Caching key
    const cacheKey = `${pdfLink}::${startPage}-${endPage}`;

    const cached = rangeCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp) < RANGE_CACHE_DURATION) {
      if (cached.bytes.length > MAX_DATA_URL_SIZE) {
        return new Response(
          JSON.stringify({
            success: false,
            message: 'Extracted PDF too large for data URL. Use file endpoint.'
          }),
          { status: 413, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const dataUrl = `data:application/pdf;base64,${cached.bytes.toString('base64')}`;
      return new Response(
        JSON.stringify({
          success: true,
          url: dataUrl,
          startPage,
          endPage,
          totalPages: cached.totalPages,
          size: cached.bytes.length
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 🔥 Download + extract
    const pdfBytes = await downloadPdfBytes(pdfLink);
    const { bytes, totalPages, extractedCount } = await extractRange(
      pdfBytes,
      startPage,
      endPage
    );

    // Save to cache
    rangeCache.set(cacheKey, {
      bytes,
      timestamp: Date.now(),
      totalPages,
      extractedCount
    });

    // Too large?
    if (bytes.length > MAX_DATA_URL_SIZE) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Extracted PDF too large for data URL. Use file endpoint.',
          size: bytes.length
        }),
        { status: 413, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Return Data URL
    const dataUrl = `data:application/pdf;base64,${bytes.toString('base64')}`;
    return new Response(
      JSON.stringify({
        success: true,
        url: dataUrl,
        startPage,
        endPage,
        totalPages,
        size: bytes.length
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('range-json error', err);
    return new Response(
      JSON.stringify({
        success: false,
        message: err instanceof Error ? err.message : 'Error'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
