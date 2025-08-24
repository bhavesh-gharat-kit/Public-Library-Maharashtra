// app/api/pdf-proxy/[bookId]/route.js
export async function GET(request, context) {
  const { bookId } = await context.params;

  function base64UrlDecode(str) {
    str = str.replace(/-/g, "+").replace(/_/g, "/");
    while (str.length % 4) str += "=";
    return Buffer.from(str, "base64").toString("utf-8");
  }

  if (!bookId) {
    console.log("Book id is missing ....");
    return new Response("Missing bookId", { status: 400 });
  }

  console.log("Book id is...", bookId);

  // decode base64 -> original PDF URL
  let pdfURL = "";
  // pdfURL = "http://localhost:3000/book.pdf";
  try {
    pdfURL = base64UrlDecode(bookId);

  } catch (e) {
    console.log("Book id is not valid ....", e);
    return new Response("Invalid bookId", { status: 400 });
  }
  console.log("PDF Url is...", pdfURL);

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
      return new Response(`Upstream error: ${upstream.statusText}`, {
        status: upstream.status,
      });
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
    if (err.name === "AbortError")
      return new Response("Timeout fetching PDF", { status: 504 });
    return new Response(`Fetch error: ${err.message}`, { status: 500 });
  } finally {
    clearTimeout(timeoutId);
  }
}