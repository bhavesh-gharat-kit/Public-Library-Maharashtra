// export async function GET(request, context) {

//   const { bookId } = await context.params;

//   const pdfURL = Buffer.from(bookId, 'base64').toString('utf-8');

//   const response = await fetch(pdfURL, {
//     headers: {
//       "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
//     },
//   });
//   const buffer = await response.arrayBuffer();
//   const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 sec

//   return new Response(buffer, {
//     headers: {
//       "Content-Type": "application/pdf",
//       "Content-Disposition": "inline; filename=book.pdf",
//     },
//   });
// }

// app/api/pdf-book/[bookId]/route.js
export async function GET(request, context) {
  const { bookId } = await context.params;

  const pdfURL = Buffer.from(bookId, "base64").toString("utf-8");

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10800); 

  try {
    const res = await fetch(pdfURL, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });


    if (!res.ok) {
      return new Response(`Failed to fetch PDF: ${res.status}`, {
        status: 500,
      });
    }

    const buffer = await res.arrayBuffer();

    return new Response(res.body, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=book.pdf",
      },
    });
  } catch (err) {
    return new Response(`Fetch error: ${err.message}`, { status: 500 });
  } finally {
    clearTimeout(timeoutId);
  }
}