import { decodeBase64UrlSafe } from "@/utils/base64";
import prisma from "@/lib/prisma";
import { downloadPdfBytes, getTotalPages } from "@/lib/pdf-utils";

export async function GET(req, ctx) {
  try {
    const params = await ctx.params;
    const id = Number(params.id)
    if(!id)  {   
      return new Response(
      JSON.stringify({ success: false, message:"Manuscript ID not found" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );}
    
    // 1. Find existing manuscript by pdfLink
    let manuscript = await prisma.manuscript.findFirst({
      where: { id: id }
    });
    
    if(!manuscript)  {   
      return new Response(
      JSON.stringify({ success: false, message:"Manuscript not found" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );}

    const pdfUrl = manuscript.pdfLink;
    
    // 3. Download PDF
    const pdfBytes = await downloadPdfBytes(pdfUrl);
    const totalPages = await getTotalPages(pdfBytes);

    // 4. Update description to store page count (because you have no pageCount field)
    const newDescription = `Pages: ${totalPages}`;

    if (manuscript.description !== newDescription) {
      manuscript = await prisma.manuscript.update({
        where: { id: manuscript.id },
        data: {
          description: newDescription
        }
      });
    }

    return new Response(
      JSON.stringify({ success: true, manuscript }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("info route error", err);

    return new Response(
      JSON.stringify({ success: false, message: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

