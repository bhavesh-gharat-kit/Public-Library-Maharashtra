// app/api/pdf-proxy/[bookId]/route.js
export async function GET(request,  context ) {
  const { bookId } = await context.params;

  if (!bookId) {
    return new Response("Missing bookId", { status: 400 });
  }

  // decode base64 -> original PDF URL
  let pdfURL = "";
  // pdfURL = "http://localhost:3000/book.pdf";
  try {
    pdfURL = Buffer.from(bookId, "base64").toString("utf-8");
  } catch (e) {
    return new Response("Invalid bookId", { status: 400 });
  }

  // OPTIONAL: whitelist hosts to avoid becoming an open proxy (strongly recommended)
  // const allowed = ["library.oapen.org", "example.com"];
  // try {
  //   const u = new URL(pdfURL);
  //   if (!allowed.includes(u.hostname)) return new Response("Forbidden", { status: 403 });
  // } catch (e) { return new Response("Invalid URL", { status: 400 }); }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30_000); // 30s timeout

  try {
    // forward Range header if present (important for partial requests / PDF viewers)
    const range = request.headers.get("range");
    const fetchHeaders = {};
    if (range) fetchHeaders["Range"] = range;
    // optional UA - skip if your runtime forbids it (Edge)
    // fetchHeaders["User-Agent"] = "Mozilla/5.0 (compatible)";

    
    const upstream = await fetch(pdfURL, {
      method: "GET",
      headers: fetchHeaders,
      signal: controller.signal,
    });

    if (!upstream.ok && upstream.status !== 206) {
      // forward upstream status where sensible
      return new Response(`Upstream error: ${upstream.statusText}`, { status: upstream.status });
    }

    // copy useful headers from upstream
    const responseHeaders = new Headers();
    [
      "content-type",
      "content-length",
      "content-range",
      "accept-ranges",
      "last-modified",
      "etag",
    ].forEach((name) => {
      const v = upstream.headers.get(name);
      if (v) responseHeaders.set(name, v);
    });

    // ensure inline display by default
    responseHeaders.set("Content-Disposition", 'inline; filename="book.pdf"');
    // optional caching
    responseHeaders.set("Cache-Control", "public, max-age=0, must-revalidate");

    // return the upstream body stream directly (no buffering)
    return new Response(upstream.body, {
      status: upstream.status,
      headers: responseHeaders,
    });
  } catch (err) {
    if (err.name === "AbortError") return new Response("Timeout fetching PDF", { status: 504 });
    return new Response(`Fetch error: ${err.message}`, { status: 500 });
  } finally {
    clearTimeout(timeoutId);
  }
}



// app/api/pdf-proxy/route.js
// export async function GET(request, context) {
//   try {
//     const { bookId } = await context.params;
//     const pdfURLRcv = Buffer.from(bookId, "base64").toString("utf-8");

//     //
//     const pdfUrl = "http://localhost:3000/book.pdf";

//     // Fetch the PDF from the external source
//     const response = await fetch(pdfUrl);

//     if (!response.ok) {
//       return new Response(JSON.stringify({ error: "Failed to fetch PDF" }), {
//         status: response.status,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     // Stream the PDF to the client
//     const pdfBuffer = await response.arrayBuffer();

//     return new Response(pdfBuffer, {
//       status: 200,
//       headers: {
//         "Content-Type": "application/pdf",
//         "Content-Disposition": "inline; filename=book.pdf",
//         "Cache-Control": "no-store",
//       },
//     });
//   } catch (error) {
//     console.log("Error while fetching pdf...", error);
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }




// export async function GET(request, context) {
//   const { bookId } = await context.params;

//   const pdfURLRcv = Buffer.from(bookId, "base64").toString("utf-8");
//   console.log("PDF URL is: ... ", pdfURLRcv)
//   const pdfURL = "https://library.oapen.org/bitstream/20.500.12657/46035/1/external_content.pdf";

//   // const controller = new AbortController();
//   // const timeoutId = setTimeout(() => controller.abort(), 10800);

//   try {
//     const res = await fetch(pdfURL, {
//       signal: controller.signal,
//       headers: {
//         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
//       },
//     });

//     if (!res.ok) {
//       return new Response(`Failed to fetch PDF: ${res.status}`, {
//         status: 500,
//       });
//     }

//     const buffer = await res.arrayBuffer();

//     return new Response(res.body, {
//       headers: {
//         "Content-Type": "application/pdf",
//         "Content-Disposition": "inline; filename=book.pdf",
//       },
//     });
//   } catch (err) {
//     return new Response(`Fetch error: ${err.message}`, { status: 500 });
//   } finally {
//     // clearTimeout(timeoutId);
//   }
// }
