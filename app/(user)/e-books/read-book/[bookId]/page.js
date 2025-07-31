"use client";

import dynamic from "next/dynamic";
import "@/flipbook/_styles/globals.css";
import { use, useEffect, useState } from "react";
import { FullScreenLoader } from "@/components";
import { axios } from "@/utils";

const PDFViewer = dynamic(() => import("@/components/PDFViewer"), {
  ssr: false,
});
const FlipbookViewer = dynamic(
  () => import("@/flipbook/_components/ui/flipbook-viewer/flipbook-viewer"),
  {
    ssr: false,
  }
);

export default function Home({ params }) {
  const [loading, setLoading] = useState(true);
  // const [fileUrl, setFileUrl] = useState(true);

  const unwrappedParams = use(params); // Unwrap params
  const bookId = unwrappedParams?.bookId || "book1.pdf";

  const fileUrl = `/books/${bookId}`;

  // useEffect(()=>{
  //   const fetchBookURL = async () => {
  //     try {
  //       setLoading(true);
  //       const params = {};
  //       const res = await axios.get("/api/books/get-url");

  //       setFileUrl(res.data.fileUrl);
  //     } catch (err) {
  //       console.error("Error fetching bookurl:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchBookURL();
  // }, [bookId])

  // if (loading || !fileUrl) return <FullScreenLoader />;
  return (
    <>
      <div className="py-6">
        <PDFViewer fileUrl={fileUrl} />
        <FlipbookViewer pdfUrl={fileUrl} />
        {/* <FlipbookViewer pdfUrl="/demo.pdf" /> */}
      </div>
    </>
  );
}
