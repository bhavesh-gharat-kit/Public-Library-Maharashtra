"use client";

import dynamic from "next/dynamic";
import "@/flipbook/_styles/globals.css";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const PDFViewer = dynamic(() => import("@/components/PDFViewer"), {
  ssr: false,
});

const FlipbookViewer = dynamic(
  () => import("@/flipbook/_components/ui/flipbook-viewer/flipbook-viewer-abhishek"),
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
  const fileUrl = `/api/books/read-book/${bookId}`;

  return (
    <div className="py-6">
      {/* <FlipbookViewer pdfUrl={fileUrl} /> */}

      <FlipbookViewer
        baseUrl="/api"
        fileUrl={fileUrl}
        bookId={bookId}
        initialPagesToLoad={5}
        pagesPerChunk={5}
        loadMoreThreshold={2}
        onPageChange={(page, total) => { }}
        onBookLoaded={(total) => { }}
        onError={(err) => { }}
      />
    </div>
  );
}
