// /lib/pdf-utils.js
import axios from "axios";
import { PDFDocument } from "pdf-lib";
import { SimpleCache } from "./cache";
// /lib/pdf-cache.js

// Simple in-memory range cache
export const rangeCache = new Map();

// Cache for 15 minutes
export const RANGE_CACHE_DURATION = 1000 * 60 * 15;

export const bookCache = new SimpleCache(1000 * 60 * 10, 500);
export const bookChapterCache = new SimpleCache(1000 * 60 * 10, 500);

const pdfCache = new Map();
export const PDF_CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function downloadPdfBytes(url) {
  const cached = pdfCache.get(url);
  if (cached && Date.now() - cached.timestamp < PDF_CACHE_DURATION) {
    return cached.pdfBytes;
  }

  const resp = await axios.get(url, {
    responseType: "arraybuffer",
    timeout: 30000,
    headers: { "User-Agent": "NextJS-PDF-Range-API/1.0" }
  });

  const buf = Buffer.from(resp.data);
  pdfCache.set(url, { pdfBytes: buf, timestamp: Date.now() });
  return buf;
}

export async function getTotalPages(pdfBytes) {
  const doc = await PDFDocument.load(pdfBytes);
  return doc.getPageCount();
}

export async function extractRange(pdfBytes, startPage, endPage) {
  const src = await PDFDocument.load(pdfBytes);
  const total = src.getPageCount();

  if (startPage < 1 || endPage > total || startPage > endPage) {
    const err = new Error(`Invalid page range ${startPage}-${endPage}. Total: ${total}`);
    err.totalPages = total;
    throw err;
  }

  const out = await PDFDocument.create();
  const indices = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage - 1 + i);

  const copied = await out.copyPages(src, indices);
  copied.forEach((p) => out.addPage(p));

  const bytes = await out.save();

  return {
    bytes: Buffer.from(bytes),
    totalPages: total,
    extractedCount: indices.length
  };
}
