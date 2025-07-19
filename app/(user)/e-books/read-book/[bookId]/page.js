"use client";

import { Footer, Header } from "@/components";
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
      
      <div className="py-6">
        <PDFViewer fileUrl={fileUrl} />
      </div>
      
    </>
  );
}
