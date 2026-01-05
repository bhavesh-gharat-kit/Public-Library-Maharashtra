const axios = require('axios');
const { PDFDocument } = require('pdf-lib');

const pdfCache = new Map();
const PDF_CACHE_DURATION = 1000 * 60 * 5; // 5 minutes cache

async function downloadPdfBytes(url) {
  const cached = pdfCache.get(url);
  if (cached && (Date.now() - cached.timestamp) < PDF_CACHE_DURATION) {
    return cached.pdfBytes;
  }

  const resp = await axios.get(url, {
    responseType: 'arraybuffer',
    timeout: 30000,
    headers: { 'User-Agent': 'NextJS-PDF/1.0' }
  });

  const buf = Buffer.from(resp.data);
  pdfCache.set(url, { pdfBytes: buf, timestamp: Date.now() });
  return buf;
}

async function getTotalPages(pdfBytes) {
  const doc = await PDFDocument.load(pdfBytes);
  return doc.getPageCount();
}

// async function extractRange(pdfBytes, startPage, endPage) {
//   const src = await PDFDocument.load(pdfBytes);
//   const total = src.getPageCount();

//   if (startPage < 1 || endPage > total || startPage > endPage) {
//     const e = new Error(`Invalid page range ${startPage}-${endPage}. Total: ${total}`);
//     e.totalPages = total;
//     throw e;
//   }

//   const out = await PDFDocument.create();
//   const pages = Array.from(
//     { length: endPage - startPage + 1 },
//     (_, i) => startPage - 1 + i
//   );

//   const copied = await out.copyPages(src, pages);
//   copied.forEach(page => out.addPage(page));

//   return {
//     bytes: Buffer.from(await out.save()),
//     totalPages: total,
//     extractedCount: pages.length
//   };
// }

async function getPdfPageCount(pdfBytes) {
  const pdfDoc = await PDFDocument.load(pdfBytes, {
    ignoreEncryption: true
  });
  return pdfDoc.getPageCount();
}

// export async function extractRange(pdfBytes, startPage, endPage) {
//   const pdfDoc = await PDFDocument.load(pdfBytes, { 
//     ignoreEncryption: true 
//   });

//   const totalPages = pdfDoc.getPageCount();

//   // Validate and adjust
//   const validStart = Math.max(1, Math.min(startPage, totalPages));
//   const validEnd = Math.max(validStart, Math.min(endPage, totalPages));

//   // Create new PDF with selected pages
//   const newPdf = await PDFDocument.create();

//   // pdf-lib uses 0-based indexing
//   const pageIndices = [];
//   for (let i = validStart - 1; i < validEnd; i++) {
//     pageIndices.push(i);
//   }

//   const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices);
//   copiedPages.forEach(page => newPdf.addPage(page));

//   const bytes = await newPdf.save();

//   return {
//     bytes: Buffer.from(bytes),
//     totalPages,
//     extractedCount: copiedPages.length,
//     actualStart: validStart,
//     actualEnd: validEnd,
//   };
// }

async function extractRange(pdfBytes, startPage, endPage) {
  const pdfDoc = await PDFDocument.load(pdfBytes, {
    ignoreEncryption: true
  });

  const totalPages = pdfDoc.getPageCount();

  // Validate and adjust
  const validStart = Math.max(1, Math.min(startPage, totalPages));
  const validEnd = Math.max(validStart, Math.min(endPage, totalPages));

  // Create new PDF with selected pages
  const newPdf = await PDFDocument.create();

  // pdf-lib uses 0-based indexing
  const pageIndices = [];
  for (let i = validStart - 1; i < validEnd; i++) {
    pageIndices.push(i);
  }

  const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices);
  copiedPages.forEach(page => newPdf.addPage(page));

  const bytes = await newPdf.save();

  return {
    bytes: Buffer.from(bytes),
    totalPages,
    extractedCount: copiedPages.length,
    actualStart: validStart,
    actualEnd: validEnd,
  };
}

// async function extractAndCompressRange(pdfBytes, startPage, endPage) {
//   const src = await PDFDocument.load(pdfBytes);
//   const total = src.getPageCount();

//   if (startPage < 1 || endPage > total || startPage > endPage) {
//     throw new Error(`Invalid page range ${startPage}-${endPage}. Total: ${total}`);
//   }

//   const out = await PDFDocument.create();

//   for (let i = startPage - 1; i < endPage; i++) {
//     const [page] = await out.copyPages(src, [i]);
//     const newPage = out.addPage(page);

//     // --- IMAGE COMPRESSION LOGIC ---
//     const images = page.node.Resources()?.XObject ?? {};

//     for (const key in images) {
//       try {
//         const xObj = images[key];
//         const imgData = xObj.get('Filter') ? xObj : null;

//         if (imgData) {
//           const raw = xObj?.contents;
//           if (!raw) continue;

//           // Recompress to JPEG (quality 60%)
//           const jpeg = await out.embedJpg(raw, { quality: 0.6 });

//           const { width, height } = jpeg.scale(1);

//           newPage.drawImage(jpeg, {
//             x: 0,
//             y: 0,
//             width,
//             height,
//           });
//         }
//       } catch (err) {
//         console.log("Image compression failed for item:", key);
//       }
//     }
//   }

//   const bytes = await out.save({
//     useObjectStreams: true,
//     addDefaultPage: false,
//   });

//   return {
//     bytes: Buffer.from(bytes),
//     totalPages: total,
//     extractedCount: endPage - startPage + 1,
//   };
// }



module.exports = {
  downloadPdfBytes,
  getTotalPages,
  extractRange,
  getPdfPageCount
  // extractAndCompressRange
};
