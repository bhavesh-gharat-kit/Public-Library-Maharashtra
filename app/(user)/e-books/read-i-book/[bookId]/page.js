"use client";

import { Footer, Header, IBookGPT } from "@/components";
import dynamic from "next/dynamic";
import { use, useEffect, useState } from "react";

const PDFViewer = dynamic(() => import("@/components/PDFViewer"), {
  ssr: false,
});

export default function Home({ params }) {
  const unwrappedParams = use(params); // Unwrap params
  const bookId = unwrappedParams?.bookId || "book1.pdf";
  const fileUrl = `/books/${bookId}`;

  return (
    <>
      
      <div className="py-6 px-4 flex flex-col md:flex-row gap-4">
        <PDFViewer fileUrl={fileUrl} className="w-full md:w-2/3" />
        <div className="w-full md:w-1/3 ">
          <IBookGPT />
        </div>
      </div>
      
    </>
  );
}
