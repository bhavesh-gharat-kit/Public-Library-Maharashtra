// "use client";

// import { IBookGPT } from "@/components";
// import dynamic from "next/dynamic";
// import { use } from "react";

// const PDFViewer = dynamic(() => import("@/components/PDFViewer"), {
//   ssr: false,
// });

// export default function Home({ params }) {
//   const unwrappedParams = use(params); // Unwrap params
//   const bookId = unwrappedParams?.bookId || "book1.pdf";
//   // const fileUrl = `/books/${bookId}`;
//   const fileUrl = `https://library.oapen.org/bitstream/20.500.12657/102605/1/9781136889363.pdf`;

//   return (
//     <>
//       <div className="py-6 px-4 flex flex-col md:flex-row gap-4">
//         <PDFViewer fileUrl={fileUrl} className="w-full md:w-2/3" />
//         <div className="w-full md:w-1/3 ">
//           <IBookGPT />
//         </div>
//       </div>

//     </>
//   );
// }

"use client";

import dynamic from "next/dynamic";
import "@/flipbook/_styles/globals.css";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IBookGPT } from "@/components";

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
    <div className="py-6 px-4 flex flex-col md:flex-row gap-4">
      {/* <PDFViewer fileUrl={fileUrl} className="w-full md:w-2/3" /> */}
      <div className="w-full md:w-2/3">
        <FlipbookViewer pdfUrl={fileUrl} />
      </div>
      <div className="w-full md:w-1/3">
        <IBookGPT bookId={bookId} />
      </div>
    </div>
  );
}
