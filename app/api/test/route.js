// app/api/pdf-proxy/route.js
export async function GET(request) {
  try {
    // Get the "url" query parameter
    const pdfUrl = "https://library.oapen.org/bitstream/20.500.12657/46035/1/external_content.pdf";


    // Fetch the PDF from the external source
    const response = await fetch(pdfUrl);

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch PDF" }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Stream the PDF to the client
    const pdfBuffer = await response.arrayBuffer();

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=book.pdf",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
