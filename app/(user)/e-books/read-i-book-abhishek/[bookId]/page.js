"use client";

import dynamic from "next/dynamic";
import "@/flipbook/_styles/globals.css";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IBookGPT } from "@/components";

const FlipbookViewer = dynamic(
  () => import("@/flipbook/_components/ui/flipbook-viewer/flipbook-viewer-abhishek"),
  {
    ssr: false,
  }
);
const PDFViewer = dynamic(
  () => import("@/components/PDFViewer"),
  {
    ssr: false,
  }
);

export default function Home({ params }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const bookId = unwrappedParams?.bookId;

  if (!bookId) {
    toast.error("Book not found!");
    router.back();
  }

  // ✅ Use the proxy endpoint instead of direct external URL
  const fileUrl = `/api/books/read-abhishek/${bookId}`;
  

  return (
    <div className="py-6 px-4 flex flex-col md:flex-row items-center gap-4">
      <div className="w-full md:w-2/3">
        <FlipbookViewer 
        pdfUrl={fileUrl} 
        className="" 
        disableShare={true}  />
        {/* <PDFViewer pdfUrl={fileUrl} className="" disableShare={true}  /> */}
      </div>
      <div className="w-full md:w-1/3">
        {/* <IBookGPT bookId={bookId} /> */}
      </div>
    </div>
  );
}
